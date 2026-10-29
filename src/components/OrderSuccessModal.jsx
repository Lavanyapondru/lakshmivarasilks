import { useShop, formatPrice } from "../context/ShopContext";

export default function OrderSuccessModal() {
  const {
    isOrderSuccessOpen,
    setIsOrderSuccessOpen,
    lastOrder,
    setIsProfileOpen
  } = useShop();

  if (!isOrderSuccessOpen || !lastOrder) return null;

  const viewInOrders = () => {
    setIsOrderSuccessOpen(false);
    setIsProfileOpen(true);
  };

  return (
    <div className="modal fade show d-block modal-backdrop-custom" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered order-success-dialog">
        <div className="modal-content rounded-4 border-0 shadow-lg text-center overflow-hidden">
          {/* Header Graphic */}
          <div className="order-success-hero p-4 text-white position-relative">
            <div className="success-icon-wrap mx-auto mb-3 shadow">
              <i className="bi bi-check-lg display-5 text-white"></i>
            </div>
            <h4 className="fw-bold mb-1">Order Placed Successfully!</h4>
            <p className="mb-0 text-white-50 small">
              Thank you for shopping with Laxmi Vara Silks.
            </p>
          </div>

          <div className="modal-body p-4 text-start">
            {/* Order details box */}
            <div className="bg-light p-3 rounded-3 border mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <span className="text-muted small">Order Reference</span>
                <span className="fw-bold text-dark">{lastOrder.id}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <span className="text-muted small">Estimated Delivery</span>
                <span className="fw-semibold text-success">
                  <i className="bi bi-truck me-1"></i>
                  {lastOrder.estimatedDelivery || "Within 3-4 days"}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
                <span className="text-muted small">Payment Method</span>
                <span className="fw-semibold text-dark small">{lastOrder.paymentMethod}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Amount Paid</span>
                <span className="fw-bold text-brand fs-5">{formatPrice(lastOrder.total)}</span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="p-3 border rounded-3 mb-3 bg-white">
              <span className="text-muted small fw-bold text-uppercase d-block mb-1">
                Delivering to:
              </span>
              <p className="m-0 fw-semibold text-dark small">
                {lastOrder.address?.fullName} ({lastOrder.address?.phone})
              </p>
              <p className="m-0 text-muted small">
                {lastOrder.address?.street}, {lastOrder.address?.city}, {lastOrder.address?.state} - {lastOrder.address?.pincode}
              </p>
            </div>

            {/* Ordered Items Preview */}
            <div className="mb-3">
              <span className="text-muted small fw-bold text-uppercase d-block mb-2">
                Items ({lastOrder.items.length})
              </span>
              <div className="d-flex flex-column gap-2" style={{ maxHeight: "140px", overflowY: "auto" }}>
                {lastOrder.items.map((item, idx) => (
                  <div key={idx} className="d-flex align-items-center gap-2 p-1 border-bottom">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "36px", height: "36px", objectFit: "cover", borderRadius: "6px" }}
                    />
                    <div className="flex-grow-1 small">
                      <div className="fw-semibold text-truncate" style={{ maxWidth: "230px" }}>
                        {item.name}
                      </div>
                      <small className="text-muted">Size: {item.size} • Qty: {item.quantity}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex flex-column gap-2 pt-2">
              <button
                className="btn btn-brand py-2 fw-bold rounded-pill"
                onClick={viewInOrders}
              >
                <i className="bi bi-box-seam me-1"></i> Track Order in Profile
              </button>
              <button
                className="btn btn-outline-secondary py-2 rounded-pill"
                onClick={() => setIsOrderSuccessOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
