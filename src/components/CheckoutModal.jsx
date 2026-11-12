import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Download, 
  Printer, 
  Lock,
  PackageCheck,
  QrCode
} from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  totalAmount, 
  onClearCart 
}) {
  if (!isOpen) return null;

  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Address, 2: Payment, 3: Completed Invoice
  const [formData, setFormData] = useState({
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    address: '42 MG Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    zip: '560038',
    paymentMethod: 'upi'
  });

  const [orderId, setOrderId] = useState('');

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const generatedId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderId(generatedId);
    setCheckoutStep(3);
    onClearCart();
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={20} color="#10b981" /> ReTech Secure Checkout
          </h2>

          <button 
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {checkoutStep === 3 ? (
          /* STEP 3: Printable Order Receipt & Confirmation */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '999px',
              background: 'var(--accent-emerald-glow)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.2rem' }}>
              Order Confirmed!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Thank you for choosing certified refurbished technology. Order Reference: <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{orderId}</strong>
            </p>

            {/* Invoice Printable Box */}
            <div className="glass-panel" style={{
              padding: '1.5rem',
              textAlign: 'left',
              background: 'var(--bg-primary)',
              marginBottom: '1.5rem',
              fontSize: '0.88rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div>
                  <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>ReTech Tax Invoice (GST Included)</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Date: {new Date().toLocaleDateString('en-IN')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="badge badge-emerald">PAID & VERIFIED</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-muted)' }}>Deliver To:</strong>
                <div>{formData.fullName}</div>
                <div>{formData.address}, {formData.city}, {formData.state} - {formData.zip}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-emerald)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <span>Total Amount Charged:</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button onClick={() => window.print()} className="btn-secondary">
                <Printer size={16} /> Print Official GST Invoice
              </button>
              <button onClick={onClose} className="btn-primary">
                Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* STEP 1 & 2 Form */
          <form onSubmit={handleCompleteOrder}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* Shipping Address */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Truck size={18} color="#06b6d4" /> Delivery Address
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    required
                    style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                  />
                  <input 
                    type="text" 
                    placeholder="Street / Flat / Area"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                    style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                      style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                    />
                    <input 
                      type="text" 
                      placeholder="Pincode"
                      value={formData.zip}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      required
                      style={{ padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CreditCard size={18} color="#10b981" /> Payment Option
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '6px', cursor: 'pointer' }}>
                    <input type="radio" name="pay" defaultChecked style={{ accentColor: '#10b981' }} />
                    <QrCode size={18} color="#10b981" /> Instant UPI (Google Pay, PhonePe, Paytm, BHIM)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '6px', cursor: 'pointer' }}>
                    <input type="radio" name="pay" style={{ accentColor: '#10b981' }} />
                    <CreditCard size={18} color="#06b6d4" /> Credit / Debit Card & NetBanking
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem', background: 'var(--bg-primary)', borderRadius: '6px', cursor: 'pointer' }}>
                    <input type="radio" name="pay" style={{ accentColor: '#10b981' }} />
                    Cash / Pay on Doorstep Delivery
                  </label>
                </div>

                <div style={{
                  background: 'var(--bg-primary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    <span>Total Amount:</span>
                    <span style={{ color: 'var(--accent-emerald)' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem' }}>
                  Authorize Payment & Place Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
