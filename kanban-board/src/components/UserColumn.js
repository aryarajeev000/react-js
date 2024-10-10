// src/components/UserColumn.js
import React from 'react';
import TicketCard from './TicketCard';

const UserColumn = ({ user, tickets }) => {
  return (
    <div className="user-column">
      <h3>{user.name}</h3>
      {tickets.length === 0 ? (
        <div className="empty-card">No tasks assigned</div>
      ) : (
        tickets.map((ticket) => <TicketCard ticket={ticket} key={ticket.id} />)
      )}
    </div>
  );
};

export default UserColumn;
