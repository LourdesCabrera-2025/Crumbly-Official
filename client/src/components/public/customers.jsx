import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cards";
import "../../styles/public/Customers.css";

export function CustomersReview() {
    const reviews = [
        {
            id: 1,
            name: "Brad Cooper",
            img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
            text:"The tiramisu is simply spectacular, creamy and with the perfect balance of coffe and cocoa",
        },
        {
            id: 2,
            name: "Barbara Blace",
            img: "https://images.unsplash.com/photo-1610637761528-aef85c9cff02?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
            text: "The pecan pie reminded me of family gatherings, crispy and sweet to perfection",
        },
        {
            id: 3,
            name: "Karina Gutierrez",
            img: "https://plus.unsplash.com/premium_photo-1675797367247-6ed7cc60f8d0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
            text: "Me encanta la calidad y presentación de los postres, se nota que estan hechos con dedicación y amor",
        },
        {
            id: 4,
            name: "Aimee Carbajal",
            img: "https://images.unsplash.com/photo-1565985116398-66f7206fd62e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1144",
            text: "Los macarons fueron un verdadero deleite, delicados y con un sabor que sorprende en cada mordida"
        },
    ];

    return (
        <section className="flex flex-col items-center justify-center py-10">
            <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            loop={true}
            className="mySwiper w-[350px] h-[500px]"
            >
                {reviews.map((reviews) => (
                    <SwiperSlide key={reviews.id}
                    className="flex flex-col justify-center items-center bg-white rounded-2xl shadow-lg p-6 text-start ">
                        <img 
                        src={reviews.img}
                        alt={reviews.name}
                        className="w-full h-80  object-cover mb-4"
                        />
                        <h3 className="font-semibold text-lg !ml-3 !mt-3">{reviews.name}</h3>
                        <p className="text-gray-700 text-sm italic !ml-3 !mr-3 !mt-2">{reviews.text}</p>
                    </SwiperSlide>
                ))}

            </Swiper>
        </section>
    );
}

export default CustomersReview