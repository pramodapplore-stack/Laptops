import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { 
  Laptop, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Wrench, 
  Recycle, 
  Mail, 
  Check,
  Heart
} from 'lucide-react';

export default function Footer({ setActiveTab, onOpenInspection }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '4rem 0 2rem 0',
      color: 'var(--text-muted)',
      fontSize: '0.9rem'
    }}>
      <div className="container">
        {/* Trust Badges Strip */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          paddingBottom: '3rem',
          marginBottom: '3rem',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'var(--accent-emerald-glow)', color: 'var(--accent-emerald)' }}>
              <ShieldCheck size={26} />
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '0.95rem' }}>12-Month Free Warranty</strong>
              <span style={{ fontSize: '0.78rem' }}>Full hardware & battery protection</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)' }}>
              <Truck size={26} />
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '0.95rem' }}>Free Insured Courier</strong>
              <span style={{ fontSize: '0.78rem' }}>2-Day express doorstep shipping</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)' }}>
              <RotateCcw size={26} />
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '0.95rem' }}>30-Day Money-Back</strong>
              <span style={{ fontSize: '0.78rem' }}>Hassle-free zero penalty returns</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
              <Recycle size={26} />
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)', display: 'block', fontSize: '0.95rem' }}>Zero E-Waste Impact</strong>
              <span style={{ fontSize: '0.78rem' }}>12,800+ laptops recycled & saved</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Laptop size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>{SITE_CONFIG.companyName} Laptops</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              The premier certified platform for buying Grade-A refurbished laptops, trading in used hardware for instant cash, and booking professional diagnostics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Shop & Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              <li><a onClick={() => setActiveTab('shop')} style={{ cursor: 'pointer', color: 'inherit' }}>Refurbished MacBooks</a></li>
              <li><a onClick={() => setActiveTab('shop')} style={{ cursor: 'pointer', color: 'inherit' }}>Dell XPS & Workstations</a></li>
              <li><a onClick={() => setActiveTab('shop')} style={{ cursor: 'pointer', color: 'inherit' }}>Lenovo ThinkPad Ultrabooks</a></li>
              <li><a onClick={() => setActiveTab('sell')} style={{ cursor: 'pointer', color: 'inherit' }}>Sell Laptop for Instant Cash</a></li>
              <li><a onClick={() => setActiveTab('repair')} style={{ cursor: 'pointer', color: 'inherit' }}>Laptop Screen & Battery Repair</a></li>
            </ul>
          </div>

          {/* Quality & Trust */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Quality & Trust
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.85rem' }}>
              <li><a onClick={onOpenInspection} style={{ cursor: 'pointer', color: 'inherit' }}>50-Point Quality Checklist</a></li>
              <li><a style={{ color: 'inherit' }}>Cosmetic Grade Guide (A+, A, B)</a></li>
              <li><a style={{ color: 'inherit' }}>12-Month Hardware Warranty Terms</a></li>
              <li><a style={{ color: 'inherit' }}>Corporate Bulk Refurbished Supply</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: 'var(--text-main)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>
              Get Exclusive Stock Drops
            </h4>
            <p style={{ fontSize: '0.82rem', marginBottom: '0.75rem' }}>
              Subscribe to get alerts when rare high-spec MacBooks and XPS models drop at up to 60% off.
            </p>
            {subscribed ? (
              <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Check size={16} /> Subscribed to {SITE_CONFIG.companyName} Alerts!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.4rem' }}>
                <input 
                  type="email" 
                  placeholder="Enter email..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '6px',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    flex: 1
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}>
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Rights */}
        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border-color)',
          fontSize: '0.8rem'
        }}>
          © 2026 {SITE_CONFIG.companyFullName} Built for sustainable high-performance computing.
        </div>
      </div>
    </footer>
  );
}
