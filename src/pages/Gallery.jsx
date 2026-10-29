
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import { useShop } from "../context/ShopContext";
// import "./Gallery.css";

export default function Gallery() {
  const { products } = useShop();
  const [gallery, setGallery] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  // Load gallery products
  useEffect(() => {
    const images = products.filter((product) => product.isActive !== false && product.image);

    setGallery(
      [...images].sort(() => Math.random() - 0.5)
    );
  }, [products]);

  // Normalize names for route matching
  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .trim()
      .replace(/[_\s]+/g, "-");

  // Category and subcategory routes.
  // These paths must match the routes defined in App.jsx.
  const routeMap = {
    clothing: {
      "western-wear": "/western-wear",
      "ethnic-wear": "/ethnic-wear",
      sarees: "/clothing",
      dresses: "/clothing",
      kurtis: "/clothing",
      tops: "/clothing",
      "bottom-wear": "/bottom-wear",
    },

    "women-products": {
      footwear: "/women-products",
      watches: "/women-products",
      handbags: "/women-products",
      jewelry: "/women-products",
      accessories: "/women-products",
    },

    skincare: {
      facewash: "/skincare",
      cleanser: "/skincare",
      moisturizer: "/skincare",
      sunscreen: "/skincare",
      serum: "/skincare",
    },

    "inner-wear": {
      bras: "/inner-wear",
      panties: "/inner-wear",
      lingerie: "/inner-wear",
    },

    footwear: {
      heels: "/footwear",
      flats: "/footwear",
      sandals: "/footwear",
      sneakers: "/footwear",
    },

    watches: {
      men: "/watches",
      women: "/watches",
    },
  };

  // Routes for main categories
  const categoryMap = {
    clothing: "/clothing",
    "women-products": "/women-products",
    skincare: "/skincare",
    "inner-wear": "/innerwear",
    footwear: "/footwear",
    watches: "/watches",
  };

  // Get the correct destination for a product
  const getProductPath = (item) => {
    if (!item) return null;

    // Use explicitly configured routes first.
    const directPath =
      item.subcategoryPath ||
      item.path ||
      item.link ||
      item.route;

    if (
      typeof directPath === "string" &&
      directPath.trim().startsWith("/")
    ) {
      return directPath.trim();
    }

    const category = normalize(item.category);
    const subcategory = normalize(item.subcategory);

    // Exact category + subcategory match
    if (routeMap[category]?.[subcategory]) {
      return routeMap[category][subcategory];
    }

    // Subcategory might itself be a main category.
    if (categoryMap[subcategory]) {
      return categoryMap[subcategory];
    }

    // Category may directly identify the destination.
    if (categoryMap[category]) {
      return categoryMap[category];
    }

    // Last fallback: use the subcategory as a URL slug.
    // This works only if your App.jsx defines that route.
    if (subcategory) {
      return `/${subcategory}`;
    }

    return null;
  };

  // Open popup on image click
  const handleImageClick = (item) => {
    setSelectedProduct(item);
  };

  // Navigate to the selected product's category
  const handleExplore = () => {
    if (!selectedProduct) return;

    const path = getProductPath(selectedProduct);

    console.log("Gallery product:", selectedProduct);
    console.log("Resolved route:", path);

    if (!path) {
      window.alert(
        "No category route was found. Check the product category and subcategory in products.js."
      );
      return;
    }

    setSelectedProduct(null);
    navigate(path);
  };

  // Close popup using Escape
  useEffect(() => {
    if (!selectedProduct) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct]);

  // Format product values
  const getName = (item) =>
    item?.name || item?.title || "Beautiful Collection";

  const getCategory = (item) =>
    String(item?.category || "Women Needs")
      .replace(/[-_]/g, " ");

  const getSubcategory = (item) =>
    String(item?.subcategory || item?.category || "Collection")
      .replace(/[-_]/g, " ");

  const formatPrice = (price) => {
    const numericPrice = Number(price);

    if (price === null || price === undefined || price === "") {
      return null;
    }

    if (!Number.isFinite(numericPrice)) {
      return String(price);
    }

    return `₹${numericPrice.toLocaleString("en-IN")}`;
  };

  return (
    <section className="page-section gallery-page">
      <div className="container">
        <SectionTitle
          eyebrow="OUR WORLD"
          title="Women Needs Gallery"
          text="Explore our latest collection. Click any image to discover more."
        />

        {/* Gallery grid */}
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button
              className="gallery-item"
              type="button"
              key={item.id || `${item.image}-${index}`}
              onClick={() => handleImageClick(item)}
              title={`View ${getName(item)}`}
            >
              <img
                src={item.image}
                alt={getName(item)}
                loading="lazy"
              />

              <span className="gallery-item-overlay">
                <span className="gallery-item-name">
                  {getName(item)}
                </span>

                <span className="gallery-explore-label">
                  View Details
                  <i className="bi bi-arrow-up-right" />
                </span>
              </span>
            </button>
          ))}
        </div>

        {gallery.length === 0 && (
          <p className="text-center py-5">
            No gallery images are available yet.
          </p>
        )}
      </div>

      {/* Product details popup */}
      {selectedProduct && (
        <div
          className="gallery-modal-backdrop"
          onClick={() => setSelectedProduct(null)}
          role="presentation"
        >
          <div
            className="gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="gallery-modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              <i className="bi bi-x-lg" />
            </button>

            {/* Selected product image */}
            <div className="gallery-modal-image">
              <img
                src={selectedProduct.image}
                alt={getName(selectedProduct)}
              />
            </div>

            {/* Selected product information */}
            <div className="gallery-modal-details">
              <span className="gallery-modal-eyebrow">
                WOMEN NEEDS COLLECTION
              </span>

              <h2 id="gallery-modal-title">
                {getName(selectedProduct)}
              </h2>

              <p className="gallery-modal-description">
                {selectedProduct.description ||
                  `Discover our ${getSubcategory(
                    selectedProduct
                  )} collection, selected for your style and everyday needs.`}
              </p>

              <div className="gallery-detail-row">
                <span>Category</span>
                <strong>{getCategory(selectedProduct)}</strong>
              </div>

              <div className="gallery-detail-row">
                <span>Subcategory</span>
                <strong>{getSubcategory(selectedProduct)}</strong>
              </div>

              {formatPrice(selectedProduct.price) && (
                <div className="gallery-detail-row">
                  <span>Price</span>
                  <strong className="gallery-price">
                    {formatPrice(selectedProduct.price)}
                  </strong>
                </div>
              )}

              {/* Main navigation button */}
              <button
                type="button"
                className="gallery-modal-explore-btn"
                onClick={handleExplore}
              >
                Explore {getSubcategory(selectedProduct)}
                <i className="bi bi-arrow-right" />
              </button>

              <button
                type="button"
                className="gallery-modal-continue-btn"
                onClick={() => setSelectedProduct(null)}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
