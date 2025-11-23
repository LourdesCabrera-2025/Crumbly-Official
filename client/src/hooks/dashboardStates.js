import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

export function useDashboardStates() {
  const cardsDataInfo = [
    {id:1, title: "Clientes", count: 3782, badge: 15 },
    {id:2, title: "Pedidos", count: 3782, badge: 15 },
    {id:3, title: "Productos", count: 3782, badge: 15 },
    {id:4, title: "Entregas", count: 3782, badge: 15 },
  ];

  const navigate = useNavigate();

  
  return { cardsDataInfo, navigate};
}