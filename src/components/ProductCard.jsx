import React from 'react';
import { 
  ShieldCheck, 
  BatteryCharging, 
  Layers, 
  ShoppingCart, 
  Eye, 
  Star, 
  Cpu, 
  HardDrive, 
  Check,
  Zap
} from 'lucide-react';
import { CONDITION_GRADES_INFO } from '../data/laptops';

export default function ProductCard({ 
  laptop, 
  onSelectLaptop, 
  onAddToCart, 
  onToggleCompare, 
  isCompared 
}) {
  const gradeInfo = CONDITION_GRADES_INFO[laptop.conditionGrade] || {
    label: laptop.conditionGrade,
    badgeColor: '#10b981'
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.25s ease'
    }}>
      {/* Top Badges Header */}
      <div style={{
        padding: '1rem 1.25rem 0.5rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 2
      }}>
        <span className="badge" style={{
          background: `${gradeInfo.badgeColor}20`,
          color: gradeInfo.badgeColor,
          border: `1px solid ${gradeInfo.badgeColor}40`,
          fontSize: '0.7rem'
        }}>
          {gradeInfo.label}
        </span>

        {laptop.badge && (
          <span className="badge badge-cyan" style={{ fontSize: '0.68rem' }}>
            <Zap size={12} /> {laptop.badge}
          </span>
        )}
      </div>

      {/* Hardware Graphic Display Container */}
      <div 
        onClick={() => onSelectLaptop(laptop)}
        style={{
          padding: '0.75rem 1.25rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {laptop.imageUrl ? (
          <div style={{ width: '100%', height: '170px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <img 
              src={laptop.imageUrl} 
              alt={laptop.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        ) : (
          <div className="laptop-graphic-container" style={{ height: '170px' }}>
            <div className="laptop-screen-mockup" style={{
              borderColor: laptop.brand === 'Apple' ? '#64748b' : laptop.brand === 'Dell' ? '#0284c7' : '#334155'
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                color: 'var(--text-main)',
                textAlign: 'center',
                letterSpacing: '0.05em'
              }}>
                {laptop.brand.toUpperCase()}
                <div style={{ fontSize: '0.65rem', color: '#10b981', marginTop: '0.2rem', fontWeight: 600 }}>
                  {laptop.specs.storage} • {laptop.specs.ram.split(' ')[0]} RAM
                </div>
              </div>
            </div>
            <div className="laptop-base-mockup">
              <div className="laptop-notch"></div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ padding: '0 1.25rem 1.25rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Rating and Reviews */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          marginBottom: '0.4rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', color: '#f59e0b', fontWeight: 700 }}>
            <Star size={14} fill="#f59e0b" /> {laptop.rating}
          </div>
          <span>({laptop.reviewCount} reviews)</span>
          <span style={{ marginLeft: 'auto', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            In Stock ({laptop.stock})
          </span>
        </div>

        {/* Laptop Name */}
        <h3 
          onClick={() => onSelectLaptop(laptop)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1.35,
            marginBottom: '0.75rem',
            cursor: 'pointer',
            minHeight: '2.7rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {laptop.name}
        </h3>

        {/* Key Spec Chips */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.4rem',
          marginBottom: '1rem',
          fontSize: '0.75rem'
        }}>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '0.35rem 0.5rem',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            <Cpu size={12} style={{ verticalAlign: 'middle', marginRight: '0.2rem', color: '#06b6d4' }} />
            {laptop.specs.cpu.split('(')[0]}
          </div>
          <div style={{
            background: 'var(--bg-primary)',
            padding: '0.35rem 0.5rem',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            <HardDrive size={12} style={{ verticalAlign: 'middle', marginRight: '0.2rem', color: '#8b5cf6' }} />
            {laptop.specs.storage}
          </div>
        </div>

        {/* Battery Health Progress Bar */}
        <div style={{
          background: 'var(--bg-primary)',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.72rem',
            fontWeight: 600,
            marginBottom: '0.3rem'
          }}>
            <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <BatteryCharging size={13} color="#10b981" /> Battery Health
            </span>
            <span style={{ color: laptop.batteryHealth >= 90 ? '#10b981' : '#f59e0b' }}>
              {laptop.batteryHealth}% Capacity
            </span>
          </div>
          <div style={{
            height: '5px',
            background: 'var(--bg-card)',
            borderRadius: '999px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${laptop.batteryHealth}%`,
              background: laptop.batteryHealth >= 90 
                ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)' 
                : 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
              borderRadius: '999px'
            }}></div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '0.85rem'
          }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                ₹{laptop.price.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                <span style={{ textDecoration: 'line-through' }}>₹{laptop.originalMsrp.toLocaleString('en-IN')}</span>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 700, marginLeft: '0.35rem' }}>
                  Save ₹{(laptop.originalMsrp - laptop.price).toLocaleString('en-IN')} ({laptop.discountPercent}%)
                </span>
              </div>
            </div>

            <span style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              background: 'var(--bg-primary)',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)'
            }}>
              {laptop.warrantyMonths} M Warranty
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.5rem' }}>
            <button
              onClick={() => onAddToCart(laptop)}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.55rem 0.75rem' }}
            >
              <ShoppingCart size={15} /> Add to Cart
            </button>

            <button
              onClick={() => onSelectLaptop(laptop)}
              className="btn-secondary"
              title="Quick Spec View"
              style={{ padding: '0.55rem 0.65rem' }}
            >
              <Eye size={16} />
            </button>

            <button
              onClick={() => onToggleCompare(laptop)}
              title={isCompared ? "Remove from comparison" : "Add to comparison"}
              style={{
                background: isCompared ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-secondary)',
                border: isCompared ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                color: isCompared ? '#a78bfa' : 'var(--text-muted)',
                padding: '0.55rem 0.65rem',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              {isCompared ? <Check size={16} color="#a78bfa" /> : <Layers size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
