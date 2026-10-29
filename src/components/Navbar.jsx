
import { useState, useEffect } from "react";
import {
  NavLink,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useShop } from "../context/ShopContext";

const links = [
  ["/", "Home"],
  ["/clothing", "Clothing"],
  ["/women-products", "Women Products"],
  ["/innerwear", "Inner Wear"],
  ["/skincare", "Skincare"],
  ["/dress-materials", "Dress Materials"],
  ["/stitching", "Stitching"],
  ["/gallery", "Gallery"],
  ["/about", "About Us"],
  ["/contact", "Contact"],
];

const categories = [
  ["all", "All Categories"],
  ["clothing", "Clothing"],
  ["women-products", "Women Products"],
  ["innerwear", "Inner Wear"],
  ["skincare", "Skincare"],
  ["dress-materials", "Dress Materials"],
];

const prices = [
  ["all", "Any Price"],
  ["0-499", "Under ₹500"],
  ["500-999", "₹500–₹999"],
  ["1000-1999", "₹1,000–₹1,999"],
  ["2000+", "₹2,000 & Above"],
];

export default function Navbar() {
  const {
    wishlistCount,
    cartCount,
    setIsWishlistOpen,
    setIsCartOpen,
    user,
    adminUser,
    openAuth,
    setIsProfileOpen,
  } = useShop();

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const [search, setSearch] = useState(
    params.get("search") || ""
  );

  const [category, setCategory] = useState(
    params.get("category") || "all"
  );

  const [price, setPrice] = useState(
    params.get("price") || "all"
  );

  // Keep search fields synchronized with URL changes.
  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);

    setSearch(currentParams.get("search") || "");
    setCategory(currentParams.get("category") || "all");
    setPrice(currentParams.get("price") || "all");
  }, [location.search, location.pathname]);

  const closeMobileMenu = () => {
    const nav = document.getElementById("nav");

    if (nav?.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

  const handleProfileClick = () => {
    closeMobileMenu();

    if (user) {
      setIsProfileOpen(true);
    } else {
      openAuth("login");
    }
  };

  const handleWishlistClick = () => {
    closeMobileMenu();
    setIsWishlistOpen(true);
  };

  const handleCartClick = () => {
    closeMobileMenu();
    setIsCartOpen(true);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const nextParams = new URLSearchParams();

    if (search.trim()) {
      nextParams.set("search", search.trim());
    }

    if (category !== "all") {
      nextParams.set("category", category);
    }

    if (price !== "all") {
      nextParams.set("price", price);
    }

    const targetPath =
      category !== "all"
        ? `/${category}`
        : location.pathname;

    const queryString = nextParams.toString();

    navigate(
      `${targetPath}${queryString ? `?${queryString}` : ""}`
    );

    closeMobileMenu();
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setPrice("all");
    navigate(location.pathname);
    closeMobileMenu();
  };

  const renderWishlist = () => (
    <button
      type="button"
      className="nav-action-btn position-relative"
      onClick={handleWishlistClick}
      aria-label="Open wishlist"
      title="Wishlist"
    >
      <i
        className={`bi ${
          wishlistCount > 0
            ? "bi-heart-fill text-danger"
            : "bi-heart"
        }`}
      />

      {wishlistCount > 0 && (
        <span className="nav-action-badge">
          {wishlistCount}
        </span>
      )}
    </button>
  );

  const renderCart = () => (
    <button
      type="button"
      className="nav-action-btn position-relative"
      onClick={handleCartClick}
      aria-label="Open shopping bag"
      title="Shopping Bag"
    >
      <i className="bi bi-bag" />

      {cartCount > 0 && (
        <span className="nav-action-badge">
          {cartCount}
        </span>
      )}
    </button>
  );

  const renderProfile = () => (
    <button
      type="button"
      className={`nav-profile-btn ${user ? "is-user" : ""}`}
      onClick={handleProfileClick}
      title={user ? "My Profile & Orders" : "Sign In"}
    >
      {user ? (
        <>
          <span className="avatar-chip">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </span>

          <span className="nav-user-name">
            {user.name?.split(" ")[0] || "Account"}
          </span>

          <i className="bi bi-chevron-down profile-chevron" />
        </>
      ) : (
        <>
          <i className="bi bi-person" />
          <span>Sign In</span>
        </>
      )}
    </button>
  );

  return (
    <header className="lvs-header">
          <nav className="navbar navbar-expand-lg site-nav">
          <div className="container lvs-navbar-container">

          {/* TOP ROW: BRAND, SEARCH AND ACTIONS */}
          <div className="navbar-top-row">

            {/* BRAND */}
            <Link
              className="navbar-brand brand"
              to="/"
              onClick={closeMobileMenu}
            >
              <span className="brand-mark">LVS</span>

              <span className="brand-copy">
                <span className="brand-title">
                  <strong>Laxmi</strong> Vara
                </span>

                <span className="brand-subtitle">
                  S I L K S
                </span>
              </span>
            </Link>

            {/* DESKTOP SEARCH BAR */}
            <form
              className="navbar-search-form"
              onSubmit={handleSearch}
            >
              <div className="navbar-search-box">
                <i className="bi bi-search search-icon" />

                <input
                  type="search"
                  className="navbar-search-input"
                  placeholder="Search sarees, clothing, skincare..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  aria-label="Search products"
                />

                <select
                  className="navbar-filter-select"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value)
                  }
                  aria-label="Filter by category"
                >
                  {categories.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                <select
                  className="navbar-filter-select price-filter"
                  value={price}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                  aria-label="Filter by price"
                >
                  {prices.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                <button
                  type="submit"
                  className="navbar-search-submit"
                >
                  Search
                </button>
              </div>
            </form>

            {/* DESKTOP WISHLIST, CART AND PROFILE */}
            <div className="navbar-desktop-actions">
              <Link
                to="/admin/dashboard"
                className="btn btn-sm btn-outline-brand rounded-pill px-3 py-1 d-none d-lg-inline-flex align-items-center gap-1"
                style={{ fontSize: "0.8rem", height: "36px" }}
                title="Admin Dashboard Portal"
              >
                <i className="bi bi-shield-lock" />
                <span>Admin</span>
                {adminUser && <span className="badge bg-success rounded-circle p-1 ms-1" style={{ width: 6, height: 6 }} />}
              </Link>
              {renderWishlist()}
              {renderCart()}
              {renderProfile()}
            </div>

            {/* MOBILE ACTIONS */}
            <div className="navbar-mobile-actions">
              {renderWishlist()}
              {renderCart()}

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#nav"
                aria-controls="nav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="bi bi-list" />
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH AND FILTERS */}
          <form
            className="navbar-mobile-search"
            onSubmit={handleSearch}
          >
            <div className="mobile-search-row">
              <i className="bi bi-search" />

              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Search products"
              />

              <button type="submit" aria-label="Search">
                <i className="bi bi-arrow-right" />
              </button>
            </div>

            <div className="mobile-filter-row">
              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                aria-label="Filter category"
              >
                {categories.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <select
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                aria-label="Filter price"
              >
                {prices.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="mobile-filter-clear"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </form>

          {/* NAVIGATION: ALL TABS BESIDE HOME */}
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav lvs-nav-links">
              {links.map(([to, label]) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    to={to}
                    end={to === "/"}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                    onClick={closeMobileMenu}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* MOBILE ACCOUNT SECTION */}
            <div className="mobile-account-section">
              {user ? (
                <div className="mobile-account-card">
                  <div className="d-flex align-items-center gap-2">
                    <span className="avatar-chip">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </span>

                    <div className="mobile-account-details">
                      <strong>
                        {user.name || "My Account"}
                      </strong>

                      <small>{user.email}</small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-brand btn-sm rounded-pill"
                    onClick={handleProfileClick}
                  >
                    My Account
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-brand rounded-pill w-100"
                  onClick={handleProfileClick}
                >
                  <i className="bi bi-person me-2" />
                  Sign In / Create Account
                </button>
              )}

              <div className="mt-3 pt-3 border-top">
                <Link
                  to="/admin/dashboard"
                  className="btn btn-outline-brand rounded-pill w-100 btn-sm d-flex align-items-center justify-content-center gap-2"
                  onClick={closeMobileMenu}
                >
                  <i className="bi bi-shield-lock" />
                  <span>Admin Dashboard Portal</span>
                  {adminUser && <span className="badge bg-success rounded-circle p-1 ms-1" style={{ width: 6, height: 6 }} />}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
