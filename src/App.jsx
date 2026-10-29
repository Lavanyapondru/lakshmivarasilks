import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { ShopProvider } from "./context/ShopContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Innerwear from "./pages/Innerwear";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Clothing from "./pages/Clothing";
import WomenProducts from "./pages/WomenProducts";
import Skincare from "./pages/Skincare";
import DressMaterials from "./pages/DressMaterials";
import Stitching from "./pages/Stitching";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";

import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import AuthModal from "./components/AuthModal";
import CheckoutModal from "./components/CheckoutModal";
import OrderSuccessModal from "./components/OrderSuccessModal";
import ProfileModal from "./components/ProfileModal";
import Toast from "./components/Toast";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />

      {!isAdmin && <Navbar />}

      <main>
        <Routes>
          {/* Customer Store Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/innerwear" element={<Innerwear />} />
          <Route path="/women-products" element={<WomenProducts />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/dress-materials" element={<DressMaterials />} />
          <Route path="/stitching" element={<Stitching />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin Dashboard & Management Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminDashboard />} />
        </Routes>
      </main>

      {!isAdmin && <Footer />}

      {/* Global Drawers & Modals for Store */}
      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <ProfileModal />
      <Toast />
    </>
  );
}

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;