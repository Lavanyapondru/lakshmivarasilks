
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
// import "./WomenProducts.css";

const tabs = [
  { key: "all", label: "All Essentials", icon: "bi-grid" },
  { key: "Footwear", label: "Footwear", icon: "bi-stars" },
  { key: "Beauty", label: "Beauty", icon: "bi-flower1" },
  { key: "Accessories", label: "Handbags", icon: "bi-handbag" },
  { key: "Watches", label: "Watches", icon: "bi-watch" },
];

const benefits = [
  {
    icon: "bi-heart",
    title: "Picked with Care",
    text: "Explore everyday favourites for your lifestyle.",
  },
  {
    icon: "bi-stars",
    title: "Style Your Way",
    text: "Discover accessories that express your personality.",
  },
  {
    icon: "bi-bag-heart",
    title: "Everyday Favourites",
    text: "From fashion essentials to little luxuries.",
  },
];

export default function WomenProducts() {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState("all");

  const list = products.filter((product) => {
    if (product.isActive === false) return false;
    if (String(product.category || "").toLowerCase() !== "womenproducts") return false;

    if (activeTab === "all") return true;

    return String(product.subcategory || "").toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <main className="women-products-page">
      {/* ================= HERO BANNER ================= */}
      <section className="wp-hero">
        <div className="wp-decoration wp-decoration-one" />
        <div className="wp-decoration wp-decoration-two" />
        <span className="wp-gold-dot" />

        <div className="container wp-hero-container">
          <div className="row align-items-center g-5">
            {/* Hero text */}
            <div className="col-lg-6">
              <div className="wp-hero-content">
                <div className="wp-eyebrow">
                  <span />
                  WOMEN • BEAUTY • COMFORT
                </div>

                <h1>
                  Style that feels
                  <br />
                  like <em>you.</em>
                </h1>

                <p className="wp-hero-description">
                  Discover beautiful finds for your everyday life.
                  From stylish footwear and handbags to beauty
                  essentials and watches, find the little things
                  that make your style uniquely yours.
                </p>

                <div className="wp-hero-actions">
                  <a
                    href="#women-collection"
                    className="wp-primary-btn"
                  >
                    Explore Collection
                    <i className="bi bi-arrow-up-right" />
                  </a>

                  <a
                    href="#women-benefits"
                    className="wp-secondary-btn"
                  >
                    Discover More
                    <i className="bi bi-arrow-down-right" />
                  </a>
                </div>

                <div className="wp-trust">
                  <span className="wp-trust-icon">
                    <i className="bi bi-heart-fill" />
                  </span>

                  <div>
                    <strong>Selected with care</strong>
                    <p>Little details. Beautiful everyday style.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="col-lg-6">
              <div className="wp-hero-visual">
                <div className="wp-hero-image">
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85"
                    alt="Women exploring stylish fashion and accessories"
                    fetchPriority="high"
                  />

                  <div className="wp-image-overlay">
                    <span>YOUR STYLE</span>
                    <h2>Your story.</h2>
                    <p>Everyday favourites, chosen by you.</p>
                  </div>
                </div>

                <div className="wp-round-badge">
                  <i className="bi bi-stars" />
                  <span>STYLE</span>
                  <span>WITH</span>
                  <span>HEART</span>
                </div>

                <div className="wp-floating-card">
                  <span className="wp-floating-icon">
                    <i className="bi bi-bag-heart" />
                  </span>

                  <div>
                    <strong>Your everyday edit</strong>
                    <span>Find your new favourites</span>
                  </div>
                </div>

                <div className="wp-vertical-text">
                  WOMEN NEEDS • STYLE WITH LOVE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wp-hero-footer">
          DISCOVER <span /> YOUR EVERYDAY FAVOURITES
        </div>
      </section>

      {/* ================= BENEFITS ================= */}
      <section className="wp-benefits" id="women-benefits">
        <div className="container">
          <div className="row g-3">
            {benefits.map((benefit, index) => (
              <div className="col-md-4" key={benefit.title}>
                <article
                  className="wp-benefit-card"
                  style={{
                    "--wp-delay": `${index * 120}ms`,
                  }}
                >
                  <div className="wp-benefit-icon">
                    <i className={`bi ${benefit.icon}`} />
                  </div>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT COLLECTION ================= */}
      <section
        className="page-section wp-products-section"
        id="women-collection"
      >
        <div className="container">
          <div className="wp-section-heading">
            <SectionTitle
              eyebrow="THE WOMEN'S COLLECTION"
              title="Everything she needs"
            />

            <p>
              From everyday essentials to statement accessories,
              discover the pieces that make every day feel special.
            </p>
          </div>

          {/* Category filters */}
          <div
            className="wp-tabs"
            role="group"
            aria-label="Filter women's products"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={
                  activeTab === tab.key
                    ? "wp-tab active"
                    : "wp-tab"
                }
                aria-pressed={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                <i className={`bi ${tab.icon}`} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Products */}
          <div className="row g-4 wp-product-grid">
            {list.length > 0 ? (
              list.map((product, index) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <div
                    className="wp-product-item"
                    style={{
                      "--wp-delay": `${Math.min(index * 60, 360)}ms`,
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="wp-empty-state">
                  <i className="bi bi-bag" />
                  <h3>No products found</h3>
                  <p>
                    There are no products in this category yet.
                    Explore the full collection instead.
                  </p>

                  <button
                    type="button"
                    className="wp-primary-btn"
                    onClick={() => setActiveTab("all")}
                  >
                    View All Products
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="wp-closing-section">
        <div className="container">
          <div className="wp-closing-card">
            <div className="wp-closing-icon">
              <i className="bi bi-stars" />
            </div>

            <div className="wp-closing-copy">
              <span>YOUR STYLE, YOUR WAY</span>
              <h2>A little something that feels like you.</h2>
              <p>
                Explore your favourites and make everyday
                shopping a little more special.
              </p>
            </div>

            <a
              href="#women-collection"
              className="wp-primary-btn"
            >
              Shop the Collection
              <i className="bi bi-arrow-up-right" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
