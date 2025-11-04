import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import React ,{useState, useEffect} from "react";
import "../../styles/public/cards.css"

const cards = [{
    card_title: "Classic Italian Tiramisu",
    image: "https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/Tiramissu-removebg-preview.png",
    price: "$3.50",
    oldPrice: null,
}, 
{
    card_title: "Artisanal Pecan Pie",
    image: "https://ik.imagekit.io/POST702025Crumbly/Crumbly-Official/pie_de_pecana-removebg-preview.png?updatedAt=1762146682869",
    price: "$15.50 - 30.00",
    oldPrice: "$17.50-30.00",
}, 
{
    card_title: "Strawberry Cheesecake",
    image: "",
    price: "$8.50",
    oldPrice: "$10.00",
},
];

export function CardProducts () {

    const [angle, setAngle] = useState(0);

    const handleNext = () => setAngle((prev) => prev - 90);
    const handlePrev = () => setAngle((prev) => prev + 90);

    return (
        <div className="relative w-full h-[450px]"></div>
    )
}

export default CardProducts