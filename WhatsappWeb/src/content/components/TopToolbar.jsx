import React, { useEffect, useState, useCallback } from "react";
import { FaBell, FaCog } from "react-icons/fa";
import CreateCustomTabModal from './CreateCustomTabModal';
import LoginModal from './LoginModal';
import { requireAuth, useAuthState, TOKEN_KEY, handleAuthMessage, handleAuthStorage } from './authMiddleware.jsx';

const SELECTORS = {
  Inbox: 'button#all-filter[role="tab"]',
  Unread: 'button#unread-filter[role="tab"]',
  Starred: 'button#favorites-filter[role="tab"]',
  Groups: 'button#group-filter[role="tab"]',
};

const TopToolbar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [customTabs, setCustomTabs] = useState([]);
  const [activeTabLabel, setActiveTabLabel] = useState("Inbox"); // default active tab
  const [isAuthenticated, setIsAuthenticated] = useAuthState();

  // Handler for withAuthCheck
  useEffect(() => {
    if (props.onRequireLogin) {
      props.onRequireLogin(() => setShowLoginModal(true));
    }
  }, [props]);

  useEffect(() => {
    console.log("📌 TopToolbar mounted on WhatsApp Web");
  }, []);

  const clickWhatsAppFilterButton = useCallback(async (label) => {
    const selector = SELECTORS[label];
    if (!selector) {
      console.warn(`❌ No selector found for WhatsApp filter: ${label}`);
      return;
    }
    let button = document.querySelector(selector);
    if (!button) {
      for (let i = 0; i < 5; i++) {
        await new Promise((res) => setTimeout(res, 500));
        button = document.querySelector(selector);
        if (button) break;
      }
    }

    if (button) {
      button.click();
      console.log(`🟢 Clicked native WhatsApp filter: ${label}`);
    } else {
      console.warn(`❌ Could not find WhatsApp filter button for: ${label}`);
    }
  }, []);


  const handleClick = async (label) => {
    if (!requireAuth(setShowLoginModal)) return;
    if (label === "Add") {
      setShowModal(true);
    } else {
      setActiveTabLabel(label); // update active tab
      await clickWhatsAppFilterButton(label);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateCustomTab = (tabName, emoji) => {
    setCustomTabs((prevTabs) => [...prevTabs, { emoji: emoji || "📄", label: tabName }]);
    setShowModal(false);
    setActiveTabLabel(tabName); // make new tab active after creation
  };

  const defaultTabs = [
    { emoji: "🟢", label: "Inbox" },
    { emoji: "🤎", label: "Unread" },
    { emoji: "⭐", label: "Starred" },
    { emoji: "👥", label: "Groups" },
    { emoji: "🤎", label: "Closed" },
    { emoji: "⏰", label: "Snoozed" },
    { emoji: "🚩", label: "Follow Up" },
  ];

  const allExistingTabs = [...defaultTabs, ...customTabs];

  useEffect(() => {
    // Initial check is handled by useAuthState
    const handleStorageChange = (event) => handleAuthStorage(event, setIsAuthenticated);
    const handleMessage = (event) => handleAuthMessage(event, setIsAuthenticated);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('message', handleMessage);
    };
  }, [setIsAuthenticated]);

  const handleToolbarLogin = () => {
    console.log('🔑 Login button clicked');
    setShowLoginModal(true);
  };

  const handleToolbarLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
    if (typeof window.toggleWhatsappSidebar === 'function') {
      window.toggleWhatsappSidebar(false);
    }
  };

  const handleLoginSuccess = (token) => {
    console.log('✅ Login successful in TopToolbar:', token);
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        zIndex: 10000,
        position: 'relative',
      }}
    >
      {/* Left side: Buttons */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        overflowX: 'hidden',
        paddingBottom: '4px',
        alignItems: 'center'
      }}>
        {[...allExistingTabs, { emoji: "+", label: "Add" }].map((item, idx) => {
          const isActive = item.label === activeTabLabel;

          return (
            <button
              key={idx}
              onClick={() => handleClick(item.label)}
              style={{
                color: '#4a5568',
                padding: '4px 12px',
                borderRadius: '6px',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                backgroundColor: isActive ? '#f0f0f0' : 'transparent',
                boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.1)' : 'none',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                margin: isActive ? '0 -1px' : '0',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.margin = '0 -1px';
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.boxShadow = 'none';
                  e.target.style.transform = 'scale(1)';
                  e.target.style.margin = '0';
                }
              }}
            >
              {item.emoji} {item.label}
            </button>
          );
        })}
      </div>

      {/* Right side: App name + icons + login/logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#10B981' }}>Whatsopify</div>
        <button
          onClick={() => handleClick("Notifications")}
          style={{
            color: '#4a5568',
            transition: 'all 0.2s',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.color = '#2563EB'}
          onMouseLeave={(e) => e.target.style.color = '#4a5568'}
        >
          <FaBell size={20} />
        </button>
        <button
          onClick={() => handleClick("Settings")}
          style={{
            color: '#4a5568',
            transition: 'all 0.2s',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.target.style.color = '#2563EB'}
          onMouseLeave={(e) => e.target.style.color = '#4a5568'}
        >
          <FaCog size={20} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (isAuthenticated) {
              handleToolbarLogout();
            } else {
              setShowLoginModal(true);
            }
          }}
          style={{
            color: isAuthenticated ? '#EF4444' : '#10B981',
            fontWeight: 'bold',
            background: 'transparent',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            padding: '4px 12px',
            cursor: 'pointer',
            marginLeft: '8px',
            transition: 'all 0.2s',
          }}
        >
          {isAuthenticated ? 'Logout' : 'Login'}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateCustomTabModal
          onClose={handleCloseModal}
          onCreate={handleCreateCustomTab}
          existingTabs={allExistingTabs}
        />
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default TopToolbar;
