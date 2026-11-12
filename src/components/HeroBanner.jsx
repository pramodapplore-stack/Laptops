import React from 'react';
import { 
  Laptop, 
  DollarSign, 
  Wrench, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  CheckCircle2, 
  Recycle,
  Zap,
  Truck
} from 'lucide-react';

export default function HeroBanner({ setActiveTab, onOpenInspection }) {
  return (
    <section style={{
      position: 'relative',
      padding: '4rem 0 3rem 0',
      background: 'radial-gradient(ellipse at 50% -20%, rgba(16, 185, 129, 0.15) 0%, rgba(11, 15, 23, 0) 70%)',
      overflow: 'hidden'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Left Column: Headlines & CTA */}
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '1.25rem' }}>
              <Recycle size={14} /> Certified Sustainable Tech Platform
            </div>

            <h1 style={{
              fontSize: '2.8rem',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              color: 'var(--text-main)'
            }}>
              Refurbished Laptops.<br />
              <span style={{
                background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Uncompromised Quality.
              </span>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              marginBottom: '2rem',
              maxWidth: '540px',
              lineHeight: 1.6
            }}>
              Buy rigorously tested Grade A+ refurbished laptops with 12-month warranties, sell your used device for instant cash valuation, or book expert hardware repair services.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              <button 
                onClick={() => setActiveTab('shop')}
                className="btn-primary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}
              >
                <Laptop size={20} /> Shop Refurbished
              </button>

              <button 
                onClick={() => setActiveTab('sell')}
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.75rem' }}
              >
                <DollarSign size={20} color="#06b6d4" /> Instant Laptop Trade-In
              </button>

              <button 
                onClick={() => setActiveTab('repair')}
                className="btn-secondary"
                style={{ fontSize: '1rem', padding: '0.85rem 1.5rem' }}
              >
                <Wrench size={18} color="#f59e0b" /> Book Repair
              </button>
            </div>

            {/* Value Props Checklist */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontSize: '0.88rem',
              fontWeight: 600,
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} color="#10b981" /> 50-Point Quality Inspection
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={16} color="#06b6d4" /> Free Express Delivery
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={16} color="#f59e0b" /> 30-Day Money Back
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Highlight Card */}
          <div className="glass-panel" style={{
            padding: '2rem',
            position: 'relative',
            background: 'linear-gradient(145deg, var(--bg-card) 0%, rgba(19, 25, 38, 0.9) 100%)',
            border: '1px solid var(--border-highlight)'
          }}>
            {/* Visual Hardware Preview Box */}
            <div className="laptop-graphic-container" style={{ marginBottom: '1.5rem' }}>
              <div className="laptop-screen-mockup">
                <div style={{ color: '#10b981', fontSize: '0.75rem', fontWeight: 700, textAlign: 'center', padding: '0.5rem' }}>
                  <ShieldCheck size={28} style={{ margin: '0 auto 0.2rem auto', display: 'block' }} />
                  RETECH CERTIFIED
                  <div style={{ fontSize: '0.65rem', color: '#9ca3af', fontWeight: 400 }}>100% Tested & Disinfected</div>
                </div>
              </div>
              <div className="laptop-base-mockup">
                <div className="laptop-notch"></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <span className="badge badge-emerald">Grade A+ Like New</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--text-main)' }}>
                  Apple MacBook Pro 14" M1 Pro
                </h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>₹99,900</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textDecoration: 'line-through' }}>₹1,64,900 MSRP</div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              background: 'var(--bg-primary)',
              padding: '0.85rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8rem',
              marginBottom: '1.25rem'
            }}>
              <div><strong style={{ color: 'var(--text-muted)' }}>Battery Health:</strong> <span style={{ color: '#10b981', fontWeight: 700 }}>96% Original</span></div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Warranty:</strong> <span style={{ fontWeight: 700 }}>12 Months Full</span></div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Specs:</strong> 16GB RAM / 512GB SSD</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Condition:</strong> Pristine XDR Screen</div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => setActiveTab('shop')}
                className="btn-primary" 
                style={{ flex: 1, fontSize: '0.9rem' }}
              >
                View Deal <ArrowRight size={16} />
              </button>
              <button 
                onClick={onOpenInspection}
                className="btn-secondary" 
                style={{ fontSize: '0.9rem', padding: '0.6rem 0.85rem' }}
                title="View Inspection Report"
              >
                <ShieldCheck size={18} color="#10b981" /> Report
              </button>
            </div>
          </div>
        </div>

        {/* Real-time Stats Strip */}
        <div className="glass-panel" style={{
          marginTop: '3.5rem',
          padding: '1.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>12,850+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Laptops Refurbished & Saved</div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>50-Point</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Rigorous Diagnostic Test</div>
          </div>

          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
              4.9/5 <Star size={22} fill="#f59e0b" color="#f59e0b" />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Over 4,500 Customer Reviews</div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8b5cf6' }}>₹25 Cr+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Paid to Laptop Sellers</div>
          </div>
        </div>
      </div>
    </section>
  );
}
