import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  BatteryCharging, 
  ShoppingCart, 
  Star, 
  Cpu, 
  HardDrive, 
  Monitor, 
  PackageCheck,
  CheckCircle2,
  Share2,
  Award,
  Layers
} from 'lucide-react';
import { CONDITION_GRADES_INFO } from '../data/laptops';

export default function ProductDetailModal({ 
  laptop, 
  onClose, 
  onAddToCart, 
  onToggleCompare, 
  isCompared 
}) {
  if (!laptop) return null;

  const [selectedWarranty, setSelectedWarranty] = useState('standard'); // 'standard' or 'extended'
  const gradeInfo = CONDITION_GRADES_INFO[laptop.conditionGrade] || {};

  const handleAddToCart = () => {
    const itemToAdd = {
      ...laptop,
      selectedWarranty,
      finalPrice: selectedWarranty === 'extended' ? laptop.price + 4999 : laptop.price
    };
    onAddToCart(itemToAdd);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '2rem' }}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className="badge badge-emerald">{laptop.conditionGrade}</span>
              <span className="badge badge-cyan">{laptop.category}</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {laptop.name}
            </h2>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              padding: '0.5rem',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: 2 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {/* Left Column: Graphic & Condition Details */}
          <div>
            {/* Visual Hardware Banner */}
            {laptop.imageUrl ? (
              <div style={{ width: '100%', height: '230px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <img src={laptop.imageUrl} alt={laptop.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ) : (
              <div className="laptop-graphic-container" style={{ height: '230px', marginBottom: '1.5rem' }}>
                <div className="laptop-screen-mockup" style={{ width: '200px', height: '130px' }}>
                  <div style={{ textAlign: 'center', color: '#ffffff' }}>
                    <Award size={32} color="#10b981" style={{ margin: '0 auto 0.3rem auto' }} />
                    <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>50-POINT PASSED</div>
                    <div style={{ fontSize: '0.7rem', color: '#10b981' }}>{laptop.inspectionScore}</div>
                  </div>
                </div>
                <div className="laptop-base-mockup" style={{ width: '240px' }}>
                  <div className="laptop-notch"></div>
                </div>
              </div>
            )}

            {/* Quality Grade Card */}
            <div className="glass-panel" style={{ padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={18} color="#10b981" /> Condition Breakdown
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                {gradeInfo.description || laptop.description}
              </p>

              {/* Battery Health Indicator */}
              <div style={{ background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}>
                    <BatteryCharging size={16} color="#10b981" /> Original Battery Capacity
                  </span>
                  <span style={{ color: '#10b981' }}>{laptop.batteryHealth}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-card)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${laptop.batteryHealth}%`, background: '#10b981' }}></div>
                </div>
              </div>
            </div>

            {/* Items Included in Box */}
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}>
                <PackageCheck size={16} color="#06b6d4" /> Included in Package
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {laptop.includedInBox.map((item, idx) => (
                  <div key={idx} style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-main)' }}>
                    <CheckCircle2 size={14} color="#10b981" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Specs & Pricing */}
          <div>
            {/* Price Header */}
            <div style={{
              background: 'var(--bg-primary)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  ₹{laptop.price.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '1rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>
                  ₹{laptop.originalMsrp.toLocaleString('en-IN')}
                </div>
                <span className="badge badge-emerald" style={{ marginLeft: 'auto' }}>
                  Save {laptop.discountPercent}%
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Free Insured Express Delivery • GST Included
              </div>
            </div>

            {/* Warranty Selector Options */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                Select ReTech Warranty Protection
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div 
                  onClick={() => setSelectedWarranty('standard')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedWarranty === 'standard' ? '2px solid #10b981' : '1px solid var(--border-color)',
                    background: selectedWarranty === 'standard' ? 'var(--accent-emerald-glow)' : 'var(--bg-card)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Standard ({laptop.warrantyMonths} Months)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>INCLUDED FREE</div>
                </div>

                <div 
                  onClick={() => setSelectedWarranty('extended')}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: selectedWarranty === 'extended' ? '2px solid #06b6d4' : '1px solid var(--border-color)',
                    background: selectedWarranty === 'extended' ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-card)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    Extended (24 Months)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: 600 }}>+₹4,999 (Accidental Protection)</div>
                </div>
              </div>
            </div>

            {/* Full Spec Sheet Table */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                Detailed Specifications
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '0.4rem',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-primary)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Processor (CPU):</span>
                  <strong style={{ color: 'var(--text-main)' }}>{laptop.specs.cpu}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-card)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Memory (RAM):</span>
                  <strong style={{ color: 'var(--text-main)' }}>{laptop.specs.ram}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-primary)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Storage Drive:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{laptop.specs.storage}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-card)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Display Screen:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{laptop.specs.display}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-primary)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Operating System:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{laptop.specs.os}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.6rem', background: 'var(--bg-card)', borderRadius: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Ports & I/O:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{laptop.specs.ports}</strong>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={handleAddToCart}
                className="btn-primary" 
                style={{ flex: 1, fontSize: '1rem', padding: '0.85rem' }}
              >
                <ShoppingCart size={18} /> Add to Cart (₹{(selectedWarranty === 'extended' ? laptop.price + 4999 : laptop.price).toLocaleString('en-IN')})
              </button>

              <button 
                onClick={() => onToggleCompare(laptop)}
                className="btn-secondary"
                style={{
                  padding: '0.85rem 1rem',
                  borderColor: isCompared ? '#8b5cf6' : 'var(--border-color)',
                  color: isCompared ? '#a78bfa' : 'var(--text-main)'
                }}
              >
                <Layers size={18} /> {isCompared ? 'Comparing' : 'Compare'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
