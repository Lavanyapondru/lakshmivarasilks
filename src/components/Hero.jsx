import {Link} from "react-router-dom";
export default function Hero(){
 return <section className="hero">
  <div className="hero-orb orb-one"></div><div className="hero-orb orb-two"></div>
  <div className="container position-relative">
   <div className="row align-items-center g-5">
    <div className="col-lg-6">
     <span className="eyebrow"><i className="bi bi-stars"></i> Made for her everyday</span>
     <h1>Everything she needs.<br/><em>All in one place.</em></h1>
     <p className="lead">Discover Indian women’s fashion, personal essentials, skincare, beautiful dress materials and trusted stitching services — thoughtfully brought together.</p>
     <div className="d-flex gap-3 flex-wrap"><Link to="/shop" className="btn btn-brand btn-lg">Explore Collection <i className="bi bi-arrow-right ms-1"></i></Link><Link to="/stitching" className="btn btn-light btn-lg">Book Stitching</Link></div>
     <div className="hero-trust mt-4"><span><i className="bi bi-patch-check"></i> Curated picks</span><span><i className="bi bi-heart"></i> Made for women</span><span><i className="bi bi-truck"></i> Easy enquiries</span></div>
    </div>
    <div className="col-lg-6"><div className="hero-image-wrap"><img src="https://rudraluxe.co.in/cdn/shop/articles/IMG_0538_d49af817-ee4c-4995-90bb-c35c5f87220b.jpg?v=1776416468" alt="Indian women fashion"/></div></div>
   </div>
  </div>
 </section>
}