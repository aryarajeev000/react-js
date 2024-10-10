// src/hooks/useFetchTickets.js
import { useState, useEffect } from 'react';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const useFetchTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }
        const data = await response.json();
        
        if (!Array.isArray(data.tickets)) {
          throw new Error('Fetched data is not in the expected format');
        }

        setTickets(data.tickets);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, loading, error };
};
