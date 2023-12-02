// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Pagination from './components/Pagination';
import BulkDeleteButton from './components/BulkDeleteButton';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const pageSize = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const fetchedUsers = response.data;
  
        // Save fetched data to local storage
        localStorage.setItem('users', JSON.stringify(fetchedUsers));
  
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Check if data is in local storage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
      setFilteredUsers(JSON.parse(storedUsers));
    } else {
      // Fetch data if not in local storage
      fetchData();
    }
  }, []);
  useEffect(() => {
    const filtered = users.filter(user =>
      Object.values(user).some(value =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

  const indexOfLastUser = currentPage * pageSize;
  const indexOfFirstUser = indexOfLastUser - pageSize;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowSelect = (userId) => {
    const isSelected = selectedRows.includes(userId);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(id => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    // Update local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setSelectedRows([]);
  };

  const handleEdit = (userId) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        // Modify the properties you want to edit
        return { ...user, name: user.name + ' (Edited)' };
      }
      return user;
    });

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    // Update local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);

    // Update local storage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div>
  
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

   
      <BulkDeleteButton onDeleteSelected={handleDeleteSelected} />

     
      <Table
        currentUsers={currentUsers}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

    
      <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredUsers.length / pageSize)} handlePageChange={handlePageChange} />
    </div>
  );
};

export default App;
