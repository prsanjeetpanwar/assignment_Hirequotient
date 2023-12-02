// Table.js
import React from 'react';

const Table = ({ currentUsers, selectedRows, handleRowSelect, handleEdit, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Select All</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map(user => (
          <tr key={user.id} style={{ backgroundColor: selectedRows.includes(user.id) ? 'lightgray' : 'white' }}>
            <td>
              <input
                type="checkbox"
                checked={selectedRows.includes(user.id)}
                onChange={() => handleRowSelect(user.id)}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
