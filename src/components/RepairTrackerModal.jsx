import React, { useState } from 'react';
import { MOCK_REPAIR_TICKETS } from '../data/mockOrders';
import { 
  X, 
  SearchCheck, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Wrench, 
  AlertCircle,
  Laptop
} from 'lucide-react';

export default function RepairTrackerModal({ onClose }) {
  const [searchTicketId, setSearchTicketId] = useState('REP-9042');
  const [activeTicket, setActiveTicket] = useState(MOCK_REPAIR_TICKETS[0]);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    setErrorMsg('');
    const found = MOCK_REPAIR_TICKETS.find(
      t => t.id.toLowerCase() === searchTicketId.trim().toLowerCase()
    );

    if (found) {
      setActiveTicket(found);
    } else {
      setErrorMsg(`No active repair ticket found matching "${searchTicketId}". Try demo IDs: REP-9042 or REP-8812.`);
      setActiveTicket(null);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '750px', padding: '2rem' }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <SearchCheck size={22} color="#06b6d4" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Live Repair Status Tracker
            </h2>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              padding: '0.45rem',
              borderRadius: '999px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input 
              type="text"
              placeholder="Enter Repair Ticket ID (e.g. REP-9042)"
              value={searchTicketId}
              onChange={(e) => setSearchTicketId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
            Track Ticket
          </button>
        </form>

        {/* Quick Suggestions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          <span>Try Demo Tickets:</span>
          {MOCK_REPAIR_TICKETS.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setSearchTicketId(t.id);
                setActiveTicket(t);
                setErrorMsg('');
              }}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                color: 'var(--accent-cyan)',
                padding: '0.2rem 0.6rem',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                cursor: 'pointer'
              }}
            >
              {t.id}
            </button>
          ))}
        </div>

        {errorMsg && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid var(--accent-rose)',
            color: 'var(--accent-rose)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} /> {errorMsg}
          </div>
        )}

        {/* Active Ticket Timeline Display */}
        {activeTicket && (
          <div>
            {/* Ticket Info Card */}
            <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '2rem', background: 'var(--bg-primary)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <div className="badge badge-cyan" style={{ marginBottom: '0.35rem' }}>{activeTicket.status}</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {activeTicket.device}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Service: <strong>{activeTicket.service}</strong> • Client: {activeTicket.customerName}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end' }}>
                    <UserCheck size={14} color="#10b981" /> Assigned Lead Tech
                  </div>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{activeTicket.technician}</strong>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-emerald)', marginTop: '0.2rem' }}>
                    Est. Completion: {activeTicket.estimatedCompletion}
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical Interactive Step Timeline */}
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              {/* Timeline bar line */}
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '10px',
                bottom: '10px',
                width: '3px',
                background: 'var(--border-color)',
                zIndex: 1
              }}></div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {activeTicket.steps.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-2rem',
                      top: '0',
                      width: '26px',
                      height: '26px',
                      borderRadius: '999px',
                      background: step.done ? 'var(--accent-emerald)' : step.current ? '#06b6d4' : 'var(--bg-secondary)',
                      border: step.current ? '3px solid #0891b2' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      boxShadow: step.current ? '0 0 15px rgba(6, 182, 212, 0.5)' : 'none'
                    }}>
                      {step.done ? <CheckCircle2 size={16} /> : <Clock size={14} />}
                    </div>

                    <div>
                      <div style={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: step.current ? 'var(--accent-cyan)' : step.done ? 'var(--text-main)' : 'var(--text-dim)'
                      }}>
                        {step.name} {step.current && <span className="badge badge-cyan" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>In Progress</span>}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {step.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technician Notes */}
            {activeTicket.notes && (
              <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.25)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem'
              }}>
                <strong style={{ color: 'var(--accent-cyan)' }}>Technician Bench Note:</strong> {activeTicket.notes}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
