import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ShopCatalog from './components/ShopCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import LaptopComparison from './components/LaptopComparison';
import SellLaptopWizard from './components/SellLaptopWizard';
import RepairServices from './components/RepairServices';
import RepairTrackerModal from './components/RepairTrackerModal';
import InspectionModal from './components/InspectionModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AdminDashboardModal from './components/AdminDashboardModal';
import Footer from './components/Footer';

export default function App() {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState('shop'); // 'shop', 'sell', 'repair'
  const [theme, setTheme] = useState('dark');

  // Cart & Orders State
  const [cartItems, setCartItems] = useState([]);
  const [tradeInDiscount, setTradeInDiscount] = useState(0);
  const [tradeInCode, setTradeInCode] = useState('');
  const [checkoutTotal, setCheckoutTotal] = useState(0);

  // Modals & Panels State
  const [selectedLaptopModal, setSelectedLaptopModal] = useState(null);
  const [comparedLaptops, setComparedLaptops] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isInspectionOpen, setIsInspectionOpen] = useState(false);
  const [isRepairTrackerOpen, setIsRepairTrackerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Toast Notification Queue
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3200);
  };

  // Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Cart Functions
  const handleAddToCart = (laptop) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === laptop.id && item.selectedWarranty === laptop.selectedWarranty);
      if (existing) {
        return prev.map(item => 
          item.id === laptop.id && item.selectedWarranty === laptop.selectedWarranty
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...laptop, quantity: 1 }];
    });
    showToast(`Added "${laptop.name}" to cart!`);
  };

  const handleUpdateQuantity = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === itemId ? { ...item, quantity: newQty } : item));
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    showToast("Item removed from cart");
  };

  // Laptop Comparison
  const handleToggleCompare = (laptop) => {
    setComparedLaptops(prev => {
      const exists = prev.some(l => l.id === laptop.id);
      if (exists) {
        showToast(`Removed ${laptop.brand} from comparison`);
        return prev.filter(l => l.id !== laptop.id);
      } else {
        if (prev.length >= 3) {
          showToast("Maximum 3 laptops can be compared side-by-side!");
          return prev;
        }
        showToast(`Added ${laptop.brand} to comparison`);
        return [...prev, laptop];
      }
    });
  };

  const handleRemoveCompareItem = (id) => {
    setComparedLaptops(prev => prev.filter(l => l.id !== id));
  };

  // Trade-In Voucher Discount Handler
  const handleApplyTradeInDiscount = (amount, code) => {
    setTradeInDiscount(amount);
    setTradeInCode(code);
    setIsCartOpen(true);
    showToast(`-$${amount} Trade-In Voucher ${code} applied to cart!`);
  };

  // Checkout Proceed
  const handleProceedToCheckout = (finalTotal) => {
    setCheckoutTotal(finalTotal);
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="toast-container">
          <div className="toast">
            <span style={{ fontWeight: 600 }}>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        compareCount={comparedLaptops.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenRepairTracker={() => setIsRepairTrackerOpen(true)}
        onOpenInspection={() => setIsInspectionOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {activeTab === 'shop' && (
          <>
            <HeroBanner 
              setActiveTab={setActiveTab} 
              onOpenInspection={() => setIsInspectionOpen(true)} 
            />
            <ShopCatalog 
              onSelectLaptop={(laptop) => setSelectedLaptopModal(laptop)}
              onAddToCart={handleAddToCart}
              comparedLaptops={comparedLaptops}
              onToggleCompare={handleToggleCompare}
            />
          </>
        )}

        {activeTab === 'sell' && (
          <SellLaptopWizard 
            onApplyTradeInDiscount={handleApplyTradeInDiscount}
          />
        )}

        {activeTab === 'repair' && (
          <RepairServices 
            onOpenRepairTracker={() => setIsRepairTrackerOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenInspection={() => setIsInspectionOpen(true)} 
      />

      {/* Modals & Slide-Over Drawers */}
      {selectedLaptopModal && (
        <ProductDetailModal
          laptop={selectedLaptopModal}
          onClose={() => setSelectedLaptopModal(null)}
          onAddToCart={handleAddToCart}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedLaptops.some(l => l.id === selectedLaptopModal.id)}
        />
      )}

      {isCompareOpen && (
        <LaptopComparison
          laptops={comparedLaptops}
          onClose={() => setIsCompareOpen(false)}
          onRemove={handleRemoveCompareItem}
          onClearAll={() => setComparedLaptops([])}
          onAddToCart={handleAddToCart}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        tradeInDiscount={tradeInDiscount}
        tradeInCode={tradeInCode}
        onRemoveTradeIn={() => {
          setTradeInDiscount(0);
          setTradeInCode('');
        }}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalAmount={checkoutTotal}
        onClearCart={() => setCartItems([])}
      />

      {isRepairTrackerOpen && (
        <RepairTrackerModal 
          onClose={() => setIsRepairTrackerOpen(false)} 
        />
      )}

      {isInspectionOpen && (
        <InspectionModal 
          onClose={() => setIsInspectionOpen(false)} 
        />
      )}

      {isAdminOpen && (
        <AdminDashboardModal 
          onClose={() => setIsAdminOpen(false)} 
        />
      )}
    </div>
  );
}
