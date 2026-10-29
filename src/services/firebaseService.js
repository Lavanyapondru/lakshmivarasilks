// ============================================================================
// Firebase Cloud Services: Firestore & Storage Synchronizer
// Handles real-time cloud data syncing for Products, Orders, and Images
// ============================================================================
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  uploadString,
  getDownloadURL
} from "firebase/storage";
import { db, storage } from "../firebase";

const PRODUCTS_COLLECTION = "products";
const ORDERS_COLLECTION = "orders";
const ANALYTICS_COLLECTION = "analytics";

// Helper: Ensure doc ID is always a string
const toDocId = (id) => String(id);

/**
 * Upload a product image to Firebase Storage
 * Supports both File objects (drag & drop) and base64 Data URLs
 * Returns the public Firebase Storage download URL
 */
export async function uploadImageToFirebaseStorage(fileOrDataUrl, customName = "") {
  try {
    const timestamp = Date.now();
    const cleanName = (customName || "product")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const filename = `products/${cleanName}-${timestamp}.jpg`;
    const storageRef = ref(storage, filename);

    if (typeof fileOrDataUrl === "string" && fileOrDataUrl.startsWith("data:")) {
      // It's a base64 Data URL
      const snapshot = await uploadString(storageRef, fileOrDataUrl, "data_url");
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } else if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
      // It's a File or Blob object
      const snapshot = await uploadBytes(storageRef, fileOrDataUrl);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    }

    // If it's already an HTTP URL, just return it
    return fileOrDataUrl;
  } catch (error) {
    console.warn("Firebase Storage upload fallback (using original image):", error.message);
    return fileOrDataUrl;
  }
}

/**
 * Save or update a product document in Firestore
 */
export async function saveProductToFirestore(product) {
  try {
    const docId = toDocId(product.id);
    const docRef = doc(db, PRODUCTS_COLLECTION, docId);
    await setDoc(docRef, {
      ...product,
      id: product.id,
      updatedAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore saveProduct error (saved locally):", error.message);
    return false;
  }
}

/**
 * Update specific fields of a product in Firestore
 */
export async function updateProductInFirestore(productId, updatedFields) {
  try {
    const docId = toDocId(productId);
    const docRef = doc(db, PRODUCTS_COLLECTION, docId);
    await updateDoc(docRef, {
      ...updatedFields,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.warn("Firestore updateProduct error (saved locally):", error.message);
    return false;
  }
}

/**
 * Delete a product document from Firestore
 */
export async function deleteProductFromFirestore(productId) {
  try {
    const docId = toDocId(productId);
    const docRef = doc(db, PRODUCTS_COLLECTION, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.warn("Firestore deleteProduct error:", error.message);
    return false;
  }
}

/**
 * Real-time listener for Firestore Products
 * Automatically fires callback when any admin or user adds/edits products
 */
export function subscribeToFirestoreProducts(onSuccess, onError) {
  try {
    const productsCol = collection(db, PRODUCTS_COLLECTION);
    const unsubscribe = onSnapshot(
      productsCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const cloudProducts = snapshot.docs.map((d) => d.data());
          onSuccess(cloudProducts);
        } else {
          onSuccess([]);
        }
      },
      (error) => {
        console.warn("Firestore products onSnapshot warning:", error.message);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn("Error attaching Firestore listener:", error.message);
    if (onError) onError(error);
    return () => {};
  }
}

/**
 * Save a customer order to Firestore
 */
export async function saveOrderToFirestore(order) {
  try {
    const docId = toDocId(order.id);
    const docRef = doc(db, ORDERS_COLLECTION, docId);
    await setDoc(docRef, {
      ...order,
      createdAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore saveOrder error (saved locally):", error.message);
    return false;
  }
}

/**
 * Update order tracking and status in Firestore
 */
export async function updateOrderStatusInFirestore(orderId, newStatus, trackingNotes = "") {
  try {
    const docId = toDocId(orderId);
    const docRef = doc(db, ORDERS_COLLECTION, docId);
    const stepMap = {
      Placed: 1,
      Confirmed: 2,
      Shipped: 3,
      Delivered: 4,
      Cancelled: 0
    };
    const step = stepMap[newStatus] || 2;

    await updateDoc(docRef, {
      status: newStatus,
      trackingStep: step,
      trackingNotes: trackingNotes,
      updatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.warn("Firestore updateOrderStatus error (updated locally):", error.message);
    return false;
  }
}

/**
 * Real-time listener for Firestore Orders
 */
export function subscribeToFirestoreOrders(onSuccess, onError) {
  try {
    const ordersCol = collection(db, ORDERS_COLLECTION);
    const unsubscribe = onSnapshot(
      ordersCol,
      (snapshot) => {
        if (!snapshot.empty) {
          const cloudOrders = snapshot.docs.map((d) => d.data());
          // Sort latest orders first
          cloudOrders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          onSuccess(cloudOrders);
        } else {
          onSuccess([]);
        }
      },
      (error) => {
        console.warn("Firestore orders onSnapshot warning:", error.message);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (error) {
    console.warn("Error attaching Firestore orders listener:", error.message);
    if (onError) onError(error);
    return () => {};
  }
}

/**
 * Add only products missing from Firestore.
 *
 * This safely upgrades older deployments that seeded only part of the catalog.
 * Existing cloud documents are never overwritten by this migration, so admin
 * edits already stored in Firestore remain intact.
 */
export async function seedFirestoreMissingProducts(candidateProducts = []) {
  try {
    if (!Array.isArray(candidateProducts) || candidateProducts.length === 0) return 0;

    const productsCol = collection(db, PRODUCTS_COLLECTION);
    const snapshot = await getDocs(productsCol);
    const existingIds = new Set(snapshot.docs.map((item) => String(item.id)));
    const missingProducts = candidateProducts.filter(
      (product) => product && product.id !== undefined && !existingIds.has(String(product.id))
    );

    // Firestore's batch write limit is 500; process in safe chunks.
    for (let start = 0; start < missingProducts.length; start += 400) {
      const chunk = missingProducts.slice(start, start + 400);
      await Promise.all(
        chunk.map((product) =>
          setDoc(doc(db, PRODUCTS_COLLECTION, toDocId(product.id)), {
            ...product,
            id: product.id,
            updatedAt: new Date().toISOString()
          }, { merge: true })
        )
      );
    }

    if (missingProducts.length) {
      console.info(`Added ${missingProducts.length} missing catalog products to Firestore.`);
    }
    return missingProducts.length;
  } catch (error) {
    console.warn("Firestore catalog migration skipped (offline or rules pending):", error.message);
    return 0;
  }
}

/**
 * Backwards-compatible helper. New code should use seedFirestoreMissingProducts
 * so a partially populated collection is also completed without overwriting edits.
 */
export async function seedFirestoreIfEmpty(initialProducts) {
  return seedFirestoreMissingProducts(initialProducts);
}
