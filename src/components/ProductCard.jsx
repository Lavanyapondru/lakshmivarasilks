
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useShop, parsePrice } from "../context/ShopContext";

// Get size, weight, or pack options according to product category.
function getProductOptions(product) {
  // Custom options have priority over default options.
  const customOptions =
    product.availableSizes || product.sizes || product.variants;

  if (Array.isArray(customOptions) && customOptions.length > 0) {
    return customOptions
      .map((option) =>
        typeof option === "string"
          ? option
          : option?.label ||
            option?.name ||
            option?.size ||
            option?.weight
      )
      .filter(Boolean);
  }

  const categoryText = [
    product.category,
    product.subcategory,
    product.type,
    product.name,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Footwear
  if (
    /footwear|shoes?|sneakers?|sandals?|slippers?|heels?|boots?/.test(
      categoryText
    )
  ) {
    return ["6", "7", "8", "9", "10", "11"];
  }

  // Sarees
  if (/saree|sari/.test(categoryText)) {
    return ["Free Size"];
  }

  // Watches
  if (/watch|watches/.test(categoryText)) {
    return ["Free Size"];
  }

  // Clothing
  if (
    /shirt|t-shirt|tshirt|jeans|trouser|dress|kurti|kurta|clothing|apparel|innerwear|topwear/.test(
      categoryText
    )
  ) {
    return ["XS", "S", "M", "L", "XL", "XXL"];
  }

  // Skincare and liquid products
  if (
    /cream|lotion|moisturizer|shampoo|conditioner|skincare|skin care|serum/.test(
      categoryText
    )
  ) {
    return ["30 ml", "50 ml", "100 ml", "200 ml"];
  }

  // Food, powders, and grocery products
  if (
    /powder|flour|rice|spice|almond|cashew|dry fruit|snack|food|grocery/.test(
      categoryText
    )
  ) {
    return ["100 g", "250 g", "500 g", "1 kg"];
  }

  // Packaged products
  if (/pack|packet|refill/.test(categoryText)) {
    return ["1 Pack", "2 Packs", "3 Packs", "5 Packs"];
  }

  // Default for products without specific size options
  return ["Free Size"];
}

export default function ProductCard({ product }) {
  const availableSizes = getProductOptions(product);

  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    availableSizes[0] || "Free Size"
  );
  const [quantity, setQuantity] = useState(1);

  // Reset selected option when the product changes.
  useEffect(() => {
    setSelectedSize(availableSizes[0] || "Free Size");
    setQuantity(1);
  }, [product.id, availableSizes.join("|")]);

  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    buyNow,
    trackProductView,
  } = useShop();

  const isFav = isInWishlist(product.id);

  // Calculate discount percentage.
  const getDiscount = () => {
    if (!product.mrp || !product.price) return 0;

    const mrp = parsePrice(product.mrp);
    const price = parsePrice(product.price);

    if (!mrp || !price || mrp <= price) return 0;

    return Math.round(((mrp - price) / mrp) * 100);
  };

  const discount = getDiscount();

  // Add product with selected size/weight/pack and quantity.
  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();

    addToCart(product, quantity, selectedSize);
  };

  // Buy product with selected option.
  const handleBuyNow = (e) => {
    if (e) e.stopPropagation();

    setShowModal(false);
    buyNow(product, quantity, selectedSize);
  };

  // Dynamic label for the product option selector.
  const isWeightOrPack = availableSizes.some((option) =>
    /\b(g|kg|ml|l|pack|packs)\b/i.test(option)
  );

  const optionLabel = isWeightOrPack
    ? "Select Weight / Pack:"
    : availableSizes.length === 1 &&
      availableSizes[0] === "Free Size"
    ? "Size:"
    : "Select Size:";

  return (
    <>
      <article className="product-card h-100 d-flex flex-column justify-content-between">
        <div>
          {/* Product Image */}
          <div
            className="product-img cursor-pointer position-relative"
            onClick={() => {
              if (trackProductView) trackProductView(product.id);
              setShowModal(true);
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
            />

            {/* Product Badge */}
            {product.badge && (
              <span className="product-badge">
                {product.badge}
              </span>
            )}

            {/* Wishlist Toggle */}
            <button
              type="button"
              className={`heart-btn ${
                isFav ? "is-active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product);
              }}
              title={
                isFav
                  ? "Remove from Wishlist"
                  : "Save to Wishlist"
              }
              aria-label="Wishlist"
            >
              <i
                className={`bi ${
                  isFav
                    ? "bi-heart-fill text-danger"
                    : "bi-heart"
                }`}
              ></i>
            </button>
          </div>

          {/* Product Details */}
          <div className="p-3">
            {/* Rating and Offer */}
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className="stars">
                ★★★★★{" "}
                <small className="text-muted">(18)</small>
              </div>

              {product.offer && (
                <span className="offer-label">
                  {product.offer}
                </span>
              )}
            </div>

            {/* Product Name */}
            <h5
              className="product-title cursor-pointer"
              onClick={() => setShowModal(true)}
              title={product.name}
            >
              {product.name}
            </h5>

            {/* Price Section */}
            <div className="price-section mb-2">
              <strong className="current-price">
                {product.price}
              </strong>

              {product.mrp && (
                <span className="mrp-price text-muted text-decoration-line-through ms-2">
                  {product.mrp}
                </span>
              )}

              {discount > 0 && (
                <span className="discount text-success ms-1">
                  ({discount}% off)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="p-3 pt-0">
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-brand btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-2"
              onClick={handleAddToCart}
              title="Add to Shopping Bag"
            >
              <i className="bi bi-bag-plus"></i>
              <span>Add</span>
            </button>

            <button
              type="button"
              className="btn btn-outline-brand btn-sm px-3"
              onClick={() => setShowModal(true)}
              title="Quick View Details"
            >
              View
            </button>
          </div>
        </div>
      </article>

      {/* Product Quick View Modal */}
      {showModal &&
  createPortal(
    <div
      className="clothing-quickview-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setShowModal(false);
        }
      }}
    >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
              {/* Modal Header */}
              <div className="modal-header border-bottom py-3 px-4">
                <h5 className="modal-title fw-bold text-truncate pe-3">
                  {product.name}
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>

              {/* Modal Body */}
              <div className="modal-body p-4 product-quickview-body">
                <div className="row g-4 align-items-center product-quickview-row">
                  {/* Product Image */}
                  <div className="col-md-6 text-center product-quickview-image-column">
                    <div className="modal-img-wrap rounded-4 overflow-hidden border product-quickview-image-wrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-fluid w-100 product-hover-image product-quickview-image"
                        style={{
                          maxHeight: "506px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Information */}
                  <div className="col-md-6 product-quickview-details-column">
                    <div className="d-flex justify-content-between align-items-center mb-2 product-quickview-rating-row">
                      <div className="stars">
                        ★★★★★{" "}
                        <small className="text-muted">
                          (18 reviews)
                        </small>
                      </div>

                      {product.badge && (
                        <span className="badge bg-brand text-white px-2 py-1 rounded-pill">
                          {product.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="fw-bold mb-2">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="price-section my-2">
                      <span className="fs-3 fw-bold text-brand me-2">
                        {product.price}
                      </span>

                      {product.mrp && (
                        <span className="text-muted text-decoration-line-through fs-6 me-2">
                          M.R.P: {product.mrp}
                        </span>
                      )}

                      {discount > 0 && (
                        <span className="badge bg-success-subtle text-success">
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Special Offer */}
                    {product.offer && (
                      <div className="alert alert-warning py-1 px-3 small rounded-pill d-inline-block mb-3">
                        <i className="bi bi-tag-fill me-1"></i>
                        Special Offer:{" "}
                        <strong>{product.offer}</strong>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-muted small mb-3">
                      {product.description ||
                        "Crafted from premium quality materials with elegant detailing. Designed for optimal comfort and signature style for every occasion."}
                    </p>

                    {/* Dynamic Size / Weight / Pack Selector */}
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                        {optionLabel}
                      </label>

                      <div className="d-flex gap-2 flex-wrap">
                        {availableSizes.map((option) => (
                          <button
                            type="button"
                            key={option}
                            className={`btn btn-sm ${
                              selectedSize === option
                                ? "btn-dark fw-bold"
                                : "btn-outline-secondary"
                            }`}
                            onClick={() =>
                              setSelectedSize(option)
                            }
                            aria-pressed={
                              selectedSize === option
                            }
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      {selectedSize && (
                        <small className="text-muted d-block mt-2">
                          Selected:{" "}
                          <strong>{selectedSize}</strong>
                        </small>
                      )}
                    </div>

                    {/* Order Quantity */}
                    <div className="mb-4 d-flex align-items-center gap-3">
                      <span className="small fw-bold text-muted text-uppercase">
                        Quantity:
                      </span>

                      <div className="qty-control d-flex align-items-center border rounded-pill overflow-hidden bg-light">
                        <button
                          type="button"
                          className="btn btn-sm btn-light border-0 px-3 py-1"
                          onClick={() =>
                            setQuantity((previous) =>
                              Math.max(1, previous - 1)
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          <i className="bi bi-dash"></i>
                        </button>

                        <span className="px-3 fw-bold small">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          className="btn btn-sm btn-light border-0 px-3 py-1"
                          onClick={() =>
                            setQuantity((previous) => previous + 1)
                          }
                          aria-label="Increase quantity"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-brand py-2 flex-grow-1 fw-bold rounded-pill shadow-sm"
                          onClick={handleAddToCart}
                        >
                          <i className="bi bi-bag-plus me-1"></i>
                          Add to Cart
                        </button>

                        <button
                          type="button"
                          className={`btn ${
                            isFav
                              ? "btn-danger"
                              : "btn-outline-danger"
                          } rounded-pill px-3`}
                          onClick={() => toggleWishlist(product)}
                          title="Wishlist"
                          aria-label="Toggle wishlist"
                        >
                          <i
                            className={`bi ${
                              isFav
                                ? "bi-heart-fill"
                                : "bi-heart"
                            }`}
                          ></i>
                        </button>
                      </div>

                      {/* Buy Now */}
                      <button
                        type="button"
                        className="btn btn-dark py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                        onClick={handleBuyNow}
                      >
                        <i className="bi bi-lightning-charge-fill text-warning"></i>
                        <span>Buy Now</span>
                      </button>
                    </div>

                    {/* Shipping Information */}
                    <div className="mt-3 text-muted small d-flex align-items-center gap-3 border-top pt-2">
                      <span>
                        <i className="bi bi-truck text-brand me-1"></i>
                        Fast Shipping
                      </span>

                      <span>
                        <i className="bi bi-arrow-repeat text-brand me-1"></i>
                        7-Day Easy Returns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            </div>,
    document.body
  )}
    
    </>
  );
}
