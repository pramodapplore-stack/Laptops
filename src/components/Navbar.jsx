import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { 
  Laptop, 
  Wrench, 
  DollarSign, 
  ShieldCheck, 
  ShoppingCart, 
  Search, 
  Sun, 
  Moon, 
  SlidersHorizontal,
  Layers,
  SearchCheck,
  UserCheck
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  compareCount,
  onOpenCompare,
  onOpenRepairTracker,
  onOpenInspection,
  onOpenAdmin,
  theme,
  toggleTheme,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      backdropFilter: 'blur(12px)'
    }}>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #059669 0%, #0d9488 50%, #0284c7 100%)',
        color: '#ffffff',
        padding: '0.35rem 1rem',
        fontSize: '0.8rem',
        fontWeight: 600,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem'
      }}>
        <span>🌱 Certified Eco-Friendly Refurbished Laptops | Save up to 60% vs MSRP</span>
        <span style={{ opacity: 0.7 }}>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <ShieldCheck size={14} /> 12-Month Free Warranty Included
        </span>
      </div>

      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
        gap: '1rem'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('shop')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)'
          }}>
            <Laptop size={24} />
          </div>
          <div>
            <div style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              {SITE_CONFIG.companyName} <span style={{ fontSize: '0.75rem', background: '#10b981', WebkitTextFillColor: '#ffffff', padding: '0.1rem 0.4rem', borderRadius: '4px', textTransform: 'uppercase' }}>PRO</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {SITE_CONFIG.tagline}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('shop')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'shop' ? 'var(--accent-emerald-glow)' : 'transparent',
              color: activeTab === 'shop' ? 'var(--accent-emerald)' : 'var(--text-muted)',
              fontWeight: activeTab === 'shop' ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Laptop size={18} /> Buy Laptops
          </button>

          <button
            onClick={() => setActiveTab('sell')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'sell' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
              color: activeTab === 'sell' ? 'var(--accent-cyan)' : 'var(--text-muted)',
              fontWeight: activeTab === 'sell' ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <DollarSign size={18} /> Sell / Trade-In
          </button>

          <button
            onClick={() => setActiveTab('repair')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: activeTab === 'repair' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
              color: activeTab === 'repair' ? 'var(--accent-amber)' : 'var(--text-muted)',
              fontWeight: activeTab === 'repair' ? 700 : 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <Wrench size={18} /> Repair Services
          </button>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Inspection Standard Badge Button */}
          <button
            onClick={onOpenInspection}
            title="View 50-Point Quality Guarantee"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <ShieldCheck size={16} color="#10b981" />
            <span className="hide-mobile">50-Pt Guarantee</span>
          </button>

          {/* Track Repair Quick Access */}
          <button
            onClick={onOpenRepairTracker}
            title="Track Repair Job Status"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.5rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <SearchCheck size={16} color="#06b6d4" />
            <span className="hide-mobile">Track Job</span>
          </button>

          {/* Compare Button if items selected */}
          {compareCount > 0 && (
            <button
              onClick={onOpenCompare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid #8b5cf6',
                color: '#a78bfa',
                padding: '0.5rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <Layers size={16} /> Compare ({compareCount})
            </button>
          )}

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            style={{
              position: 'relative',
              background: 'var(--accent-emerald)',
              color: '#ffffff',
              border: 'none',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <ShoppingCart size={18} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: '#ffffff',
                color: '#059669',
                borderRadius: '9999px',
                padding: '0.1rem 0.45rem',
                fontSize: '0.75rem',
                fontWeight: 800
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle Light/Dark Theme"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              padding: '0.6rem',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>

          {/* Admin Toggle Shortcut */}
          <button
            onClick={onOpenAdmin}
            title="Store Manager Portal Preview"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)',
              padding: '0.55rem',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
          >
            <UserCheck size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
