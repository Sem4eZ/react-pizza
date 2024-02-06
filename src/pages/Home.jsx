import React from "react";
import { useEffect, useState } from "react";
import "../scss/app.scss";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = useState([]);
  let [isDownload, setIsDownload] = useState(true);

  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    setIsDownload(true);
    fetch(
      "https://65bbae1852189914b5bcdaf4.mockapi.io/items?category=" + categoryId
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsDownload(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => setCategoryId(id)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isDownload
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
