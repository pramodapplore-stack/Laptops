import React, { useState } from 'react';
import { REFURBISHED_LAPTOPS } from '../data/laptops';
import { MOCK_REPAIR_TICKETS } from '../data/mockOrders';
import { 
  X, 
  UserCheck, 
  Package, 
  Wrench, 
  DollarSign, 
  TrendingUp, 
  Plus, 
  CheckCircle2,
  Sliders
} from 'lucide-react';

export default function AdminDashboardModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('repairs'); // 'repairs', 'inventory', 'tradeins'
  const [repairs, setRepairs] = useState(MOCK_REPAIR_TICKETS);

  const advanceRepairStep = (ticketId) => {
    setRepairs(prev => prev.map(ticket => {
      if (ticket.id === ticketId && ticket.stepIndex < ticket.steps.length - 1) {
        const nextIdx = ticket.stepIndex + 1;
        const updatedSteps = ticket.steps.map((step, idx) => ({
          ...step,
          done: idx <= nextIdx,
          current: idx === nextIdx
        }));
        return {
          ...ticket,
          stepIndex: nextIdx,
          status: ticket.steps[nextIdx].name,
          steps: updatedSteps
        };
      }
      return ticket;
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', padding: '2rem' }}
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
            <UserCheck size={24} color="#10b981" />
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                ReTech Store Manager Portal
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Live Inventory Management & Workbench Repair Queue
              </div>
            </div>
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

        {/* Top Analytics KPI Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div className="glass-panel" style={{ padding: '1rem', background: 'var(--bg-primary)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <TrendingUp size={14} color="#10b981" /> Monthly Sales
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹38,50,000</div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', background: 'var(--bg-primary)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Package size={14} color="#06b6d4" /> Active Stock
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
              {REFURBISHED_LAPTOPS.reduce((acc, l) => acc + l.stock, 0)} Units
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', background: 'var(--bg-primary)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Wrench size={14} color="#f59e0b" /> Bench Repairs
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-amber)' }}>{repairs.length} In Progress</div>
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('repairs')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'repairs' ? 'var(--accent-emerald-glow)' : 'transparent',
              color: activeTab === 'repairs' ? 'var(--accent-emerald)' : 'var(--text-muted)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Workbench Repairs ({repairs.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'inventory' ? 'var(--accent-emerald-glow)' : 'transparent',
              color: activeTab === 'inventory' ? 'var(--accent-emerald)' : 'var(--text-muted)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Refurbished Inventory ({REFURBISHED_LAPTOPS.length})
          </button>
        </div>

        {/* TAB 1: Workbench Repairs Queue */}
        {activeTab === 'repairs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {repairs.map(ticket => (
              <div key={ticket.id} className="glass-panel" style={{ padding: '1.25rem', background: 'var(--bg-primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <span className="badge badge-cyan" style={{ fontFamily: 'var(--font-mono)' }}>{ticket.id}</span>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                      {ticket.device} — {ticket.service}
                    </h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Customer: {ticket.customerName}</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
                      {ticket.status}
                    </div>
                    <button 
                      onClick={() => advanceRepairStep(ticket.id)}
                      className="btn-secondary"
                      style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem', marginTop: '0.4rem' }}
                    >
                      Advance Status Step ➔
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  Assigned Tech: {ticket.technician}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: Refurbished Inventory List */}
        {activeTab === 'inventory' && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Laptop Model</th>
                  <th style={{ padding: '0.75rem' }}>Grade</th>
                  <th style={{ padding: '0.75rem' }}>Price</th>
                  <th style={{ padding: '0.75rem' }}>Battery</th>
                  <th style={{ padding: '0.75rem' }}>Stock</th>
                </tr>
              </thead>
              <tbody>
                {REFURBISHED_LAPTOPS.map(lap => (
                  <tr key={lap.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>{lap.name}</td>
                    <td style={{ padding: '0.75rem' }}>{lap.conditionGrade}</td>
                    <td style={{ padding: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>₹{lap.price.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.75rem' }}>{lap.batteryHealth}%</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700 }}>{lap.stock} units</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
