import Navbar from "../../components/public/Navbar";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import { Shop, Truck, CakeFill, ShieldCheck, Whatsapp, ArrowRight, Star } from "react-bootstrap-icons";
import "../../styles/public/detailProduct.css";
import { useState } from "react";
import Cards from "../../components/public/card";
import "../../styles/public/HomePage.css"
export function detailProduct() {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");

    const stars = [1, 2, 3, 4, 5];

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Rating", rating);
        console.log("Comentario:", comment);

        alert("Comentario enviado (solo local)");

        setRating(0);
        setHover(0);
        setComment("");
    };
    return (
        <>
            <Navbar />
            <div className="w-full !pt-20 m-3">
                <Breadcrumbs separator=" - ">
                    <a href="/detailProduct" className="opacity-60 !ml-3">
                        Detail Product
                    </a>
                </Breadcrumbs>
            </div>
            <div className="container !mt-10" id="container">
                <div className="container-right">
                    <h1 className="title">PRODUCTS NAME</h1>
                    <div className="container-image">
                        <img src="https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/no_image.jpg" alt="imagen no disponible" className="image-producto" />
                    </div>
                    <div className="flex justify-center" id="ranking">
                        <span className="w-[450px] gap-1">Calificación Promedio  0 de 5</span>
                    </div>
                </div>
                <div className="container-left ">
                    <p className="text">Metodos de Entrega Disponible</p>
                    <div className="options-content">
                        <span className="delivery1 "><Shop /> Entregas en tienda     </span>
                        <span className="delivery2 "><Truck /> Entregas a Domicilio</span>
                    </div>

                    <p className="text">Selecciona la opción deseada</p>
                    <div className="product-options">
                        <div className={`option ${selectedSize === "S" ? "active" : ""}`} onClick={() => setSelectedSize("S")}>
                            <CakeFill className="icon" id="icon" />
                            <h4 className="subtext">Talla S</h4>
                            <p className="legend">1 persona</p>
                        </div>
                        <div className={`option ${selectedSize === "M" ? "active" : ""}`} onClick={() => setSelectedSize("M")}>
                            <CakeFill className="icon" id="icon" />
                            <h4 className="subtext">Talla M</h4>
                            <p className="legend">2-3 personas</p>
                        </div>
                        <div className={`option ${selectedSize === "L" ? "active" : ""}`} onClick={() => setSelectedSize("L")}>
                            <CakeFill className="icon" id="icon" />
                            <h4 className="subtext">Talla L</h4>
                            <p className="legend">4-6 personas</p>
                        </div>

                    </div>

                    <div className="container-count">

                        <p className="text-label">Cantidad a llevar</p>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                setQuantity(isNaN(value) || value < 1 ? 1 : value);
                            }}
                            className="quantity-input" />

                        <Button className="qty-btn" onClick={() => setQuantity(prev => prev + 1)}>+</Button>
                        <Button className="qty-btn" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</Button>
                    </div>
                    <Button className="btn" type="submit"> Añadir al carrito</Button>
                </div>
            </div>
            <hr className="border-gray-500" />
            <div className="ous">
                <div className="circle">
                    <ShieldCheck className="icon" id="icons" />
                    <div className="text-brand">
                        <h5>Tu compra 100% segura</h5>
                        <p className="subtext-brand">la forma más segura de pagar</p>
                    </div>
                </div>
                <div className="circle">
                    <Whatsapp className="icon" id="icons" />
                    <div className="text-brand">
                        <h5>Ayuda con tu compra</h5>
                        <p className="subtext-brand"><a href="#">Más información aqui</a></p>
                    </div>
                </div>
                <div className="circle">
                    <ArrowRight className="icon" id="icons" />
                    <div className="text-brand">
                        <h5>Paso a Paso</h5>
                        <p className="subtext-brand">Proceso de compra</p>
                    </div>
                </div>
            </div>
            <div className="container-cards">
                <h2 className="title-card">Productos Relacionados</h2>
                <Cards />
            </div>
            <hr className="border-gray-500" />
            <div className="container-title">
                <h1>Descipción de Producto</h1>
            </div>
            <div className="container-text">
                <p className="description">El tiramisú es un postre clásico de la repostería italiana que combina suavidad, cremosidad y un balance único de sabores. Se prepara con capas de bizcochos de soletilla ligeramente empapados en café espresso, lo que aporta un toque aromático y delicado. Entre cada capa se extiende una mezcla cremosa a base de queso mascarpone, huevos y azúcar, que le da su textura aterciopelada y ligera. Finalmente, se corona con un espolvado de cacao puro que realza su sabor y equilibra la dulzura con un ligero amargor.
                    Este postre destaca por su elegancia y versatilidad: es ideal tanto para disfrutar en una ocasión especial como para compartir en reuniones familiares o entre amigos. Cada bocado ofrece una experiencia suave y placentera que conquista desde el primer instante.</p>
            </div>
            <hr className="border-gray-500 !mt-10" />
            <div className="rate-use">
                <h5>Puntuación del Producto</h5>
                <div className="flex gap-3">
                    {stars.map((value) => (
                        <div
                            key={value}
                            className="select-rate"
                            onMouseEnter={() => setHover(value)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(value)}>
                            <Star
                                className="icon"
                                size={35}
                                color={(hover || rating) >= value ? "#F5B301" : "#C6C6C6"}
                                fill={(hover || rating) >= value ? "#F5B301" : "#FFFFFF"}
                                style={{ cursor: "pointer" }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="comments-title">
                <h5 className="titulo-comentario">Deja tu comentario </h5>
                <div className="comments-area">
                    <textarea id="text-area"
                        placeholder="Escribe tu comentario ..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}></textarea>
                </div>

                <Button
                    type="submit" id="btn-comment">Enviar Comentario </Button>
            </div>
            <section className="w-screen absolute overflow-visible !mt-34 !left-0">
                <div className="absolute bottom-0 left-0 w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
                        <path fill="#3a2c29" fillOpacity="1" d="M0,192L80,192C160,192,320,192,480,202.7C640,213,800,235,960,234.7C1120,235,1280,213,1360,202.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
                    </svg>
                </div>                <footer className="relative z-50  px-10 pt-32 pb-10 ">
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

export default detailProduct