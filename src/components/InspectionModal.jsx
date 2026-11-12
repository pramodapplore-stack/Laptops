import React, { useState } from 'react';
import { 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  BatteryCharging, 
  Monitor, 
  Cpu, 
  Keyboard, 
  Wifi, 
  Sparkles,
  Award
} from 'lucide-react';

export default function InspectionModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('display');

  const INSPECTION_CATEGORIES = [
    {
      id: 'display',
      title: 'Display & Visuals',
      icon: <Monitor size={18} />,
      checks: [
        "100% Dead-Pixel & Bright Spot Matrix Stress Test",
        "Color Gamut & Backlight Uniformity Benchmark",
        "Hinge Tension & Smoothness Test",
        "Webcam & Proximity Sensor Functionality",
        "True Tone / Auto-Brightness Sensor Calibration"
      ]
    },
    {
      id: 'battery',
      title: 'Battery & Power',
      icon: <BatteryCharging size={18} />,
      checks: [
        "Minimum 90% Battery Capacity Retention Guarantee",
        "Charge Cycle Count & Voltage Stability Audit",
        "Thermal Throttling & 100% CPU/GPU Stress Load Test",
        "Original OEM Power Adapter Voltage Output Check",
        "Power Management IC & Sleep Mode Drain Test"
      ]
    },
    {
      id: 'hardware',
      title: 'Keyboard & Chassis',
      icon: <Keyboard size={18} />,
      checks: [
        "Key Switch Matrix Actuation & Tactile Feedback Test",
        "Multi-Touch Precision Trackpad Gesture Test",
        "Internal Dual-Fan Dust Extraction & Thermal Repaste",
        "Chassis Structural Integrity & Micro-Scrape Inspection",
        "Speakers & Microphone High-Frequency Audio Test"
      ]
    },
    {
      id: 'ports',
      title: 'Connectivity & OS',
      icon: <Wifi size={18} />,
      checks: [
        "Thunderbolt 4 / USB-C High Speed Data Transfer Test",
        "Wi-Fi 6E & Bluetooth 5.3 Antenna Range Test",
        "HDMI / DisplayPort 4K 120Hz External Display Out",
        "Official Genuine OS Re-installation & Driver Updates",
        "Hospital-Grade UV-C Disinfection & Sanitization"
      ]
    }
  ];

  const currentCategory = INSPECTION_CATEGORIES.find(c => c.id === activeTab) || INSPECTION_CATEGORIES[0];

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Award size={24} color="#10b981" />
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                ReTech 50-Point Certified Inspection
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Every single laptop undergoes rigorous 5-stage lab testing before release.
              </div>
            </div>
          </div>

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

        {/* Category Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          overflowX: 'auto',
          paddingBottom: '0.25rem'
        }}>
          {INSPECTION_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: activeTab === cat.id ? 'var(--accent-emerald-glow)' : 'var(--bg-primary)',
                color: activeTab === cat.id ? 'var(--accent-emerald)' : 'var(--text-muted)',
                fontWeight: activeTab === cat.id ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              {cat.icon} {cat.title}
            </button>
          ))}
        </div>

        {/* Checklist Container */}
        <div className="glass-panel" style={{ padding: '1.5rem', background: 'var(--bg-primary)', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={18} color="#10b981" /> {currentCategory.title} Diagnostic Checklist
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentCategory.checks.map((check, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.9rem',
                color: 'var(--text-main)',
                padding: '0.5rem 0.75rem',
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)'
              }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>{check}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          🔒 Includes 12-Month Hardware Guarantee & Free Return Shipping within 30 days.
        </div>
      </div>
    </div>
  );
}
