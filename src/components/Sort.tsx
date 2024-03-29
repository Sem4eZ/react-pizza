import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";
import { selectSort } from "../redux/slices/selectors";

type sortItemType = {
  name: string;
  sortProperty: string;
};

type PopupClick = React.MouseEvent<HTMLBodyElement> & {
  path: Node[];
};
export const sortName: sortItemType[] = [
  { name: "Самые популярные", sortProperty: "rating" },
  { name: "Менее популярные", sortProperty: "-rating" },
  { name: "Дорогие", sortProperty: "price" },
  { name: "Недорогие", sortProperty: "-price" },
  { name: "алфавиту (А-Я)", sortProperty: "-title" },
  { name: "алфавиту (Я-А)", sortProperty: "title" },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);

  const [isVisible, setIsVisible] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (id: sortItemType) => {
    dispatch(setSort(id));
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={(e) => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortName.map((obj, index) => (
              <li
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
                key={index}
                onClick={() => {
                  onClickListItem(obj);
                }}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
