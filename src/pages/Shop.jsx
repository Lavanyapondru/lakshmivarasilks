import SectionTitle from "../components/SectionTitle";
import ProductCard from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

export default function Shop() {
  const { products } = useShop();
  const visibleProducts = products.filter((p) => p.isActive !== false);

  return (
    <section className="page-section">
      <div className="container">
        <SectionTitle
          eyebrow="THE COLLECTION"
          title="Shop all women’s needs"
          text="Curated sarees, dresses, skincare, materials, and everyday personal essentials."
        />
        <div className="row g-4">
          {visibleProducts.map((p) => (
            <div className="col-6 col-md-4 col-lg-3" key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}