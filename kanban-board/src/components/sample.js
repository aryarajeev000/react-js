import React, { useState } from 'react';

const NestedDropdown = ({ setSortBy, setGroupBy }) => {
  const [showDropdowns, setShowDropdowns] = useState(false); // State to control visibility

  const handleSort = (value) => {
    setSortBy(value);
  };

  const handleGroup = (value) => {
    setGroupBy(value);
  };

  const toggleDropdowns = () => {
    setShowDropdowns(!showDropdowns); // Toggle visibility
  };

  return (
    <div>
      {/* Button to display dropdowns */}
      <button onClick={toggleDropdowns}>
        {showDropdowns ? 'Hide Options' : 'Display Options'}
      </button>

      {/* Conditionally render dropdowns */}
      {showDropdowns && (
        <div>
          <select onChange={(e) => handleSort(e.target.value)} defaultValue="Sort By">
            <option disabled>Sort By</option>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
          </select>

          <select onChange={(e) => handleGroup(e.target.value)} defaultValue="Group By">
            <option disabled>Group By</option>
            <option value="user">Group by User</option>
            <option value="status">Group by Status</option>
            <option value="priority">Group by Priority</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default NestedDropdown;
