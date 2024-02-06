import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ setCurrentPage }) => {
  const [items, setItems] = React.useState([]);
  useEffect(() => {
    fetch(`https://65bbae1852189914b5bcdaf4.mockapi.io/items`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
      });
  }, []);

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => setCurrentPage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={Math.ceil(items.length / 4)}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
