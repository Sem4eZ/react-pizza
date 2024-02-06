import React, { useState } from "react";

const Categories = ({ value, onClickCategory }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              onClickCategory(index);
              setActiveIndex(index);
            }}
            className={activeIndex === index ? "active" : ""}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
