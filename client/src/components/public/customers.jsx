import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function Customers() {
  const [testimonials, setTestimonials] = useState([]);
  const [page, setPage] = useState(1); // para paginación o batch loading
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar datos iniciales
  useEffect(() => {
    fetchTestimonials(page);
  }, []);

  // 🔹 Función para traer más datos desde la API
  const fetchTestimonials = async (pageNumber) => {
    try {
      setLoading(true);

      // Ejemplo de llamada a API (ajusta URL)
      const response = await fetch(`/api/testimonials?page=${pageNumber}`);
      const data = await response.json();

      // Agrega los nuevos resultados al final del array actual
      setTestimonials((prev) => [...prev, ...data]);

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar testimonios:", error);
      setLoading(false);
    }
  };

  // 🔹 Manejador del botón "View More"
  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTestimonials(nextPage);
  };

  return (
    <section className="w-full py-12 flex flex-col items-center bg-[#f9fafb]">


      {/* 🔹 Renderizar cards */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl px-4">
        {testimonials.map((item, index) => (
          <Card
            key={index}
            shadow={true}
            className="flex flex-row items-start w-full md:w-[32%] rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
          >
            <img
              src={item.img}
              alt={item.name}
              className="h-40 w-32 object-cover rounded-l-2xl"
            />
            <CardBody className="p-6 text-start">
              <Typography
                variant="h5"
                className="font-bold text-gray-900 mb-2"
                style={{ fontFamily: "'Gentium Plus', serif" }}
              >
                {item.name}
              </Typography>
              <Typography
                className="text-gray-700 italic leading-relaxed text-base"
                style={{ fontFamily: "'Gentium Plus', serif" }}
              >
                {item.text}
              </Typography>
              <div className="mt-2 h-[3px] w-16 bg-[#f3a694] rounded-full"></div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* 🔹 Botón para cargar más */}
      <Button
        variant="filled"
        color="pink"
        className="mt-8 rounded-full px-6 py-2 bg-[#eeb3b6] hover:bg-[#e59ca0] text-white shadow-md"
        onClick={handleViewMore}
        disabled={loading}
      >
        {loading ? "Loading..." : "View More"}
      </Button>
    </section>
  );
}
