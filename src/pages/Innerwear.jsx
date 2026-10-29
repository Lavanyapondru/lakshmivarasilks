import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
// import "./Innerwear.css";

const tabs = [
  { key: "all", label: "All Essentials", icon: "bi-grid" },
  { key: "bra", label: "Bras", icon: "bi-heart" },
  { key: "panties", label: "Panties", icon: "bi-stars" },
  { key: "sets", label: "Lingerie Sets", icon: "bi-gift" },
  { key: "shapewear", label: "Shapewear", icon: "bi-person" },
  { key: "sportswear", label: "Sports Wear", icon: "bi-lightning" },
  { key: "camisoles", label: "Camisoles", icon: "bi-flower1" },
];

const benefits = [
  {
    icon: "bi-heart",
    title: "Everyday Comfort",
    text: "Essentials for your everyday routine.",
  },
  {
    icon: "bi-stars",
    title: "Your Personal Style",
    text: "Discover styles that feel like you.",
  },
  {
    icon: "bi-hand-thumbs-up",
    title: "Made for You",
    text: "Explore options for different needs.",
  },
];

export default function Innerwear() {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState("all");

  const list = products.filter((product) => {
    if (product.isActive === false) return false;
    if (product.category !== "innerwear") return false;

    if (activeTab === "all") return true;

    return String(product.subcategory || "").toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <main className="innerwear-page">
      {/* Premium Hero Banner */}
      <section className="innerwear-hero">
        <div className="innerwear-decoration innerwear-decoration-one" />
        <div className="innerwear-decoration innerwear-decoration-two" />
        <span className="innerwear-gold-dot" />

        <div className="container innerwear-hero-container">
          <div className="row align-items-center g-5">
            {/* Left: Hero content */}
            <div className="col-lg-6">
              <div className="innerwear-hero-content">
                <div className="innerwear-eyebrow">
                  <span />
                  COMFORT • CONFIDENCE • YOU
                </div>

                <h1>
                  Comfort that feels
                  <br />
                  like <em>you.</em>
                </h1>

                <p className="innerwear-hero-description">
                  Discover everyday essentials designed around your
                  comfort, confidence and personal style. From
                  everyday bras to activewear, find your perfect
                  favourites in one place.
                </p>

                <div className="innerwear-hero-actions">
                  <a
                    href="#innerwear-products"
                    className="innerwear-primary-btn"
                  >
                    Explore Essentials
                    <i className="bi bi-arrow-up-right" />
                  </a>

                  <a
                    href="#innerwear-benefits"
                    className="innerwear-secondary-btn"
                  >
                    Discover More
                    <i className="bi bi-arrow-down-right" />
                  </a>
                </div>

                <div className="innerwear-trust">
                  <span className="innerwear-trust-icon">
                    <i className="bi bi-heart-fill" />
                  </span>

                  <div>
                    <strong>Your comfort comes first</strong>
                    <p>Everyday essentials, chosen with care.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hero image */}
            <div className="col-lg-6">
              <div className="innerwear-hero-visual">
                <div className="innerwear-hero-image">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
                    alt="Women's fashion editorial in a stylish outfit"
                    fetchPriority="high"
                  />

                  <div className="innerwear-image-overlay">
                    <span>FEEL GOOD. LOOK GOOD.</span>
                    <h2>Your comfort. Your story.</h2>
                  </div>
                </div>

                <div className="innerwear-round-badge">
                  <i className="bi bi-stars" />
                  <span>FEEL</span>
                  <span>GOOD</span>
                  <span>EVERY DAY</span>
                </div>

                <div className="innerwear-floating-card">
                  <div className="innerwear-floating-icon">
                    <i className="bi bi-heart" />
                  </div>

                  <div>
                    <strong>Made for your everyday</strong>
                    <span>Comfort meets confidence</span>
                  </div>
                </div>

                <div className="innerwear-vertical-text">
                  YOUR COMFORT • YOUR STYLE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="innerwear-hero-footer">
          DISCOVER <span /> YOUR EVERYDAY FAVOURITES
        </div>
      </section>

      {/* Benefits */}
      <section
        className="innerwear-benefits"
        id="innerwear-benefits"
      >
        <div className="container">
          <div className="row g-3">
            {benefits.map((benefit, index) => (
              <div className="col-md-4" key={benefit.title}>
                <article
                  className="innerwear-benefit-card"
                  style={{
                    "--innerwear-delay": `${index * 120}ms`,
                  }}
                >
                  <div className="innerwear-benefit-icon">
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

      {/* Product collection and filter tabs */}
      <section
        className="page-section innerwear-products-section"
        id="innerwear-products"
      >
        <div className="container">
          <div className="innerwear-section-heading">
            <SectionTitle
              eyebrow="THE INNERWEAR EDIT"
              title="Comfort that feels just right"
            />

            <p>
              From daily essentials to activewear, explore the
              styles that suit your needs and make every day
              feel a little more comfortable.
            </p>
          </div>

          {/* Responsive category filters */}
          <div
            className="innerwear-tabs"
            role="group"
            aria-label="Filter innerwear products"
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={
                  activeTab === tab.key
                    ? "innerwear-tab active"
                    : "innerwear-tab"
                }
                aria-pressed={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
              >
                <i className={`bi ${tab.icon}`} aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="row g-4 innerwear-product-grid">
            {list.length > 0 ? (
              list.map((product, index) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <div
                    className="innerwear-product-item"
                    style={{
                      "--innerwear-delay": `${Math.min(index * 60, 360)}ms`,
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="innerwear-empty-state">
                  <i className="bi bi-heart" />
                  <h3>No products in this category yet</h3>
                  <p>
                    Try another category or explore all essentials.
                  </p>
                  <button
                    type="button"
                    className="innerwear-primary-btn"
                    onClick={() => setActiveTab("all")}
                  >
                    View All Essentials
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom call to action */}
      <section className="innerwear-closing-section">
        <div className="container">
          <div className="innerwear-closing-card">
            <div className="innerwear-closing-icon">
              <i className="bi bi-heart-fill" />
            </div>

            <div className="innerwear-closing-copy">
              <span>YOUR COMFORT, YOUR WAY</span>
              <h2>Feel confident in your everyday essentials.</h2>
              <p>
                Discover your favourites and find styles that fit
                your everyday life.
              </p>
            </div>

            <a
              href="#innerwear-products"
              className="innerwear-primary-btn"
            >
              Explore Collection
              <i className="bi bi-arrow-up-right" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}