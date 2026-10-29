
import { useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
// import "./DressMaterials.css";

const fabricSteps = [
  {
    icon: "bi-palette",
    number: "01",
    title: "Choose your fabric",
    description: "Explore colours, prints, textures and fabrics for your occasion.",
  },
  {
    icon: "bi-stars",
    number: "02",
    title: "Imagine your outfit",
    description: "Choose a design, neckline, sleeves and your favourite silhouette.",
  },
  {
    icon: "bi-scissors",
    number: "03",
    title: "Make it yours",
    description: "Share your stitching requirements and plan your custom outfit.",
  },
];

const outfitOptions = [
  "Blouse",
  "Kurti",
  "Dress",
  "Salwar Suit",
  "Anarkali",
  "Lehenga Blouse",
  "Gown",
  "Saree Blouse",
  "Palazzo Set",
  "Other",
];

const initialForm = {
  name: "",
  phone: "",
  outfit: "",
  fabric: "",
  quantity: "1",
  date: "",
  details: "",
};

export default function DressMaterials() {
  const { products } = useShop();
  const list = products.filter((p) => p.isActive !== false && p.category === "materials");

  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="dress-materials-page">
      {/* ================= HERO BANNER ================= */}
      <section className="materials-hero">
        <span className="materials-orb materials-orb-one" />
        <span className="materials-orb materials-orb-two" />
        <span className="materials-decor-dot" />

        <div className="container materials-hero-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="materials-hero-copy">
                <div className="materials-eyebrow">
                  <span />
                  FABRIC · CRAFT · STYLE
                </div>

                <h1>
                  Beautiful fabric.
                  <br />
                  <em>Endless you.</em>
                </h1>

                <p className="materials-hero-description">
                  Discover fabrics full of possibilities. Choose your
                  favourite material, dream up your design and create
                  an outfit that feels uniquely yours.
                </p>

                <div className="materials-hero-actions">
                  <a
                    href="#fabric-collection"
                    className="materials-primary-btn"
                  >
                    Explore Fabrics
                    <i className="bi bi-arrow-up-right" />
                  </a>

                  <a
                    href="#stitching-enquiry"
                    className="materials-secondary-btn"
                  >
                    Create Your Outfit
                    <i className="bi bi-arrow-down-right" />
                  </a>
                </div>

                <div className="materials-hero-trust">
                  <span className="materials-heart-icon">
                    <i className="bi bi-heart-fill" />
                  </span>
                  <div>
                    <strong>A little fabric, a lot of possibilities</strong>
                    <p>Your imagination is the starting point.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="materials-hero-visual">
                <div className="materials-hero-image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwYqB90bMQbka8poDf-GDlzTyoeaxix46EQpQ9PrSInQ&s=10"
                    alt="Elegant Indian ethnic fashion inspiration"
                  />

                  <div className="materials-image-overlay">
                    <span>YOUR FABRIC</span>
                    <h2>Your story.</h2>
                  </div>
                </div>

                <div className="materials-round-badge">
                  <i className="bi bi-stars" />
                  <span>MADE</span>
                  <span>FOR</span>
                  <span>YOUR STYLE</span>
                </div>

                <div className="materials-floating-card">
                  <span className="materials-floating-icon">
                    <i className="bi bi-flower1" />
                  </span>
                  <div>
                    <strong>Find your fabric</strong>
                    <span>Create something beautiful</span>
                  </div>
                </div>

                <span className="materials-vertical-text">
                  WOMEN NEEDS · YOUR STYLE, YOUR WAY
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="materials-hero-footer">
          FIND YOUR FABRIC <span /> DESIGN YOUR LOOK <span /> MAKE IT YOURS
        </div>
      </section>

      {/* ================= FABRIC COLLECTION ================= */}
      <section className="page-section materials-collection" id="fabric-collection">
        <div className="container">
          <div className="materials-section-intro">
            <SectionTitle
              eyebrow="FABRIC STUDIO"
              title="Materials waiting for your ideas"
            />
            <p>
              Find inspiration for everyday wear, festive outfits and
              special occasions.
            </p>
          </div>

          {list.length > 0 ? (
            <div className="row g-4 materials-products-grid">
              {list.map((product) => (
                <div className="col-6 col-md-4 col-lg-3" key={product.id}>
                  <div className="materials-product-item">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="materials-empty-state">
              <i className="bi bi-flower2" />
              <h3>Your fabric collection starts here</h3>
              <p>
                Add products with category "materials" to your product data
                to display them in this collection.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="materials-process-section">
        <div className="container">
          <div className="materials-section-intro text-center">
            <SectionTitle
              eyebrow="FROM FABRIC TO FASHION"
              title="Your outfit, your way"
            />
            <p>
              Three simple steps to turn your fabric and inspiration
              into a look of your own.
            </p>
          </div>

          <div className="row g-4 materials-process-grid">
            {fabricSteps.map((step) => (
              <div className="col-md-4" key={step.number}>
                <article className="materials-process-card">
                  <span className="materials-step-number">{step.number}</span>

                  <div className="materials-process-icon">
                    <i className={`bi ${step.icon}`} />
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  <span className="materials-process-line" />
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STITCHING ENQUIRY FORM ================= */}
      <section
        className="materials-enquiry-section"
        id="stitching-enquiry"
      >
        <div className="container">
          <div className="row align-items-stretch g-0 materials-enquiry-wrap">
            <div className="col-lg-5">
              <div className="materials-enquiry-aside">
                <span className="materials-enquiry-eyebrow">
                  <i className="bi bi-scissors" />
                  YOUR CUSTOM STITCHING
                </span>

                <h2>
                  Have fabric?
                  <br />
                  <em>Let's create magic.</em>
                </h2>

                <p>
                  Tell us what you would love to make. Share your outfit
                  type, fabric details and design ideas to begin planning
                  your custom stitching.
                </p>

                <div className="materials-enquiry-benefit">
                  <span><i className="bi bi-check2" /></span>
                  Blouses, kurtis, dresses and more
                </div>

                <div className="materials-enquiry-benefit">
                  <span><i className="bi bi-check2" /></span>
                  Personalised design requirements
                </div>

                <div className="materials-enquiry-benefit">
                  <span><i className="bi bi-check2" /></span>
                  Your style, your preferences
                </div>

                <div className="materials-enquiry-image">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXjHGvoENb6MAhTRQrvywbrXzibPi80Ym8rYFQ4qXfeg&s=10"
                    alt="Colourful textiles and fashion inspiration"
                    loading="lazy"
                  />
                  <div className="materials-image-note">
                    <i className="bi bi-heart-fill" />
                    Every detail matters.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="materials-form-panel">
                <div className="materials-form-heading">
                  <span>LET'S GET STARTED</span>
                  <h3>Stitching enquiry</h3>
                  <p>Share your details and outfit preferences below.</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="materials-name">Your name *</label>
                      <div className="materials-input-wrap">
                        <i className="bi bi-person" />
                        <input
                          id="materials-name"
                          type="text"
                          name="name"
                          placeholder="Enter your name"
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="materials-phone">Phone number *</label>
                      <div className="materials-input-wrap">
                        <i className="bi bi-telephone" />
                        <input
                          id="materials-phone"
                          type="tel"
                          name="phone"
                          placeholder="Enter phone number"
                          value={form.phone}
                          onChange={handleChange}
                          pattern="[0-9+\s()-]{7,20}"
                          title="Enter a valid phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="materials-outfit">Outfit type *</label>
                      <div className="materials-input-wrap">
                        <i className="bi bi-tags" />
                        <select
                          id="materials-outfit"
                          name="outfit"
                          value={form.outfit}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select an outfit</option>
                          {outfitOptions.map((option) => (
                            <option value={option} key={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="materials-fabric">Fabric provided?</label>
                      <div className="materials-input-wrap">
                        <i className="bi bi-layers" />
                        <select
                          id="materials-fabric"
                          name="fabric"
                          value={form.fabric}
                          onChange={handleChange}
                        >
                          <option value="">Choose an option</option>
                          <option value="I have my own fabric">
                            I have my own fabric
                          </option>
                          <option value="Need help choosing fabric">
                            Need help choosing fabric
                          </option>
                          <option value="Need fabric and stitching">
                            Need fabric and stitching
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="materials-quantity">Quantity</label>
                      <div className="materials-input-wrap">
                        <i className="bi bi-plus-slash-minus" />
                        <select
                          id="materials-quantity"
                          name="quantity"
                          value={form.quantity}
                          onChange={handleChange}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                            <option value={number} key={number}>
                              {number} {number === 1 ? "outfit" : "outfits"}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="materials-date">
                        Preferred date (optional)
                      </label>
                      <div className="materials-input-wrap">
                        <i className="bi bi-calendar-event" />
                        <input
                          id="materials-date"
                          type="date"
                          name="date"
                          min={new Date().toLocaleDateString("en-CA")}
                          value={form.date}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="materials-details">
                        Design and measurements
                      </label>
                      <div className="materials-textarea-wrap">
                        <i className="bi bi-chat-square-text" />
                        <textarea
                          id="materials-details"
                          name="details"
                          rows="4"
                          placeholder="Describe your design, neckline, sleeves, measurements or special requirements..."
                          value={form.details}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="materials-submit-btn"
                      >
                        Submit Stitching Enquiry
                        <i className="bi bi-arrow-up-right" />
                      </button>
                      <p className="materials-form-privacy">
                        <i className="bi bi-heart" />
                        Your design journey starts with your idea.
                      </p>
                    </div>
                  </div>

                  {submitted && (
                    <div className="materials-form-success" role="status">
                      <i className="bi bi-check-circle-fill" />
                      Your details have been captured in this page.
                      To receive enquiries, connect this form to your backend
                      or email service.
                      <button
                        type="button"
                        onClick={() => {
                          setForm(initialForm);
                          setSubmitted(false);
                        }}
                      >
                        Submit another enquiry
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      {/* <section className="materials-final-cta">
        sect<div className="container">
          <div className="materials-final-cta-inner">
            <div>
              <span>YOUR NEXT FAVOURITE OUTFIT STARTS HERE</span>
              <h2>Dream it. Design it. Wear it.</h2>
            </div>
            <Link to="/stitching">
              Explore stitching services
              <i className="bi bi-arrow-up-right" />
            </Link>
          </div>
        </div>
      </section> */}
    </main>
  );
}
