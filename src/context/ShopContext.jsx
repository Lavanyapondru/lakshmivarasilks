import { createContext, useContext, useState, useEffect } from "react";
import { products as defaultCatalog } from "../data/products";
import {
  saveProductToFirestore,
  updateProductInFirestore,
  deleteProductFromFirestore,
  subscribeToFirestoreProducts,
  saveOrderToFirestore,
  updateOrderStatusInFirestore,
  subscribeToFirestoreOrders,
  uploadImageToFirebaseStorage,
  seedFirestoreMissingProducts
} from "../services/firebaseService";

const ShopContext = createContext();

export const parsePrice = (priceStr) => {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr) return 0;
  const num = parseFloat(priceStr.toString().replace(/[₹,\s]/g, ""));
  return isNaN(num) ? 0 : num;
};

export const formatPrice = (amount) => {
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
};

// Default Demo User for easy testing
const DEMO_USER = {
  id: "user-demo-101",
  name: "Priya Sharma",
  email: "priya@example.com",
  phone: "9876543210",
  address: {
    fullName: "Priya Sharma",
    phone: "9876543210",
    street: "Flat 402, Lotus Greens, 100 Feet Road",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038"
  }
};

// Initialize products catalog with stock, rating, and description
const seedProducts = () => {
  return defaultCatalog.map((p, idx) => ({
    ...p,
    stock: p.stock !== undefined ? p.stock : (idx % 8 === 0 ? 3 : idx % 5 === 0 ? 7 : 24 + (idx % 26)),
    isActive: p.isActive !== undefined ? p.isActive : true,
    rating: p.rating || (4.4 + ((idx * 3) % 7) / 10).toFixed(1),
    reviewsCount: p.reviewsCount || (8 + (idx * 5) % 40),
    description:
      p.description ||
      "Crafted with handpicked premium fabrics and detailed styling, designed for graceful drape, breathability, and luxurious comfort."
  }));
};

// Merge catalog sources by stable product ID. The default catalog fills gaps,
// local-only products are retained, and Firestore wins for matching IDs so
// edits made on another device are reflected in this session.
const mergeProductCatalog = (defaultProducts, localProducts, cloudProducts) => {
  const merged = new Map();

  [defaultProducts, localProducts, cloudProducts].forEach((source) => {
    (Array.isArray(source) ? source : []).forEach((product) => {
      if (!product || product.id === undefined || product.id === null) return;
      const key = String(product.id);
      merged.set(key, { ...(merged.get(key) || {}), ...product });
    });
  });

  return Array.from(merged.values());
};

// Pre-seed realistic analytics for existing products so admin sees deep analytics immediately
const seedAnalytics = (productsList) => {
  const analytics = {};
  productsList.forEach((p, idx) => {
    const numericPrice = parsePrice(p.price);
    const views = 140 + ((idx * 47) % 720);
    const sales = Math.max(1, Math.round(views * (0.04 + ((idx % 6) / 120))));
    const revenue = sales * numericPrice;
    const inWishlist = Math.round(views * 0.12);
    const inCart = Math.round(views * 0.05);

    analytics[p.id] = {
      views,
      sales,
      revenue,
      inWishlist,
      inCart,
      lastUpdated: new Date(Date.now() - idx * 3600000).toISOString()
    };
  });
  return analytics;
};

export function ShopProvider({ children }) {
  // ------------------------------------
  // Products State (Synced with Admin & User)
  // ------------------------------------
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_products_db");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge: keep admin edits to existing products, but add any new products from defaultCatalog
          const savedIds = new Set(parsed.map((p) => p.id));
          const freshFromCatalog = seedProducts();
          const newProducts = freshFromCatalog.filter((p) => !savedIds.has(p.id));
          if (newProducts.length > 0) {
            const merged = [...parsed, ...newProducts];
            try {
              localStorage.setItem("lvs_products_db", JSON.stringify(merged));
            } catch (e) {
              console.error(e);
            }
            return merged;
          }
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error loading products from storage:", e);
    }
    const initial = seedProducts();
    try {
      localStorage.setItem("lvs_products_db", JSON.stringify(initial));
    } catch (e) {
      console.error(e);
    }
    return initial;
  });

  // ------------------------------------
  // Product Analytics State
  // ------------------------------------
  const [productAnalytics, setProductAnalytics] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_product_analytics");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") return parsed;
      }
    } catch (e) {
      console.error("Error loading analytics from storage:", e);
    }
    const initial = seedAnalytics(seedProducts());
    try {
      localStorage.setItem("lvs_product_analytics", JSON.stringify(initial));
    } catch (e) {
      console.error(e);
    }
    return initial;
  });

  // ------------------------------------
  // Admin Auth State
  // ------------------------------------
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_admin");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // ------------------------------------
  // User Auth State
  // ------------------------------------
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_users_db");
      if (saved) return JSON.parse(saved);
      // Pre-seed demo user into users db
      const initial = [
        {
          ...DEMO_USER,
          password: "password123",
          joinedDate: "2026-01-15"
        }
      ];
      localStorage.setItem("lvs_users_db", JSON.stringify(initial));
      return initial;
    } catch {
      return [];
    }
  });

  // ------------------------------------
  // Wishlist State
  // ------------------------------------
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ------------------------------------
  // Cart State
  // ------------------------------------
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ------------------------------------
  // Orders State
  // ------------------------------------
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("lvs_orders");
      if (saved) return JSON.parse(saved);
      // Sample initial order for demo user
      const initialOrders = [
        {
          id: "LVS-ORD-92810",
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }),
          items: [
            {
              id: 2,
              name: "Women Multi Color Stripes Ethnic Dress",
              price: "₹1,899",
              quantity: 1,
              size: "M",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj7Ns9hcOvTqyjwsB-AyM6fGP3Mdd0K1gXQeZgqpJWaA&s=10"
            }
          ],
          total: 1899,
          paymentMethod: "UPI (Google Pay)",
          address: DEMO_USER.address,
          status: "Delivered",
          trackingStep: 4, // 1: Placed, 2: Confirmed, 3: Shipped, 4: Delivered
          trackingNotes: "Package handed over to customer by courier partner."
        }
      ];
      localStorage.setItem("lvs_orders", JSON.stringify(initialOrders));
      return initialOrders;
    } catch {
      return [];
    }
  });

  // ------------------------------------
  // UI / Modal States
  // ------------------------------------
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'signup'
  const [pendingAction, setPendingAction] = useState(null);
  const [authNotice, setAuthNotice] = useState("");

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  // Toast Notification
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lvs_products_db", JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem("lvs_product_analytics", JSON.stringify(productAnalytics));
    } catch (e) {
      console.error(e);
    }
  }, [productAnalytics]);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem("lvs_admin", JSON.stringify(adminUser));
      } else {
        localStorage.removeItem("lvs_admin");
      }
    } catch (e) {
      console.error(e);
    }
  }, [adminUser]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("lvs_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("lvs_user");
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("lvs_users_db", JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem("lvs_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("lvs_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("lvs_orders", JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // ------------------------------------
  // Firebase Real-time Sync Listeners
  // ------------------------------------
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const unsubProducts = subscribeToFirestoreProducts(
      (cloudProducts) => {
        if (!isMounted) return;
        setIsFirebaseConnected(true);
        if (Array.isArray(cloudProducts) && cloudProducts.length > 0) {
          setProducts((currentProducts) =>
            mergeProductCatalog([], currentProducts, cloudProducts)
          );
        }
      },
      (error) => {
        console.warn("Firestore products standby:", error.message);
      }
    );

    const unsubOrders = subscribeToFirestoreOrders(
      (cloudOrders) => {
        if (!isMounted) return;
        if (cloudOrders && cloudOrders.length > 0) {
          setOrders(cloudOrders);
        }
      },
      (error) => {
        console.warn("Firestore orders standby:", error.message);
      }
    );

    // Safely backfill every missing product from product.js and local storage.
    // Existing Firestore documents are left untouched.
    seedFirestoreMissingProducts(mergeProductCatalog(seedProducts(), products, []));

    return () => {
      isMounted = false;
      if (typeof unsubProducts === "function") unsubProducts();
      if (typeof unsubOrders === "function") unsubOrders();
    };
  }, []);

  // ------------------------------------
  // Admin Operations & Product Management
  // ------------------------------------
  const adminLogin = (email, password) => {
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPass = (password || "").trim();

    if (cleanEmail === "admin@laxmivarasilks.com" && cleanPass === "Admin@123") {
      const adminSession = {
        email: "admin@laxmivarasilks.com",
        name: "Store Administrator",
        role: "admin",
        lastLogin: new Date().toISOString()
      };
      setAdminUser(adminSession);
      showToast("Welcome to Laxmi Vara Silks Admin Dashboard!", "success");
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid admin credentials. Use admin@laxmivarasilks.com / Admin@123"
      };
    }
  };

  const adminLogout = () => {
    setAdminUser(null);
    showToast("Admin logged out successfully.", "info");
  };

  const addProduct = async (productData) => {
    const newId = Date.now();
    const numericPrice = parsePrice(productData.price);

    // If image is a data URL, attempt upload to Firebase Storage
    let finalImageUrl =
      productData.image ||
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80";

    if (productData.image && productData.image.startsWith("data:")) {
      try {
        finalImageUrl = await uploadImageToFirebaseStorage(productData.image, productData.name);
      } catch (err) {
        console.warn("Firebase Storage upload note:", err);
      }
    }

    const newProduct = {
      ...productData,
      id: newId,
      name: (productData.name || "New Fashion Piece").trim(),
      category: productData.category || "clothing",
      subcategory: productData.subcategory || "ethnic",
      price:
        typeof productData.price === "number"
          ? `₹${productData.price}`
          : productData.price?.startsWith("₹")
          ? productData.price
          : `₹${productData.price}`,
      mrp: productData.mrp
        ? productData.mrp.startsWith("₹")
          ? productData.mrp
          : `₹${productData.mrp}`
        : `₹${Math.round(numericPrice * 1.45)}`,
      badge: productData.badge || "New",
      offer: productData.offer || "Special Price",
      stock: Number(productData.stock) || 25,
      isActive: true,
      rating: "4.9",
      reviewsCount: 1,
      image: finalImageUrl,
      description:
        productData.description ||
        "Specially curated for women with premium fabric, elegant silhouette, and refined finish."
    };

    setProducts((prev) => [newProduct, ...prev]);

    setProductAnalytics((prev) => ({
      ...prev,
      [newId]: {
        views: 1,
        sales: 0,
        revenue: 0,
        inWishlist: 0,
        inCart: 0,
        lastUpdated: new Date().toISOString()
      }
    }));

    // Sync to Firestore Cloud
    saveProductToFirestore(newProduct);

    showToast(`Product "${newProduct.name}" uploaded to store & Firebase!`, "success");
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updatedFields };
          if (updatedFields.price !== undefined) {
            updated.price =
              typeof updatedFields.price === "number"
                ? `₹${updatedFields.price}`
                : updatedFields.price?.startsWith("₹")
                ? updatedFields.price
                : `₹${updatedFields.price}`;
          }
          if (updatedFields.mrp !== undefined) {
            updated.mrp =
              typeof updatedFields.mrp === "number"
                ? `₹${updatedFields.mrp}`
                : updatedFields.mrp?.startsWith("₹")
                ? updatedFields.mrp
                : `₹${updatedFields.mrp}`;
          }
          if (updatedFields.stock !== undefined) {
            updated.stock = Math.max(0, parseInt(updatedFields.stock, 10) || 0);
          }
          return updated;
        }
        return p;
      })
    );

    // Update analytics revenue if price changed
    if (updatedFields.price) {
      const newNumericPrice = parsePrice(updatedFields.price);
      setProductAnalytics((prev) => {
        const current = prev[id] || { views: 0, sales: 0, revenue: 0 };
        return {
          ...prev,
          [id]: {
            ...current,
            revenue: current.sales * newNumericPrice,
            lastUpdated: new Date().toISOString()
          }
        };
      });
    }

    // Sync to Firestore Cloud
    updateProductInFirestore(id, updatedFields);

    showToast("Product changes saved and live for all users!", "success");
  };

  const deleteProduct = (id) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    deleteProductFromFirestore(id);
    showToast(`Removed "${prod?.name?.slice(0, 22) || "Product"}" from store.`, "info");
  };

  const toggleProductStatus = (id) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextActive = !p.isActive;
          showToast(
            `"${p.name.slice(0, 20)}..." is now ${nextActive ? "LIVE on website" : "HIDDEN (Draft)"}.`,
            nextActive ? "success" : "info"
          );
          return { ...p, isActive: nextActive };
        }
        return p;
      })
    );
  };

  const updateStock = (id, newStock) => {
    const stockQty = Math.max(0, parseInt(newStock, 10) || 0);
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: stockQty } : p))
    );
    showToast(`Stock updated to ${stockQty} units.`, "success");
  };

  const trackProductView = (productId) => {
    setProductAnalytics((prev) => {
      const current = prev[productId] || {
        views: 0,
        sales: 0,
        revenue: 0,
        inWishlist: 0,
        inCart: 0
      };
      return {
        ...prev,
        [productId]: {
          ...current,
          views: current.views + 1,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  const resetProductsToDefault = () => {
    const freshProds = seedProducts();
    const freshAnalytics = seedAnalytics(freshProds);
    setProducts(freshProds);
    setProductAnalytics(freshAnalytics);
    showToast("Product catalogue reset to default template.", "info");
  };

  const updateOrderStatus = (orderId, newStatus, trackingNotes = "") => {
    const stepMap = {
      Placed: 1,
      Confirmed: 2,
      Shipped: 3,
      Delivered: 4,
      Cancelled: 0
    };
    const step = stepMap[newStatus] || 2;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: newStatus,
            trackingStep: step,
            trackingNotes: trackingNotes !== undefined ? trackingNotes : ord.trackingNotes || ""
          };
        }
        return ord;
      })
    );

    // Sync to Firestore Cloud
    updateOrderStatusInFirestore(orderId, newStatus, trackingNotes);

    showToast(`Order #${orderId} status set to "${newStatus}"! Updated on customer side.`, "success");
  };

  // ------------------------------------
  // Wishlist Actions
  // ------------------------------------
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name.slice(0, 24)}..." from Wishlist`, "info");
      // Update analytics
      setProductAnalytics((prev) => {
        const cur = prev[product.id] || { views: 0, sales: 0, revenue: 0, inWishlist: 1, inCart: 0 };
        return {
          ...prev,
          [product.id]: { ...cur, inWishlist: Math.max(0, cur.inWishlist - 1) }
        };
      });
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Added "${product.name.slice(0, 24)}..." to Wishlist`, "success");
      // Update analytics
      setProductAnalytics((prev) => {
        const cur = prev[product.id] || { views: 0, sales: 0, revenue: 0, inWishlist: 0, inCart: 0 };
        return {
          ...prev,
          [product.id]: { ...cur, inWishlist: cur.inWishlist + 1 }
        };
      });
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showToast("Item removed from Wishlist", "info");
  };

  const clearWishlist = () => {
    setWishlist([]);
    showToast("Wishlist cleared", "info");
  };

  // ------------------------------------
  // Cart Actions
  // ------------------------------------
  const addToCart = (product, quantity = 1, size = "M") => {
    const itemSize = size || "M";
    const cartItemId = `${product.id}-${itemSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            price: product.price,
            mrp: product.mrp,
            image: product.image,
            badge: product.badge,
            size: itemSize,
            quantity: quantity,
            numericPrice: parsePrice(product.price)
          }
        ];
      }
    });

    // Update inCart analytics
    setProductAnalytics((prev) => {
      const cur = prev[product.id] || { views: 0, sales: 0, revenue: 0, inWishlist: 0, inCart: 0 };
      return {
        ...prev,
        [product.id]: { ...cur, inCart: cur.inCart + quantity }
      };
    });

    showToast(`Added "${product.name.slice(0, 22)}..." to Cart!`, "success");
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast("Item removed from Cart", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  const moveWishlistToCart = (product, size = "M") => {
    addToCart(product, 1, size);
    removeFromWishlist(product.id);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);

  // ------------------------------------
  // User Authentication Actions
  // ------------------------------------
  const openAuth = (mode = "login", notice = "", action = null) => {
    setAuthMode(mode);
    setAuthNotice(notice);
    setPendingAction(() => action);
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    setAuthNotice("");
    setPendingAction(null);
  };

  const login = (emailOrPhone, password) => {
    const cleanIdentifier = emailOrPhone.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check users database
    const foundUser = users.find(
      (u) =>
        (u.email.toLowerCase() === cleanIdentifier || u.phone === cleanIdentifier) &&
        u.password === cleanPass
    );

    if (foundUser) {
      const sessionUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        address: foundUser.address || DEMO_USER.address
      };
      setUser(sessionUser);
      setIsAuthOpen(false);
      showToast(`Welcome back, ${sessionUser.name}!`, "success");

      if (pendingAction) {
        pendingAction(sessionUser);
        setPendingAction(null);
      }
      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid email/phone or password. (Hint: Try Demo Login below!)"
      };
    }
  };

  const loginDemo = () => {
    const sessionUser = {
      id: DEMO_USER.id,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      phone: DEMO_USER.phone,
      address: DEMO_USER.address
    };
    setUser(sessionUser);
    setIsAuthOpen(false);
    showToast(`Logged in as demo customer ${DEMO_USER.name}!`, "success");

    if (pendingAction) {
      pendingAction(sessionUser);
      setPendingAction(null);
    }
  };

  const signup = ({ name, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();

    // Check existing
    const existing = users.find(
      (u) => u.email.toLowerCase() === cleanEmail || u.phone === cleanPhone
    );
    if (existing) {
      return {
        success: false,
        error: "An account with this email or phone number already exists."
      };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      password: password.trim(),
      joinedDate: new Date().toISOString().split("T")[0],
      address: {
        fullName: name.trim(),
        phone: cleanPhone,
        street: "Boutique Lane, Main Road",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001"
      }
    };

    setUsers((prev) => [...prev, newUser]);

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address
    };
    setUser(sessionUser);
    setIsAuthOpen(false);
    showToast(`Account created successfully! Welcome, ${sessionUser.name}.`, "success");

    if (pendingAction) {
      pendingAction(sessionUser);
      setPendingAction(null);
    }

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsProfileOpen(false);
    showToast("You have been logged out successfully.", "info");
  };

  const updateUserAddress = (newAddress) => {
    if (!user) return;
    const updated = { ...user, address: newAddress };
    setUser(updated);
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, address: newAddress } : u))
    );
    showToast("Address saved successfully!", "success");
  };

  // ------------------------------------
  // Checkout & Buying Flow
  // ------------------------------------
  const buyNow = (product, quantity = 1, size = "M") => {
    const itemSize = size || "M";
    const itemToBuy = {
      cartItemId: `buy-${product.id}-${Date.now()}`,
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      size: itemSize,
      quantity: quantity,
      numericPrice: parsePrice(product.price)
    };

    if (!user) {
      openAuth(
        "login",
        "Please log in or create an account to proceed with your order.",
        () => {
          setCheckoutItems([itemToBuy]);
          setIsCheckoutOpen(true);
        }
      );
    } else {
      setCheckoutItems([itemToBuy]);
      setIsCheckoutOpen(true);
    }
  };

  const proceedToCheckout = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!", "info");
      return;
    }

    if (!user) {
      setIsCartOpen(false);
      openAuth(
        "login",
        "Please log in or create an account to complete your checkout.",
        () => {
          setCheckoutItems([...cart]);
          setIsCheckoutOpen(true);
        }
      );
    } else {
      setIsCartOpen(false);
      setCheckoutItems([...cart]);
      setIsCheckoutOpen(true);
    }
  };

  const placeOrder = ({ shippingAddress, paymentMethod, discountAmount = 0 }) => {
    const subtotal = checkoutItems.reduce((sum, item) => {
      const price = parsePrice(item.price);
      return sum + price * item.quantity;
    }, 0);

    const deliveryFee = subtotal > 999 ? 0 : 99;
    const finalTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

    const orderId = `LVS-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      customerName: user?.name || shippingAddress?.fullName || "Guest Customer",
      customerEmail: user?.email || "customer@example.com",
      customerPhone: user?.phone || shippingAddress?.phone || "N/A",
      items: [...checkoutItems],
      subtotal,
      deliveryFee,
      discountAmount,
      total: finalTotal,
      paymentMethod,
      address: shippingAddress,
      status: "Confirmed",
      trackingStep: 2, // 1: Placed, 2: Confirmed, 3: Dispatched, 4: Delivered
      trackingNotes: "Order confirmed by boutique. Packaging in progress.",
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString(
        "en-IN",
        { weekday: "short", day: "numeric", month: "short" }
      )
    };

    // Update product stock and increment sales analytics
    checkoutItems.forEach((item) => {
      const itemQty = item.quantity || 1;
      const itemPrice = parsePrice(item.price);

      // Decrement stock
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === item.id) {
            return { ...p, stock: Math.max(0, (p.stock || 0) - itemQty) };
          }
          return p;
        })
      );

      // Increment product analytics
      setProductAnalytics((prev) => {
        const cur = prev[item.id] || { views: 5, sales: 0, revenue: 0, inWishlist: 0, inCart: 0 };
        return {
          ...prev,
          [item.id]: {
            ...cur,
            sales: cur.sales + itemQty,
            revenue: cur.revenue + itemPrice * itemQty,
            lastUpdated: new Date().toISOString()
          }
        };
      });
    });

    // If checkout items came from cart, remove them from cart
    const purchasedIds = new Set(checkoutItems.map((i) => i.id));
    setCart((prev) => prev.filter((item) => !purchasedIds.has(item.id)));

    // Update orders (local & Firestore)
    setOrders((prev) => [newOrder, ...prev]);
    saveOrderToFirestore(newOrder);

    setLastOrder(newOrder);
    setIsCheckoutOpen(false);
    setIsOrderSuccessOpen(true);
    showToast(`Order #${orderId} placed successfully! 🎉`, "success");
  };

  return (
    <ShopContext.Provider
      value={{
        // Firebase Cloud Status
        isFirebaseConnected,

        // Products Catalog (Dynamic & Admin-synced)
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductStatus,
        updateStock,
        trackProductView,
        resetProductsToDefault,

        // Analytics
        productAnalytics,

        // Admin Auth
        adminUser,
        adminLogin,
        adminLogout,
        isAdmin: !!adminUser,

        // Order Management
        updateOrderStatus,

        // User Auth
        user,
        users,
        login,
        loginDemo,
        signup,
        logout,
        updateUserAddress,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        authNotice,
        openAuth,
        closeAuth,

        // Wishlist
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        wishlistCount: wishlist.length,

        // Cart
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        moveWishlistToCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,

        // Checkout / Buy Now
        buyNow,
        proceedToCheckout,
        checkoutItems,
        isCheckoutOpen,
        setIsCheckoutOpen,
        placeOrder,
        lastOrder,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,

        // Profile & Orders
        orders,
        isProfileOpen,
        setIsProfileOpen,

        // Toast
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
