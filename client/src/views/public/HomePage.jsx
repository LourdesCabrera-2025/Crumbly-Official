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

        <div className="absolute bottom-0 left-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#3a2c29" fill-opacity="1" d="M0,192L80,192C160,192,320,192,480,202.7C640,213,800,235,960,234.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
          </svg>
        </div>

        <footer className="relative z-50  px-10 pt-32 pb-10 ">
          <div className="flex items-center justify-between">

            <h2 className="font-bold text-lg tracking-wide text-white !ml-6" id="type-log">CRUMBLY</h2>

            <div className="flex flex-wrap justify-end text-sm space-x-4 text-white !mr-6">
              <a href="#" className="!mr-3" id="pib">About Us</a>
              <span>|</span>
              <a href="#" className="!mr-3 !ml-3" id="pib">Privacy Policy</a>
              <span> | </span>
              <a href="#" className="!mr-3 !ml-3" id="pib">License</a>
              <span>|</span>
              <a href="#" className="!ml-3 !mr-3" id="pib">Contact Sale</a>
            </div>
          </div>

          <p className="text-center text-xs mt-6 text-white">© 2025, Crumbly</p>
        </footer>
      </section>

    </>
  );
}

export default HomePage;
