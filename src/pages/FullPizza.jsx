import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65bbae1852189914b5bcdaf4.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert(
          "К сожалению мы не смогли найти вашу питсу, попробуйте выбрать другую"
        );
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className="container">Идет загрузка питсы</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h1>{pizza.title}</h1>
      <h2>от {pizza.price} ₽</h2>
    </div>
  );
};

export default FullPizza;
