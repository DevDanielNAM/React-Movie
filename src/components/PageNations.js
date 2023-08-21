import { useEffect, useState } from "react";
import styles from "./PageNations.module.css";

function PageNations({ currentPage, setCurrentPage }) {
  const [pageNumber, setPageNumber] = useState([1, 2, 3, 4, 5]);
  const [pageGroup, setPageGroup] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);

  const renderPageNum = () => {
    if (currentPage === 1 && pageGroup !== 1) {
      holdFirstPage();
    } else {
      if (currentPage === (pageGroup - 1) * 5) {
        const newPageNumber = pageNumber.map((num) => num - 5);
        setPageNumber([...newPageNumber]);
        setPageGroup(pageGroup - 1);
        holdPageNum();
      }
      if (currentPage > pageGroup * 5) {
        const newPageNumber = pageNumber.map((num) => num + 5);
        setPageNumber([...newPageNumber]);
        setPageGroup(pageGroup + 1);
        holdPageNum();
      }
    }
  };

  const holdPageNum = () => {
    const button = document.querySelectorAll("button");
    const currentBtn = document.getElementById(`btn_${currentPage}`);
    Array.from(button).map((tag) => tag.classList.remove(styles.currentPage));
    if (currentBtn === null) {
      return;
    }
    currentBtn.classList.add(styles.currentPage);
  };

  const holdFirstPage = () => {
    if (isFirstPage) {
      setCurrentPage(1);
      setPageNumber([1, 2, 3, 4, 5]);
      setPageGroup(1);
      setIsFirstPage(false);
    }
  };

  const holdLastPage = () => {
    if (isLastPage) {
      setCurrentPage(500);
      setPageNumber([496, 497, 498, 499, 500]);
      setPageGroup(100);
      setIsLastPage(false);
    }
  };

  renderPageNum();

  useEffect(() => holdFirstPage(), [isFirstPage]);
  useEffect(() => holdLastPage(), [isLastPage]);
  useEffect(() => holdPageNum(), [currentPage]);

  return (
    <div className={styles.PageNations}>
      {pageGroup === 1 ? null : (
        <button onClick={(e) => setIsFirstPage(true)}>{"<<"}</button>
      )}
      {currentPage === 1 ? null : (
        <button onClick={(e) => setCurrentPage(currentPage - 1)}>{"<"}</button>
      )}
      {pageNumber.map((num) => (
        <button
          key={num}
          value={num}
          id={"btn_" + num}
          onClick={(e) => setCurrentPage(Number(e.target.value))}
        >
          {num}
        </button>
      ))}
      {currentPage === 500 ? null : (
        <button onClick={(e) => setCurrentPage(currentPage + 1)}>{">"}</button>
      )}
      {pageGroup === 100 ? null : (
        <button onClick={(e) => setIsLastPage(true)}>{">>"}</button>
      )}
    </div>
  );
}

export default PageNations;
