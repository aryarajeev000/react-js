import React, { useState } from 'react';
import { useFetchTickets } from '../hooks/useFetchTickets';
import UserColumn from './UserColumn';
import SearchBar from './SearchBar';
import NestedDropdown from './sample'; // Update path if necessary

const KanbanBoard = () => {
  const { tickets, loading, error } = useFetchTickets();
  const [groupBy, setGroupBy] = useState('user');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('priority'); // Default sort by priority

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter tickets based on search term
  const filteredTickets = tickets.filter(ticket => 
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort tickets based on selected sort parameter
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority; // Sort by priority descending
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title); // Sort by title ascending
    }
    return 0; // Default case
  });

  // Group tickets based on the selected group parameter
  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const key = groupBy === 'user' ? ticket.userId : groupBy === 'status' ? ticket.status : ticket.priority;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ticket);
    return acc;
  }, {});

  const users = Array.from(new Set(tickets.map(ticket => ticket.userId)));
  
  return (
    <div className="kanban-board">
      <div className='searchbar'> 
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> 
      </div>

      {/* Nested Dropdown */}
      <NestedDropdown setSortBy={setSortBy} setGroupBy={setGroupBy} />

      {/* Display sorted tickets */}
      <div className="columns">
        {Object.keys(groupedTickets).map((key) => (
          <UserColumn 
            key={key} 
            user={{ id: key, name: users.find(user => user === key) || key }} 
            tickets={groupedTickets[key]} 
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
