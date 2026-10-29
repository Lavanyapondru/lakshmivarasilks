import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop, formatPrice, parsePrice } from "../../context/ShopContext";
import "./AdminDashboard.css";

// Sample presets for quick image selection when adding products
const SAMPLE_IMAGE_PRESETS = [
  {
    label: "Silk Saree",
    url: "https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/b/a/bandhej-printed-art-silk-anarkali-suit-in-purple-v1-krd2229.jpg"
  },
  {
    label: "Designer Kurti",
    url: "https://images.jdmagicbox.com/quickquotes/images_main/women-s-ethnic-wear-q50h11c1.jpg"
  },
  {
    label: "Handbag",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvQ7gPJo5iy9cpdLQD8JHr6hAO6ekA77-fD-ls4-mjA&s=10"
  },
  {
    label: "Glow Cream",
    url: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80"
  }
];
const normalizeCategory = (category) => {
  const value = String(category || "").trim().toLowerCase();

  const categoryAliases = {
    "innerwear & essentials": "innerwear",
    "innerwear and essentials": "innerwear",
    "women's clothing": "clothing",
    "womens clothing": "clothing",
    "skincare & essentials": "skincare",
    "dress materials & fabrics": "materials",
    "dress materials": "materials",
    "stitching services": "stitching",
    "women products": "womenProducts".toLowerCase(),
  };

  return categoryAliases[value] || value;
};
export default function AdminDashboard() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    updateStock,
    productAnalytics,
    resetProductsToDefault,
    adminUser,
    adminLogin,
    adminLogout,
    orders,
    updateOrderStatus,
    users,
    isFirebaseConnected
  } = useShop();

  const navigate = useNavigate();

  // Active navigation tab: 'analytics' | 'products' | 'upload' | 'orders' | 'customers'
  const [activeTab, setActiveTab] = useState("analytics");

  // Admin login credentials state
  const [adminEmailInput, setAdminEmailInput] = useState("admin@laxmivarasilks.com");
  const [adminPasswordInput, setAdminPasswordInput] = useState("Admin@123");
  const [loginError, setLoginError] = useState("");

  // Search & Filter state for Analytics & Products tabs
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("revenue_desc");

  // View state for Products tab: 'table' | 'grid'
  const [productsViewMode, setProductsViewMode] = useState("table");

  // Modal states
  const [editingProduct, setEditingProduct] = useState(null);
  const [deepDiveProduct, setDeepDiveProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // New product upload form state
  const initialUploadForm = {
    name: "",
    category: "clothing",
    subcategory: "ethnic",
    price: "1999",
    mrp: "3499",
    badge: "New",
    offer: "Flat 20% OFF",
    stock: 30,
    image: SAMPLE_IMAGE_PRESETS[0].url,
    description:
      "Handcrafted with fine artisan detailing, comfortable drape, and premium stitching designed for festive and everyday elegance."
  };
  const [uploadForm, setUploadForm] = useState(initialUploadForm);

  // Handle Admin Login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    const res = adminLogin(adminEmailInput, adminPasswordInput);
    if (!res.success) {
      setLoginError(res.error);
    }
  };

  const handleDemoLogin = () => {
    setAdminEmailInput("admin@laxmivarasilks.com");
    setAdminPasswordInput("Admin@123");
    setLoginError("");
    adminLogin("admin@laxmivarasilks.com", "Admin@123");
  };

  // Convert uploaded image file to Data URL
  const handleImageFileUpload = (e, target = "upload") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose a valid image file (PNG, JPG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      if (target === "upload") {
        setUploadForm((prev) => ({ ...prev, image: dataUrl }));
      } else if (target === "edit" && editingProduct) {
        setEditingProduct((prev) => ({ ...prev, image: dataUrl }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle upload form submission
 const handleUploadSubmit = (e) => {
  e.preventDefault();

  if (!uploadForm.name.trim()) {
    alert("Please enter a product title.");
    return;
  }

  if (
    uploadForm.price === "" ||
    Number(uploadForm.price) <= 0
  ) {
    alert("Please enter a valid selling price.");
    return;
  }

  if (!uploadForm.image?.trim()) {
    alert("Please select a product image or enter an image URL.");
    return;
  }

  const normalizedCategory = normalizeCategory(uploadForm.category);

  const newProduct = {
    ...uploadForm,
    name: uploadForm.name.trim(),
    category: normalizedCategory,
    subcategory: String(uploadForm.subcategory || "").trim().toLowerCase(),
    price: `₹${String(uploadForm.price).replace(/^₹/, "")}`,
    mrp: uploadForm.mrp
      ? `₹${String(uploadForm.mrp).replace(/^₹/, "")}`
      : "",
    stock: Math.max(0, Number(uploadForm.stock) || 0),
    image: uploadForm.image.trim(),
    isActive: true,
  };

  addProduct(newProduct);

  setUploadForm(initialUploadForm);
  setSearchQuery("");
  setCategoryFilter("all");
  setStockFilter("all");
  setActiveTab("products");
};

  // Handle saving product edits
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      name: editingProduct.name,
category: normalizeCategory(editingProduct.category),
      subcategory: editingProduct.subcategory,
      price: editingProduct.price,
      mrp: editingProduct.mrp,
      badge: editingProduct.badge,
      offer: editingProduct.offer,
      stock: Number(editingProduct.stock) || 0,
      image: editingProduct.image,
      description: editingProduct.description,
      isActive: editingProduct.isActive !== undefined ? editingProduct.isActive : true
    });

    setEditingProduct(null);
  };

  // --------------------------------------------------------------------------
  // Analytics Calculations
  // --------------------------------------------------------------------------
  const analyticsSummary = useMemo(() => {
    let totalRevenue = 0;
    let totalSold = 0;
    let totalViews = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    const categoryStats = {};

    products.forEach((prod) => {
      const stat = productAnalytics[prod.id] || { views: 0, sales: 0, revenue: 0 };
      const numericPrice = parsePrice(prod.price);
      const rev = stat.revenue || stat.sales * numericPrice;

      totalRevenue += rev;
      totalSold += stat.sales || 0;
      totalViews += stat.views || 0;

      const stock = prod.stock ?? 25;
      if (stock === 0) outOfStockCount++;
      else if (stock <= 10) lowStockCount++;

      const cat = prod.category || "other";
      if (!categoryStats[cat]) {
        categoryStats[cat] = { revenue: 0, sales: 0, count: 0 };
      }
      categoryStats[cat].revenue += rev;
      categoryStats[cat].sales += stat.sales || 0;
      categoryStats[cat].count += 1;
    });

    return {
      totalRevenue,
      totalSold,
      totalViews,
      lowStockCount,
      outOfStockCount,
      categoryStats,
      totalCatalog: products.length,
      activeCatalog: products.filter((p) => p.isActive !== false).length
    };
  }, [products, productAnalytics]);

  // Filtered & Sorted Products for Analytics and Manage tables
  const filteredProducts = useMemo(() => {
  const filtered = products.filter((p) => {
    // Search by name, category, or product ID
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      const matchesName = String(p.name || "")
        .toLowerCase()
        .includes(query);

      const matchesCategory = String(p.category || "")
        .toLowerCase()
        .includes(query);

      const matchesSubcategory = String(p.subcategory || "")
        .toLowerCase()
        .includes(query);

      const matchesId = String(p.id || "")
        .toLowerCase()
        .includes(query);

      if (
        !matchesName &&
        !matchesCategory &&
        !matchesSubcategory &&
        !matchesId
      ) {
        return false;
      }
    }

    // Normalize both saved and selected categories
    const productCategory = normalizeCategory(p.category);
    const selectedCategory = normalizeCategory(categoryFilter);

    const productSubcategory = normalizeCategory(p.subcategory);

    // A category filter can target either a top-level category (e.g. Innerwear)
    // or a subcategory (e.g. Sarees, Bras, Camisoles).
    if (
      selectedCategory !== "all" &&
      productCategory !== selectedCategory &&
      productSubcategory !== selectedCategory
    ) {
      return false;
    }

    // Stock filter
    const stock = Number(p.stock ?? 25);

    if (stockFilter === "low" && (stock > 10 || stock === 0)) {
      return false;
    }

    if (stockFilter === "out" && stock > 0) {
      return false;
    }

    if (stockFilter === "in" && stock <= 10) {
      return false;
    }

    return true;
  });

  // Sorting
  return filtered.sort((a, b) => {
    const statA = productAnalytics[a.id] || {
      views: 0,
      sales: 0,
      revenue: 0,
    };

    const statB = productAnalytics[b.id] || {
      views: 0,
      sales: 0,
      revenue: 0,
    };

    const priceA = parsePrice(a.price);
    const priceB = parsePrice(b.price);

    const revenueA =
      statA.revenue || statA.sales * priceA;

    const revenueB =
      statB.revenue || statB.sales * priceB;

    switch (sortBy) {
      case "revenue_desc":
        return revenueB - revenueA;

      case "revenue_asc":
        return revenueA - revenueB;

      case "sales_desc":
        return (statB.sales || 0) - (statA.sales || 0);

      case "views_desc":
        return (statB.views || 0) - (statA.views || 0);

      case "stock_asc":
        return (a.stock ?? 25) - (b.stock ?? 25);

      case "stock_desc":
        return (b.stock ?? 25) - (a.stock ?? 25);

      case "price_desc":
        return priceB - priceA;

      case "price_asc":
        return priceA - priceB;

      default:
        return 0;
    }
  });
}, [
  products,
  productAnalytics,
  searchQuery,
  categoryFilter,
  stockFilter,
  sortBy,
]);
  // --------------------------------------------------------------------------
  // If Admin is NOT logged in: Render Dedicated Admin Login Portal
  // --------------------------------------------------------------------------
  if (!adminUser) {
    return (
      <div className="admin-wrapper d-flex align-items-center justify-content-center py-5">
        <div className="container" style={{ maxWidth: "460px" }}>
          <div className="admin-card text-center p-4 p-md-5 shadow-lg border-0 rounded-4 bg-white">
            <div className="admin-brand-mark mx-auto mb-3" style={{ width: 62, height: 62, fontSize: "1.9rem" }}>
              LVS
            </div>

            <h3 className="fw-bold mb-1" style={{ color: "var(--admin-wine-dark)", fontFamily: "Playfair Display, serif" }}>
              Store Admin Portal
            </h3>
            <p className="text-muted small mb-4">
              Sign in to manage Laxmi Vara Silks products, real-time analytics, and customer orders.
            </p>

            {loginError && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 text-start">
                <i className="bi bi-exclamation-triangle-fill me-2" />
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="text-start">
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Admin Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-shield-lock text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0"
                    value={adminEmailInput}
                    onChange={(e) => setAdminEmailInput(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-key text-muted" />
                  </span>
                  <input
                    type="password"
                    className="form-control border-start-0"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-brand w-100 py-2 fw-bold rounded-pill mb-3 shadow-sm"
                style={{ background: "var(--admin-wine)", border: "none" }}
              >
                <i className="bi bi-box-arrow-in-right me-2" />
                Sign In to Dashboard
              </button>

              {/* Demo Fill Button */}
              <div className="p-3 rounded-3 bg-light border text-center mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge bg-secondary-subtle text-dark">Quick Test</span>
                  <small className="text-muted">Demo Credentials</small>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-brand btn-sm w-100 fw-bold rounded-pill"
                  onClick={handleDemoLogin}
                >
                  <i className="bi bi-lightning-charge-fill text-warning me-1" />
                  One-Click Demo Admin Login
                </button>
                <small className="text-muted d-block mt-2" style={{ fontSize: "0.74rem" }}>
                  admin@laxmivarasilks.com • Admin@123
                </small>
              </div>

              <div className="text-center">
                <Link to="/" className="text-decoration-none small text-muted">
                  <i className="bi bi-arrow-left me-1" />
                  Back to Customer Store
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // Main Authenticated Admin Dashboard Layout
  // --------------------------------------------------------------------------
  return (
    <div className="admin-wrapper">
      {/* TOP HEADER BAR */}
      <header className="admin-topbar">
        <div className="admin-topbar-container">
          {/* Brand */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/" className="admin-brand">
              <span className="admin-brand-mark">LVS</span>
              <div>
                <h1 className="admin-brand-title">Laxmi Vara Silks</h1>
                <span className="admin-portal-badge">Admin Dashboard</span>
              </div>
            </Link>

            <span className="admin-live-chip d-none d-md-inline-flex">
              <span className="pulse-dot" />
              Store Online • {analyticsSummary.activeCatalog} Live Products
            </span>

            <span
              className="badge rounded-pill d-none d-lg-inline-flex align-items-center gap-1 px-3 py-2"
              style={{
                background: isFirebaseConnected ? "#fef3c7" : "#f1f5f9",
                color: isFirebaseConnected ? "#92400e" : "#475569",
                border: isFirebaseConnected ? "1px solid #fde68a" : "1px solid #cbd5e1",
                fontSize: "0.74rem"
              }}
              title="Firebase Project: lvssilks (Firestore & Storage active)"
            >
              <i className="bi bi-fire text-danger" />
              {isFirebaseConnected ? "Firebase Cloud Live (lvssilks)" : "Firebase Configured (lvssilks)"}
            </span>
          </div>

          {/* Actions */}
          <div className="admin-topbar-actions">
            <Link to="/shop" target="_blank" className="btn-store-view" title="Opens user-facing website in new tab">
              <i className="bi bi-eye" />
              <span>View Customer Store</span>
            </Link>

            <div className="admin-user-pill">
              <span className="admin-avatar">A</span>
              <div className="d-none d-sm-block text-start">
                <strong className="d-block text-wine" style={{ fontSize: "0.82rem", lineHeight: 1.1 }}>
                  Store Admin
                </strong>
                <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                  admin@laxmivarasilks.com
                </small>
              </div>
            </div>

            <button type="button" className="btn-admin-logout" onClick={adminLogout} title="Sign out of admin portal">
              <i className="bi bi-box-arrow-right" />
              <span className="d-none d-sm-inline">Logout</span>
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="admin-nav-bar">
          <div className="admin-tabs-list">
            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <i className="bi bi-graph-up-arrow" />
              <span>Product Analytics</span>
              <span className="admin-tab-count">{products.length} Items</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <i className="bi bi-box-seam" />
              <span>Manage & Edit Products</span>
              <span className="admin-tab-count">{products.length}</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "upload" ? "active" : ""}`}
              onClick={() => setActiveTab("upload")}
            >
              <i className="bi bi-cloud-arrow-up-fill" />
              <span>Upload New Product</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="bi bi-truck" />
              <span>Orders & Fulfilment</span>
              <span className="admin-tab-count">{orders.length}</span>
            </button>

            <button
              type="button"
              className={`admin-tab-btn ${activeTab === "customers" ? "active" : ""}`}
              onClick={() => setActiveTab("customers")}
            >
              <i className="bi bi-people" />
              <span>Customer Profiles</span>
              <span className="admin-tab-count">{users.length}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* DASHBOARD BODY CONTENT */}
      <main className="container-fluid px-3 px-md-4 pt-0">
        {/* ================================================================= */}
        {/* TAB 1: PRODUCT ANALYTICS */}
        {/* ================================================================= */}
        {activeTab === "analytics" && (
          <div>
            {/* KPI METRIC CARDS ROW */}
            <div className="row g-3 mb-4">
              <div className="col-6 col-lg-3">
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <p className="kpi-label">Total Product Revenue</p>
                    <div className="kpi-icon-box kpi-icon-wine">
                      <i className="bi bi-currency-rupee" />
                    </div>
                  </div>
                  <h3 className="kpi-value">{formatPrice(analyticsSummary.totalRevenue)}</h3>
                  <p className="kpi-subtext text-success">
                    <i className="bi bi-arrow-up-right" /> From all product sales
                  </p>
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <p className="kpi-label">Units Sold</p>
                    <div className="kpi-icon-box kpi-icon-green">
                      <i className="bi bi-bag-check" />
                    </div>
                  </div>
                  <h3 className="kpi-value">{analyticsSummary.totalSold.toLocaleString()}</h3>
                  <p className="kpi-subtext">Across {products.length} products</p>
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <p className="kpi-label">Catalog Views</p>
                    <div className="kpi-icon-box kpi-icon-blue">
                      <i className="bi bi-eye" />
                    </div>
                  </div>
                  <h3 className="kpi-value">{analyticsSummary.totalViews.toLocaleString()}</h3>
                  <p className="kpi-subtext">Live impressions on store</p>
                </div>
              </div>

              <div className="col-6 col-lg-3">
                <div className="kpi-card">
                  <div className="kpi-card-header">
                    <p className="kpi-label">Stock Status</p>
                    <div className="kpi-icon-box kpi-icon-amber">
                      <i className="bi bi-exclamation-triangle" />
                    </div>
                  </div>
                  <h3 className="kpi-value text-danger">
                    {analyticsSummary.lowStockCount + analyticsSummary.outOfStockCount}
                  </h3>
                  <p className="kpi-subtext text-danger">
                    {analyticsSummary.lowStockCount} Low • {analyticsSummary.outOfStockCount} Out
                  </p>
                </div>
              </div>
            </div>

            {/* CATEGORY REVENUE BREAKDOWN STRIP */}
            <div className="admin-card mb-4">
              <div className="admin-card-header">
                <h5 className="admin-card-title">
                  <i className="bi bi-pie-chart text-wine" />
                  Category Analytics Performance
                </h5>
                <span className="small text-muted">Real-time revenue and unit distribution</span>
              </div>
              <div className="admin-card-body p-3">
                <div className="row g-3">
                  {Object.entries(analyticsSummary.categoryStats).map(([cat, stats]) => (
                    <div className="col-6 col-md-4 col-xl-2" key={cat}>
                      <div className="p-3 rounded-3 border bg-light text-center">
                        <span className="badge rounded-pill bg-brand mb-1 text-capitalize">{cat}</span>
                        <h6 className="fw-bold m-0 text-wine">{formatPrice(stats.revenue)}</h6>
                        <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>
                          {stats.sales} sold • {stats.count} items
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PRODUCT ANALYTICS TABLE */}
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h5 className="admin-card-title">
                    <i className="bi bi-bar-chart-line-fill text-wine" />
                    Every Product Analytics Breakdown
                  </h5>
                  <small className="text-muted">
                    Showing {filteredProducts.length} of {products.length} products
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-brand rounded-pill"
                    onClick={() => setActiveTab("upload")}
                  >
                    <i className="bi bi-plus-lg me-1" />
                    Add Product
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-light rounded-pill border"
                    onClick={resetProductsToDefault}
                    title="Reset catalogue to default seed"
                  >
                    <i className="bi bi-arrow-clockwise me-1" />
                    Reset Catalog
                  </button>
                </div>
              </div>

              {/* Filter Controls */}
              <div className="admin-filter-bar">
                <div className="admin-search-input">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    placeholder="Search product by title, category, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  className="admin-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="womenProducts">Women Products</option>
                  <option value="skincare">Skincare</option>
                  <option value="materials">Dress Materials</option>
                  <option value="innerwear">Innerwear & Essentials</option>
                  <option value="sarees">Sarees</option>
                  <option value="ethnic">Ethnic Wear</option>
                  <option value="western">Western Wear</option>
                  <option value="lounge">Lounge Wear</option>
                  <option value="personal">Nightwear</option>
                  <option value="kids">Kids Wear</option>
                  <option value="bra">Bras</option>
                  <option value="panties">Panties</option>
                  <option value="sets">Lingerie Sets</option>
                  <option value="shapewear">Shapewear</option>
                  <option value="sportswear">Sportswear</option>
                  <option value="camisoles">Camisoles</option>
                  <option value="footwear">Footwear</option>
                  <option value="beauty">Beauty</option>
                  <option value="accessories">Handbags & Accessories</option>
                  <option value="watches">Watches</option>
                </select>

                <select
                  className="admin-select"
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                >
                  <option value="all">All Stock Status</option>
                  <option value="in">In Stock (&gt;10)</option>
                  <option value="low">Low Stock (1-10)</option>
                  <option value="out">Out of Stock (0)</option>
                </select>

                <select
                  className="admin-select ms-auto"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="revenue_desc">Highest Revenue</option>
                  <option value="revenue_asc">Lowest Revenue</option>
                  <option value="sales_desc">Most Units Sold</option>
                  <option value="views_desc">Most Viewed</option>
                  <option value="stock_asc">Lowest Stock First</option>
                  <option value="price_desc">Highest Price</option>
                </select>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price / MRP</th>
                      <th>Stock Level</th>
                      <th>Views</th>
                      <th>Units Sold</th>
                      <th>Total Revenue</th>
                      <th>Conversion</th>
                      <th>Rating</th>
                      <th>Store Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((prod) => {
                      const stat = productAnalytics[prod.id] || { views: 0, sales: 0, revenue: 0 };
                      const numericPrice = parsePrice(prod.price);
                      const revenue = stat.revenue || stat.sales * numericPrice;
                      const conversionRate =
                        stat.views > 0 ? ((stat.sales / stat.views) * 100).toFixed(1) : "0.0";
                      const stock = prod.stock ?? 25;

                      return (
                        <tr key={prod.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="prod-thumb-sm shadow-sm"
                                onError={(e) => {
                                  e.target.src = SAMPLE_IMAGE_PRESETS[0].url;
                                }}
                              />
                              <div>
                                <strong
                                  className="d-block text-truncate"
                                  style={{ maxWidth: "220px", color: "var(--admin-ink)" }}
                                  title={prod.name}
                                >
                                  {prod.name}
                                </strong>
                                <small className="text-muted">ID: #{prod.id}</small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="badge bg-light text-dark border text-capitalize">
                              {prod.category} {prod.subcategory ? `• ${prod.subcategory}` : ""}
                            </span>
                          </td>

                          <td>
                            <strong className="text-wine">{prod.price}</strong>
                            {prod.mrp && (
                              <small className="text-muted text-decoration-line-through d-block">
                                {prod.mrp}
                              </small>
                            )}
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              {stock === 0 ? (
                                <span className="stock-badge-out">Out of Stock</span>
                              ) : stock <= 10 ? (
                                <span className="stock-badge-low">{stock} Low</span>
                              ) : (
                                <span className="stock-badge-good">{stock} in stock</span>
                              )}

                              <div className="btn-group btn-group-sm">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary py-0 px-1"
                                  onClick={() => updateStock(prod.id, Math.max(0, stock - 1))}
                                  title="Reduce stock by 1"
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary py-0 px-1"
                                  onClick={() => updateStock(prod.id, stock + 5)}
                                  title="Add 5 units"
                                >
                                  +5
                                </button>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="fw-semibold">
                              <i className="bi bi-eye text-muted me-1" />
                              {stat.views.toLocaleString()}
                            </span>
                          </td>

                          <td>
                            <span className="fw-semibold text-dark">
                              <i className="bi bi-bag-check text-success me-1" />
                              {stat.sales.toLocaleString()}
                            </span>
                          </td>

                          <td>
                            <strong className="text-wine fs-6">{formatPrice(revenue)}</strong>
                          </td>

                          <td>
                            <span
                              className={`badge rounded-pill ${
                                Number(conversionRate) >= 5
                                  ? "bg-success-subtle text-success"
                                  : Number(conversionRate) >= 2
                                  ? "bg-primary-subtle text-primary"
                                  : "bg-secondary-subtle text-muted"
                              }`}
                            >
                              {conversionRate}%
                            </span>
                          </td>

                          <td>
                            <span className="rate-badge">
                              <i className="bi bi-star-fill text-warning" />
                              {prod.rating || "4.8"}
                            </span>
                          </td>

                          <td>
                            <button
                              type="button"
                              className={`btn btn-sm rounded-pill px-2 py-0 ${
                                prod.isActive !== false ? "btn-success" : "btn-secondary"
                              }`}
                              style={{ fontSize: "0.72rem" }}
                              onClick={() => toggleProductStatus(prod.id)}
                              title="Click to toggle store visibility"
                            >
                              {prod.isActive !== false ? "Live" : "Hidden"}
                            </button>
                          </td>

                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-1">
                              <button
                                type="button"
                                className="btn-action-icon"
                                onClick={() => setDeepDiveProduct(prod)}
                                title="View deep-dive analytics"
                              >
                                <i className="bi bi-graph-up" />
                              </button>

                              <button
                                type="button"
                                className="btn-action-icon"
                                onClick={() => setEditingProduct(prod)}
                                title="Edit Product details & images"
                              >
                                <i className="bi bi-pencil" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: MANAGE & EDIT PRODUCTS */}
        {/* ================================================================= */}
        {activeTab === "products" && (
          <div>
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h5 className="admin-card-title">
                    <i className="bi bi-boxes text-wine" />
                    Product Catalogue & Live Editor
                  </h5>
                  <small className="text-muted">
                    Any change made here immediately appears on the customer website
                  </small>
                </div>

                <div className="d-flex gap-2">
                  <div className="btn-group btn-group-sm">
                    <button
                      type="button"
                      className={`btn ${productsViewMode === "table" ? "btn-brand" : "btn-light"}`}
                      onClick={() => setProductsViewMode("table")}
                    >
                      <i className="bi bi-list-ul" />
                    </button>
                    <button
                      type="button"
                      className={`btn ${productsViewMode === "grid" ? "btn-brand" : "btn-light"}`}
                      onClick={() => setProductsViewMode("grid")}
                    >
                      <i className="bi bi-grid-fill" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-brand rounded-pill"
                    onClick={() => setActiveTab("upload")}
                  >
                    <i className="bi bi-cloud-arrow-up me-1" />
                    Upload Product
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="admin-filter-bar">
                <div className="admin-search-input">
                  <i className="bi bi-search" />
                  <input
                    type="text"
                    placeholder="Search product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  className="admin-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="clothing">Clothing</option>
                  <option value="womenProducts">Women Products</option>
                  <option value="skincare">Skincare</option>
                  <option value="materials">Dress Materials</option>
                  <option value="innerwear">Innerwear</option>
                </select>

                <select
                  className="admin-select"
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                >
                  <option value="all">All Stocks</option>
                  <option value="in">In Stock</option>
                  <option value="low">Low Stock (&le;10)</option>
                  <option value="out">Out of Stock (0)</option>
                </select>
              </div>

              {/* Grid or Table View */}
              {productsViewMode === "grid" ? (
                <div className="admin-card-body">
                  <div className="row g-4">
                    {filteredProducts.map((prod) => (
                      <div className="col-12 col-sm-6 col-md-4 col-xl-3" key={prod.id}>
                        <div className="product-card border rounded-4 overflow-hidden position-relative h-100 bg-white shadow-sm">
                          {/* Image */}
                          <div style={{ height: "230px", overflow: "hidden", position: "relative" }}>
                            <img
                              src={prod.image}
                              alt={prod.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={(e) => {
                                e.target.src = SAMPLE_IMAGE_PRESETS[0].url;
                              }}
                            />
                            {prod.badge && (
                              <span className="product-badge position-absolute top-0 start-0 m-2">
                                {prod.badge}
                              </span>
                            )}
                            <span
                              className={`badge rounded-pill position-absolute top-0 end-0 m-2 ${
                                prod.isActive !== false ? "bg-success" : "bg-secondary"
                              }`}
                            >
                              {prod.isActive !== false ? "Live" : "Draft"}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                            <div>
                              <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                                {prod.category} • {prod.subcategory || "general"}
                              </small>
                              <h6 className="fw-bold my-1 text-truncate" title={prod.name}>
                                {prod.name}
                              </h6>
                              <div className="d-flex align-items-baseline gap-2 mb-2">
                                <strong className="text-wine fs-5">{prod.price}</strong>
                                {prod.mrp && (
                                  <small className="text-muted text-decoration-line-through">
                                    {prod.mrp}
                                  </small>
                                )}
                              </div>
                            </div>

                            <div>
                              <div className="d-flex justify-content-between align-items-center py-2 border-top border-bottom mb-3">
                                <small className="text-muted">Stock Quantity:</small>
                                <span className="fw-bold">{prod.stock ?? 25} units</span>
                              </div>

                              <div className="d-flex gap-2">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-brand flex-grow-1 rounded-pill"
                                  onClick={() => setEditingProduct(prod)}
                                >
                                  <i className="bi bi-pencil me-1" />
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger rounded-pill px-3"
                                  onClick={() => setDeleteConfirmId(prod.id)}
                                  title="Delete product"
                                >
                                  <i className="bi bi-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product Info</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>MRP</th>
                        <th>Stock Units</th>
                        <th>Store Visibility</th>
                        <th className="text-end">Manage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="prod-thumb-sm shadow-sm"
                                onError={(e) => {
                                  e.target.src = SAMPLE_IMAGE_PRESETS[0].url;
                                }}
                              />
                              <div>
                                <strong className="d-block text-truncate" style={{ maxWidth: "260px" }}>
                                  {prod.name}
                                </strong>
                                <small className="text-muted">ID: #{prod.id}</small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="badge bg-light text-dark border text-capitalize">
                              {prod.category} / {prod.subcategory || "all"}
                            </span>
                          </td>

                          <td>
                            <strong className="text-wine">{prod.price}</strong>
                          </td>

                          <td>
                            <span className="text-muted text-decoration-line-through">
                              {prod.mrp || "N/A"}
                            </span>
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-bold">{prod.stock ?? 25}</span>
                              <div className="btn-group btn-group-sm">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary py-0 px-2"
                                  onClick={() => updateStock(prod.id, Math.max(0, (prod.stock ?? 25) - 1))}
                                >
                                  -
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary py-0 px-2"
                                  onClick={() => updateStock(prod.id, (prod.stock ?? 25) + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </td>

                          <td>
                            <button
                              type="button"
                              className={`btn btn-sm rounded-pill ${
                                prod.isActive !== false ? "btn-success" : "btn-secondary"
                              }`}
                              style={{ fontSize: "0.74rem" }}
                              onClick={() => toggleProductStatus(prod.id)}
                            >
                              {prod.isActive !== false ? (
                                <>
                                  <i className="bi bi-eye-fill me-1" />
                                  Live in Store
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-eye-slash-fill me-1" />
                                  Hidden
                                </>
                              )}
                            </button>
                          </td>

                          <td className="text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                type="button"
                                className="btn-action-icon"
                                onClick={() => setEditingProduct(prod)}
                                title="Edit Product"
                              >
                                <i className="bi bi-pencil-square" />
                              </button>
                              <button
                                type="button"
                                className="btn-action-icon btn-action-delete"
                                onClick={() => setDeleteConfirmId(prod.id)}
                                title="Delete Product"
                              >
                                <i className="bi bi-trash" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: UPLOAD PRODUCT (WITH LIVE CUSTOMER PREVIEW) */}
        {/* ================================================================= */}
        {activeTab === "upload" && (
          <div className="row g-4">
            {/* Left Column: Upload Form */}
            <div className="col-12 col-lg-7">
              <div className="upload-form-box">
                <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3">
                  <div>
                    <h4 className="fw-bold m-0" style={{ fontFamily: "Playfair Display, serif", color: "var(--admin-wine)" }}>
                      Upload New Product
                    </h4>
                    <small className="text-muted">
                      Add a new product with photos and live customer preview
                    </small>
                  </div>
                  <span className="badge rounded-pill bg-brand px-3 py-2">
                    <i className="bi bi-cloud-arrow-up me-1" />
                    Admin Creator
                  </span>
                </div>

                <form onSubmit={handleUploadSubmit}>
                  {/* Product Title */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold">Product Title / Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Royal Kanjeevaram Soft Silk Saree with Zari Pallu"
                      value={uploadForm.name}
                      onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Category & Subcategory */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Primary Category *</label>
                      <select
                        className="form-select"
                        value={uploadForm.category}
                        onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                        required
                      >
                        <option value="clothing">Women’s Clothing</option>
                        <option value="womenProducts">Women Products (Footwear / Beauty)</option>
                        <option value="skincare">Skincare & Essentials</option>
                        <option value="materials">Dress Materials & Fabrics</option>
                        <option value="innerwear">Innerwear & Essentials</option>
                        <option value="stitching">Stitching Services</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Subcategory / Style *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. ethnic, sarees, western, lounge, Footwear"
                        value={uploadForm.subcategory}
                        onChange={(e) => setUploadForm({ ...uploadForm, subcategory: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Pricing & Stock */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Selling Price (₹) *</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="1999"
                          value={uploadForm.price}
                          onChange={(e) => setUploadForm({ ...uploadForm, price: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold">MRP / Original (₹)</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="3499"
                          value={uploadForm.mrp}
                          onChange={(e) => setUploadForm({ ...uploadForm, mrp: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label small fw-bold">Initial Stock Units *</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="30"
                        value={uploadForm.stock}
                        onChange={(e) => setUploadForm({ ...uploadForm, stock: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Badges & Offers */}
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Product Badge</label>
                      <select
                        className="form-select"
                        value={uploadForm.badge}
                        onChange={(e) => setUploadForm({ ...uploadForm, badge: e.target.value })}
                      >
                        <option value="New">New Arrival</option>
                        <option value="Bestseller">Bestseller</option>
                        <option value="Popular">Popular</option>
                        <option value="Trending">Trending</option>
                        <option value="Special">Special Edition</option>
                        <option value="Comfort">Comfort Essential</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Special Offer Tag</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Buy 1 Get 1, Flat 25% OFF"
                        value={uploadForm.offer}
                        onChange={(e) => setUploadForm({ ...uploadForm, offer: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* IMAGE UPLOAD & PRESETS */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Product Image / Picture *</label>

                    {/* Option 1: File Upload */}
                    <div className="image-dropzone mb-3">
                      <i className="bi bi-cloud-arrow-up display-6 text-wine mb-2 d-block" />
                      <p className="fw-semibold mb-1" style={{ fontSize: "0.9rem" }}>
                        Click to upload photo from your device
                      </p>
                      <small className="text-muted d-block mb-3">
                        Accepts JPG, PNG, WEBP (automatically converted for instant web display)
                      </small>
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control form-control-sm mx-auto"
                        style={{ maxWidth: "280px" }}
                        onChange={(e) => handleImageFileUpload(e, "upload")}
                      />
                    </div>

                    {/* Option 2: Image URL */}
                    <div className="mb-3">
                      <label className="form-label small text-muted">Or paste direct Image URL:</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bi bi-link-45deg" />
                        </span>
                        <input
                          type="url"
                          className="form-control"
                          placeholder="https://..."
                          value={uploadForm.image}
                          onChange={(e) => setUploadForm({ ...uploadForm, image: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Option 3: Presets */}
                    <div>
                      <small className="form-label small text-muted d-block mb-2">
                        Or pick a boutique sample preset:
                      </small>
                      <div className="d-flex gap-2">
                        {SAMPLE_IMAGE_PRESETS.map((preset) => (
                          <div
                            key={preset.label}
                            className={`sample-img-chip ${uploadForm.image === preset.url ? "selected" : ""}`}
                            onClick={() => setUploadForm({ ...uploadForm, image: preset.url })}
                            title={preset.label}
                          >
                            <img src={preset.url} alt={preset.label} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold">Product Description & Details</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="Describe the fabric, design details, weave, styling recommendations..."
                      value={uploadForm.description}
                      onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-brand w-100 py-3 rounded-pill fw-bold shadow-sm"
                    style={{ background: "var(--admin-wine)", border: "none" }}
                  >
                    <i className="bi bi-check2-circle me-2" />
                    Upload & Publish to Customer Store
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Live Store Card Preview */}
            <div className="col-12 col-lg-5">
              <div className="upload-preview-box">
                <span className="preview-badge-chip">
                  <i className="bi bi-eye-fill me-1" />
                  Live Customer Preview
                </span>
                <p className="text-muted small mb-3">
                  This is exactly how shoppers will see this product on the website.
                </p>

                {/* Preview Product Card */}
                <div className="product-card border rounded-4 overflow-hidden shadow bg-white">
                  <div style={{ height: "723px", position: "relative", overflow: "hidden" }}>
                    <img
                      src={uploadForm.image || SAMPLE_IMAGE_PRESETS[0].url}
                      alt={uploadForm.name || "Preview"}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = SAMPLE_IMAGE_PRESETS[0].url;
                      }}
                    />
                    {uploadForm.badge && (
                      <span className="product-badge position-absolute top-0 start-0 m-2">
                        {uploadForm.badge}
                      </span>
                    )}
                    <span className="heart-btn position-absolute top-0 end-0 m-2">
                      <i className="bi bi-heart text-danger" />
                    </span>
                  </div>

                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="text-muted text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                        {uploadForm.category} • {uploadForm.subcategory}
                      </small>
                      <span className="rate-badge">
                        <i className="bi bi-star-fill text-warning" /> 4.9
                      </span>
                    </div>

                    <h5 className="fw-bold my-1" style={{ color: "var(--admin-wine-dark)" }}>
                      {uploadForm.name || "Product Title Goes Here"}
                    </h5>

                    <div className="d-flex align-items-baseline gap-2 my-2">
                      <strong className="text-wine fs-4">
                        {uploadForm.price ? `₹${uploadForm.price}` : "₹1,999"}
                      </strong>
                      {uploadForm.mrp && (
                        <small className="text-muted text-decoration-line-through">
                          {uploadForm.mrp ? `₹${uploadForm.mrp}` : "₹3,499"}
                        </small>
                      )}
                      {uploadForm.offer && (
                        <span className="badge bg-danger-subtle text-danger ms-auto small">
                          {uploadForm.offer}
                        </span>
                      )}
                    </div>

                    <p className="text-muted small my-2" style={{ lineHeight: 1.4 }}>
                      {uploadForm.description || "Product details..."}
                    </p>

                    <div className="d-flex gap-2 pt-2 border-top">
                      <button type="button" className="btn btn-outline-brand flex-grow-1 rounded-pill btn-sm">
                        <i className="bi bi-bag-plus me-1" />
                        Add to Cart
                      </button>
                      <button type="button" className="btn btn-brand flex-grow-1 rounded-pill btn-sm">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: ORDERS & FULFILMENT (MAINTAIN USER-ADMIN RELATIONSHIP) */}
        {/* ================================================================= */}
        {activeTab === "orders" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h5 className="admin-card-title">
                  <i className="bi bi-truck text-wine" />
                  Customer Orders & Live Tracking Dispatch
                </h5>
                <small className="text-muted">
                  Update order status here; changes immediately reflect in the customer’s profile order tracker
                </small>
              </div>
              <span className="badge rounded-pill bg-brand px-3 py-2">
                {orders.length} Total Orders
              </span>
            </div>

            <div className="admin-card-body p-0">
              {orders.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox text-muted display-4 mb-2 d-block" />
                  <p className="text-muted">No customer orders placed yet.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID & Date</th>
                        <th>Customer Info</th>
                        <th>Ordered Items</th>
                        <th>Total Amount</th>
                        <th>Payment Method</th>
                        <th>Current Status</th>
                        <th className="text-end">Update Live Tracking</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((ord) => (
                        <tr key={ord.id}>
                          <td>
                            <strong className="d-block text-wine">{ord.id}</strong>
                            <small className="text-muted">{ord.date}</small>
                          </td>

                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <span className="admin-avatar" style={{ width: 30, height: 30, fontSize: "0.78rem" }}>
                                {ord.customerName?.charAt(0) || "C"}
                              </span>
                              <div>
                                <strong className="d-block" style={{ fontSize: "0.85rem" }}>
                                  {ord.customerName}
                                </strong>
                                <small className="text-muted d-block" style={{ fontSize: "0.72rem" }}>
                                  {ord.customerPhone}
                                </small>
                                <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                                  {ord.address?.street}, {ord.address?.city}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="d-flex flex-column gap-1">
                              {ord.items?.map((item, idx) => (
                                <div key={idx} className="d-flex align-items-center gap-2">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: 26, height: 26, borderRadius: 4, objectFit: "cover" }}
                                    onError={(e) => {
                                      e.target.src = SAMPLE_IMAGE_PRESETS[0].url;
                                    }}
                                  />
                                  <span className="small text-truncate" style={{ maxWidth: 160 }}>
                                    {item.name} (x{item.quantity})
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>

                          <td>
                            <strong className="text-wine fs-6">{formatPrice(ord.total)}</strong>
                          </td>

                          <td>
                            <span className="badge bg-light text-dark border">
                              {ord.paymentMethod || "UPI"}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`order-pill-status ${
                                ord.status === "Delivered"
                                  ? "status-delivered"
                                  : ord.status === "Shipped"
                                  ? "status-shipped"
                                  : ord.status === "Confirmed"
                                  ? "status-confirmed"
                                  : "status-placed"
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>

                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <select
                                className="form-select form-select-sm rounded-pill"
                                style={{ width: "135px", fontSize: "0.78rem" }}
                                value={ord.status}
                                onChange={(e) => updateOrderStatus(ord.id, e.target.value)}
                              >
                                <option value="Placed">Placed (1)</option>
                                <option value="Confirmed">Confirmed (2)</option>
                                <option value="Shipped">Shipped (3)</option>
                                <option value="Delivered">Delivered (4)</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: CUSTOMER PROFILES (RELATIONSHIP VIEW) */}
        {/* ================================================================= */}
        {activeTab === "customers" && (
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h5 className="admin-card-title">
                  <i className="bi bi-people-fill text-wine" />
                  Registered Customers & Profiles
                </h5>
                <small className="text-muted">
                  View customer profiles, addresses, and lifetime value
                </small>
              </div>
              <span className="badge rounded-pill bg-brand px-3 py-2">
                {users.length} Registered Accounts
              </span>
            </div>

            <div className="admin-card-body p-0">
              <div className="table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Contact Details</th>
                      <th>Delivery Address</th>
                      <th>Total Orders Placed</th>
                      <th>Lifetime Spend</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((cust) => {
                      const userOrders = orders.filter(
                        (o) =>
                          o.customerEmail === cust.email ||
                          o.address?.phone === cust.phone ||
                          o.customerName === cust.name
                      );
                      const totalSpend = userOrders.reduce((sum, o) => sum + (o.total || 0), 0);

                      return (
                        <tr key={cust.id}>
                          <td>
                            <div className="d-flex align-items-center gap-3">
                              <div className="customer-avatar-box">
                                {cust.name ? cust.name.charAt(0).toUpperCase() : "U"}
                              </div>
                              <div>
                                <strong className="d-block" style={{ color: "var(--admin-ink)" }}>
                                  {cust.name}
                                </strong>
                                <small className="text-muted">Customer #{cust.id.slice(-6)}</small>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div style={{ fontSize: "0.85rem" }}>
                              <i className="bi bi-envelope text-muted me-1" />
                              {cust.email}
                            </div>
                            <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                              <i className="bi bi-telephone text-muted me-1" />
                              {cust.phone}
                            </div>
                          </td>

                          <td>
                            <div className="small" style={{ maxWidth: "250px" }}>
                              <i className="bi bi-geo-alt text-danger me-1" />
                              {cust.address?.street
                                ? `${cust.address.street}, ${cust.address.city}, ${cust.address.state} - ${cust.address.pincode}`
                                : "Address not yet saved"}
                            </div>
                          </td>

                          <td>
                            <span className="badge bg-light text-dark border px-3 py-1 fs-6">
                              {userOrders.length} orders
                            </span>
                          </td>

                          <td>
                            <strong className="text-wine fs-6">{formatPrice(totalSpend)}</strong>
                          </td>

                          <td>
                            <span className="badge bg-success-subtle text-success rounded-pill px-3 py-1">
                              Active Buyer
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================================================================= */}
      {/* MODAL 1: EDIT PRODUCT MODAL */}
      {/* ================================================================= */}
      {editingProduct && (
        <div className="admin-modal-backdrop" onClick={() => setEditingProduct(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="fw-bold m-0 text-wine">
                <i className="bi bi-pencil-square me-2" />
                Edit Product: {editingProduct.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setEditingProduct(null)}
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="admin-modal-body">
                {/* Title */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Product Title / Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    required
                  />
                </div>

                {/* Category & Subcategory */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Category</label>
                    <select
                      className="form-select"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    >
                      <option value="clothing">clothing</option>
                      <option value="womenProducts">womenProducts</option>
                      <option value="skincare">skincare</option>
                      <option value="materials">materials</option>
                      <option value="innerwear">innerwear</option>
                      <option value="stitching">stitching</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Subcategory / Tag</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct.subcategory || ""}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, subcategory: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Price, MRP & Stock */}
                <div className="row g-3 mb-3">
                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Selling Price</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small fw-bold">MRP (Strikethrough)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingProduct.mrp || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, mrp: e.target.value })}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Available Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      value={editingProduct.stock ?? 25}
                      onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Image Update: File or URL */}
                <div className="mb-3">
                  <label className="form-label small fw-bold">Product Image / Photo</label>
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <img
                      src={editingProduct.image}
                      alt="Current"
                      style={{ width: 60, height: 60, borderRadius: 10, objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control form-control-sm mb-1"
                        onChange={(e) => handleImageFileUpload(e, "edit")}
                      />
                      <small className="text-muted" style={{ fontSize: "0.72rem" }}>
                        Upload replacement photo from your device
                      </small>
                    </div>
                  </div>

                  <input
                    type="url"
                    className="form-control"
                    placeholder="Or enter image URL"
                    value={editingProduct.image}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  />
                </div>

                {/* Badge & Visibility */}
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Badge</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. New, Bestseller"
                      value={editingProduct.badge || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Store Visibility</label>
                    <select
                      className="form-select"
                      value={editingProduct.isActive !== false ? "true" : "false"}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          isActive: e.target.value === "true"
                        })
                      }
                    >
                      <option value="true">Active (Visible to users)</option>
                      <option value="false">Hidden (Draft)</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-2">
                  <label className="form-label small fw-bold">Description</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={editingProduct.description || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="btn btn-light rounded-pill"
                  onClick={() => setEditingProduct(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-brand rounded-pill px-4">
                  <i className="bi bi-check2 me-1" />
                  Save Changes (Live Sync)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 2: DEEP DIVE ANALYTICS MODAL */}
      {/* ================================================================= */}
      {deepDiveProduct && (
        <div className="admin-modal-backdrop" onClick={() => setDeepDiveProduct(null)}>
          <div className="admin-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="fw-bold m-0 text-wine">
                <i className="bi bi-graph-up-arrow me-2" />
                Product Analytics Deep-Dive
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeepDiveProduct(null)}
                aria-label="Close"
              />
            </div>

            <div className="admin-modal-body">
              {/* Product Header */}
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4 mb-4">
                <img
                  src={deepDiveProduct.image}
                  alt={deepDiveProduct.name}
                  style={{ width: 80, height: 80, borderRadius: 14, objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <span className="badge rounded-pill bg-brand text-capitalize mb-1">
                    {deepDiveProduct.category} • {deepDiveProduct.subcategory}
                  </span>
                  <h5 className="fw-bold m-0" style={{ color: "var(--admin-wine-dark)" }}>
                    {deepDiveProduct.name}
                  </h5>
                  <div className="d-flex align-items-center gap-3 mt-1">
                    <strong className="text-wine fs-5">{deepDiveProduct.price}</strong>
                    <span className="text-muted small">ID: #{deepDiveProduct.id}</span>
                    <span className="badge bg-success-subtle text-success">
                      Stock: {deepDiveProduct.stock ?? 25} units
                    </span>
                  </div>
                </div>
              </div>

              {/* Analytics Metrics Grid */}
              {(() => {
                const stat = productAnalytics[deepDiveProduct.id] || {
                  views: 0,
                  sales: 0,
                  revenue: 0,
                  inWishlist: 0,
                  inCart: 0
                };
                const numericPrice = parsePrice(deepDiveProduct.price);
                const revenue = stat.revenue || stat.sales * numericPrice;
                const conversion = stat.views > 0 ? ((stat.sales / stat.views) * 100).toFixed(1) : "0.0";

                return (
                  <div>
                    <div className="row g-3 mb-4">
                      <div className="col-4">
                        <div className="p-3 rounded-3 border bg-white text-center">
                          <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                            Store Views
                          </small>
                          <h4 className="fw-bold text-wine m-0">{stat.views}</h4>
                          <small className="text-success" style={{ fontSize: "0.72rem" }}>
                            Customer views
                          </small>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="p-3 rounded-3 border bg-white text-center">
                          <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                            Units Sold
                          </small>
                          <h4 className="fw-bold text-success m-0">{stat.sales}</h4>
                          <small className="text-muted" style={{ fontSize: "0.72rem" }}>
                            Orders fulfilled
                          </small>
                        </div>
                      </div>

                      <div className="col-4">
                        <div className="p-3 rounded-3 border bg-white text-center">
                          <small className="text-muted d-block text-uppercase fw-bold" style={{ fontSize: "0.7rem" }}>
                            Total Revenue
                          </small>
                          <h4 className="fw-bold text-wine m-0">{formatPrice(revenue)}</h4>
                          <small className="text-muted" style={{ fontSize: "0.72rem" }}>
                            Gross sales
                          </small>
                        </div>
                      </div>
                    </div>

                    {/* Funnel Progress */}
                    <div className="p-3 rounded-4 border bg-white mb-4">
                      <h6 className="fw-bold mb-3 text-wine">Customer Journey Funnel</h6>
                      <div className="d-flex flex-column gap-3">
                        <div>
                          <div className="d-flex justify-content-between small fw-bold mb-1">
                            <span>1. Product Page Impressions</span>
                            <span>{stat.views} views (100%)</span>
                          </div>
                          <div className="progress" style={{ height: "8px" }}>
                            <div className="progress-bar bg-primary" style={{ width: "100%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between small fw-bold mb-1">
                            <span>2. Added to Customer Wishlist</span>
                            <span>
                              {stat.inWishlist || 12} wishlist adds (
                              {stat.views > 0 ? (((stat.inWishlist || 12) / stat.views) * 100).toFixed(1) : 10}%)
                            </span>
                          </div>
                          <div className="progress" style={{ height: "8px" }}>
                            <div className="progress-bar bg-danger" style={{ width: "35%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between small fw-bold mb-1">
                            <span>3. Added to Shopping Cart</span>
                            <span>
                              {stat.inCart || 8} cart adds (
                              {stat.views > 0 ? (((stat.inCart || 8) / stat.views) * 100).toFixed(1) : 6}%)
                            </span>
                          </div>
                          <div className="progress" style={{ height: "8px" }}>
                            <div className="progress-bar bg-warning" style={{ width: "20%" }} />
                          </div>
                        </div>

                        <div>
                          <div className="d-flex justify-content-between small fw-bold mb-1">
                            <span>4. Successful Purchases</span>
                            <span className="text-success">
                              {stat.sales} orders ({conversion}% Conversion)
                            </span>
                          </div>
                          <div className="progress" style={{ height: "8px" }}>
                            <div className="progress-bar bg-success" style={{ width: `${Math.min(100, Number(conversion) * 10)}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stock quick restock */}
                    <div className="p-3 rounded-4 bg-light border d-flex align-items-center justify-content-between flex-wrap gap-2">
                      <div>
                        <strong>Inventory Management</strong>
                        <small className="text-muted d-block">
                          Current available stock: {deepDiveProduct.stock ?? 25} units
                        </small>
                      </div>
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-brand rounded-pill"
                          onClick={() => updateStock(deepDiveProduct.id, (deepDiveProduct.stock ?? 25) + 10)}
                        >
                          +10 Quick Restock
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-brand rounded-pill"
                          onClick={() => updateStock(deepDiveProduct.id, (deepDiveProduct.stock ?? 25) + 50)}
                        >
                          +50 Units
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="btn btn-outline-brand rounded-pill"
                onClick={() => {
                  setEditingProduct(deepDiveProduct);
                  setDeepDiveProduct(null);
                }}
              >
                <i className="bi bi-pencil me-1" />
                Edit This Product
              </button>
              <button
                type="button"
                className="btn btn-brand rounded-pill px-4"
                onClick={() => setDeepDiveProduct(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* MODAL 3: DELETE CONFIRMATION */}
      {/* ================================================================= */}
      {deleteConfirmId && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="admin-modal-content" style={{ maxWidth: "420px" }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h5 className="fw-bold m-0 text-danger">
                <i className="bi bi-exclamation-triangle-fill me-2" />
                Confirm Deletion
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeleteConfirmId(null)}
              />
            </div>
            <div className="admin-modal-body">
              <p className="mb-0">
                Are you sure you want to delete this product from the store catalog? Customers will no
                longer be able to view or purchase it.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="btn btn-light rounded-pill"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger rounded-pill px-4"
                onClick={() => {
                  deleteProduct(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
