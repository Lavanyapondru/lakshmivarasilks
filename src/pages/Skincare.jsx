
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
// import "./Skincare.css";

const skincareBenefits = [
  {
    icon: "bi-droplet-half",
    title: "Gentle Care",
    text: "Everyday essentials for your self-care routine.",
  },
  {
    icon: "bi-flower1",
    title: "Feel-Good Rituals",
    text: "Little moments that make you feel refreshed.",
  },
  {
    icon: "bi-heart",
    title: "Love Your Skin",
    text: "Discover products that fit your daily routine.",
  },
];

export default function Skincare() {
  const { products } = useShop();
  const list = products.filter(
    (product) => product.isActive !== false && product.category === "skincare"
  );

  return (
    <main className="skincare-page">
      {/* Premium skincare hero banner */}
      <section className="skincare-hero">
        <div className="skincare-orb skincare-orb-one" />
        <div className="skincare-orb skincare-orb-two" />
        <div className="skincare-gold-dot" />

        <div className="container skincare-hero-container">
          <div className="row align-items-center g-5">
            {/* Hero content */}
            <div className="col-lg-6">
              <div className="skincare-hero-content">
                <div className="skincare-eyebrow">
                  <span />
                  SKIN • SELF • CARE
                </div>

                <h1>
                  Your daily dose
                  <br />
                  of <em>self-love.</em>
                </h1>

                <p className="skincare-hero-description">
                  Discover feel-good skincare and everyday essentials
                  that make your self-care routine a little more
                  beautiful. Because caring for yourself is always
                  in style.
                </p>

                <div className="skincare-hero-actions">
                  <a
                    href="#skincare-products"
                    className="skincare-primary-btn"
                  >
                    Explore Self-Care
                    <i className="bi bi-arrow-up-right" />
                  </a>

                  <Link
                    to="/contact"
                    className="skincare-secondary-btn"
                  >
                    Get in touch
                    <i className="bi bi-arrow-down-right" />
                  </Link>
                </div>

                <div className="skincare-trust">
                  <div className="skincare-trust-icon">
                    <i className="bi bi-heart-fill" />
                  </div>

                  <div>
                    <strong>A little care goes a long way</strong>
                    <p>Make time for your everyday glow.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="col-lg-6">
              <div className="skincare-hero-visual">
                <div className="skincare-hero-image">
                  <img
                    src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85"
                    alt="Skincare products arranged for a self-care routine"
                    fetchPriority="high"
                  />

                  <div className="skincare-image-overlay">
                    <span>YOUR MOMENT</span>
                    <h2>Glow your way.</h2>
                  </div>
                </div>

                <div className="skincare-round-badge">
                  <i className="bi bi-stars" />
                  <span>SELF</span>
                  <span>CARE</span>
                  <span>WITH LOVE</span>
                </div>

                <div className="skincare-floating-card">
                  <div className="skincare-floating-icon">
                    <i className="bi bi-flower1" />
                  </div>

                  <div>
                    <strong>Your daily ritual</strong>
                    <span>Small steps, feel-good moments</span>
                  </div>
                </div>

                <div className="skincare-vertical-text">
                  YOUR SKINCARE • YOUR ROUTINE
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="skincare-hero-footer">
          DISCOVER <span /> YOUR EVERYDAY FAVOURITES
        </div>
      </section>

      {/* Benefits strip */}
      <section className="skincare-benefits">
        <div className="container">
          <div className="row g-4">
            {skincareBenefits.map((benefit, index) => (
              <div className="col-md-4" key={benefit.title}>
                <article
                  className="skincare-benefit-card"
                  style={{ "--benefit-delay": `${index * 120}ms` }}
                >
                  <div className="skincare-benefit-icon">
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

      {/* Existing product collection */}
      <section
        className="skincare-products-section"
        id="skincare-products"
      >
        <div className="container">
          <div className="skincare-section-heading">
            <SectionTitle
              eyebrow="THE SELF-CARE EDIT"
              title="Your everyday feel-good favourites"
            />

            <p>
              Explore our skincare and self-care collection and find
              little essentials to make your routine your own.
            </p>
          </div>

          {list.length > 0 ? (
            <div className="row g-4 skincare-products-grid">
              {list.map((product, index) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product.id}
                >
                  <div
                    className="skincare-product-item"
                    style={{ "--product-delay": `${index * 70}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="skincare-empty-state">
              <i className="bi bi-flower1" />
              <h3>Your self-care collection is on its way</h3>
              <p>
                Add products with the category "skincare" to your
                existing product data to display them here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Closing call to action */}
      <section className="skincare-closing-section">
        <div className="container">
          <div className="skincare-closing-card">
            <div className="skincare-closing-icon">
              <i className="bi bi-heart-fill" />
            </div>

            <div className="skincare-closing-copy">
              <span>A MOMENT JUST FOR YOU</span>
              <h2>Make self-care your favourite habit.</h2>
              <p>
                Find your essentials, slow down, and enjoy the little
                things that make every day feel special.
              </p>
            </div>

            <a
              href="#skincare-products"
              className="skincare-primary-btn"
            >
              Find Your Favourites
              <i className="bi bi-arrow-up-right" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
