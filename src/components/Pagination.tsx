import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Create a simple array of page numbers to display
  const getPageNumbers = () => {
    // Only show at most 5 pages total
    const pageWindow = 5;
    const pages = [];

    // Calculate start and end pages to show
    let startPage = Math.max(1, currentPage - Math.floor(pageWindow / 2));
    let endPage = startPage + pageWindow - 1;

    // Adjust if endPage exceeds totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pageWindow + 1);
    }

    // Generate page buttons
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.pageButton} ${
            currentPage === i ? styles.active : ""
          }`}
          disabled={currentPage === i}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Prev
      </button>
      <div className={styles.pageNumbers}>{getPageNumbers()}</div>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next &raquo;
      </button>
    </div>
  );
};

export default Pagination;
