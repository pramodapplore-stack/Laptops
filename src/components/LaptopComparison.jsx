import React from 'react';
import { Layers, X, Trash2, CheckCircle2, ShoppingCart, ArrowRight } from 'lucide-react';

export default function LaptopComparison({ 
  laptops, 
  onClose, 
  onRemove, 
  onClearAll, 
  onAddToCart 
}) {
  if (laptops.length === 0) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1050px', padding: '2rem' }}
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
            <Layers size={22} color="#8b5cf6" />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Side-by-Side Laptop Comparison ({laptops.length}/3)
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={onClearAll}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-rose)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <Trash2 size={14} /> Clear All
            </button>

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
        </div>

        {/* Comparison Grid Matrix */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.88rem'
          }}>
            <thead>
              <tr>
                <th style={{ padding: '1rem', width: '180px', color: 'var(--text-muted)' }}>Specification</th>
                {laptops.map(laptop => (
                  <th key={laptop.id} style={{ padding: '1rem', minWidth: '240px', verticalAlign: 'top' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>{laptop.conditionGrade}</span>
                      <X 
                        size={16} 
                        onClick={() => onRemove(laptop.id)}
                        style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                      />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                      {laptop.name}
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.75rem' }}>
                      ₹{laptop.price.toLocaleString('en-IN')}
                    </div>
                    <button 
                      onClick={() => onAddToCart(laptop)}
                      className="btn-primary" 
                      style={{ width: '100%', fontSize: '0.82rem', padding: '0.5rem' }}
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {/* Row: Brand */}
              <tr style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>Brand</td>
                {laptops.map(laptop => (
                  <td key={laptop.id} style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{laptop.brand}</td>
                ))}
              </tr>

              {/* Row: Processor */}
              <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>Processor (CPU)</td>
                {laptops.map(laptop => (
                  <td key={laptop.id} style={{ padding: '0.85rem 1rem' }}>{laptop.specs.cpu}</td>
                ))}
              </tr>

              {/* Row: Memory */}
              <tr style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>RAM Memory</td>
                {laptops.map(laptop => (
                  <td key={laptop.id} style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>{laptop.specs.ram}</td>
                ))}
              </tr>

              {/* Row: Storage */}
              <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>SSD Storage</td>
                {laptops.map(laptop => (
                  <td key={laptop.id} style={{ padding: '0.85rem 1rem' }}>{laptop.specs.storage}</td>
                ))}
              </tr>

              {/* Row: Display */}
              <tr style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>Display Panel</td>
                {laptops.map(laptop => (
                  <td key={laptop.id} style={{ padding: '0.85rem 1rem' }}>{laptop.specs.display}</td>
                ))}
              </tr>

              {/* Row: Battery Health */}
              <tr style={{ borderTop: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>Battery Capacity</td>
                {laptops.map(laptop => (
                  <td key={laptop.id} style={{ padding: '0.85rem 1rem', color: '#10b981', fontWeight: 700 }}>
                    {laptop.batteryHealth}% Original Health
                  </td>
                ))}
              </tr>

              {/* Row: Warranty */}
              <tr style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: 'var(--text-muted)' }}>ReTech Warranty</td>
                {laptops.map(laptop => (
                  <td key={laptop.id} style={{ padding: '0.85rem 1rem', fontWeight: 600 }}>
                    {laptop.warrantyMonths} Months Included
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
