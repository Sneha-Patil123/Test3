import React, { useEffect, useState } from 'react';
import { getRaffleTickets, postRaffleEntry } from '../api/mockApi';

export default function RaffleWidget({ userEmail = 'user@email.com-story-123' }) {
  const [tickets, setTickets] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTickets = async () => {
    try {
      setError('');
      const res = await getRaffleTickets();
      setTickets(res.tickets);
    } catch (err) {
      setError('Could not load ticket count.');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleEntry = async () => {
    setIsLoading(true);
    setError('');
    try {
      // Call API and update ticket count on success
      const res = await postRaffleEntry(userEmail);
      setTickets(res.tickets);
    } catch (err) {
      setError(err.message || 'Entry failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="raffle-widget-container" style={{background:'#fff',border:'1px solid #ddd',borderRadius:8,padding:'1.5rem',textAlign:'center',boxShadow:'0 2px 4px rgba(0,0,0,0.05)',maxWidth:400,margin:'2rem auto'}}>
      <h3 className="widget-title" style={{marginTop:0,marginBottom:'0.5rem',color:'var(--primary-green)',fontSize:'1.2rem'}}>Raffle Tickets</h3>
      <div
        className="ticket-count"
        style={{fontFamily:'var(--font-headline)',fontSize:'2.5rem',fontWeight:700,color:'var(--neutral-charcoal)',marginBottom:'1rem'}}
        aria-live="polite"
        aria-label={`Current ticket count is ${tickets}`}
      >
        {tickets}
      </div>
      <button
        onClick={handleEntry}
        disabled={isLoading}
        className="btn btn-primary"
        style={{width:'100%'}}
        aria-label="Enter raffle"
      >
        {isLoading ? 'Entering...' : 'Enter Raffle'}
      </button>
      {error && <p style={{ color: '#c62828', fontSize: '0.95rem', marginTop: '0.8rem' }}>{error}</p>}
    </div>
  );
}