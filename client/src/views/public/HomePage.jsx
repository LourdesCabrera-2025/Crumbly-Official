import React from "react";
import "../../styles/public/HomePage.css";
import Navbar from "../../components/public/Navbar.jsx";
import Orderbox from "../../assets/public/HomePage/Orderbox.jpg";
import Macarons from "../../assets/public/HomePage/macaronsPackage.jpg";
function HomePage() {
  return (
    <>
      <Navbar />
      <div className="hero-section">
        <img src={Orderbox} alt="Order Box" className="hero-image" />
      </div>
      <hr className="border-line" />
      <div className="spacer"></div>
      <div className="section-brand">
        <div
          className="grid min-h-[140px] w-250 place-items-center overflow-x-scroll rounded-lg lg:overflow-visible"
          id="Section-image"
        >
          <img
            src={Macarons}
            alt="Macarons"
            className="object-cover object-center w-250 rounded-lg shadow-xl h-full shadow-blue-gray-900/50"
          />
        </div>
        <div className="section-info">
          <h1 className="title">Sweteen Your Moments with Crumbly</h1>
          <p className="body-info">
            Handcrafted desserst made with natural ingredients, carefully packed
            in artisanal boxes. Perfect for sharing gifting, or indulying
            yourself
          </p>
          <ul>
            <li>Natural Ingredients</li>
            <li>Fast & Safe Delivery</li>
            <li>Personalized Boxes</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default HomePage;
