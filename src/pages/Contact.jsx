
import { useState } from "react";
// import "./Contact.css";

const stitchingServices = [
  {
    name: "Blouse Stitching",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0nP2wL1tElChIa1HqInDUiruxjLqYE9084TaRhWpYhg&s=10",
    description: "Traditional & designer blouses",
  },
  {
    name: "Kurti Stitching",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1JhxvldRm0wIbkRvzGc4CG-lvDMA_4r7qgAKKfyd4vg&s=10",
    description: "Everyday & designer kurtis",
  },
  {
    name: "Dress Stitching",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80",
    description: "Custom dresses & gowns",
  },
  {
    name: "Salwar Suit Stitching",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6vuIhSxH0pNNll8tPYmL4BJ83a0klLyWdB_dU6UHS7Q&s=10",
    description: "Salwar, churidar & suits",
  },
  {
    name: "Lehenga Stitching",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpc7FtY1OVTCNSFYCN4Qg8lEasQaH1ydZr_wIy4TVCeA&s=10",
    description: "Festive & bridal outfits",
  },
  {
    name: "Alterations",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQjnnvMpE5G-ufCGMEL1njWmaxQsE5DqLlcgp2jZ4OBQ&s",
    description: "Perfect fit, every time",
  },
];

const stitchingOptions = [
  "Blouse Stitching",
  "Kurti Stitching",
  "Dress Stitching",
  "Salwar Suit Stitching",
  "Lehenga Stitching",
  "Gown Stitching",
  "Saree Fall & Pico",
  "Skirt Stitching",
  "Pant & Trouser Stitching",
  "Kidswear Stitching",
  "Alterations",
  "Custom Stitching",
];

/*
  IMPORTANT:
  Replace these sample details with your real business information.
*/
const contactDetails = {
  address: "Add your shop address here, Hyderabad, Telangana, India",
  phone: "+91 XXXXX XXXXX",
  email: "your-email@example.com",
  hours: "Monday – Saturday",
  timings: "10:00 AM – 8:00 PM",
  mapQuery: "YOUR SHOP ADDRESS, HYDERABAD, TELANGANA, INDIA",
  whatsappNumber: "91XXXXXXXXXX",
};

const initialForm = {
  name: "",
  phone: "",
  email: "",
  stitchingType: "Blouse Stitching",
  quantity: "1",
  fabric: "Customer Provided",
  design: "Simple",
  fitting: "Regular Fit",
  shoulder: "",
  bust: "",
  waist: "",
  hip: "",
  sleeve: "",
  length: "",
  deliveryDate: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });

  const [contactSent, setContactSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSent(false);
  };

  const selectService = (service) => {
    setFormData((prev) => ({
      ...prev,
      stitchingType: service,
    }));

    setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo submission only. Connect an API or WhatsApp to send enquiries.
    console.log("Stitching enquiry:", formData);
    setSent(true);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setContactSent(false);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    /*
      Demo only: this logs the message in the browser console.
      Connect Firebase, an API, or an email service to receive messages.
    */
    console.log("Contact enquiry:", contactForm);
    setContactSent(true);

    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "General Enquiry",
      message: "",
    });
  };

  const hideMeasurements = [
    "Saree Fall & Pico",
    "Alterations",
  ].includes(formData.stitchingType);

  const today = new Date().toISOString().split("T")[0];

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    contactDetails.mapQuery
  )}&output=embed`;

  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contactDetails.mapQuery
  )}`;

  const phoneLink = contactDetails.phone.replace(/[^+\d]/g, "");

  const whatsappLink = `https://wa.me/${contactDetails.whatsappNumber}`;

  return (
    <main className="wn-stitching-page">
      {/* =====================================
          EXISTING HERO BANNER — PRESERVED
      ====================================== */}
      <section className="wn-stitch-hero">
        <div className="wn-stitch-hero-decoration wn-decoration-one" />
        <div className="wn-stitch-hero-decoration wn-decoration-two" />

        <div className="container wn-stitch-hero-container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <div className="wn-stitch-hero-copy">
                <span className="wn-stitch-eyebrow">
                  <span /> MADE WITH LOVE
                </span>

                <h1>
                  Your style.
                  <br />
                  <em>Your perfect fit.</em>
                </h1>

                <p className="wn-stitch-hero-description">
                  From elegant blouses to beautiful dresses and
                  everyday kurtis, let us bring your outfit ideas
                  to life with stitching made just for you.
                </p>

                
<div className="wn-stitch-hero-actions">
  <a
    href="#contact-us"
    className="wn-stitch-primary-btn"
  >
    Book Your Stitching
    <i className="bi bi-arrow-up-right" />
  </a>

  <a
    href="#stitching-services"
    className="wn-stitch-text-link"
  >
    Explore Services
    <i className="bi bi-arrow-down-right" />
  </a>
</div>


                <div className="wn-stitch-trust">
                  <span className="wn-stitch-heart">
                    <i className="bi bi-heart-fill" />
                  </span>

                  <div>
                    <strong>Stitched around you</strong>
                    <p>Your style, your comfort, your choice.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="wn-stitch-hero-visual">
                <div className="wn-stitch-hero-photo">
                  <img
                    src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=1000&q=85"
                    alt="Elegant women's fashion boutique"
                  />

                  <div className="wn-stitch-photo-caption">
                    <span>YOUR STYLE</span>
                    <h2>Made for you.</h2>
                  </div>
                </div>

                <div className="wn-stitch-round-badge">
                  <i className="bi bi-stars" />
                  <span>STYLE</span>
                  <span>WITH</span>
                  <span>HEART</span>
                </div>

                <div className="wn-stitch-floating-note">
                  <i className="bi bi-scissors" />
                  <div>
                    <strong>Made to measure</strong>
                    <span>Designed around you</span>
                  </div>
                </div>

                <span className="wn-stitch-side-caption">
                  WOMEN NEEDS · MADE WITH LOVE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="wn-stitch-hero-footer">
          DISCOVER <span /> YOUR PERFECT FIT
        </div>
      </section>
      
<section id="stitching-services" className="py-5">
  <div className="container">
    <div className="wn-contact-heading">
      <span className="wn-contact-eyebrow">
        MADE WITH LOVE
      </span>
      <h2>Explore Our Stitching Services</h2>
      <p>Choose a style for your next outfit.</p>
    </div>

    <div className="row g-4">
      {stitchingServices.map((service) => (
        <div className="col-6 col-lg-4" key={service.name}>
          <div className="h-100 border rounded-4 overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="w-100"
              style={{ height: "450px", objectFit: "cover" }}
            />
            <div className="p-3">
              <h3 className="h5">{service.name}</h3>
              <p>{service.description}</p>
              <a
                href="#contact-us"
                onClick={() => selectService(service.name)}
              >
                Book this service →
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* =====================================
          CONTACT INFORMATION
      ====================================== */}
      <section className="wn-contact-info-section" id="contact-details">
        <div className="container">
          <div className="wn-contact-heading">
            <span className="wn-contact-eyebrow">WE ARE HERE FOR YOU</span>
            <h2>Let's get in touch.</h2>
            <p>
              Have a question about stitching, an outfit, or an order?
              We'd love to hear from you.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <article className="wn-contact-info-card">
                <div className="wn-contact-info-icon">
                  <i className="bi bi-geo-alt" />
                </div>

                <span className="wn-contact-card-label">VISIT OUR STORE</span>
                <h3>Our Location</h3>

                <p>{contactDetails.address}</p>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="wn-contact-card-link"
                >
                  Get directions <i className="bi bi-arrow-up-right" />
                </a>
              </article>
            </div>

            <div className="col-md-6 col-lg-3">
              <article className="wn-contact-info-card">
                <div className="wn-contact-info-icon">
                  <i className="bi bi-telephone" />
                </div>

                <span className="wn-contact-card-label">GIVE US A CALL</span>
                <h3>Phone Number</h3>

                <p>{contactDetails.phone}</p>

                <a
                  href={`tel:${phoneLink}`}
                  className="wn-contact-card-link"
                >
                  Call us <i className="bi bi-arrow-up-right" />
                </a>
              </article>
            </div>

            <div className="col-md-6 col-lg-3">
              <article className="wn-contact-info-card">
                <div className="wn-contact-info-icon">
                  <i className="bi bi-envelope" />
                </div>

                <span className="wn-contact-card-label">WRITE TO US</span>
                <h3>Email Address</h3>

                <p className="wn-contact-email">{contactDetails.email}</p>

                <a
                  href={`mailto:${contactDetails.email}`}
                  className="wn-contact-card-link"
                >
                  Send an email <i className="bi bi-arrow-up-right" />
                </a>
              </article>
            </div>

            <div className="col-md-6 col-lg-3">
              <article className="wn-contact-info-card">
                <div className="wn-contact-info-icon">
                  <i className="bi bi-clock" />
                </div>

                <span className="wn-contact-card-label">WHEN TO VISIT</span>
                <h3>Opening Hours</h3>

                <p>
                  {contactDetails.hours}
                  <br />
                  {contactDetails.timings}
                </p>

                <span className="wn-contact-card-link wn-contact-static-link">
                  We look forward to meeting you
                </span>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FEEL FREE TO CONTACT US
      ====================================== */}
      <section className="wn-contact-message-section" id="contact-us">
        <div className="container">
          <div className="row align-items-start g-5">
            <div className="col-lg-5">
              <div className="wn-contact-message-copy">
                <span className="wn-contact-eyebrow">
                  FEEL FREE TO CONTACT US
                </span>

                <h2>
                  We'd love to
                  <br />
                  <em>hear from you.</em>
                </h2>

                <p>
                  Whether you need help choosing a stitching service,
                  want to discuss a custom design, or have a question
                  about your order, send us a message.
                </p>

                <div className="wn-contact-promise">
                  <span className="wn-contact-promise-icon">
                    <i className="bi bi-heart" />
                  </span>

                  <div>
                    <h3>Personal attention</h3>
                    <p>
                      Every question and every design idea matters to us.
                    </p>
                  </div>
                </div>

                <div className="wn-contact-promise">
                  <span className="wn-contact-promise-icon">
                    <i className="bi bi-chat-dots" />
                  </span>

                  <div>
                    <h3>Let's talk about your idea</h3>
                    <p>
                      Share your requirements and tell us what you have
                      in mind.
                    </p>
                  </div>
                </div>

                <div className="wn-contact-quick-links">
                  <a
                    href={`tel:${phoneLink}`}
                    className="wn-contact-quick-link"
                    aria-label="Call us"
                  >
                    <i className="bi bi-telephone-fill" />
                  </a>

                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="wn-contact-quick-link"
                    aria-label="Email us"
                  >
                    <i className="bi bi-envelope-fill" />
                  </a>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="wn-contact-quick-link"
                    aria-label="Contact us on WhatsApp"
                  >
                    <i className="bi bi-whatsapp" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <form
                className="wn-contact-form"
                onSubmit={handleContactSubmit}
              >
                <div className="wn-contact-form-heading">
                  <span>YOUR MESSAGE</span>
                  <h3>Send us an enquiry</h3>
                  <p>Fill in the details below to get in touch.</p>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="contact-name">
                      Your name <b>*</b>
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Enter your name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contact-email">
                      Email address <b>*</b>
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contact-phone">Phone number</label>

                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={handleContactChange}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contact-subject">Enquiry type</label>

                    <select
                      id="contact-subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactChange}
                    >
                      <option>General Enquiry</option>
                      <option>Stitching Services</option>
                      <option>Custom Design</option>
                      <option>Order Enquiry</option>
                      <option>Delivery Information</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label htmlFor="contact-message">
                      Your message <b>*</b>
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      rows="5"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <button type="submit" className="wn-contact-submit">
                      Send Message
                      <i className="bi bi-arrow-up-right" />
                    </button>
                  </div>
                </div>

                {contactSent && (
                  <div className="wn-contact-success" role="status">
                    <i className="bi bi-check-circle-fill" />
                    Your message was processed by the demo form. To ensure
                    we actually receive it, connect this form to an email
                    service or backend.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          STORE LOCATION & GOOGLE MAP
      ====================================== */}
      <section className="wn-contact-map-section" id="our-location">
        <div className="container">
          <div className="wn-contact-heading">
            <span className="wn-contact-eyebrow">COME VISIT US</span>
            <h2>Find us on the map.</h2>
            <p>
              Planning a visit? Use the map to find our store and get
              directions.
            </p>
          </div>

          <div className="wn-contact-map-card">
            <div className="wn-contact-map-details">
              <div className="wn-contact-map-icon">
                <i className="bi bi-geo-alt-fill" />
              </div>

              <span className="wn-contact-card-label">OUR STORE</span>
              <h3>We'd be happy to see you.</h3>

              <p>{contactDetails.address}</p>

              <div className="wn-contact-map-detail-row">
                <i className="bi bi-clock" />
                <div>
                  <strong>Opening hours</strong>
                  <span>
                    {contactDetails.hours}
                    <br />
                    {contactDetails.timings}
                  </span>
                </div>
              </div>

              <div className="wn-contact-map-detail-row">
                <i className="bi bi-telephone" />
                <div>
                  <strong>Contact number</strong>
                  <span>{contactDetails.phone}</span>
                </div>
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="wn-contact-directions-btn"
              >
                Get Directions
                <i className="bi bi-arrow-up-right" />
              </a>
            </div>

            <div className="wn-contact-map-frame">
              <iframe
                title="Laxmi Vara Silks store location map"
                src={mapUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FINAL CONTACT CALL TO ACTION
      ====================================== */}
      <section className="wn-contact-cta">
        <div className="container">
          <div className="wn-contact-cta-inner">
            <div>
              <span>YOUR NEXT FAVOURITE OUTFIT STARTS HERE</span>

              <h2>
                Have an idea?
                <br />
                Let's stitch it together.
              </h2>

              <p>
                Get in touch with us to discuss your requirements and
                create something that feels uniquely yours.
              </p>
            </div>

            <div className="wn-contact-cta-actions">
              <a href="#contact-us" className="wn-contact-cta-primary">
                Contact Us <i className="bi bi-arrow-up-right" />
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="wn-contact-cta-secondary"
              >
                <i className="bi bi-whatsapp" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
