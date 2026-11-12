import React, { useState } from 'react';
import { 
  TRADE_IN_BRANDS, 
  PROCESSORS, 
  RAM_OPTIONS, 
  STORAGE_OPTIONS, 
  PHYSICAL_CONDITIONS 
} from '../data/tradeInModels';
import { 
  DollarSign, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Truck, 
  Sparkles, 
  Gift, 
  RefreshCw,
  ShieldCheck,
  Calendar,
  Clock
} from 'lucide-react';

export default function SellLaptopWizard({ onApplyTradeInDiscount }) {
  const [step, setStep] = useState(1);

  // Form selections
  const [selectedBrand, setSelectedBrand] = useState(TRADE_IN_BRANDS[0]);
  const [selectedSeries, setSelectedSeries] = useState(TRADE_IN_BRANDS[0].seriesList[0]);
  const [selectedCpu, setSelectedCpu] = useState(PROCESSORS[2]);
  const [selectedRam, setSelectedRam] = useState(RAM_OPTIONS[2]);
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_OPTIONS[2]);
  const [selectedCondition, setSelectedCondition] = useState(PHYSICAL_CONDITIONS[1]);
  const [hasOriginalCharger, setHasOriginalCharger] = useState(true);

  // Payout & Pickup State
  const [payoutOption, setPayoutOption] = useState('cash'); // 'cash', 'store_credit', 'trade_in'
  const [scheduleSuccess, setScheduleSuccess] = useState(false);
  const [valuationId, setValuationId] = useState('');

  // Calculate instant price valuation quote in INR
  const calculateValuation = () => {
    let base = selectedBrand.baseValuation;
    if (selectedCpu.includes('M3') || selectedCpu.includes('i9')) base += 14000;
    if (selectedCpu.includes('i7') || selectedCpu.includes('Ryzen 7')) base += 8000;
    if (selectedRam === '32 GB') base += 6000;
    if (selectedRam === '64 GB') base += 12000;
    if (selectedStorage === '1 TB NVMe SSD') base += 5000;
    if (selectedStorage === '2 TB NVMe SSD') base += 10000;
    if (!hasOriginalCharger) base -= 2000;

    const finalValuation = Math.round(base * selectedCondition.multiplier);
    return Math.max(8000, finalValuation);
  };

  const currentQuote = calculateValuation();
  const storeCreditQuote = Math.round(currentQuote * 1.15); // 15% extra bonus

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleCompleteTradeIn = (e) => {
    e.preventDefault();
    const refCode = `VAL-${Math.floor(100000 + Math.random() * 900000)}`;
    setValuationId(refCode);
    setScheduleSuccess(true);

    if (payoutOption === 'trade_in') {
      onApplyTradeInDiscount(currentQuote, refCode);
    }
  };

  return (
    <section id="sell" style={{ padding: '4rem 0 5rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem auto' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>
            <DollarSign size={14} /> ReTech Buyback & Trade-In Program
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Sell Your Laptop for Instant Cash
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Get an instant valuation quote in 60 seconds. Free doorstep pickup, instant payout upon inspection, or get +15% extra in store credit towards a refurbished laptop.
          </p>
        </div>

        {scheduleSuccess ? (
          /* Success Screen */
          <div className="glass-panel" style={{
            maxWidth: '650px',
            margin: '0 auto',
            padding: '3rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '999px',
              background: 'var(--accent-emerald-glow)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem auto'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Valuation Offer Accepted!
            </h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              Reference ID: <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{valuationId}</strong>
            </p>

            <div style={{
              background: 'var(--bg-primary)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Device Evaluated:</span>
                <strong>{selectedBrand.name} {selectedSeries}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Condition Grade:</span>
                <strong>{selectedCondition.title}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-emerald)', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                <span>Final Payout Offer:</span>
                <span>₹{(payoutOption === 'store_credit' ? storeCreditQuote : currentQuote).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              📦 Courier collection label & instructions have been sent to your contact details. A shipping kit will arrive within 24 hours.
            </p>

            <button 
              onClick={() => {
                setScheduleSuccess(false);
                setStep(1);
              }}
              className="btn-secondary"
            >
              Evaluate Another Laptop
            </button>
          </div>
        ) : (
          /* Step-by-Step Valuation Form */
          <div className="glass-panel" style={{ maxWidth: '850px', margin: '0 auto', padding: '2.5rem' }}>
            {/* Step Progress Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2.5rem',
              position: 'relative'
            }}>
              {[
                { num: 1, label: "Brand & Model" },
                { num: 2, label: "Specs & Hardware" },
                { num: 3, label: "Physical Condition" },
                { num: 4, label: "Instant Offer & Payout" }
              ].map((s) => (
                <div 
                  key={s.num}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.4rem',
                    zIndex: 2,
                    cursor: s.num < step ? 'pointer' : 'default'
                  }}
                  onClick={() => s.num < step && setStep(s.num)}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '999px',
                    background: step === s.num ? 'var(--accent-emerald)' : step > s.num ? 'var(--accent-emerald-glow)' : 'var(--bg-secondary)',
                    border: step >= s.num ? '2px solid #10b981' : '1px solid var(--border-color)',
                    color: step === s.num ? '#ffffff' : step > s.num ? '#10b981' : 'var(--text-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.9rem'
                  }}>
                    {step > s.num ? <CheckCircle2 size={20} /> : s.num}
                  </div>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: step === s.num ? 700 : 500,
                    color: step === s.num ? 'var(--text-main)' : 'var(--text-dim)'
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1: Select Brand & Series */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                  Step 1: Select Your Laptop Brand & Series
                </h3>

                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                  Manufacturer Brand
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '0.85rem',
                  marginBottom: '1.5rem'
                }}>
                  {TRADE_IN_BRANDS.map(brand => (
                    <div
                      key={brand.id}
                      onClick={() => {
                        setSelectedBrand(brand);
                        setSelectedSeries(brand.seriesList[0]);
                      }}
                      style={{
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        border: selectedBrand.id === brand.id ? '2px solid #10b981' : '1px solid var(--border-color)',
                        background: selectedBrand.id === brand.id ? 'var(--accent-emerald-glow)' : 'var(--bg-primary)',
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        cursor: 'pointer'
                      }}
                    >
                      {brand.name}
                    </div>
                  ))}
                </div>

                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.6rem' }}>
                  Model Series
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '0.75rem',
                  marginBottom: '2rem'
                }}>
                  {selectedBrand.seriesList.map(series => (
                    <div
                      key={series}
                      onClick={() => setSelectedSeries(series)}
                      style={{
                        padding: '0.85rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: selectedSeries === series ? '2px solid #06b6d4' : '1px solid var(--border-color)',
                        background: selectedSeries === series ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-primary)',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {series}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Specs & Hardware */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                  Step 2: Specify Internal Components
                </h3>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                    Processor (CPU)
                  </label>
                  <select
                    value={selectedCpu}
                    onChange={(e) => setSelectedCpu(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      borderRadius: 'var(--radius-md)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    {PROCESSORS.map(cpu => <option key={cpu} value={cpu}>{cpu}</option>)}
                  </select>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      RAM Memory
                    </label>
                    <select
                      value={selectedRam}
                      onChange={(e) => setSelectedRam(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        borderRadius: 'var(--radius-md)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}
                    >
                      {RAM_OPTIONS.map(ram => <option key={ram} value={ram}>{ram}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                      Storage Size
                    </label>
                    <select
                      value={selectedStorage}
                      onChange={(e) => setSelectedStorage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-main)',
                        borderRadius: 'var(--radius-md)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}
                    >
                      {STORAGE_OPTIONS.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>
                </div>

                {/* Original Accessories Check */}
                <div style={{
                  background: 'var(--bg-primary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Include Original Power Charger & Cable?</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>+₹2,000 valuation bonus for genuine power adapter</div>
                  </div>
                  <input 
                    type="checkbox"
                    checked={hasOriginalCharger}
                    onChange={(e) => setHasOriginalCharger(e.target.checked)}
                    style={{ accentColor: '#10b981', width: '20px', height: '20px', cursor: 'pointer' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Physical Condition */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)' }}>
                  Step 3: Honest Physical & Functional Condition
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {PHYSICAL_CONDITIONS.map(cond => (
                    <div
                      key={cond.id}
                      onClick={() => setSelectedCondition(cond)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        border: selectedCondition.id === cond.id ? '2px solid #10b981' : '1px solid var(--border-color)',
                        background: selectedCondition.id === cond.id ? 'var(--accent-emerald-glow)' : 'var(--bg-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                          {cond.title}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          {cond.desc}
                        </div>
                      </div>
                      {selectedCondition.id === cond.id && (
                        <CheckCircle2 size={20} color="#10b981" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Instant Offer & Payout Selection */}
            {step === 4 && (
              <div className="animate-fade-in">
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
                  border: '1px solid var(--accent-emerald)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  textAlign: 'center',
                  marginBottom: '2rem'
                }}>
                  <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
                    <Sparkles size={14} /> Guaranteed ReTech Valuation Offer
                  </div>
                  <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    ₹{currentQuote.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    Estimated Payout for {selectedBrand.name} {selectedSeries} ({selectedCondition.title})
                  </div>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem', color: 'var(--text-main)' }}>
                  Select Your Preferred Payout Method:
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  {/* Cash Option */}
                  <div
                    onClick={() => setPayoutOption('cash')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: payoutOption === 'cash' ? '2px solid #10b981' : '1px solid var(--border-color)',
                      background: payoutOption === 'cash' ? 'var(--accent-emerald-glow)' : 'var(--bg-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      <DollarSign size={18} color="#10b981" /> Direct Bank Transfer (NEFT/UPI)
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                      ₹{currentQuote.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Paid within 24h of inspection
                    </div>
                  </div>

                  {/* Store Credit Option */}
                  <div
                    onClick={() => setPayoutOption('store_credit')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: payoutOption === 'store_credit' ? '2px solid #06b6d4' : '1px solid var(--border-color)',
                      background: payoutOption === 'store_credit' ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      <Gift size={18} color="#06b6d4" /> Store Credit (+15% Bonus)
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                      ₹{storeCreditQuote.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Use on any refurbished laptop purchase
                    </div>
                  </div>

                  {/* Instant Trade-In Discount */}
                  <div
                    onClick={() => setPayoutOption('trade_in')}
                    style={{
                      padding: '1.25rem',
                      borderRadius: 'var(--radius-md)',
                      border: payoutOption === 'trade_in' ? '2px solid #8b5cf6' : '1px solid var(--border-color)',
                      background: payoutOption === 'trade_in' ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-primary)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      <RefreshCw size={18} color="#a78bfa" /> Cart Trade-In Discount
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#a78bfa' }}>
                      -₹{currentQuote.toLocaleString('en-IN')} Off Cart
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      Apply directly to your current shopping cart
                    </div>
                  </div>
                </div>

                {/* Pickup Booking Form */}
                <form onSubmit={handleCompleteTradeIn} style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-md)' }}>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Truck size={16} color="#10b981" /> Schedule Doorstep Pickup & Address
                  </h5>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      required 
                      style={{ padding: '0.6rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }} 
                    />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      style={{ padding: '0.6rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }} 
                    />
                  </div>

                  <input 
                    type="text" 
                    placeholder="Pickup Street Address" 
                    required 
                    style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)', marginBottom: '1rem' }} 
                  />

                  <button type="submit" className="btn-primary" style={{ width: '100%', fontSize: '1rem', padding: '0.75rem' }}>
                    Lock Offer & Schedule Free Courier Pickup
                  </button>
                </form>
              </div>
            )}

            {/* Navigation Next/Prev Controls */}
            {!scheduleSuccess && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '2rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-color)'
              }}>
                <button
                  onClick={handlePrev}
                  disabled={step === 1}
                  className="btn-secondary"
                  style={{ opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ArrowLeft size={16} /> Back
                </button>

                {step < 4 && (
                  <button onClick={handleNext} className="btn-primary">
                    Next Step <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
