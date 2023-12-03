import React, { useState, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const Table = ({
  currentUsers,
  selectedRows,
  handleRowSelect,
  handleEdit,
  handleDelete,
  handleDeleteAll,
  handleSelectAll 
}) => {
  const [editData, setEditData] = useState({
    userId: null,
    editedName: '',
    editedEmail: '',
    editedMember: ''
  });
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      handleRowSelectAll();
    } else {
      handleClearSelection();
    }
  }, [selectAll]);

  const handleRowSelectAll = () => {
    const allUserIds = currentUsers.map((user) => user.id);
    const newSelectedRows =
      selectedRows.length === allUserIds.length ? [] : allUserIds;
    handleRowSelect(newSelectedRows);
  };

  const handleClearSelection = () => {
    handleRowSelect([]);
  };

  const handleEditStart = (userId, name, email, member) => {
    setEditData({
      userId,
      editedName: name,
      editedEmail: email,
      editedMember: member
    });
  };

  const handleEditSave = (userId) => {
    handleEdit(
      userId,
      editData.editedName,
      editData.editedEmail,
      editData.editedMember
    );
    setEditData({
      userId: null,
      editedName: '',
      editedEmail: '',
      editedMember: ''
    });
  };

  const handleDeleteUser = (userId) => {
    handleDelete(userId);
    setSelectAll(false);
  };

  return (
    <div className="text-black
     border rounded p-6 drop-shadow-lg
     
    mb-[-40px]
    ">
      <table className="min-w-full divide-y
       divide-gray-300 rounded overflow-hidden">
        <thead className="bg-gray-800 h-[60px]">
          <tr className="text-3xl">
            <th scope="col" className="px-4 py-3 text-left text-1xl font-medium text-white uppercase tracking-wider">
              <input
                type="checkbox"
                checked={handleDeleteAll}
                onChange={() => setSelectAll(!selectAll)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-extrabold font-serif text-white uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-extrabold font-serif text-white uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-4 py-3 text-white text-left text-xs font-extrabold font-serif uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-extrabold font-serif text-white uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentUsers.map((user) => (
            <tr key={user.id} className={selectedRows.includes(user.id) ? 'bg-gray-100' : 'bg-white'}>
              <td className="px-4 py-2 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleRowSelect(user.id)}
                  className="focus:ring-black h-4 w-4 text-black border-gray-300 rounded"
                />
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {editData.userId === user.id ? (
                  <input
                    type="text"
                    value={editData.editedName}
                    onChange={(e) => setEditData({ ...editData, editedName: e.target.value })}
                    className="focus:ring-black focus:border-black block w-full h-[40px] text-lg pl-2 sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <span className="text-gray-800">{user.name}</span>
                )}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {editData.userId === user.id ? (
                  <input
                    type="text"
                    value={editData.editedEmail}
                    onChange={(e) => setEditData({ ...editData, editedEmail: e.target.value })}
                    className="focus:ring-black focus:border-black block w-full h-[40px] text-lg pl-2 sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <span className="text-gray-800">{user.email}</span>
                )}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {editData.userId === user.id ? (
                  <input
                    type="text"
                    value={editData.editedMember}
                    onChange={(e) => setEditData({ ...editData, editedMember: e.target.value })}
                    className="focus:ring-black focus:border-black block w-full h-[40px] text-lg pl-2 sm:text-sm border-gray-300 rounded-md"
                  />
                ) : (
                  <span className="text-gray-800">{user.role}</span>
                )}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {editData.userId === user.id ? (
                  <div>
                    <button
                      onClick={() => handleEditSave(user.id)}
                      className="text-black hover:text-gray-900  mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditData({ userId: null, editedName: '', editedEmail: '', editedMember: '' })}
                      className="text-red-600 hover:text-red-900"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-6 
                  w-[60px]
                 ">
                    <button
                      onClick={() => handleEditStart(user.id, user.name, user.email, user.member)}
                      className="text-black
                      border-[2px] shadow-lg
                      
                      px-2 h-9
                       pl-1 hover:text-indigo-900"
                    >
                      <AiOutlineEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600
                      border-[1px] shadow-lg
                     px-2 h-9 justify-center pl-1 hover:text-red-900"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
  {selectedRows.length > 0 && (
    <p className="text-sm text-gray-900">{`${selectedRows.length} out of ${currentUsers.length > 10 ? 10 : currentUsers.length} row(s) selected`}</p>
  )}
</div>

    </div>
  );
};

export default Table;
