// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <div>
      <button onClick={() => handlePageChange(1)}>First Page</button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
      {Array.from({ length: totalPages }, (_, i) => (
        <button key={i + 1} onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next Page</button>
      <button onClick={() => handlePageChange(totalPages)}>Last Page</button>
    </div>
  );
};

export default Pagination;
