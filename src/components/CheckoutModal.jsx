import { useState, useEffect } from "react";
import { useShop, formatPrice, parsePrice } from "../context/ShopContext";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutItems,
    user,
    updateUserAddress,
    placeOrder
  } = useShop();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiApp, setUpiApp] = useState("Google Pay");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [saveAddress, setSaveAddress] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState("");

  // Sync user profile address if available
  useEffect(() => {
    if (user && user.address) {
      setAddress({
        fullName: user.address.fullName || user.name || "",
        phone: user.address.phone || user.phone || "",
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        pincode: user.address.pincode || ""
      });
    } else if (user) {
      setAddress((prev) => ({
        ...prev,
        fullName: user.name || "",
        phone: user.phone || ""
      }));
    }
  }, [user]);

  if (!isCheckoutOpen) return null;

  const subtotal = checkoutItems.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 999 ? 0 : 99;
  const totalAmount = subtotal + deliveryFee;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setFormError("");

    if (!address.fullName.trim()) {
      setFormError("Please enter your full name for delivery.");
      return;
    }
    if (!address.phone.trim() || address.phone.trim().length < 10) {
      setFormError("Please enter a valid 10-digit delivery phone number.");
      return;
    }
    if (!address.street.trim() || !address.city.trim() || !address.pincode.trim()) {
      setFormError("Please complete your delivery address details (street, city, pincode).");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.length < 16) {
        setFormError("Please enter a valid 16-digit card number.");
        return;
      }
    }

    if (saveAddress) {
      updateUserAddress(address);
    }

    setIsProcessing(true);

    let paymentLabel = "Cash on Delivery (COD)";
    if (paymentMethod === "upi") {
      paymentLabel = `UPI (${upiApp}${upiId ? ` - ${upiId}` : ""})`;
    } else if (paymentMethod === "card") {
      paymentLabel = `Credit/Debit Card (ending in ${cardNumber.slice(-4)})`;
    } else if (paymentMethod === "netbanking") {
      paymentLabel = "Net Banking";
    }

    // Simulate gateway response
    setTimeout(() => {
      setIsProcessing(false);
      placeOrder({
        shippingAddress: address,
        paymentMethod: paymentLabel
      });
    }, 1200);
  };

  return (
    <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl checkout-modal-dialog">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-light border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-shield-check text-brand fs-4"></i>
              <div>
                <h5 className="modal-title fw-bold m-0 text-wine">Secure Checkout</h5>
                <small className="text-muted">
                  Ordering as <span className="fw-semibold text-dark">{user?.name}</span> ({user?.email})
                </small>
              </div>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Close"
              disabled={isProcessing}
            ></button>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="modal-body p-4">
              {formError && (
                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                  <i className="bi bi-exclamation-triangle-fill me-1"></i> {formError}
                </div>
              )}

              <div className="row g-4">
                {/* Left Column: Shipping Address & Payment */}
                <div className="col-lg-7">
                  {/* Section 1: Shipping Address */}
                  <div className="checkout-card p-3 rounded-4 border mb-4 bg-white">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="step-badge">1</span>
                      <h6 className="fw-bold m-0">Shipping & Delivery Details</h6>
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold text-muted">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          className="form-control form-control-sm"
                          required
                          value={address.fullName}
                          onChange={handleAddressChange}
                          placeholder="Recipient Name"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label small fw-semibold text-muted">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control form-control-sm"
                          required
                          value={address.phone}
                          onChange={handleAddressChange}
                          placeholder="10-digit number"
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label className="form-label small fw-semibold text-muted">Street Address / House No.</label>
                      <input
                        type="text"
                        name="street"
                        className="form-control form-control-sm"
                        required
                        value={address.street}
                        onChange={handleAddressChange}
                        placeholder="Flat / Building, Area, Landmark"
                      />
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-sm-4">
                        <label className="form-label small fw-semibold text-muted">City</label>
                        <input
                          type="text"
                          name="city"
                          className="form-control form-control-sm"
                          required
                          value={address.city}
                          onChange={handleAddressChange}
                          placeholder="e.g. Hyderabad"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label className="form-label small fw-semibold text-muted">State</label>
                        <input
                          type="text"
                          name="state"
                          className="form-control form-control-sm"
                          required
                          value={address.state}
                          onChange={handleAddressChange}
                          placeholder="e.g. Telangana"
                        />
                      </div>
                      <div className="col-sm-4">
                        <label className="form-label small fw-semibold text-muted">PIN Code</label>
                        <input
                          type="text"
                          name="pincode"
                          className="form-control form-control-sm"
                          required
                          value={address.pincode}
                          onChange={handleAddressChange}
                          placeholder="e.g. 500001"
                        />
                      </div>
                    </div>

                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="saveAddressCheck"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                      />
                      <label className="form-check-label small text-muted" htmlFor="saveAddressCheck">
                        Save this address for future orders
                      </label>
                    </div>
                  </div>

                  {/* Section 2: Payment Method */}
                  <div className="checkout-card p-3 rounded-4 border bg-white">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="step-badge">2</span>
                      <h6 className="fw-bold m-0">Select Payment Method</h6>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      {/* UPI */}
                      <label
                        className={`payment-option p-3 rounded-3 border d-flex flex-column gap-2 cursor-pointer ${
                          paymentMethod === "upi" ? "border-brand bg-brand-light-subtle" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              className="form-check-input mt-0"
                              checked={paymentMethod === "upi"}
                              onChange={() => setPaymentMethod("upi")}
                            />
                            <span className="fw-semibold">UPI / Instant Transfer</span>
                          </div>
                          <span className="badge bg-success-subtle text-success small">Fastest</span>
                        </div>

                        {paymentMethod === "upi" && (
                          <div className="pt-2 ps-4 border-top mt-1">
                            <div className="d-flex gap-2 mb-2">
                              {["Google Pay", "PhonePe", "Paytm", "Other UPI"].map((app) => (
                                <button
                                  type="button"
                                  key={app}
                                  className={`btn btn-sm ${
                                    upiApp === app ? "btn-dark" : "btn-outline-secondary"
                                  }`}
                                  onClick={() => setUpiApp(app)}
                                >
                                  {app}
                                </button>
                              ))}
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Enter UPI ID (e.g. mobile@upi)"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                            />
                          </div>
                        )}
                      </label>

                      {/* Card */}
                      <label
                        className={`payment-option p-3 rounded-3 border d-flex flex-column gap-2 cursor-pointer ${
                          paymentMethod === "card" ? "border-brand bg-brand-light-subtle" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              className="form-check-input mt-0"
                              checked={paymentMethod === "card"}
                              onChange={() => setPaymentMethod("card")}
                            />
                            <span className="fw-semibold">Credit / Debit Card</span>
                          </div>
                          <div className="d-flex gap-1 text-muted">
                            <i className="bi bi-credit-card fs-5"></i>
                          </div>
                        </div>

                        {paymentMethod === "card" && (
                          <div className="pt-2 ps-4 border-top mt-1">
                            <div className="mb-2">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Card Number (16 digits)"
                                maxLength={16}
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                              />
                            </div>
                            <div className="row g-2">
                              <div className="col-6">
                                <input
                                  type="text"
                                  className="form-control form-control-sm"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(e.target.value)}
                                />
                              </div>
                              <div className="col-6">
                                <input
                                  type="password"
                                  className="form-control form-control-sm"
                                  placeholder="CVV"
                                  maxLength={4}
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </label>

                      {/* Cash On Delivery */}
                      <label
                        className={`payment-option p-3 rounded-3 border cursor-pointer ${
                          paymentMethod === "cod" ? "border-brand bg-brand-light-subtle" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              className="form-check-input mt-0"
                              checked={paymentMethod === "cod"}
                              onChange={() => setPaymentMethod("cod")}
                            />
                            <div>
                              <span className="fw-semibold">Cash on Delivery (COD)</span>
                              <small className="d-block text-muted">Pay with cash or UPI upon delivery</small>
                            </div>
                          </div>
                          <i className="bi bi-cash-stack fs-5 text-success"></i>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="col-lg-5">
                  <div className="checkout-summary-card p-3 rounded-4 border bg-light h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-3 d-flex justify-content-between align-items-center">
                        <span>Items in Order</span>
                        <span className="badge bg-white text-dark border">
                          {checkoutItems.reduce((s, i) => s + i.quantity, 0)} items
                        </span>
                      </h6>

                      {/* Items list */}
                      <div className="checkout-items-list mb-3 d-flex flex-column gap-2 overflow-auto" style={{ maxHeight: "240px" }}>
                        {checkoutItems.map((item) => (
                          <div
                            key={item.cartItemId || item.id}
                            className="p-2 bg-white rounded-3 border d-flex gap-2 align-items-center"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded"
                              style={{ width: "48px", height: "48px", objectFit: "cover" }}
                            />
                            <div className="flex-grow-1 small">
                              <div className="fw-semibold text-truncate" style={{ maxWidth: "180px" }}>
                                {item.name}
                              </div>
                              <div className="text-muted small">
                                Size: {item.size} • Qty: {item.quantity}
                              </div>
                            </div>
                            <span className="fw-bold small text-brand">
                              {formatPrice(parsePrice(item.price) * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing list */}
                      <div className="border-top pt-3">
                        <div className="d-flex justify-content-between text-muted small mb-1">
                          <span>Items Subtotal</span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="d-flex justify-content-between text-muted small mb-1">
                          <span>Standard Shipping</span>
                          <span>
                            {deliveryFee === 0 ? (
                              <strong className="text-success">FREE</strong>
                            ) : (
                              formatPrice(deliveryFee)
                            )}
                          </span>
                        </div>
                        <div className="d-flex justify-content-between text-muted small mb-2">
                          <span>Estimated Taxes & Packaging</span>
                          <span className="text-success">Included</span>
                        </div>
                        <hr className="my-2" />
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold fs-6">Total Payable</span>
                          <span className="fs-4 fw-bold text-brand">{formatPrice(totalAmount)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="btn btn-brand w-100 py-3 fw-bold rounded-pill shadow d-flex justify-content-center align-items-center gap-2"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <span className="spinner-border spinner-border-sm" role="status"></span>
                            <span>Processing Order...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-lock-fill"></i>
                            <span>Place Order • {formatPrice(totalAmount)}</span>
                          </>
                        )}
                      </button>

                      <p className="text-center text-muted small mt-2 mb-0">
                        <i className="bi bi-shield-check text-success me-1"></i>
                        Safe & encrypted payment gateway
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
