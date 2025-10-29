import "./Pagination.css";

export default function Pagination({ page, setPage }) {
  return (
    <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        ← Anterior
      </button>
      <span>Página {page + 1}</span>
      <button onClick={() => setPage(page + 1)}>Siguiente →</button>
    </div>
  );
}
