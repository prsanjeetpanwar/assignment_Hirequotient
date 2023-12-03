import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import Pagination from './components/Pagination';
import '@fontsource/playfair-display';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const fetchedUsers = response.data || [];

        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const currentPageIds = currentUsers.slice(0, 10).map((user) => user.id);
    handleRowSelect(currentPageIds);
  };

  const handleEdit = (userId, editedName, editedEmail, editedMember) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, name: editedName, email: editedEmail, member: editedMember };
      }
      return user;
    });

    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleDeleteAll = () => {
    const updatedUsers = users.filter(user => !selectedRows.includes(user.id));
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
    setSelectAll(false);
  };

  return (
    <div className="">
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} onDeleteSelected={handleDeleteAll} />
      <Table
        currentUsers={currentUsers}
        selectedRows={selectedRows}
        handleRowSelect={handleRowSelect}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDeleteAll={handleDeleteAll}
        handleSelectAll={handleSelectAll}
      />
      <div className='pb-5'>
        <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredUsers.length / pageSize)} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default App;
