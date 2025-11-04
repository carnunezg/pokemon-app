import "./Pagination.css";
import {
  IoPlaySkipBackOutline,
  IoPlayBackOutline,
  IoPlayForwardOutline,
  IoPlaySkipForwardOutline,
} from "react-icons/io5";

export default function Pagination({ page, setPage, totalPages }) {
  const goToFirst = () => setPage(0);
  const goToPrevious = () => setPage(Math.max(page - 1, 0));
  const goToNext = () => setPage(Math.min(page + 1, totalPages - 1));
  const goToLast = () => setPage(totalPages - 1);

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={goToFirst}
        disabled={page === 0}
      >
        <IoPlaySkipBackOutline />
      </button>
      <button
        className="pagination-btn"
        onClick={goToPrevious}
        disabled={page === 0}
      >
        <IoPlayBackOutline />
      </button>

      <span className="number-pag">
        Página {page + 1} de {totalPages}
      </span>

      <button
        className="pagination-btn"
        onClick={goToNext}
        disabled={page === totalPages - 1}
      >
        <IoPlayForwardOutline />
      </button>
      <button
        className="pagination-btn"
        onClick={goToLast}
        disabled={page === totalPages - 1}
      >
        <IoPlaySkipForwardOutline />
      </button>
    </div>
  );
}
