import React from 'react';

interface ItemIconProps {
  name: 'shell' | 'map' | 'torch' | 'gem' | 'key' | 'chest';
  className?: string;
  isUnlocked?: boolean;
}

export const ItemIcon: React.FC<ItemIconProps> = ({ name, className = 'w-6 h-6', isUnlocked = true }) => {
  const filterStyle = isUnlocked ? '' : 'grayscale opacity-30';

  switch (name) {
    case 'shell':
      return (
        <svg viewBox="0 0 48 48" className={`${className} ${filterStyle}`} fill="none">
          <path
            d="M24 6C14 6 7 14 7 24C7 34 14 42 24 42C34 42 41 34 41 24C41 14 34 6 24 6Z"
            fill="#FEE2E2"
            stroke="#EA580C"
            strokeWidth="2.5"
          />
          <path
            d="M24 6C18 14 18 34 24 42"
            stroke="#F97316"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M24 6C30 14 30 34 24 42"
            stroke="#F97316"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 14C17 20 31 20 36 14"
            stroke="#FDBA74"
            strokeWidth="2"
          />
          <circle cx="24" cy="24" r="5" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
          <text x="24" y="27" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#C2410C" fontFamily="sans-serif">
            3
          </text>
        </svg>
      );

    case 'map':
      return (
        <svg viewBox="0 0 48 48" className={`${className} ${filterStyle}`} fill="none">
          <path
            d="M6 10L18 6L30 10L42 6V38L30 42L18 38L6 42V10Z"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M18 6V38" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" />
          <path d="M30 10V42" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" />
          <path
            d="M12 24C15 22 21 26 24 22C27 18 33 28 36 24"
            stroke="#DC2626"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="2 3"
          />
          <circle cx="36" cy="24" r="3.5" fill="#DC2626" />
          <text x="24" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#B45309" fontFamily="monospace">
            #6
          </text>
        </svg>
      );

    case 'torch':
      return (
        <svg viewBox="0 0 48 48" className={`${className} ${filterStyle}`} fill="none">
          {/* Flame */}
          <path
            d="M24 4C20 10 16 14 16 20C16 25 20 28 24 28C28 28 32 25 32 20C32 15 28 9 24 4Z"
            fill="#F59E0B"
          />
          <path
            d="M24 10C21 14 19 17 19 21C19 24 21 26 24 26C27 26 29 24 29 21C29 17 27 14 24 10Z"
            fill="#EF4444"
          />
          <path
            d="M24 15C22 18 21 19 21 22C21 24 22 25 24 25C26 25 27 24 27 22C27 19 26 18 24 15Z"
            fill="#FEF08A"
          />
          {/* Torch Handle */}
          <path
            d="M21 27H27L25 44H23L21 27Z"
            fill="#78350F"
            stroke="#451A03"
            strokeWidth="2"
          />
          <rect x="20" y="27" width="8" height="3" rx="1.5" fill="#B45309" />
          <rect x="21" y="33" width="6" height="2" fill="#D97706" />
        </svg>
      );

    case 'gem':
      return (
        <svg viewBox="0 0 48 48" className={`${className} ${filterStyle}`} fill="none">
          <path
            d="M14 8L34 8L44 18L24 42L4 18L14 8Z"
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M14 8L24 42L34 8" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M4 18H44" stroke="#0284C7" strokeWidth="1.5" />
          <path d="M14 8L20 18L24 8L28 18L34 8" fill="#BAE6FD" opacity="0.6" />
          <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0C4A6E" fontFamily="monospace">
            8
          </text>
        </svg>
      );

    case 'key':
      return (
        <svg viewBox="0 0 48 48" className={`${className} ${filterStyle}`} fill="none">
          <circle cx="16" cy="20" r="10" stroke="#D97706" strokeWidth="3" fill="#FDE68A" />
          <circle cx="16" cy="20" r="4.5" stroke="#D97706" strokeWidth="2" fill="#FFFBEB" />
          <path
            d="M25 24L42 41"
            stroke="#D97706"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M34 33L38 29" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M39 38L43 34" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    case 'chest':
    default:
      return (
        <svg viewBox="0 0 48 48" className={`${className} ${filterStyle}`} fill="none">
          {/* Base */}
          <rect x="6" y="20" width="36" height="22" rx="3" fill="#854D0E" stroke="#713F12" strokeWidth="2" />
          {/* Lid */}
          <path
            d="M6 20C6 13 14 9 24 9C34 9 42 13 42 20H6Z"
            fill="#CA8A04"
            stroke="#713F12"
            strokeWidth="2"
          />
          {/* Gold Ribs */}
          <rect x="13" y="9" width="4" height="33" fill="#FACC15" />
          <rect x="31" y="9" width="4" height="33" fill="#FACC15" />
          {/* Lock plate */}
          <circle cx="24" cy="24" r="5" fill="#EAB308" stroke="#713F12" strokeWidth="1.5" />
          <circle cx="24" cy="23" r="1.5" fill="#713F12" />
          <path d="M24 24V26" stroke="#713F12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
};
