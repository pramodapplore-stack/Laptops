import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { REFURBISHED_LAPTOPS } from '../data/laptops';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Check, 
  Laptop, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export default function ShopCatalog({ 
  onSelectLaptop, 
  onAddToCart, 
  comparedLaptops, 
  onToggleCompare 
}) {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGrades, setSelectedGrades] = useState([]);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [sortBy, setSortBy] = useState('recommended');

  const BRANDS = ["Apple", "Dell", "Lenovo", "ASUS", "HP"];
  const CATEGORIES = ["All", "Creator & Business", "Business Ultrabook", "Gaming & Performance", "Student & Everyday"];
  const GRADES = ["Grade A+ Certified", "Grade A Certified", "Grade B Value"];

  // Multi-select toggle helpers
  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleGrade = (grade) => {
    setSelectedGrades(prev => 
      prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedCategory('All');
    setSelectedGrades([]);
    setMaxPrice(150000);
    setSortBy('recommended');
  };

  // Filter & Sort Logic
  const filteredLaptops = useMemo(() => {
    return REFURBISHED_LAPTOPS.filter(laptop => {
      // Search match
      const matchesSearch = searchTerm === '' || 
        laptop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.specs.cpu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        laptop.specs.storage.toLowerCase().includes(searchTerm.toLowerCase());

      // Brand match
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(laptop.brand);

      // Category match
      const matchesCategory = selectedCategory === 'All' || laptop.category === selectedCategory;

      // Grade match
      const matchesGrade = selectedGrades.length === 0 || selectedGrades.includes(laptop.conditionGrade);

      // Price match
      const matchesPrice = laptop.price <= maxPrice;

      return matchesSearch && matchesBrand && matchesCategory && matchesGrade && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // Default recommended order
    });
  }, [searchTerm, selectedBrands, selectedCategory, selectedGrades, maxPrice, sortBy]);

  const comparedIds = comparedLaptops.map(l => l.id);

  return (
    <section id="catalog" style={{ padding: '3rem 0 5rem 0' }}>
      <div className="container">
        {/* Section Title Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '2rem',
          gap: '1.5rem'
        }}>
          <div>
            <div className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>
              <Sparkles size={14} /> Certified Refurbished Inventory
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>
              Explore Available Laptops
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Every laptop passes a 50-point factory diagnostic test & comes with a warranty.
            </p>
          </div>

          {/* Search & Sort Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            {/* Instant Search Bar */}
            <div style={{
              position: 'relative',
              minWidth: '260px'
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }} />
              <input
                type="text"
                placeholder="Search MacBook, i7, RTX, SSD..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem 0.65rem 2.4rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-main)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              {searchTerm && (
                <X 
                  size={16} 
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }} 
                />
              )}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowUpDown size={16} color="var(--text-muted)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-main)',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  outline: 'none',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <option value="recommended">Sort by Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated (4.9+)</option>
                <option value="discount">Biggest Savings %</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Filters + Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Sidebar Filter Panel */}
          <div className="glass-panel" style={{ padding: '1.5rem', position: 'sticky', top: '90px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <SlidersHorizontal size={18} color="var(--accent-emerald)" /> Filters
              </div>
              <button
                onClick={clearFilters}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--accent-emerald)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                Use Case Category
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      textAlign: 'left',
                      padding: '0.45rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: 'none',
                      background: selectedCategory === cat ? 'var(--accent-emerald-glow)' : 'transparent',
                      color: selectedCategory === cat ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      fontWeight: selectedCategory === cat ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                Manufacturer Brand
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {BRANDS.map(brand => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label 
                      key={brand}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: '0.88rem',
                        color: isChecked ? 'var(--text-main)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleBrand(brand)}
                        style={{ accentColor: '#10b981', width: '16px', height: '16px' }}
                      />
                      {brand}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Grade Condition Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                Cosmetic Grade
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {GRADES.map(grade => {
                  const isChecked = selectedGrades.includes(grade);
                  return (
                    <label 
                      key={grade}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontSize: '0.82rem',
                        color: isChecked ? 'var(--text-main)' : 'var(--text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleGrade(grade)}
                        style={{ accentColor: '#10b981', width: '15px', height: '15px' }}
                      />
                      {grade.replace(' Certified', '').replace(' Value', '')}
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Max Price
                </label>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  ₹{maxPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <input 
                type="range" 
                min="30000" 
                max="150000" 
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                <span>₹30,000</span>
                <span>₹1,50,000</span>
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div>
            {/* Filter Summary Header */}
            <div style={{
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}>
              <div>
                Showing <strong style={{ color: 'var(--text-main)' }}>{filteredLaptops.length}</strong> certified refurbished laptops
              </div>
            </div>

            {/* Zero Results View */}
            {filteredLaptops.length === 0 ? (
              <div className="glass-panel" style={{
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'var(--text-muted)'
              }}>
                <Laptop size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  No Laptops Match Your Selected Filters
                </h3>
                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                  Try adjusting your search criteria or resetting filters to see available inventory.
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            ) : (
              /* Product Cards Grid */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredLaptops.map(laptop => (
                  <ProductCard
                    key={laptop.id}
                    laptop={laptop}
                    onSelectLaptop={onSelectLaptop}
                    onAddToCart={onAddToCart}
                    onToggleCompare={onToggleCompare}
                    isCompared={comparedIds.includes(laptop.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
