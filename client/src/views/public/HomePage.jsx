import "../../styles/public/HomePage.css";
import Navbar from "../../components/public/Navbar.jsx";
import Orderbox from "../../assets/public/HomePage/Orderbox.jpg";
import Macarons from "../../assets/public/HomePage/macaronsPackage.jpg";
import Footer from "../../assets/public/HomePage/footer.jpeg";
import { LeafFill, Truck, Boxes } from "react-bootstrap-icons";
import Cards from "../../components/public/card.jsx";
import Customers from "../../components/public/customers.jsx";

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
            <li><LeafFill className="icon" id="Leaf" />  Natural Ingredients</li>
            <li><Truck className="icon" id="Truck" /> Fast & Safe Delivery</li>
            <li><Boxes className="icon" id="Box" /> Personalized Boxes</li>
          </ul>
        </div>
      </div>
      <hr className="border-line2" />
      <div className="Hero-section-cards">
        <div className="container-title">
          <h1 className="title">Our Best-Selling Products</h1>
        </div>
        <Cards />
      </div>
      <hr className="border-line3" />
      <div className="Hero-section-customers">
        <div className="container-title">
          <h1 className="title !mt-2">Our Customers</h1>
        </div>
        <div className="container-costumers !mt-16">
          <Customers />
        </div>
      </div>

      <section className="w-screen absolute overflow-hidden !mt-34 !left-0">
        <img src={Footer} className="image-footer" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex items-start justify-start z-10 text-start text-white px-6 !ml-6 !mt-8">
          <h1 className="text-2xl md:text-3xl font-bold uppercase max-w-8xl" id="text-footer">
            Place your order now & sweeten your moments
          </h1>
        </div>
        <div className="absolute inset-0 flex items-start justify-start z-10 text-start text-white px-6 !ml-6 !mt-45">
          <p className="text-2xl md:text-2xl font-extralight max-w-3xl" id="subtext-footer">
            “Discover our selection of artisanal desserts, prepared with the highest quality ingredients. Perfect for sharing or enjoying on any special occasion.”
          </p>
        </div>
        <div className="absolute inset-0 flex items-start justify-start z-10 text-start text-white px-6 !ml-6 !mt-75">
          <button className="btn__footer">View Catalogue</button>
        </div>

        <div className="relative bg-[#3b2f2f] text-white">
          <svg
            className="absolute -top-[60px] w-full"
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#3b2f2f"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,69.3C960,85,1056,107,1152,106.7C1248,107,1344,85,1392,74.7L1440,64V120H0Z"
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
}

export default HomePage;
