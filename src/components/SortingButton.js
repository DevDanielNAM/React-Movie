import styles from "./SortingButton.module.css";

function SortingButton({
  isSorted,
  setCurrentPage,
  setIsSorted,
  currentPage,
  toggleSort,
}) {
  return (
    <div className={styles.sort}>
      <button
        className={isSorted ? styles.sortingOn : styles.sortingOff}
        onClick={(e) => {
          setCurrentPage(1);
          setIsSorted(!isSorted);
          toggleSort(currentPage);
        }}
      >
        평점 높은 순
      </button>
    </div>
  );
}

export default SortingButton;
