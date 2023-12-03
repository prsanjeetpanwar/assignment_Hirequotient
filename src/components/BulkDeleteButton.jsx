import React from 'react';
import { MdDelete } from "react-icons/md";

const BulkDeleteButton = ({ onDeleteSelected }) => {
  return (
    <button
      className="bg-white text-white px-2 py-2 rounded hover:bg-red-600 focus:outline-none"
      onClick={onDeleteSelected}
    >
      <MdDelete  className='text-black w-9 h-6'/>
    </button>
  );
};

export default BulkDeleteButton;