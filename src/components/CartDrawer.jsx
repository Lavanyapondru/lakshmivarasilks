import { useState } from "react";
import { useShop, formatPrice } from "../context/ShopContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    proceedToCheckout,
    showToast
  } = useShop();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "WELCOME10" || code === "LVS10") {
      const discount = Math.round(cartSubtotal * 0.1);
      setAppliedDiscount(discount);
      setAppliedCoupon(code);
      showToast(`Coupon "${code}" applied! You saved ${formatPrice(discount)}`, "success");
    } else if (code === "FLAT200" && cartSubtotal >= 1000) {
      setAppliedDiscount(200);
      setAppliedCoupon(code);
      showToast("Coupon FLAT200 applied! Saved ₹200", "success");
    } else {
      showToast("Invalid promo code. Try WELCOME10 or FLAT200!", "error");
    }
  };

  const removeCoupon = () => {
    setAppliedDiscount(0);
    setAppliedCoupon("");
    setCouponCode("");
    showToast("Coupon removed", "info");
  };

  const deliveryFee = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, cartSubtotal + deliveryFee - appliedDiscount);

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Cart Drawer"
      >
        {/* Header */}
        <div className="drawer-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-bag-fill text-brand fs-5"></i>
            <h5 className="m-0 fw-bold">Shopping Bag</h5>
            <span className="badge bg-brand-light text-brand rounded-pill">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close"
          ></button>
        </div>

        {/* Free shipping banner */}
        <div className="shipping-progress-banner p-2 px-3 bg-light border-bottom">
          {cartSubtotal >= 999 ? (
            <div className="d-flex align-items-center gap-2 text-success small fw-semibold">
              <i className="bi bi-truck fs-5"></i>
              <span>Yay! You've unlocked <strong>FREE Express Shipping</strong>!</span>
            </div>
          ) : (
            <div className="small">
              <div className="d-flex justify-content-between text-muted mb-1">
                <span>Add {formatPrice(999 - cartSubtotal)} more for <strong>FREE shipping</strong></span>
                <span>{Math.min(100, Math.round((cartSubtotal / 999) * 100))}%</span>
              </div>
              <div className="progress" style={{ height: "4px" }}>
                <div
                  className="progress-bar bg-brand"
                  role="progressbar"
                  style={{ width: `${Math.min(100, (cartSubtotal / 999) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="drawer-body p-3">
          {cart.length === 0 ? (
            <div className="text-center py-5">
              <div className="empty-icon-wrap mb-3 mx-auto">
                <i className="bi bi-bag-x text-muted display-4"></i>
              </div>
              <h5 className="fw-bold mb-2">Your Bag is Empty</h5>
              <p className="text-muted small mb-4">
                Looks like you haven't added anything to your cart yet. Explore our latest arrivals!
              </p>
              <button
                className="btn btn-brand px-4"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="drawer-item-card p-2 rounded-3 border d-flex gap-3 position-relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="drawer-item-img rounded-2"
                  />
                  <div className="flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="pe-4">
                        <h6 className="item-title m-0 fw-semibold text-truncate-2">
                          {item.name}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className="badge bg-light text-dark border">
                          Size: {item.size}
                        </span>
                        <span className="fw-bold text-brand">{item.price}</span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="d-flex align-items-center justify-content-between mt-2">
                      <div className="qty-control d-flex align-items-center border rounded-pill overflow-hidden">
                        <button
                          className="btn btn-sm btn-light border-0 px-2 py-0"
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          title="Decrease Quantity"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <span className="px-2 fw-semibold small">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-light border-0 px-2 py-0"
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          title="Increase Quantity"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>

                      <span className="fw-bold text-dark small">
                        {formatPrice(item.numericPrice * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="btn btn-sm btn-light border-0 text-muted rounded-circle position-absolute top-0 end-0 m-1"
                    title="Remove item"
                    onClick={() => removeFromCart(item.cartItemId)}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              ))}

              {/* Coupon Section */}
              <div className="coupon-box p-3 bg-light rounded-3 mt-2 border">
                {appliedCoupon ? (
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-success me-2">APPLIED</span>
                      <strong className="text-success">{appliedCoupon}</strong>
                      <span className="text-muted small ms-1">
                        (-{formatPrice(appliedDiscount)})
                      </span>
                    </div>
                    <button
                      className="btn btn-link text-danger p-0 text-decoration-none small"
                      onClick={removeCoupon}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control form-control-sm text-uppercase"
                      placeholder="Promo Code (try WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <button type="submit" className="btn btn-dark btn-sm px-3">
                      Apply
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer p-3 border-top bg-white">
            <div className="price-breakdown mb-3">
              <div className="d-flex justify-content-between text-muted small mb-1">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small mb-1">
                <span>Estimated Shipping</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong className="text-success">FREE</strong>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              {appliedDiscount > 0 && (
                <div className="d-flex justify-content-between text-success small mb-1">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(appliedDiscount)}</span>
                </div>
              )}
              <hr className="my-2" />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total Amount</span>
                <span className="fs-5 fw-bold text-brand">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button
              className="btn btn-brand w-100 py-2 fs-6 fw-bold shadow-sm d-flex justify-content-center align-items-center gap-2"
              onClick={proceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <i className="bi bi-arrow-right"></i>
            </button>

            <div className="text-center mt-2">
              <small className="text-muted d-flex align-items-center justify-content-center gap-1">
                <i className="bi bi-shield-check text-success"></i> 100% Safe & Secure Checkout
              </small>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
