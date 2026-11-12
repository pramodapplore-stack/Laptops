import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ShieldCheck, 
  Tag, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  tradeInDiscount, 
  tradeInCode, 
  onRemoveTradeIn,
  onProceedToCheckout 
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: 'RETECH10', discountAmount: 100 }
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();

    if (code === 'RETECH10') {
      setAppliedPromo({ code: 'RETECH10', percent: 10, label: '10% Refurbished Discount' });
    } else if (code === 'ECOGREEN2026') {
      setAppliedPromo({ code: 'ECOGREEN2026', fixed: 3000, label: '₹3,000 Green Eco Bonus' });
    } else {
      setPromoError('Invalid promo code. Try RETECH10 or ECOGREEN2026.');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.finalPrice || item.price) * item.quantity, 0);
  
  let promoDiscount = 0;
  if (appliedPromo) {
    if (appliedPromo.percent) promoDiscount = Math.round(subtotal * (appliedPromo.percent / 100));
    if (appliedPromo.fixed) promoDiscount = appliedPromo.fixed;
  }

  const finalTotal = Math.max(0, subtotal - promoDiscount - tradeInDiscount);

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100vh',
          background: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          animation: 'fadeIn 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.2rem' }}>
            <ShoppingCart size={20} color="#10b981" /> Shopping Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingCart size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Your Cart is Empty
              </h4>
              <p style={{ fontSize: '0.85rem' }}>
                Browse our certified refurbished laptop catalog to add items.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <div 
                  key={`${item.id}-${item.selectedWarranty || 'std'}`}
                  style={{
                    background: 'var(--bg-primary)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>{item.conditionGrade}</span>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                        {item.name}
                      </h4>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.selectedWarranty === 'extended' ? '24M Extended Warranty (+₹4,999)' : `${item.warrantyMonths}M Standard Warranty`}
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                      ₹{((item.finalPrice || item.price) * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--border-color)',
            background: 'var(--bg-secondary)'
          }}>
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input 
                type="text" 
                placeholder="Promo Code (RETECH10)" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
              <button type="submit" className="btn-secondary" style={{ padding: '0.5rem 0.85rem', fontSize: '0.82rem' }}>
                Apply
              </button>
            </form>

            {promoError && <div style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>{promoError}</div>}

            {/* Applied Discounts Summary */}
            {appliedPromo && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#10b981', marginBottom: '0.35rem' }}>
                <span>Promo ({appliedPromo.code}):</span>
                <span>-₹{promoDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {tradeInDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#8b5cf6', marginBottom: '0.35rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={13} /> Trade-in Voucher ({tradeInCode}):
                </span>
                <span>-₹{tradeInDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}

            {/* Total Row */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              fontSize: '1.3rem',
              fontWeight: 800,
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-color)',
              color: 'var(--text-main)'
            }}>
              <span>Total Payable:</span>
              <span style={{ color: 'var(--accent-emerald)' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            <button 
              onClick={() => {
                onClose();
                onProceedToCheckout(finalTotal, promoDiscount);
              }}
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem', fontSize: '1rem' }}
            >
              Checkout Now <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
