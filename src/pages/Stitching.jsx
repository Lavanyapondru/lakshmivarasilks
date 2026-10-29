
import { useState } from "react";
// import "./Stitching.css";
// import "./About.css";

const services = [
  {
    title: "Blouse Stitching",
    category: "Blouse Stitching",
    description: "Custom-fitted blouses with elegant designs and finishing.",
    icon: "bi-scissors",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0nP2wL1tElChIa1HqInDUiruxjLqYE9084TaRhWpYhg&s=10",
  },
  {
    title: "Designer Dress Stitching",
    category: "Designer Dress Stitching",
    description: "Beautiful custom outfits tailored to your personal style.",
    icon: "bi-scissors",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMIgxDk_GXlkaJ8WU9MDXdYn7xwrjEfaV88iGKiFQtMg&s=10",
  },
  {
    title: "Saree Fall & Pico",
    category: "Saree Fall & Pico",
    description: "Professional saree finishing for a neat, elegant look.",
    icon: "bi-flower1",
    image:
      "https://goswadeshi.in/cdn/shop/products/3T6QRWtda4.jpg?v=1736937320",
  },
];


const stitchingTypes = [
  "Blouse Stitching",
  "Kurti Stitching",
  "Lehenga Stitching",
  "Salwar Suit Stitching",
  "Half Saree Stitching",
  "Gown Stitching",
  "Saree Services",
  "Western Wear Stitching",
  "Kids Wear Stitching",
  "Nightwear Stitching",
  "Bridal & Wedding Wear",
  "Dress Materials Stitching",
  "Petticoat Stitching",
  "Jacket & Waistcoat Stitching",
  "Maternity Wear Stitching",
  "Loungewear Stitching",
  "Uniform Stitching",
  "Dupatta & Veil Finishing",
  "Curtain & Home-Furnishing Stitching",
  "Alterations & Repairs",
  "Custom Stitching",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  stitchingType: "Blouse Stitching",
  quantity: "1",
  fabric: "Customer Provided",
  design: "Simple",
  fitting: "Regular Fit",
  deliveryDate: "",
  shoulder: "",
  bust: "",
  waist: "",
  hip: "",
  sleeve: "",
  length: "",
  message: "",
};

const measurements = [
  ["shoulder", "Shoulder"],
  ["bust", "Bust / Chest"],
  ["waist", "Waist"],
  ["hip", "Hip"],
  ["sleeve", "Sleeve Length"],
  ["length", "Garment Length"],
];

export default function Stitching() {
  const [formData, setFormData] = useState(initialForm);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccess(false);
    setError("");
  };

  const selectService = (category) => {
    setFormData((previous) => ({
      ...previous,
      stitchingType: category,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const enquiry = {
      ...formData,
      id: `ST-${Date.now()}`,
      status: "New",
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("lvs_stitching_enquiries") || "[]"
      );

      localStorage.setItem(
        "lvs_stitching_enquiries",
        JSON.stringify([enquiry, ...existing])
      );

      setSuccess(true);
      setFormData({ ...initialForm });
    } catch {
      setError("Unable to save your enquiry. Please try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="stitching-page">
      {/* ABOUT-PAGE-STYLE HERO BANNER */}
      <section className="about-hero stitch-about-hero">
        <div className="about-hero-orb about-orb-one" />
        <div className="about-hero-orb about-orb-two" />

        <div className="container about-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="about-hero-content">
                <span className="about-eyebrow">
                  <span className="eyebrow-line" />
                  PERSONALIZED TAILORING
                </span>

                <h1>
                  Every stitch tells <em>your story.</em>
                </h1>

                <p>
                  From beautifully fitted blouses and elegant kurtis to
                  lehengas, gowns and custom outfits, bring your dream design
                  to life with stitching made especially for you.
                </p>

                <div className="about-hero-actions">
                  <a href="#stitching-form" className="about-btn-primary">
                    Book Your Stitching{" "}
                    <i className="bi bi-arrow-up-right" />
                  </a>

                  <a href="#stitching-services" className="about-text-link">
                    Explore Services{" "}
                    <i className="bi bi-arrow-down-right" />
                  </a>
                </div>

                <div className="about-hero-note">
                  <span className="about-note-icon">
                    <i className="bi bi-suit-heart-fill" />
                  </span>

                  <span>
                    <strong>Thoughtfully stitched for you</strong>
                    <small>
                      Your fabric. Your design. Your perfect fit.
                    </small>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="about-hero-visual">
                <div className="about-hero-image-wrap">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFWaTbsUfMpi2bfwB2l776RfWqQ8xfSPvUSmhOSH5p4g&s=10"
                    alt="Custom Indian blouse and ethnic tailoring inspiration"
                    className="about-hero-image"
                  />

                  <div className="about-image-shade" />

                  <div className="about-image-label">
                    <span>MADE JUST FOR YOU</span>
                    <strong>Your style. Your story.</strong>
                  </div>
                </div>

                <div className="about-floating-stamp">
                  <i className="bi bi-stars" />
                  <span>STITCHED</span>
                  <span>WITH</span>
                  <span>LOVE</span>
                </div>

                <div className="about-vertical-label">
                  WOMEN NEEDS · PERSONAL TAILORING
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-hero-bottom">
          <span>DESIGN</span>
          <span className="about-bottom-line" />
          <span>STITCH · STYLE · SHINE</span>
        </div>
      </section>

      {/* STITCHING SERVICES */}
      <section
        className="stitch-services section-padding"
        id="stitching-services"
      >
        <div className="container">
          <div className="stitch-heading">
            <span className="stitch-eyebrow">OUR SERVICES</span>
            <h2>Tailoring made personal</h2>
            <p>
              Thoughtful details, considered fitting and a finish that feels
              like you.
            </p>
          </div>

          <div className="row g-4">
            {services.map((service) => (
              <div className="col-md-6 col-lg-4" key={service.title}>
                <article className="stitch-service-card">
                 <div className="stitch-service-image">
  <img
    src={service.image}
    alt={service.title}
    loading="lazy"
  />
</div>

                  <div className="stitch-service-body">
                    <div className="stitch-service-icon">
                      <i className={`bi ${service.icon}`} />
                    </div>

                    <span className="stitch-card-label">
                      CUSTOM TAILORING
                    </span>

                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <button
                      type="button"
                      className="stitch-service-link"
                      onClick={() => {
                        selectService(service.category);
                        document
                          .getElementById("stitching-form")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      Enquire now
                      <i className="bi bi-arrow-up-right" />
                    </button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STITCHING ENQUIRY FORM */}
      <section className="stitch-form-section" id="stitching-form">
        <div className="container stitch-form-container">
          <div className="stitch-heading">
            <span className="stitch-eyebrow">PERSONALISED FOR YOU</span>

            <h2>
              Tell us what you
              <br />
              <em>would love to wear.</em>
            </h2>

            <p>
              Share your preferences and our team can help you plan your
              stitching requirements.
            </p>
          </div>

          <form className="stitch-form-card" onSubmit={handleSubmit}>
            <div className="stitch-form-title">
              <div>
                <span className="stitch-card-label">
                  CUSTOM TAILORING ENQUIRY
                </span>
                <h3>Plan your perfect fit</h3>
              </div>

              <span className="stitch-required">* Required fields</span>
            </div>

            {/* CONTACT DETAILS */}
            <div className="stitch-form-block">
              <div className="stitch-form-section-title">
                <span>01</span>

                <div>
                  <h4>Your contact details</h4>
                  <p>How can we reach you?</p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <label htmlFor="stitch-name">
                    Full name <b>*</b>
                  </label>

                  <input
                    id="stitch-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stitch-phone">
                    Mobile number <b>*</b>
                  </label>

                  <input
                    id="stitch-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    autoComplete="tel"
                    pattern="[+0-9() -]{8,20}"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stitch-email">Email address</label>

                  <input
                    id="stitch-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stitch-type">
                    Stitching service <b>*</b>
                  </label>

                  <select
                    id="stitch-type"
                    name="stitchingType"
                    value={formData.stitchingType}
                    onChange={handleChange}
                    required
                  >
                    {stitchingTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* STITCHING PREFERENCES */}
            <div className="stitch-form-block">
              <div className="stitch-form-section-title">
                <span>02</span>

                <div>
                  <h4>Stitching preferences</h4>
                  <p>Tell us about your outfit and requirements.</p>
                </div>
              </div>

              <div className="row g-4">
                <div className="col-md-6">
                  <label htmlFor="stitch-quantity">
                    Number of pieces *
                  </label>

                  <input
                    id="stitch-quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="stitch-fabric">Fabric arrangement</label>

                  <select
                    id="stitch-fabric"
                    name="fabric"
                    value={formData.fabric}
                    onChange={handleChange}
                  >
                    <option value="Customer Provided">
                      I will provide the fabric
                    </option>

                    <option value="Studio Provided">
                      I need fabric from the store
                    </option>

                    <option value="Need Guidance">
                      I need help choosing fabric
                    </option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="stitch-design">Design preference</label>

                  <select
                    id="stitch-design"
                    name="design"
                    value={formData.design}
                    onChange={handleChange}
                  >
                    <option>Simple</option>
                    <option>Traditional</option>
                    <option>Designer</option>
                    <option>Embroidered</option>
                    <option>Party Wear</option>
                    <option>Custom Design</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="stitch-fitting">Fitting preference</label>

                  <select
                    id="stitch-fitting"
                    name="fitting"
                    value={formData.fitting}
                    onChange={handleChange}
                  >
                    <option>Regular Fit</option>
                    <option>Comfort / Loose Fit</option>
                    <option>Slim Fit</option>
                    <option>Custom Fit</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="stitch-date">
                    Preferred delivery date
                  </label>

                  <input
                    id="stitch-date"
                    name="deliveryDate"
                    type="date"
                    min={today}
                    value={formData.deliveryDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* MEASUREMENTS */}
            <div className="stitch-form-block">
              <div className="stitch-form-section-title">
                <span>03</span>

                <div>
                  <h4>Your measurements</h4>
                  <p>Optional — measurements can be entered in inches.</p>
                </div>
              </div>

              <div className="stitch-measurement-note">
                <i className="bi bi-rulers" />
                Not sure of your measurements? Leave them blank and ask our
                team for guidance.
              </div>

              <div className="row g-3">
                {measurements.map(([name, label]) => (
                  <div className="col-6 col-md-4" key={name}>
                    <label htmlFor={`stitch-${name}`}>{label}</label>

                    <div className="stitch-measurement-input">
                      <input
                        id={`stitch-${name}`}
                        name={name}
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        value={formData[name]}
                        onChange={handleChange}
                        placeholder="e.g. 36"
                      />

                      <span>in</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADDITIONAL REQUIREMENTS */}
            <div className="stitch-form-block">
              <div className="stitch-form-section-title">
                <span>04</span>

                <div>
                  <h4>Share your design ideas</h4>
                  <p>Tell us about any special requirements.</p>
                </div>
              </div>

              <label htmlFor="stitch-message">
                Additional requirements
              </label>

              <textarea
                id="stitch-message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your neckline, sleeves, embroidery, colour or design..."
              />
            </div>

            {/* SUBMIT */}
            <div className="stitch-submit-area">
              <p>
                <i className="bi bi-heart" /> Your details will be used for
                your stitching enquiry.
              </p>

              <button type="submit" className="stitch-submit-btn">
                Send Stitching Enquiry
                <i className="bi bi-arrow-up-right" />
              </button>
            </div>

            {success && (
              <div className="stitch-message-success" role="status">
                <i className="bi bi-check-circle-fill" />
                Your enquiry has been saved in this browser.
              </div>
            )}

            {error && (
              <div className="stitch-message-error" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
