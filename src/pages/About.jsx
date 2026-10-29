
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gallery } from "../data/gallery";
// import "./About.css";

const imageOf = (item) =>
  item?.image || item?.img || item?.src || item?.url || "";

const storyImage =
  imageOf(gallery?.[6]) ||
  imageOf(gallery?.[0]) ||
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfGmfWybeKkWGW_AR3rmlfYqIayN_ba8-vDmR5PpLgrw&s=10";

const values = [
  {
    number: "01",
    icon: "bi-heart",
    title: "Customer First",
    description:
      "Every detail starts with understanding what our customers need and love.",
    className: "value-rose",
  },
  {
    number: "02",
    icon: "bi-gem",
    title: "Quality Matters",
    description:
      "We focus on thoughtful selections, beautiful details, and lasting value.",
    className: "value-gold",
  },
  {
    number: "03",
    icon: "bi-stars",
    title: "Style for Everyone",
    description:
      "Discover pieces that help you express your personality with confidence.",
    className: "value-lilac",
  },
  {
    number: "04",
    icon: "bi-shield-check",
    title: "Trust & Care",
    description:
      "A shopping experience built around clarity, care, and customer support.",
    className: "value-green",
  },
];

const reviews = [
  {
    quote:
      "The collection feels thoughtfully selected. I love having different styles to explore in one place.",
    name: "Happy Customer",
    detail: "Collection experience",
    initials: "HC",
  },
  {
    quote:
      "A lovely shopping experience with beautiful choices and a clean, easy-to-browse store.",
    name: "Our Customer",
    detail: "Shopping experience",
    initials: "OC",
  },
  {
    quote:
      "The variety makes it easier to find something that matches my style and everyday needs.",
    name: "Style Lover",
    detail: "Product variety",
    initials: "SL",
  },
];

export default function About() {
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll(".about-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const changeReview = (direction) => {
    setActiveReview(
      (current) => (current + direction + reviews.length) % reviews.length
    );
  };

  const review = reviews[activeReview];

  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-orb about-orb-one" />
        <div className="about-hero-orb about-orb-two" />

        <div className="container about-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <div className="about-hero-content about-reveal">
                <span className="about-eyebrow">
                  <span className="eyebrow-line" />
                  GET TO KNOW US
                </span>

                <h1>
                  Style that feels like <em>you.</em>
                </h1>

                <p>
                  More than a store, we are a destination for discovering
                  beautiful finds, expressing your individuality, and making
                  everyday shopping feel special.
                </p>

                <div className="about-hero-actions">
                  <Link to="/women-products" className="about-btn-primary">
                    Explore Collection <i className="bi bi-arrow-up-right" />
                  </Link>

                  <a href="#our-story" className="about-text-link">
                    Our story <i className="bi bi-arrow-down-right" />
                  </a>
                </div>

                <div className="about-hero-note">
                  <span className="about-note-icon">
                    <i className="bi bi-suit-heart-fill" />
                  </span>
                  <span>
                    <strong>Selected with care</strong>
                    <small>Made for your everyday style</small>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="about-hero-visual about-reveal">
                <div className="about-hero-image-wrap">
                  <img
                    src={storyImage}
                    alt="Fashion and lifestyle collection"
                    className="about-hero-image"
                  />

                  <div className="about-image-shade" />

                  <div className="about-image-label">
                    <span>YOUR STYLE</span>
                    <strong>Your story.</strong>
                  </div>
                </div>

                <div className="about-floating-stamp">
                  <i className="bi bi-stars" />
                  <span>STYLE</span>
                  <span>WITH</span>
                  <span>HEART</span>
                </div>

                <div className="about-vertical-label">WOMEN NEEDS · EST. WITH LOVE</div>
              </div>
            </div>
          </div>
        </div>

        <div className="about-hero-bottom">
          <span>DISCOVER</span>
          <span className="about-bottom-line" />
          <span>YOUR EVERYDAY FAVOURITES</span>
        </div>
      </section>

      {/* BRAND STORY */}
      <section id="our-story" className="about-story section-space">
        <div className="container about-container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-lg-6">
              <div className="about-story-visual about-reveal">
                <div className="about-story-image-frame">
                  <img src={storyImage} alt="A glimpse into our style" />
                </div>

                <div className="about-story-number">
                  <span>OUR</span>
                  <strong>STORY</strong>
                  <i className="bi bi-arrow-down-right" />
                </div>

                <div className="about-story-caption">
                  <i className="bi bi-flower1" />
                  <span>Thoughtful finds. Personal style.</span>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-story-copy about-reveal">
                <span className="about-eyebrow">
                  <span className="eyebrow-line" /> THE WOMEN NEEDS STORY
                </span>

                <h2>
                  A little more style.
                  <br />
                  <em>A lot more you.</em>
                </h2>

                <p>
                  Women Needs brings together products for different moods,
                  moments, and everyday needs. Our goal is to make exploring
                  your style feel simple, inspiring, and enjoyable.
                </p>

                <p>
                  We believe shopping should be more than choosing a product.
                  It should help you discover what feels right for you.
                </p>

                <div className="about-story-points">
                  <div className="about-story-point">
                    <span className="story-point-icon">
                      <i className="bi bi-check2" />
                    </span>
                    <div>
                      <strong>Curated choices</strong>
                      <small>Explore a variety of styles and essentials.</small>
                    </div>
                  </div>

                  <div className="about-story-point">
                    <span className="story-point-icon">
                      <i className="bi bi-check2" />
                    </span>
                    <div>
                      <strong>Shopping made simple</strong>
                      <small>Find your favourites without the clutter.</small>
                    </div>
                  </div>
                </div>

                <Link to="/women-products" className="about-underlined-link">
                  Find your favourites <i className="bi bi-arrow-up-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION + MISSION */}
      <section className="about-purpose section-space">
        <div className="container about-container">
          <div className="about-section-heading about-reveal">
            <div>
              <span className="about-eyebrow">
                <span className="eyebrow-line" /> WHAT GUIDES US
              </span>
              <h2>
                Our purpose, <em>your experience.</em>
              </h2>
            </div>
            <p>
              Every choice we make comes back to creating a better way to
              discover and enjoy the things you love.
            </p>
          </div>

          <div className="about-purpose-grid">
            <article className="purpose-card purpose-vision about-reveal">
              <div className="purpose-card-top">
                <span className="purpose-icon">
                  <i className="bi bi-eye" />
                </span>
                <span className="purpose-index">01 / VISION</span>
              </div>

              <div className="purpose-watermark">
                <i className="bi bi-eye" />
              </div>

              <h3>Make every choice feel personal.</h3>
              <p>
                To create a welcoming destination where every woman can
                explore her style, discover useful finds, and feel confident
                in her choices.
              </p>

              <span className="purpose-bottom-label">
                SEE YOURSELF IN EVERY DETAIL
              </span>
            </article>

            <article className="purpose-card purpose-mission about-reveal">
              <div className="purpose-card-top">
                <span className="purpose-icon">
                  <i className="bi bi-compass" />
                </span>
                <span className="purpose-index">02 / MISSION</span>
              </div>

              <div className="purpose-watermark">
                <i className="bi bi-compass" />
              </div>

              <h3>Bring better finds closer to you.</h3>
              <p>
                To offer a smooth, enjoyable shopping journey with thoughtful
                selections, helpful service, and products for different
                lifestyles.
              </p>

              <span className="purpose-bottom-label">
                DISCOVER MORE. SHOP WITH EASE.
              </span>
            </article>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values section-space">
        <div className="container about-container">
          <div className="about-values-heading about-reveal">
            <div>
              <span className="about-eyebrow">
                <span className="eyebrow-line" /> OUR DIFFERENCE
              </span>
              <h2>
                The little things
                <br />
                <em>that mean a lot.</em>
              </h2>
            </div>

            <span className="about-values-side-note">
              OUR VALUES <i className="bi bi-arrow-down-left" />
            </span>
          </div>

          <div className="about-values-grid">
            {values.map((value) => (
              <article
                className={`about-value-card ${value.className} about-reveal`}
                key={value.number}
              >
                <div className="value-card-top">
                  <span className="value-card-number">{value.number}</span>
                  <span className="value-card-icon">
                    <i className={`bi ${value.icon}`} />
                  </span>
                </div>

                <div className="value-card-copy">
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>

                <div className="value-card-footer">
                  <span>WHAT WE BELIEVE</span>
                  <i className="bi bi-arrow-up-right" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER EXPERIENCE */}
      <section className="about-experience section-space">
        <div className="container about-container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <div className="experience-intro about-reveal">
                <span className="about-eyebrow">
                  <span className="eyebrow-line" /> THE EXPERIENCE
                </span>

                <h2>
                  Shopping should feel <em>good.</em>
                </h2>

                <p>
                  From discovering something new to choosing your next
                  favourite, we want every step to feel welcoming and easy.
                </p>

                <div className="experience-feature-list">
                  <div>
                    <i className="bi bi-grid-1x2" />
                    <span>Explore different collections</span>
                  </div>
                  <div>
                    <i className="bi bi-heart" />
                    <span>Discover pieces that feel like you</span>
                  </div>
                  <div>
                    <i className="bi bi-chat-dots" />
                    <span>Reach out when you need help</span>
                  </div>
                </div>

                <Link to="/women-products" className="about-btn-dark">
                  Start Exploring <i className="bi bi-arrow-up-right" />
                </Link>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="about-review-panel about-reveal">
                <div className="review-panel-top">
                  <span className="review-panel-label">
                    <i className="bi bi-chat-quote" /> A NOTE ABOUT OUR STORE
                  </span>
                  <span className="review-counter">
                    0{activeReview + 1} <span>/ 0{reviews.length}</span>
                  </span>
                </div>

                <div className="review-main">
                  <div className="review-quote-mark">“</div>
                  <p className="review-quote">{review.quote}</p>

                  <div className="review-author">
                    <div className="review-avatar">{review.initials}</div>
                    <div>
                      <strong>{review.name}</strong>
                      <span>{review.detail}</span>
                    </div>
                    <i className="bi bi-suit-heart-fill review-heart" />
                  </div>
                </div>

                <div className="review-panel-bottom">
                  <span>YOUR EXPERIENCE MATTERS TO US</span>
                  <div className="review-controls">
                    <button
                      type="button"
                      aria-label="Previous review"
                      onClick={() => changeReview(-1)}
                    >
                      <i className="bi bi-arrow-left" />
                    </button>
                    <button
                      type="button"
                      aria-label="Next review"
                      onClick={() => changeReview(1)}
                    >
                      <i className="bi bi-arrow-right" />
                    </button>
                  </div>
                </div>

                <span className="review-decoration">
                  <i className="bi bi-stars" />
                </span>
              </div>
              <p className="about-review-disclaimer">
                Sample brand messages shown for layout preview. Replace these
                with genuine customer reviews before publishing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="about-contact-section">
        <div className="container about-container">
          <div className="about-contact-card about-reveal">
            <div className="contact-pattern contact-pattern-one" />
            <div className="contact-pattern contact-pattern-two" />

            <div className="contact-card-content">
              <span className="contact-eyebrow">
                <i className="bi bi-chat-heart" /> LET'S CONNECT
              </span>

              <h2>
                Have a question?
                <br />
                <em>We’re here for you.</em>
              </h2>

              <p>
                Need help or want to know more? Get in touch and let’s make
                your shopping experience a little easier.
              </p>

              <Link to="/contact" className="about-contact-button">
                Contact Us <i className="bi bi-arrow-up-right" />
              </Link>
            </div>

            <div className="contact-card-art" aria-hidden="true">
              <div className="contact-art-circle">
                <i className="bi bi-chat-heart" />
              </div>
              <span className="contact-art-spark spark-one">✳</span>
              <span className="contact-art-spark spark-two">✦</span>
              <span className="contact-art-caption">HERE TO HELP</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
