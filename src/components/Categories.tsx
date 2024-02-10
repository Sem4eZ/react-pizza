import React, { useState } from "react";
import {  useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

interface CategoriesProps {
  value: number;
}
const Categories: React.FC<CategoriesProps> = ({ value }) => {
  const dispatch = useDispatch();
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              onChangeCategory(index);
            }}
            className={value === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
