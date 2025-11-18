import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
} from "@material-tailwind/react";
import { CaretLeftFill, CaretRightFill } from "react-bootstrap-icons";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import "../../styles/public/cards.css"

const cardData = [
    {
        id: 1,
        top: "Bestseller",
        title: "Classic Italian Tiramisu",
        price: "$3.50",
        imgSrc: "https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/Tiramissu.jpg?updatedAt=1762303832145",
    },
    {
        id: 2,
        top: "Bestseller",
        title: "Pecan Pie",
        price: "$7.60 - 30.00",
        imgSrc: "https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/pie%20de%20pecana.jpg?updatedAt=1762303832288",
    },
    {
        id: 3,
        top: "Bestseller",
        title: "Opera",
        price: "$6.45",
        imgSrc: "https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/opera.jpg?updatedAt=1762303788754",
    },
    {
        id: 4,
        top: "Bestseller",
        title: "Macarons",
        price: "$12.00",
        imgSrc: "https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/macaronsPacks.jpg?updatedAt=1762303831997",
    },
    {
        id: 5,
        top: "Bestseller",
        title: "Strawberry Mousse",
        price: "$4.00",
        imgSrc: "https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/mousse_fresa.jpg?updatedAt=1762304615337",
    },
];

export function CardProduct() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="flex justify-center items-center min-h-screen p-4 ">
            <div className="relative w-full max-w-[1200px] mx-auto py-4 md:py-8">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={50}
                    slidesPerView={1.2}
                    breakpoints={{
                        640: {
                            slidesPerView: 2.2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3.2,
                            spaceBetween: 50,
                        },
                    }}
                    onInit={(swiper) => {
                        if (swiper.params.navigation) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }}
                    loop={true}
                    className="!pb-3"
                >
                    {cardData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <Card className="w-85 !mr-4" id="card">
                                <CardHeader shadow={false} floated={false} className="h-75" id="card-header">
                                    <img
                                        src={item.imgSrc}
                                        alt={item.title}
                                        className="h-full w-full object-covered" id="card-image" />
                                </CardHeader>
                                <CardBody>
                                    <div className="mb-2 flex items-start justify-start">
                                        <Typography className="text-[#E90064] font-semibold text-sm !pl-4 !mt-2 " id="top">
                                            {item.top}
                                        </Typography>
                                    </div>
                                    <div className="mb-2 flex items-start justify-start !mt-2">
                                        <Typography className="text-gray-800 font-semibold !pl-4 " id="title">
                                            {item.title}
                                        </Typography>
                                    </div>
                                    <div className="mb-2 flex items-start justify-start !mt-2">
                                        <Typography className="text-gray-800/50  !pl-4  text-sm" id="price">
                                            {item.price}
                                        </Typography>
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0 flex justify-center px-4 pb-6 !mt-6 !mb-6">
                                    <Button 
                                    ripple={false}
                                    className="bg-[#E90064]/95 hover:bg-[#D80074] text-white shadow-none cursor-pointer items-center"
                                    id="btn-card">
                                        View Detail
                                    </Button>
                                </CardFooter>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                <Button
                    variant="text"
                    size="lg"
                    ref={prevRef}
                    className="!absolute top-2/4 left-[-2rem] -translate-y-2/4 z-[0] p-2 bg-white/70 hover:bg-white border shadow-md rounded-full hidden lg:block"
                >
                    <CaretLeftFill className="w-6 h-6 text-gray-800" />
                </Button>

                <Button
                    variant="text"
                    size="lg"
                    ref={nextRef}
                    className="!absolute top-2/4 right-[-2rem] -translate-y-2/4 z-[0] p-2 bg-white/70 hover:bg-white border shadow-md rounded-full hidden lg:block"
                >
                    <CaretRightFill className="w-6 h-6 text-gray-800" />
                </Button>
            </div>
        </div>
    )
}

export default CardProduct