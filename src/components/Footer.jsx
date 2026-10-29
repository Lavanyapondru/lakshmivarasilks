import {Link} from "react-router-dom";
export default function Footer(){
 return <footer className="footer pt-5 pb-3">
  <div className="container">
   <div className="row g-4">
    <div className="col-lg-4">
        <div className="brand footer-brand">
            <a href="#" className="d-flex gap-2"> <span className="brand-mark">LVS</span><span className="fs-5"><b>Laxmi</b> Vara<small className="text-light">Silks </small></span>
</a>
        </div>
        <p className="mt-3">A warm, modern destination for Indian women’s fashion, personal essentials, skincare, dress materials and custom stitching.</p></div>
    <div className="col-6 col-lg-2"><h6>Explore</h6><Link to="/clothing">Clothing</Link><Link to="/skincare">Skincare</Link><Link to="/stitching">Stitching</Link><Link to="/gallery">Gallery</Link><Link to="/innerwear">Innerwear</Link></div>
    <div className="col-6 col-lg-2"><h6>Collections</h6><Link to="/women-products">Women Products</Link><Link to="/dress-materials">Dress Materials</Link><Link to="/shop">All Products</Link><Link to="/about">About Us</Link><Link to="/admin/dashboard" className="text-warning fw-semibold mt-2"><i className="bi bi-shield-lock me-1"></i>Admin Portal</Link></div>
    <div className="col-lg-4"><h6>Contact</h6><p><i className="bi bi-geo-alt me-2"></i>Hyderabad, Telangana, India</p><p><i className="bi bi-telephone me-2"></i>+91 90000 00000</p><p><i className="bi bi-envelope me-2"></i>hello@womenneeds.in</p><div className="socials"><a href="#"><i className="bi bi-instagram"></i></a><a href="#"><i className="bi bi-facebook"></i></a><a href="#"><i className="bi bi-whatsapp"></i></a></div></div>
   </div>
   <hr/><div className="d-flex justify-content-between small"><span>© 2026 Women Needs. Dummy content for template.</span><span>Made with care for women.</span></div>
  </div>
 </footer>
}