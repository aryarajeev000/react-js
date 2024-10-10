// src/components/TicketCard.js
import React from 'react';

const TicketCard = ({ ticket }) => {
  return (
    <div className="ticket-card">
      <h4>{ticket.title}</h4>
      {/* <p>Status: {ticket.status}</p> */}
      {/* <p>Priority: {ticket.priority}</p> */}
      <div className=' btn-big'>
      <button className='btn'>📶</button>
      <button className='btn'> ⚪Feature Request</button>
      </div>
      
    </div>
  );
};

export default TicketCard;
