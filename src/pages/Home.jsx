
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
import { categories } from "../data/products";
import { gallery } from "../data/gallery";
// import "./Home.css";

const slides = [
  {
    number: "01",
    eyebrow: "FASHION FOR EVERY MOMENT",
    title: "Your style. Your story.",
    highlight: "Wear what feels like you.",
    description:
      "Explore sarees, ethnic wear, western outfits, nightwear and kids' clothing.",
    icon: "bi-person-standing-dress",
    tag: "THE CLOTHING EDIT",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85",
    alt: "Traditional Indian fashion collection",
    button: "Explore Clothing",
    path: "/clothing",
  },
  {
    number: "02",
    eyebrow: "MADE JUST FOR YOU",
    title: "A perfect fit, every time.",
    highlight: "Your design. Your way.",
    description:
      "Custom blouse stitching, kurtis, dresses and alterations made around your style.",
    icon: "bi-scissors",
    tag: "CUSTOM STITCHING",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk0TkpzXyle3olzeeEKBBDofDYJX2vXV6giaRPhFeWgw&s",
    // alt: "Tailoring and garment craftsmanship",
    button: "Explore Stitching",
    path: "/stitching",
  },
  {
    number: "03",
    eyebrow: "FABRIC MEETS CREATIVITY",
    title: "Imagine it. Create it.",
    highlight: "Begin with beautiful fabric.",
    description:
      "Discover dress materials, lovely colours and fabrics ready for your next outfit.",
    icon: "bi-palette",
    tag: "THE FABRIC STUDIO",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTscBRcMcn4OX1lxloRwnitai60uHSBS-703kegNrtq2Q&s=10",
    alt: "Textiles and fabric inspiration",
    button: "Explore Materials",
    path: "/dress-materials",
  },
  {
    number: "04",
    eyebrow: "A LITTLE SELF-CARE",
    title: "Make time for yourself.",
    highlight: "Your everyday glow.",
    description:
      "Discover skincare and self-care essentials for a feel-good everyday routine.",
    icon: "bi-stars",
    tag: "THE SELF-CARE EDIT",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85",
    alt: "Skincare and beauty products",
    button: "Explore Skincare",
    path: "/skincare",
  },
  {
    number: "05",
    eyebrow: "COMFORT AND CONFIDENCE",
    title: "Comfort in every moment.",
    highlight: "Feel good in your own way.",
    description:
      "Find innerwear essentials, lingerie sets, camisoles and everyday comfort.",
    icon: "bi-heart",
    tag: "THE COMFORT EDIT",
    image:
      "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=1000&q=85",
    alt: "Women's wardrobe and fashion essentials",
    button: "Explore Innerwear",
    path: "/innerwear",
  },
  {
    number: "06",
    eyebrow: "THE FINISHING TOUCH",
    title: "Small details. Big style.",
    highlight: "Find your favourites.",
    description:
      "Shop footwear, handbags, watches, beauty products and everyday accessories.",
    icon: "bi-handbag",
    tag: "THE ACCESSORIES EDIT",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    alt: "Handbag and fashion accessories",
    button: "Explore Women's Products",
    path: "/women-products",
  },
];

function HomeSlider() {
  const [active, setActive] = useState(0);

  const slide = slides[active];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((previous) => (previous + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const moveSlide = (direction) => {
    setActive(
      (previous) => (previous + direction + slides.length) % slides.length
    );
  };

  return (
    <section className="home-showcase" aria-label="Explore our collections">
      <div className="home-showcase-decoration decoration-one" />
      <div className="home-showcase-decoration decoration-two" />

      <div className="container">
        <div className="showcase-top">
          <span>
            <i className="bi bi-stars" /> WELCOME TO WOMEN NEEDS
          </span>
          <span className="showcase-counter">
            {slide.number} <span>/ 06</span>
          </span>
        </div>

        <div className="showcase-layout" key={slide.number}>
          <div className="showcase-content">
            <div className="showcase-eyebrow">
              <span />
              {slide.eyebrow}
            </div>

            <h1>
              {slide.title}
              <span>{slide.highlight}</span>
            </h1>

            <p className="showcase-description">{slide.description}</p>

            <div className="showcase-benefits">
              <span>
                <i className="bi bi-heart-fill" /> Selected with care
              </span>
              <span>
                <i className="bi bi-stars" /> Made for your lifestyle
              </span>
            </div>

            <div className="showcase-actions">
              <Link to={slide.path} className="showcase-button">
                {slide.button}
                <i className="bi bi-arrow-up-right" />
              </Link>

              <Link to="/contact" className="showcase-contact">
                Get in touch <i className="bi bi-arrow-right" />
              </Link>
            </div>

            <div className="showcase-controls">
              <button
                type="button"
                onClick={() => moveSlide(-1)}
                aria-label="Previous slide"
                className="showcase-arrow"
              >
                <i className="bi bi-arrow-left" />
              </button>

              <div className="showcase-dots">
                {slides.map((item, index) => (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActive(index)}
                    className={`showcase-dot ${
                      active === index ? "active" : ""
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={active === index ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => moveSlide(1)}
                aria-label="Next slide"
                className="showcase-arrow"
              >
                <i className="bi bi-arrow-right" />
              </button>
{/* 
              <span className="showcase-auto">
                <i className="bi bi-arrow-repeat" /> 3 SEC SLIDESHOW
              </span> */}
            </div>
          </div>

          <div className="showcase-visual">
            <div className="showcase-image-frame">
              <img
                src={slide.image}
                alt={slide.alt}
                className="showcase-image"
              />

              <div className="showcase-image-overlay" />

              {/* <span className="showcase-image-label">
                WOMEN NEEDS <span>·</span> MADE WITH LOVE
              </span> */}

              <div className="showcase-image-caption">
                <span>{slide.tag}</span>
                <h2>{slide.highlight}</h2>
              </div>
            </div>

            <div className="showcase-floating-icon">
              <i className={`bi ${slide.icon}`} />
            </div>

            <div className="showcase-image-note">
              <i className="bi bi-heart-fill" />
              <div>
                <strong>YOUR EVERYDAY FAVOURITES</strong>
                <span>Discover something lovely</span>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-bottom">
          <span>DISCOVER YOUR STYLE</span>
          <span className="showcase-bottom-line" />
          <span>EXPLORE OUR COLLECTIONS</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { products } = useShop();
  const visibleProducts = products.filter((p) => p.isActive !== false);

  return (
    <>
      {/* Automatic 6-slide collection banner */}
      <HomeSlider />

      {/* Shop By Need */}
      <section className="shop-needs-section py-5">
        <div className="container">
          <SectionTitle
            eyebrow="SHOP BY NEED"
            title="A little something for every part of her day"
            text="From festive dressing to everyday comfort and self-care."
          />

          <div className="row g-4 shop-needs-grid">
            {categories.map((category) => (
              <div className="col-6 col-lg" key={category.path}>
                <Link
                  to={category.path}
                  className="need-card"
                  aria-label={`Explore ${category.title}`}
                >
                  <span className="need-card-glow" />

                  <div className="need-card-icon">
                    <i className={`bi ${category.icon}`} aria-hidden="true" />
                  </div>

                  <div className="need-card-content">
                    <h3>{category.title}</h3>
                    <p>{category.text}</p>
                  </div>

                  <div className="need-card-footer">
                    <span>Explore Collection</span>
                    <span className="need-card-arrow">
                      <i className="bi bi-arrow-up-right" />
                    </span>
                  </div>

                  <span className="need-card-line" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Favourites */}
      <section className="soft-section py-5">
        <div className="container">
          <SectionTitle
            eyebrow="CUSTOMER FAVOURITES"
            title="Loved pieces, chosen with care"
          />

          <div className="row g-4">
            {visibleProducts.slice(0, 4).map((product) => (
              <div className="col-6 col-lg-3" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-outline-brand">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="story-strip">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src={gallery[3]}
                alt="Women Needs collection"
                loading="lazy"
              />
            </div>

            <div className="col-lg-6">
              <span className="eyebrow">OUR PROMISE</span>
              <h2>Style that feels like you.</h2>

              <p>
                Women Needs is a boutique concept created around
                the idea that women should be able to discover
                fashion, self-care and tailoring in one
                comfortable space.
              </p>

              <Link to="/about" className="btn btn-brand">
                Know Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
