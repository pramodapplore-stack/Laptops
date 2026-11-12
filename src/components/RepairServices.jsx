import React, { useState } from 'react';
import { REPAIR_SERVICES, REPAIR_FAQS } from '../data/repairs';
import { 
  Wrench, 
  Monitor, 
  BatteryCharging, 
  Thermometer, 
  Keyboard, 
  Cpu, 
  HardDrive, 
  Clock, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  SearchCheck, 
  ChevronDown,
  ChevronUp,
  X,
  Truck
} from 'lucide-react';

export default function RepairServices({ onOpenRepairTracker }) {
  const [selectedService, setSelectedService] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Estimator Form state
  const [calcBrand, setCalcBrand] = useState('Apple');
  const [calcIssue, setCalcIssue] = useState('rep-screen');
  const [calcPriority, setCalcPriority] = useState('standard'); // 'standard', 'express'

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Monitor': return <Monitor size={24} color="#06b6d4" />;
      case 'BatteryCharging': return <BatteryCharging size={24} color="#10b981" />;
      case 'Thermometer': return <Thermometer size={24} color="#f59e0b" />;
      case 'Keyboard': return <Keyboard size={24} color="#8b5cf6" />;
      case 'Cpu': return <Cpu size={24} color="#f43f5e" />;
      case 'HardDrive': return <HardDrive size={24} color="#3b82f6" />;
      default: return <Wrench size={24} color="#10b981" />;
    }
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setBookingModalOpen(true);
    setBookingSuccess(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const ticketId = `REP-${Math.floor(8000 + Math.random() * 1999)}`;
    setGeneratedTicketId(ticketId);
    setBookingSuccess(true);
  };

  // Estimate calculation in INR
  const calculateEstimatedCost = () => {
    let base = 4999;
    if (calcIssue === 'rep-screen') base = 11999;
    if (calcIssue === 'rep-battery') base = 4999;
    if (calcIssue === 'rep-motherboard') base = 15999;
    if (calcIssue === 'rep-thermal') base = 1999;
    if (calcIssue === 'rep-upgrade') base = 3999;

    if (calcBrand === 'Apple') base += 3000;
    if (calcPriority === 'express') base += 999;

    return base;
  };

  return (
    <section id="repair" style={{ padding: '4rem 0 5rem 0' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <div className="badge badge-amber" style={{ marginBottom: '0.75rem' }}>
            <Wrench size={14} /> Express Laptop Diagnostics & Repair
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Expert Hardware Repairs & Upgrades
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Screen replacements, OEM battery swaps, thermal repasting, and chip-level micro-soldering with 180-day warranty and doorstep courier pickup.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
            <button 
              onClick={onOpenRepairTracker}
              className="btn-outline-emerald" 
              style={{ fontSize: '0.9rem' }}
            >
              <SearchCheck size={16} /> Track Existing Repair Ticket Status
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.75rem',
          marginBottom: '4rem'
        }}>
          {REPAIR_SERVICES.map(service => (
            <div key={service.id} className="glass-panel" style={{
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}>
              {service.popular && (
                <span className="badge badge-emerald" style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontSize: '0.65rem'
                }}>
                  Popular Fix
                </span>
              )}

              <div>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-color)'
                }}>
                  {getIcon(service.icon)}
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                  {service.category}
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.6rem' }}>
                  {service.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {service.description}
                </p>

                {/* Common Symptoms */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    Common Symptoms Fixed:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {service.symptoms.slice(0, 3).map((sym, idx) => (
                      <div key={idx} style={{ fontSize: '0.78rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <CheckCircle2 size={13} color="#10b981" /> {sym}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {service.estimatedCostRange}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {service.turnaround}
                  </div>
                </div>

                <button 
                  onClick={() => handleBookService(service)}
                  className="btn-primary" 
                  style={{ fontSize: '0.85rem', padding: '0.55rem 1rem' }}
                >
                  Book Fix
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Instant Cost Calculator Bar */}
        <div className="glass-panel" style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(19, 25, 38, 0.95) 100%)',
          border: '1px solid var(--border-highlight)',
          marginBottom: '4rem'
        }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Wrench size={20} color="#10b981" /> Instant Online Repair Cost Estimator
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Select Laptop Brand
              </label>
              <select
                value={calcBrand}
                onChange={(e) => setCalcBrand(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '6px' }}
              >
                <option value="Apple">Apple MacBook</option>
                <option value="Dell">Dell XPS / Latitude</option>
                <option value="Lenovo">Lenovo ThinkPad / Legion</option>
                <option value="HP">HP Spectre / EliteBook</option>
                <option value="ASUS">ASUS ROG / ZenBook</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Primary Issue / Service Needed
              </label>
              <select
                value={calcIssue}
                onChange={(e) => setCalcIssue(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '6px' }}
              >
                <option value="rep-screen">Display / Screen Replacement</option>
                <option value="rep-battery">Battery Replacement</option>
                <option value="rep-thermal">Thermal Repasting & Clean</option>
                <option value="rep-motherboard">Motherboard / Power Repair</option>
                <option value="rep-upgrade">SSD / RAM Speed Upgrade</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                Turnaround Speed
              </label>
              <select
                value={calcPriority}
                onChange={(e) => setCalcPriority(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-main)', borderRadius: '6px' }}
              >
                <option value="standard">Standard Service (24-48 Hours)</option>
                <option value="express">Express Same-Day Rush (+₹999)</option>
              </select>
            </div>

            <div style={{
              background: 'var(--bg-primary)',
              padding: '0.75rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Estimated Total</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  ₹{calculateEstimatedCost().toLocaleString('en-IN')}
                </div>
              </div>
              <button 
                onClick={() => handleBookService(REPAIR_SERVICES.find(s => s.id === calcIssue) || REPAIR_SERVICES[0])}
                className="btn-primary" 
                style={{ fontSize: '0.82rem', padding: '0.5rem 0.85rem' }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1.75rem', color: 'var(--text-main)' }}>
            Frequently Asked Questions About Repairs
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {REPAIR_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="glass-panel" style={{ padding: '1.25rem', cursor: 'pointer' }} onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-main)' }}>
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} color="var(--accent-emerald)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                  </div>
                  {isOpen && (
                    <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Form Modal */}
        {bookingModalOpen && (
          <div className="modal-overlay" onClick={() => setBookingModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  Book Repair Service
                </h3>
                <button onClick={() => setBookingModalOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  <X size={20} />
                </button>
              </div>

              {bookingSuccess ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <CheckCircle2 size={54} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.4rem' }}>Repair Appointment Booked!</h4>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                    Your repair job tracking ID is: <strong style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>{generatedTicketId}</strong>
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Save this ID! You can track your laptop's diagnostic and repair progress in real-time.
                  </p>

                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    <button 
                      onClick={() => {
                        setBookingModalOpen(false);
                        onOpenRepairTracker();
                      }}
                      className="btn-primary"
                    >
                      <SearchCheck size={16} /> Track Status Now
                    </button>
                    <button onClick={() => setBookingModalOpen(false)} className="btn-secondary">
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>
                      Selected Repair Package
                    </label>
                    <input 
                      type="text" 
                      value={selectedService ? selectedService.title : "General Laptop Repair"} 
                      disabled 
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--accent-emerald)', fontWeight: 700 }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
                      <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Phone Number</label>
                      <input type="tel" required placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Laptop Model & Year</label>
                      <input type="text" required placeholder="e.g. MacBook Pro 2021 M1" style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Preferred Date</label>
                      <input type="date" required style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-main)' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem' }}>Service Type</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.65rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        <input type="radio" name="delivery" defaultChecked style={{ accentColor: '#10b981' }} /> Doorstep Pickup & Return
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-primary)', padding: '0.65rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                        <input type="radio" name="delivery" style={{ accentColor: '#10b981' }} /> In-Store Drop-off
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', padding: '0.75rem', fontSize: '0.95rem' }}>
                    Confirm Repair Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
