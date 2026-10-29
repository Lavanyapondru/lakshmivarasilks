
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
// import "./Clothing.css";

export default function Clothing() {
  const { products } = useShop();
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { key: "all", label: "All Styles", icon: "bi-grid" },
    { key: "sarees", label: "Sarees", icon: "bi-stars" },
    { key: "ethnic", label: "Ethnic Wear", icon: "bi-flower1" },
    { key: "western", label: "Western Wear", icon: "bi-person-standing-dress" },
    { key: "lounge", label: "Lounge Wear", icon: "bi-moon-stars" },
    { key: "personal", label: "Night Wear", icon: "bi-moon" },
    { key: "kids", label: "Kids Wear", icon: "bi-balloon-heart" },
  ];

  const list = products.filter((product) => {
    if (product.isActive === false) return false;
    if (product.category !== "clothing") return false;
    if (activeTab === "all") return true;

    return String(product.subcategory || "").toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <main className="clothing-page">
      {/* Fashion Hero Banner */}
      <section className="clothing-hero">
        <div className="clothing-hero-glow" />
        <span className="clothing-decoration clothing-dot-one" />
        <span className="clothing-decoration clothing-dot-two" />

        <div className="container clothing-hero-container">
          <div className="row align-items-center g-5">
            {/* Left Content */}
            <div className="col-lg-7">
              <div className="clothing-hero-content">
                <span className="clothing-eyebrow">
                  <span className="clothing-eyebrow-line" />
                  YOUR STYLE, YOUR STORY
                </span>

                <h1>
                  Dress the way
                  <br />
                  you <span className="clothing-script">feel.</span>
                </h1>

                <p className="clothing-hero-description">
                  From timeless sarees to contemporary outfits,
                  discover styles that celebrate your personality
                  and make every moment feel special.
                </p>

                <div className="clothing-hero-actions">
                  <a
                    href="#clothing-products"
                    className="clothing-primary-btn"
                  >
                    Explore Collection
                    <i className="bi bi-arrow-up-right" />
                  </a>

                  <a
                    href="#clothing-story"
                    className="clothing-text-btn"
                  >
                    Discover your style
                    <i className="bi bi-arrow-down-right" />
                  </a>
                </div>

                <div className="clothing-hero-note">
                  <span className="clothing-note-icon">
                    <i className="bi bi-heart-fill" />
                  </span>

                  <div>
                    <strong>Selected with care</strong>
                    <p>Fashion for your everyday moments</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Fashion Image */}
            <div className="col-lg-5">
              <div className="clothing-hero-visual">
                <div className="clothing-image-backdrop" />

                <div className="clothing-main-image">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85"
                    alt="Elegant traditional Indian fashion"
                  />

                  <div className="clothing-image-overlay">
                    <span>YOUR STYLE</span>
                    <h2>Beautifully you.</h2>
                  </div>
                </div>

                <div className="clothing-style-badge">
                  <i className="bi bi-stars" />
                  <span>STYLE</span>
                  <span>WITH</span>
                  <span>HEART</span>
                </div>

                <div className="clothing-side-caption">
                  WOMEN'S FASHION · MADE FOR YOU
                </div>

                <div className="clothing-floating-card">
                  <span className="clothing-floating-icon">
                    <i className="bi bi-flower1" />
                  </span>
                  <div>
                    <strong>Find your look</strong>
                    <span>Made for every occasion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clothing-hero-footer">
            <span>DISCOVER</span>
            <span className="clothing-footer-line" />
            <span>YOUR EVERYDAY FAVOURITES</span>
          </div>
        </div>
      </section>

      {/* Product Collection */}
      <section
        className="page-section clothing-products-section"
        id="clothing-products"
      >
        <div className="container">
          <div className="clothing-heading-wrap">
            <SectionTitle
              eyebrow="THE CLOSET EDIT"
              title="From everyday to occasion wear"
            />

            <p className="clothing-section-description">
              Explore beautiful styles for celebrations, casual
              outings, relaxed evenings and everything in between.
            </p>
          </div>

          {/* Category Filter */}
          <div className="clothing-tabs" aria-label="Filter clothing">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={`clothing-tab ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
                aria-pressed={activeTab === tab.key}
              >
                <i className={`bi ${tab.icon}`} aria-hidden="true" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="clothing-results-label">
            <span>
              {activeTab === "all"
                ? "ALL CLOTHING STYLES"
                : tabs.find((tab) => tab.key === activeTab)?.label.toUpperCase()}
            </span>
            <span>{list.length} {list.length === 1 ? "ITEM" : "ITEMS"}</span>
          </div>

          <div className="row g-4 clothing-product-grid">
            {list.length > 0 ? (
              list.map((product) => (
                <div
                  className="col-6 col-md-4 col-lg-3 clothing-product-item"
                  key={product.id}
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="clothing-empty-state">
                  <i className="bi bi-bag-heart" />
                  <h3>Something beautiful is on its way</h3>
                  <p>
                    There are no products in this category yet.
                    Explore our other styles in the meantime.
                  </p>
                  <button
                    type="button"
                    className="clothing-primary-btn"
                    onClick={() => setActiveTab("all")}
                  >
                    View All Styles
                    <i className="bi bi-arrow-right" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Style Story */}
      <section className="clothing-story-section" id="clothing-story">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-md-5">
              <div className="clothing-story-image">
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85"
                  alt="Elegant women's ethnic clothing"
                  loading="lazy"
                />
                <span className="clothing-story-image-label">
                  YOUR MOMENT. YOUR STYLE.
                </span>
              </div>
            </div>

            <div className="col-md-7">
              <div className="clothing-story-content">
                <span className="clothing-eyebrow">
                  <span className="clothing-eyebrow-line" />
                  EVERY STYLE HAS A STORY
                </span>

                <h2>
                  Wear what makes
                  <br />
                  you feel <span>beautiful.</span>
                </h2>

                <p>
                  Whether you love traditional elegance or modern
                  silhouettes, find pieces that feel right for you.
                  Explore your favourites and create a wardrobe
                  that reflects your individuality.
                </p>

                <div className="clothing-benefits">
                  <div>
                    <i className="bi bi-heart" />
                    <span>Styles you'll love</span>
                  </div>
                  <div>
                    <i className="bi bi-stars" />
                    <span>Looks for every occasion</span>
                  </div>
                  <div>
                    <i className="bi bi-flower2" />
                    <span>Tradition meets modern style</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - One Button */}
      <section className="clothing-cta-section">
        <div className="container">
          <div className="clothing-cta">
            <span className="clothing-cta-decoration clothing-cta-flower">
              ✿
            </span>

            <span className="clothing-cta-eyebrow">
              A LITTLE SOMETHING FOR YOUR STYLE
            </span>

            <h2>
              Your next favourite
              <br />
              <span>look is waiting.</span>
            </h2>

            <p>
              Explore our clothing collection and discover
              pieces that feel like you.
            </p>

            <a
              href="#clothing-products"
              className="clothing-cta-button"
            >
              Explore All Clothing
              <i className="bi bi-arrow-up-right" />
            </a>

            <span className="clothing-cta-decoration clothing-cta-star">
              ✧
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
