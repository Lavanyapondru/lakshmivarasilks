
import { useState, useEffect } from "react";
import { useShop, formatPrice, parsePrice } from "../context/ShopContext";

const UPI_APPS = [
  {
    name: "Google Pay",
    icon: "https://cdn.simpleicons.org/googlepay",
  },
  {
    name: "PhonePe",
    icon: "https://cdn.simpleicons.org/phonepe",
  },
  {
    name: "Paytm",
    icon: "https://cdn.simpleicons.org/paytm",
  },
  {
    name: "Other UPI",
    bootstrapIcon: "bi-qr-code",
  },
];

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    checkoutItems,
    user,
    updateUserAddress,
    placeOrder,
  } = useShop();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
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

  // Sync saved user address.
  useEffect(() => {
    if (user?.address) {
      setAddress({
        fullName: user.address.fullName || user.name || "",
        phone: user.address.phone || user.phone || "",
        street: user.address.street || "",
        city: user.address.city || "",
        state: user.address.state || "",
        pincode: user.address.pincode || "",
      });
    } else if (user) {
      setAddress((previous) => ({
        ...previous,
        fullName: user.name || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  if (!isCheckoutOpen) return null;

  const subtotal = checkoutItems.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 999 ? 0 : 99;
  const totalAmount = subtotal + deliveryFee;

  const totalItems = checkoutItems.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const handleAddressChange = (event) => {
    const { name, value } = event.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    setFormError("");

    if (!address.fullName.trim()) {
      setFormError("Please enter your full name for delivery.");
      return;
    }

    if (!/^\d{10}$/.test(address.phone.replace(/\D/g, ""))) {
      setFormError("Please enter a valid 10-digit delivery phone number.");
      return;
    }

    if (
      !address.street.trim() ||
      !address.city.trim() ||
      !address.state.trim() ||
      !/^\d{6}$/.test(address.pincode.trim())
    ) {
      setFormError(
        "Please enter your complete delivery address and a valid 6-digit PIN code."
      );
      return;
    }

    if (checkoutItems.length === 0) {
      setFormError("Your cart is empty.");
      return;
    }

    if (paymentMethod === "upi") {
      if (!upiId.trim() || !/^[^@\s]+@[^@\s]+$/.test(upiId.trim())) {
        setFormError("Please enter a valid UPI ID.");
        return;
      }
    }

    if (paymentMethod === "card") {
      if (!/^\d{16}$/.test(cardNumber)) {
        setFormError("Please enter a valid 16-digit card number.");
        return;
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        setFormError("Please enter the card expiry in MM/YY format.");
        return;
      }

      if (!/^\d{3,4}$/.test(cardCvv)) {
        setFormError("Please enter a valid card CVV.");
        return;
      }
    }

    if (saveAddress) {
      updateUserAddress(address);
    }

    setIsProcessing(true);

    let paymentLabel = "Cash on Delivery (COD)";

    if (paymentMethod === "upi") {
      paymentLabel = `UPI (${upiApp} - ${upiId.trim()})`;
    } else if (paymentMethod === "card") {
      paymentLabel = `Credit/Debit Card (ending in ${cardNumber.slice(-4)})`;
    } else if (paymentMethod === "netbanking") {
      paymentLabel = "Net Banking";
    }

    // Demo order processing. Connect a real payment gateway
    // before accepting live online payments.
    setTimeout(() => {
      try {
        placeOrder({
          shippingAddress: address,
          paymentMethod: paymentLabel,
        });
      } finally {
        setIsProcessing(false);
      }
    }, 1200);
  };

  return (
    <div
      className="modal fade show d-block modal-backdrop-custom"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl checkout-modal-dialog">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="modal-header bg-light border-bottom px-4 py-3 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-shield-check text-brand fs-4" />

              <div>
                <h5 className="modal-title fw-bold m-0 text-wine">
                  Secure Checkout
                </h5>

                <small className="text-muted">
                  Ordering as{" "}
                  <span className="fw-semibold text-dark">
                    {user?.name || address.fullName || "Customer"}
                  </span>
                  {user?.email ? ` (${user.email})` : ""}
                </small>
              </div>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={() => setIsCheckoutOpen(false)}
              aria-label="Close"
              disabled={isProcessing}
            />
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div className="modal-body p-4">
              {formError && (
                <div
                  className="alert alert-danger py-2 px-3 small rounded-3 mb-3"
                  role="alert"
                >
                  <i className="bi bi-exclamation-triangle-fill me-1" />
                  {formError}
                </div>
              )}

              <div className="row g-4">
                {/* LEFT: Address and Payment */}
                <div className="col-lg-7">
                  {/* Shipping Address */}
                  <div className="checkout-card p-3 rounded-4 border mb-4 bg-white">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="step-badge">1</span>
                      <h6 className="fw-bold m-0">
                        Shipping &amp; Delivery Details
                      </h6>
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-sm-6">
                        <label
                          className="form-label small fw-semibold text-muted"
                          htmlFor="checkoutFullName"
                        >
                          Full Name
                        </label>

                        <input
                          id="checkoutFullName"
                          type="text"
                          name="fullName"
                          className="form-control form-control-sm"
                          autoComplete="name"
                          required
                          value={address.fullName}
                          onChange={handleAddressChange}
                          placeholder="Recipient Name"
                        />
                      </div>

                      <div className="col-sm-6">
                        <label
                          className="form-label small fw-semibold text-muted"
                          htmlFor="checkoutPhone"
                        >
                          Phone Number
                        </label>

                        <input
                          id="checkoutPhone"
                          type="tel"
                          name="phone"
                          className="form-control form-control-sm"
                          autoComplete="tel"
                          inputMode="numeric"
                          maxLength={10}
                          required
                          value={address.phone}
                          onChange={handleAddressChange}
                          placeholder="10-digit number"
                        />
                      </div>
                    </div>

                    <div className="mb-2">
                      <label
                        className="form-label small fw-semibold text-muted"
                        htmlFor="checkoutStreet"
                      >
                        Street Address / House No.
                      </label>

                      <input
                        id="checkoutStreet"
                        type="text"
                        name="street"
                        className="form-control form-control-sm"
                        autoComplete="street-address"
                        required
                        value={address.street}
                        onChange={handleAddressChange}
                        placeholder="Flat / Building, Area, Landmark"
                      />
                    </div>

                    <div className="row g-2 mb-2">
                      <div className="col-sm-4">
                        <label
                          className="form-label small fw-semibold text-muted"
                          htmlFor="checkoutCity"
                        >
                          City
                        </label>

                        <input
                          id="checkoutCity"
                          type="text"
                          name="city"
                          className="form-control form-control-sm"
                          autoComplete="address-level2"
                          required
                          value={address.city}
                          onChange={handleAddressChange}
                          placeholder="Hyderabad"
                        />
                      </div>

                      <div className="col-sm-4">
                        <label
                          className="form-label small fw-semibold text-muted"
                          htmlFor="checkoutState"
                        >
                          State
                        </label>

                        <input
                          id="checkoutState"
                          type="text"
                          name="state"
                          className="form-control form-control-sm"
                          autoComplete="address-level1"
                          required
                          value={address.state}
                          onChange={handleAddressChange}
                          placeholder="Telangana"
                        />
                      </div>

                      <div className="col-sm-4">
                        <label
                          className="form-label small fw-semibold text-muted"
                          htmlFor="checkoutPincode"
                        >
                          PIN Code
                        </label>

                        <input
                          id="checkoutPincode"
                          type="text"
                          name="pincode"
                          className="form-control form-control-sm"
                          autoComplete="postal-code"
                          inputMode="numeric"
                          maxLength={6}
                          required
                          value={address.pincode}
                          onChange={handleAddressChange}
                          placeholder="500001"
                        />
                      </div>
                    </div>

                    <div className="form-check mt-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="saveAddressCheck"
                        checked={saveAddress}
                        onChange={(event) =>
                          setSaveAddress(event.target.checked)
                        }
                      />

                      <label
                        className="form-check-label small text-muted"
                        htmlFor="saveAddressCheck"
                      >
                        Save this address for future orders
                      </label>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="checkout-card p-3 rounded-4 border bg-white">
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className="step-badge">2</span>
                      <h6 className="fw-bold m-0">
                        Select Payment Method
                      </h6>
                    </div>

                    <div className="d-flex flex-column gap-2">
                      {/* UPI */}
                      <div
                        className={`payment-option p-3 rounded-3 border ${
                          paymentMethod === "upi"
                            ? "border-brand bg-brand-light-subtle"
                            : ""
                        }`}
                      >
                        <label className="d-flex align-items-center justify-content-between gap-2 cursor-pointer">
                          <span className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              className="form-check-input mt-0"
                              checked={paymentMethod === "upi"}
                              onChange={() => setPaymentMethod("upi")}
                            />

                            <span className="fw-semibold">
                              UPI / Instant Transfer
                            </span>
                          </span>

                          <span className="badge bg-success-subtle text-success small">
                            Fastest
                          </span>
                        </label>

                        {paymentMethod === "upi" && (
                          <div className="pt-3 ps-4 border-top mt-3">
                            <p className="small text-muted mb-2">
                              Choose your preferred UPI app
                            </p>

                            {/* UPI app icons */}
                            <div className="d-flex gap-2 mb-3 flex-wrap">
                              {UPI_APPS.map((app) => {
                                const isSelected = upiApp === app.name;

                                return (
                                  <button
                                    type="button"
                                    key={app.name}
                                    className={`upi-app-button btn btn-sm ${
                                      isSelected
                                        ? "btn-success"
                                        : "btn-outline-secondary"
                                    }`}
                                    onClick={() => setUpiApp(app.name)}
                                    aria-pressed={isSelected}
                                  >
                                    {app.icon ? (
                                      <img
                                        src={app.icon}
                                        alt=""
                                        width="22"
                                        height="22"
                                        loading="lazy"
                                        className="upi-app-icon"
                                      />
                                    ) : (
                                      <i
                                        className={`bi ${app.bootstrapIcon} upi-app-icon-fallback`}
                                        aria-hidden="true"
                                      />
                                    )}

                                    <span>{app.name}</span>
                                  </button>
                                );
                              })}
                            </div>

                            <label
                              htmlFor="checkoutUpiId"
                              className="form-label small fw-semibold text-muted"
                            >
                              UPI ID
                            </label>

                            <input
                              id="checkoutUpiId"
                              type="text"
                              className="form-control form-control-sm"
                              placeholder="Enter UPI ID (e.g. mobile@upi)"
                              autoComplete="off"
                              value={upiId}
                              onChange={(event) =>
                                setUpiId(event.target.value)
                              }
                            />

                            <small className="text-muted d-block mt-2">
                              Selected app:{" "}
                              <strong>{upiApp}</strong>
                            </small>
                          </div>
                        )}
                      </div>

                      {/* Card */}
                      <div
                        className={`payment-option p-3 rounded-3 border ${
                          paymentMethod === "card"
                            ? "border-brand bg-brand-light-subtle"
                            : ""
                        }`}
                      >
                        <label className="d-flex align-items-center justify-content-between cursor-pointer">
                          <span className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              className="form-check-input mt-0"
                              checked={paymentMethod === "card"}
                              onChange={() => setPaymentMethod("card")}
                            />

                            <span className="fw-semibold">
                              Credit / Debit Card
                            </span>
                          </span>

                          <span className="d-flex gap-1 text-muted">
                            <i className="bi bi-credit-card fs-5" />
                          </span>
                        </label>

                        {paymentMethod === "card" && (
                          <div className="pt-3 ps-4 border-top mt-3">
                            <div className="mb-2">
                              <label
                                htmlFor="checkoutCardNumber"
                                className="form-label small text-muted"
                              >
                                Card Number
                              </label>

                              <input
                                id="checkoutCardNumber"
                                type="text"
                                inputMode="numeric"
                                autoComplete="cc-number"
                                className="form-control form-control-sm"
                                placeholder="16-digit card number"
                                maxLength={16}
                                value={cardNumber}
                                onChange={(event) =>
                                  setCardNumber(
                                    event.target.value
                                      .replace(/\D/g, "")
                                      .slice(0, 16)
                                  )
                                }
                              />
                            </div>

                            <div className="row g-2">
                              <div className="col-6">
                                <label
                                  htmlFor="checkoutCardExpiry"
                                  className="form-label small text-muted"
                                >
                                  Expiry
                                </label>

                                <input
                                  id="checkoutCardExpiry"
                                  type="text"
                                  autoComplete="cc-exp"
                                  className="form-control form-control-sm"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                  value={cardExpiry}
                                  onChange={(event) => {
                                    let value = event.target.value.replace(
                                      /\D/g,
                                      ""
                                    );

                                    if (value.length > 2) {
                                      value =
                                        value.slice(0, 2) +
                                        "/" +
                                        value.slice(2, 4);
                                    }

                                    setCardExpiry(value);
                                  }}
                                />
                              </div>

                              <div className="col-6">
                                <label
                                  htmlFor="checkoutCardCvv"
                                  className="form-label small text-muted"
                                >
                                  CVV
                                </label>

                                <input
                                  id="checkoutCardCvv"
                                  type="password"
                                  inputMode="numeric"
                                  autoComplete="cc-csc"
                                  className="form-control form-control-sm"
                                  placeholder="CVV"
                                  maxLength={4}
                                  value={cardCvv}
                                  onChange={(event) =>
                                    setCardCvv(
                                      event.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 4)
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <small className="text-muted d-block mt-2">
                              Card details should be processed through a
                              secure payment gateway in production.
                            </small>
                          </div>
                        )}
                      </div>

                      {/* Cash on Delivery */}
                      <div
                        className={`payment-option p-3 rounded-3 border ${
                          paymentMethod === "cod"
                            ? "border-brand bg-brand-light-subtle"
                            : ""
                        }`}
                      >
                        <label className="d-flex align-items-center justify-content-between cursor-pointer">
                          <span className="d-flex align-items-center gap-2">
                            <input
                              type="radio"
                              name="paymentMethod"
                              className="form-check-input mt-0"
                              checked={paymentMethod === "cod"}
                              onChange={() => setPaymentMethod("cod")}
                            />

                            <span>
                              <span className="fw-semibold">
                                Cash on Delivery (COD)
                              </span>

                              <small className="d-block text-muted">
                                Pay with cash or UPI upon delivery
                              </small>
                            </span>
                          </span>

                          <i className="bi bi-cash-stack fs-5 text-success" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT: Order Summary */}
                <div className="col-lg-5">
                  <div className="checkout-summary-card p-3 rounded-4 border bg-light h-100 d-flex flex-column justify-content-between">
                    <div>
                      <h6 className="fw-bold mb-3 d-flex justify-content-between align-items-center">
                        <span>Items in Order</span>

                        <span className="badge bg-white text-dark border">
                          {totalItems} items
                        </span>
                      </h6>

                      {/* Cart items */}
                      <div
                        className="checkout-items-list mb-3 d-flex flex-column gap-2 overflow-auto"
                        style={{ maxHeight: "240px" }}
                      >
                        {checkoutItems.map((item, index) => (
                          <div
                            key={
                              item.cartItemId ||
                              `${item.id}-${item.selectedSize || item.size || ""}-${index}`
                            }
                            className="p-2 bg-white rounded-3 border d-flex gap-2 align-items-center"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded"
                              style={{
                                width: "48px",
                                height: "48px",
                                objectFit: "cover",
                                flexShrink: 0,
                              }}
                            />

                            <div className="flex-grow-1 small min-w-0">
                              <div
                                className="fw-semibold text-truncate"
                                style={{ maxWidth: "180px" }}
                              >
                                {item.name}
                              </div>

                              <div className="text-muted small">
                                {item.selectedSize ||
                                  item.size ||
                                  item.selectedVariant?.label
                                  ? `Option: ${
                                      item.selectedSize ||
                                      item.size ||
                                      item.selectedVariant?.label
                                    }`
                                  : "Standard option"}
                                {" "}• Qty: {item.quantity}
                              </div>
                            </div>

                            <span className="fw-bold small text-brand text-nowrap">
                              {formatPrice(
                                parsePrice(item.price) * item.quantity
                              )}
                            </span>
                          </div>
                        ))}

                        {checkoutItems.length === 0 && (
                          <p className="text-muted small mb-0">
                            Your cart is empty.
                          </p>
                        )}
                      </div>

                      {/* Price breakdown */}
                      <div className="border-top pt-3">
                        <div className="d-flex justify-content-between text-muted small mb-1">
                          <span>Items Subtotal</span>
                          <span>{formatPrice(subtotal)}</span>
                        </div>

                        <div className="d-flex justify-content-between text-muted small mb-1">
                          <span>Standard Shipping</span>

                          <span>
                            {deliveryFee === 0 ? (
                              <strong className="text-success">
                                FREE
                              </strong>
                            ) : (
                              formatPrice(deliveryFee)
                            )}
                          </span>
                        </div>

                        <div className="d-flex justify-content-between text-muted small mb-2">
                          <span>Estimated Taxes &amp; Packaging</span>
                          <span className="text-success">Included</span>
                        </div>

                        <hr className="my-2" />

                        <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
                          <span className="fw-bold fs-6">
                            Total Payable
                          </span>

                          <span className="fs-4 fw-bold text-brand text-nowrap">
                            {formatPrice(totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Place Order */}
                    <div>
                      <button
                        type="submit"
                        className="btn btn-brand w-100 py-3 fw-bold rounded-pill shadow d-flex justify-content-center align-items-center gap-2"
                        disabled={isProcessing || checkoutItems.length === 0}
                      >
                        {isProcessing ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            />

                            <span>Processing Order...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-lock-fill" />

                            <span>
                              Place Order • {formatPrice(totalAmount)}
                            </span>
                          </>
                        )}
                      </button>

                      <p className="text-center text-muted small mt-2 mb-0">
                        <i className="bi bi-shield-check text-success me-1" />
                        Secure checkout experience
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
