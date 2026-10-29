import { useShop } from "../context/ShopContext";
import { Link } from "react-router-dom";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    removeFromWishlist,
    moveWishlistToCart,
    clearWishlist,
    buyNow
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="drawer-overlay" onClick={() => setIsWishlistOpen(false)}>
      <aside
        className="drawer-panel"
        onClick={(e) => e.stopPropagation()}
        aria-label="Wishlist Drawer"
      >
        {/* Header */}
        <div className="drawer-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-heart-fill text-danger fs-5"></i>
            <h5 className="m-0 fw-bold">My Wishlist</h5>
            <span className="badge bg-secondary-subtle text-dark rounded-pill">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close"
          ></button>
        </div>

        {/* Body */}
        <div className="drawer-body p-3">
          {wishlist.length === 0 ? (
            <div className="text-center py-5">
              <div className="empty-icon-wrap mb-3 mx-auto">
                <i className="bi bi-heart text-muted display-4"></i>
              </div>
              <h5 className="fw-bold mb-2">Your Wishlist is Empty</h5>
              <p className="text-muted small mb-4">
                Explore our catalog and save your favorite styles to review or purchase later.
              </p>
              <button
                className="btn btn-brand px-4"
                onClick={() => setIsWishlistOpen(false)}
              >
                Explore Products
              </button>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
                <span className="text-muted small">Saved Items</span>
                <button
                  className="btn btn-link text-danger p-0 text-decoration-none small"
                  onClick={clearWishlist}
                >
                  Clear Wishlist
                </button>
              </div>

              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="drawer-item-card p-2 rounded-3 border d-flex gap-3 position-relative"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="drawer-item-img rounded-2"
                  />
                  <div className="flex-grow-1 d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between align-items-start pe-4">
                        <h6 className="item-title m-0 fw-semibold text-truncate-2">
                          {item.name}
                        </h6>
                      </div>
                      <div className="d-flex align-items-baseline gap-2 mt-1">
                        <span className="fw-bold text-brand">{item.price}</span>
                        {item.mrp && (
                          <small className="text-muted text-decoration-line-through">
                            {item.mrp}
                          </small>
                        )}
                        {item.offer && (
                          <span className="badge bg-success-subtle text-success small py-0">
                            {item.offer}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-brand btn-sm flex-grow-1 py-1"
                        onClick={() => moveWishlistToCart(item)}
                      >
                        <i className="bi bi-bag-plus me-1"></i> Move to Cart
                      </button>
                      <button
                        className="btn btn-outline-brand btn-sm py-1"
                        onClick={() => {
                          setIsWishlistOpen(false);
                          buyNow(item, 1, "M");
                        }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="btn btn-sm btn-light border-0 text-muted rounded-circle position-absolute top-0 end-0 m-1"
                    title="Remove from Wishlist"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="drawer-footer p-3 border-top bg-light">
            <button
              className="btn btn-outline-dark w-100"
              onClick={() => setIsWishlistOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
