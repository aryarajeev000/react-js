// src/components/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TicketCard from './TicketCard';
import './styles.css'; // Import your CSS file

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState('status'); // Default grouping
  const [sortOption, setSortOption] = useState('priority'); // Default sorting

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setTickets(result.data.tickets);
    };
    fetchData();
  }, []);

  const groupTickets = (groupingCriteria) => {
    return tickets.reduce((acc, ticket) => {
      const key = ticket[groupingCriteria] || 'No Data';
      if (!acc[key]) acc[key] = [];
      acc[key].push(ticket);
      return acc;
    }, {});
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortOption === 'priority') {
      return b.priority - a.priority; // Sort by descending priority
    } else {
      return a.title.localeCompare(b.title); // Sort by ascending title
    }
  });

  const groupedTickets = groupTickets(grouping);

  return (
    <div className="kanban-board">
      <h1>Kanban Board</h1>
      <div className="controls">
        <button onClick={() => setGrouping('status')}>Group by Status</button>
        <button onClick={() => setGrouping('user')}>Group by User</button>
        <button onClick={() => setGrouping('priority')}>Group by Priority</button>
        
        <button onClick={() => setSortOption('priority')}>Sort by Priority</button>
        <button onClick={() => setSortOption('title')}>Sort by Title</button>
      </div>
      <div className="ticket-container">
        {Object.entries(groupedTickets).map(([key, tickets]) => (
          <div key={key} className="group">
            <h2>{key}</h2>
            {tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
