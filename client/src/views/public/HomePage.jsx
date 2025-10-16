import React from "react";
import "../../styles/public/HomePage.css"
import Navbar from "../../components/public/Navbar.jsx";
import Orderbox from "../../assets/public/HomePage/Orderbox.jpg"
function HomePage() {
  return (
    <>
      <Navbar />
      <div className="container-body">
        <img src={Orderbox} alt="Productos Personalizados" className="image-banner" />
      </div>
    </>
  );
}

export default HomePage