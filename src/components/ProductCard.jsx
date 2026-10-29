
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useShop, parsePrice } from "../context/ShopContext";

// Get the label for a product variant.
function getOptionLabel(option) {
  if (typeof option === "string" || typeof option === "number") {
    return String(option);
  }

  return String(
    option?.label ??
      option?.name ??
      option?.size ??
      option?.weight ??
      option?.volume ??
      option?.quantity ??
      ""
  );
}

// Convert prices safely into numbers.
function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const parsed = parsePrice(value);
  return Number.isFinite(parsed) ? parsed : null;
}

// Format prices in Indian Rupees.
function formatRupees(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

// Convert weights and volumes into comparable units.
function getComparableAmount(label) {
  const match = String(label)
    .trim()
    .toLowerCase()
    .match(
      /^(\d+(?:\.\d+)?)\s*(kg|kgs|g|gm|gms|gram|grams|ml|l|ltr|litre|litres|liter|liters|pack|packs|packet|packets)$/
    );

  if (!match) return null;

  const amount = Number(match[1]);
  const unit = match[2];

  if (["kg", "kgs"].includes(unit)) {
    return { amount: amount * 1000, group: "weight" };
  }

  if (["g", "gm", "gms", "gram", "grams"].includes(unit)) {
    return { amount, group: "weight" };
  }

  if (["l", "ltr", "litre", "litres", "liter", "liters"].includes(unit)) {
    return { amount: amount * 1000, group: "volume" };
  }

  if (unit === "ml") {
    return { amount, group: "volume" };
  }

  return { amount, group: "pack" };
}

// Get product options and their individual prices.
function getProductVariants(product) {
  const customOptions =
    product.availableSizes || product.sizes || product.variants;

  let options = [];

  if (Array.isArray(customOptions) && customOptions.length > 0) {
    options = customOptions
      .map((option) => {
        if (typeof option === "string" || typeof option === "number") {
          return { label: String(option) };
        }

        const label = getOptionLabel(option);

        return label ? { ...option, label } : null;
      })
      .filter(Boolean);
  } else {
    const categoryText = [
      product.category,
      product.subcategory,
      product.type,
      product.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    let labels = ["Free Size"];

    if (
      /footwear|shoes?|sneakers?|sandals?|slippers?|heels?|boots?/.test(
        categoryText
      )
    ) {
      labels = ["6", "7", "8", "9", "10", "11"];
    } else if (/saree|sari|watch|watches/.test(categoryText)) {
      labels = ["Free Size"];
    } else if (
      /cream|lotion|moisturizer|shampoo|conditioner|skincare|skin care|serum|oil|perfume/.test(
        categoryText
      )
    ) {
      labels = ["30 ml", "50 ml", "100 ml", "200 ml"];
    } else if (
      /powder|flour|rice|spice|almond|cashew|dry fruit|snack|food|grocery/.test(
        categoryText
      )
    ) {
      labels = ["100 g", "250 g", "500 g", "1 kg"];
    } else if (/pack|packet|refill/.test(categoryText)) {
      labels = ["1 Pack", "2 Packs", "3 Packs", "5 Packs"];
    } else if (
      /shirt|t-shirt|tshirt|jeans|trouser|dress|kurti|kurta|clothing|apparel|innerwear|topwear|bra|panty/.test(
        categoryText
      )
    ) {
      labels = ["XS", "S", "M", "L", "XL", "XXL"];
    }

    options = labels.map((label) => ({ label }));
  }

  const basePrice = toNumber(product.price) ?? 0;
  const baseMrp = toNumber(product.mrp);

  const firstAmount = options
    .map((option) => getComparableAmount(option.label))
    .find(Boolean);

  return options.map((option) => {
    const amount = getComparableAmount(option.label);

    let price = toNumber(option.price);
    let mrp = toNumber(option.mrp);

    // Explicit product variant prices take priority.
    // Otherwise, estimate prices proportionally for comparable units.
    if (
      price === null &&
      amount &&
      firstAmount &&
      amount.group === firstAmount.group &&
      firstAmount.amount > 0
    ) {
      price =
        Math.round(
          (basePrice * amount.amount / firstAmount.amount) * 100
        ) / 100;
    }

    if (
      mrp === null &&
      baseMrp !== null &&
      amount &&
      firstAmount &&
      amount.group === firstAmount.group &&
      firstAmount.amount > 0
    ) {
      mrp =
        Math.round(
          (baseMrp * amount.amount / firstAmount.amount) * 100
        ) / 100;
    }

    if (price === null) price = basePrice;
    if (mrp === null) mrp = baseMrp;

    return { ...option, price, mrp };
  });
}

export default function ProductCard({ product }) {
  const productVariants = useMemo(
    () => getProductVariants(product),
    [
      product.id,
      product.price,
      product.mrp,
      product.availableSizes,
      product.sizes,
      product.variants,
      product.category,
      product.subcategory,
      product.type,
      product.name,
    ]
  );

  const availableSizes = productVariants.map(
    (variant) => variant.label
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    availableSizes[0] || "Free Size"
  );
  const [quantity, setQuantity] = useState(1);

  // Reset selections when the product changes.
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

  const selectedVariant = useMemo(
    () =>
      productVariants.find(
        (variant) => String(variant.label) === String(selectedSize)
      ) ||
      productVariants[0] ||
      {},
    [productVariants, selectedSize]
  );

  const unitPrice =
    toNumber(selectedVariant.price) ??
    toNumber(product.price) ??
    0;

  const unitMrp =
    toNumber(selectedVariant.mrp) ??
    toNumber(product.mrp);

  const totalPrice = unitPrice * quantity;

  const totalMrp =
    unitMrp !== null ? unitMrp * quantity : null;

  const discount =
    unitMrp !== null && unitMrp > unitPrice
      ? Math.round(((unitMrp - unitPrice) / unitMrp) * 100)
      : 0;

  const isWeightOrPack = availableSizes.some((option) =>
    /\b(g|gm|gms|kg|ml|l|ltr|pack|packs|packet|packets)\b/i.test(
      option
    )
  );

  const optionLabel = isWeightOrPack
    ? "Select Volume / Weight / Pack:"
    : availableSizes.length === 1 &&
        availableSizes[0] === "Free Size"
      ? "Size:"
      : "Select Size:";

  // Preserve the selected variant price for the cart and checkout.
  const getProductWithSelectedVariant = () => ({
    ...product,
    price: formatRupees(unitPrice),
    ...(unitMrp !== null
      ? { mrp: formatRupees(unitMrp) }
      : {}),
    selectedSize,
    selectedVariant: {
      ...selectedVariant,
      label: selectedSize,
      price: unitPrice,
      mrp: unitMrp,
    },
  });

  const handleAddToCart = (event) => {
    event?.stopPropagation();

    addToCart(
      getProductWithSelectedVariant(),
      quantity,
      selectedSize
    );
  };

  const handleBuyNow = (event) => {
    event?.stopPropagation();

    setShowModal(false);

    buyNow(
      getProductWithSelectedVariant(),
      quantity,
      selectedSize
    );
  };

  const openModal = () => {
    if (trackProductView) {
      trackProductView(product.id);
    }

    setShowModal(true);
  };

  const handleVariantChange = (variant) => {
    setSelectedSize(variant.label);
  };

  return (
    <>
      {/* MAIN PRODUCT CARD: NO VARIANT OR QUANTITY CONTROLS */}
      <article className="product-card h-100 d-flex flex-column justify-content-between">
        <div>
          <div
            className="product-img cursor-pointer position-relative"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openModal();
              }
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
            />

            {product.badge && (
              <span className="product-badge">
                {product.badge}
              </span>
            )}

            <button
              type="button"
              className={`heart-btn ${isFav ? "is-active" : ""}`}
              onClick={(event) => {
                event.stopPropagation();
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
              />
            </button>
          </div>

          <div className="p-3">
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

            <h5
              className="product-title cursor-pointer"
              onClick={openModal}
              title={product.name}
            >
              {product.name}
            </h5>

            {/* Only the product's base price appears on the card */}
            <div className="price-section mb-2">
              <strong className="current-price">
                {product.price !== undefined
                  ? formatRupees(toNumber(product.price) ?? 0)
                  : formatRupees(unitPrice)}
              </strong>

              {product.mrp &&
                (toNumber(product.mrp) ?? 0) >
                  (toNumber(product.price) ?? 0) && (
                  <span className="mrp-price text-muted text-decoration-line-through ms-2">
                    {formatRupees(toNumber(product.mrp))}
                  </span>
                )}
            </div>
          </div>
        </div>

        {/* Only Add and View buttons appear on the card */}
        <div className="p-3 pt-0">
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-brand btn-sm flex-grow-1 d-flex align-items-center justify-content-center gap-1 py-2"
              onClick={handleAddToCart}
              title="Add to Shopping Bag"
            >
              <i className="bi bi-bag-plus" />
              <span>Add</span>
            </button>

            <button
              type="button"
              className="btn btn-outline-brand btn-sm px-3"
              onClick={openModal}
              title="Quick View Details"
            >
              View
            </button>
          </div>
        </div>
      </article>

      {/* QUICK VIEW MODAL: VARIANTS AND QUANTITY ONLY HERE */}
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
              onClick={(event) => event.stopPropagation()}
            >
              <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
                <div className="modal-header border-bottom py-3 px-4">
                  <h5 className="modal-title fw-bold text-truncate pe-3">
                    {product.name}
                  </h5>

                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body p-4 product-quickview-body">
                  <div className="row g-4 align-items-center product-quickview-row">
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

                      {/* Dynamic unit price and total */}
                      <div className="price-section my-3 p-3 rounded-3 bg-light">
                        <div className="d-flex align-items-baseline gap-2 flex-wrap">
                          <span className="fs-3 fw-bold text-brand">
                            {formatRupees(unitPrice)}
                          </span>

                          <small className="text-muted">
                            per item
                          </small>

                          {unitMrp !== null &&
                            unitMrp > unitPrice && (
                              <span className="text-muted text-decoration-line-through">
                                {formatRupees(unitMrp)}
                              </span>
                            )}

                          {discount > 0 && (
                            <span className="badge bg-success-subtle text-success">
                              {discount}% OFF
                            </span>
                          )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                          <span className="small text-muted">
                            {quantity} × {formatRupees(unitPrice)}
                          </span>

                          <strong className="fs-5 text-brand">
                            Total: {formatRupees(totalPrice)}
                          </strong>
                        </div>

                        {totalMrp !== null &&
                          totalMrp > totalPrice && (
                            <small className="text-success d-block mt-1">
                              You save{" "}
                              {formatRupees(
                                totalMrp - totalPrice
                              )}
                            </small>
                          )}
                      </div>

                      {product.offer && (
                        <div className="alert alert-warning py-1 px-3 small rounded-pill d-inline-block mb-3">
                          <i className="bi bi-tag-fill me-1" />
                          Special Offer:{" "}
                          <strong>{product.offer}</strong>
                        </div>
                      )}

                      <p className="text-muted small mb-3">
                        {product.description ||
                          "Crafted from premium quality materials with elegant detailing. Designed for comfort and style."}
                      </p>

                      {/* Variant selector: modal only */}
                      <div className="mb-3">
                        <label className="form-label small fw-bold text-muted text-uppercase mb-2">
                          {optionLabel}
                        </label>

                        <div className="d-flex gap-2 flex-wrap">
                          {productVariants.map((variant) => {
                            const isSelected =
                              selectedSize === variant.label;

                            return (
                              <button
                                type="button"
                                key={variant.label}
                                className={`btn btn-sm ${
                                  isSelected
                                    ? "btn-dark fw-bold"
                                    : "btn-outline-secondary"
                                }`}
                                onClick={() =>
                                  handleVariantChange(variant)
                                }
                                aria-pressed={isSelected}
                              >
                                {variant.label}
                              </button>
                            );
                          })}
                        </div>

                        <small className="text-muted d-block mt-2">
                          Selected:{" "}
                          <strong>{selectedSize}</strong>
                        </small>
                      </div>

                      {/* Quantity selector: modal only */}
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
                            <i className="bi bi-dash" />
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
                            <i className="bi bi-plus" />
                          </button>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-brand py-2 flex-grow-1 fw-bold rounded-pill shadow-sm"
                            onClick={handleAddToCart}
                          >
                            <i className="bi bi-bag-plus me-1" />
                            Add to Cart
                          </button>

                          <button
                            type="button"
                            className={`btn ${
                              isFav
                                ? "btn-danger"
                                : "btn-outline-danger"
                            } rounded-pill px-3`}
                            onClick={() =>
                              toggleWishlist(product)
                            }
                            title="Wishlist"
                            aria-label="Toggle wishlist"
                          >
                            <i
                              className={`bi ${
                                isFav
                                  ? "bi-heart-fill"
                                  : "bi-heart"
                              }`}
                            />
                          </button>
                        </div>

                        <button
                          type="button"
                          className="btn btn-dark py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2"
                          onClick={handleBuyNow}
                        >
                          <i className="bi bi-lightning-charge-fill text-warning" />
                          <span>Buy Now</span>
                        </button>
                      </div>

                      <div className="mt-3 text-muted small d-flex align-items-center gap-3 border-top pt-2">
                        <span>
                          <i className="bi bi-truck text-brand me-1" />
                          Fast Shipping
                        </span>

                        <span>
                          <i className="bi bi-arrow-repeat text-brand me-1" />
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
