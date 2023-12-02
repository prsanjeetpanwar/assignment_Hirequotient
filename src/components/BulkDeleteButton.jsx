// BulkDeleteButton.js
import React from 'react';

const BulkDeleteButton = ({ onDeleteSelected }) => {
  return (
    <div style={{ float: 'right', margin: '10px' }}>
      <button onClick={onDeleteSelected}>🗑️ Bulk Delete</button>
    </div>
  );
};

export default BulkDeleteButton;
