
import React from "react";

function Pagination({ pedidosPorPagina, pedidosTotales, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(pedidosTotales / pedidosPorPagina); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
              <a onClick={() => paginate(number)} href="#" className="page-link">
                  {number}
              </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;