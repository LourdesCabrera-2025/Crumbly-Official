import React from "react";
import "../../styles/public/HomePage.css"
import Navbar from "../../components/public/Navbar.jsx";
import Orderbox from "../../assets/public/HomePage/Orderbox.jpg"
import Macarons from "../../assets/public/HomePage/macaronsPackage.jpg"
function HomePage() {
  return (
    <>
      <Navbar />
      <div className="container-body">
        <img src={Orderbox} alt="Productos Personalizados" className="image-banner" />
      </div>
      <hr className="border-line"/>
      <div className="info-section">
        <div className="image-info">
          <img src={Macarons} alt="Macarons" className="h-100 w-fit" />
        </div>
        <div className="text-info">
            <h4>Sweeten your Moments with Crumbly</h4>
        </div>
      </div>
    </>
  );
}

export default HomePage