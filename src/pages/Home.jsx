import React, { useContext } from "react";
import { useEffect, useState } from "react";
import "../scss/app.scss";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";

import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
  const { categoryId, sort } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  let [isDownload, setIsDownload] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  useEffect(() => {
    setIsDownload(true);
    if (sort) {
      const sortBy = sort.sortProperty.replace("-", "");
      console.log(sort.sortProperty, "useeff");
      const orderBy = sort.sortProperty.includes("-") ? "asc" : "desc";
      const category = categoryId > 0 ? `category=${categoryId}` : "";
      const search = searchValue ? `search=${searchValue}` : "";
      // fetch(
      //   `https://65bbae1852189914b5bcdaf4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}&${search}`
      // )
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((arr) => {
      //     setItems(arr);
      //     setIsDownload(false);
      //   });

      axios
        .get(
          `https://65bbae1852189914b5bcdaf4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}&${search}`
        )
        .then((response) => {
          setItems(response.data);
          setIsDownload(false);
        });
      window.scrollTo(0, 0);
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeleton = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));
  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isDownload ? skeleton : pizzas}</div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;
