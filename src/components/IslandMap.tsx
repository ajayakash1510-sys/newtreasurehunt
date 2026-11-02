import React from 'react';
import { motion } from 'motion/react';
import { ISLAND_LOCATIONS } from '../data/locations';
import { LocationId } from '../types/game';

interface IslandMapProps {
  currentLocationIndex: number;
  completedLocationIds: LocationId[];
  onSelectLocation?: (index: number) => void;
}

export const IslandMap: React.FC<IslandMapProps> = ({
  currentLocationIndex,
  completedLocationIds,
  onSelectLocation,
}) => {
  const currentLocation = ISLAND_LOCATIONS[currentLocationIndex] || ISLAND_LOCATIONS[0];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-600/40 bg-gradient-to-b from-sky-400 via-sky-500 to-blue-700 select-none">
      <svg
        viewBox="0 0 1000 620"
        className="w-full h-auto block"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="oceanGlow" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="55%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>

          <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          <linearGradient id="jungleGradient" x1="0%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="40%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="50%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="waterfallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Active glow filter */}
          <filter id="activeGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Drop shadow filter */}
          <filter id="mapShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#0c4a6e" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Ocean Background */}
        <rect width="1000" height="620" fill="url(#oceanGlow)" />

        {/* Ambient Sea Waves & Ripples */}
        <g stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M 60 120 Q 85 110, 110 120" />
          <path d="M 120 125 Q 145 115, 170 125" />
          <path d="M 850 90 Q 875 80, 900 90" />
          <path d="M 910 95 Q 935 85, 960 95" />
          <path d="M 70 530 Q 95 520, 120 530" />
          <path d="M 460 560 Q 485 550, 510 560" />
          <path d="M 880 540 Q 905 530, 930 540" />
          <path d="M 380 70 Q 405 60, 430 70" />
          <path d="M 640 80 Q 665 70, 690 80" />
        </g>

        {/* Coral Reef / Shallows Glow behind Island */}
        <path
          d="M 100 480 C 70 340, 120 200, 260 140 C 380 90, 560 60, 720 100 C 850 130, 950 250, 920 420 C 890 540, 760 580, 600 570 C 420 560, 220 580, 100 480 Z"
          fill="#38bdf8"
          opacity="0.35"
        />

        {/* Island Base: Outer Sandy Beach */}
        <path
          d="M 120 460 C 95 350, 140 230, 270 160 C 380 110, 560 90, 700 120 C 820 150, 910 260, 890 410 C 870 510, 750 550, 610 540 C 440 530, 240 550, 120 460 Z"
          fill="url(#sandGradient)"
          filter="url(#mapShadow)"
        />

        {/* Island Interior: Lush Jungle & Terrain */}
        <path
          d="M 170 430 C 150 330, 190 240, 300 190 C 400 150, 540 130, 670 150 C 770 170, 840 260, 830 380 C 810 460, 710 490, 590 480 C 440 470, 270 490, 170 430 Z"
          fill="url(#jungleGradient)"
        />

        {/* Mountain Ridge (near Cave & Waterfall) */}
        <path
          d="M 400 240 L 480 110 L 560 230 L 640 120 L 710 240 Z"
          fill="url(#mountainGradient)"
          opacity="0.85"
        />
        {/* Mountain Snowcaps / Highlights */}
        <polygon points="480,110 460,140 475,135 480,145 490,135 500,140" fill="#f8fafc" />
        <polygon points="640,120 625,145 635,140 640,150 648,142 655,147" fill="#f8fafc" />

        {/* Waterfall River cascading into lagoon */}
        <path
          d="M 640 150 Q 630 240, 620 330 Q 615 370, 590 390 Q 560 410, 550 440"
          stroke="url(#waterfallGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 640 150 Q 630 240, 620 330"
          stroke="#ffffff"
          strokeWidth="4"
          strokeDasharray="8 6"
          fill="none"
          opacity="0.75"
        />
        {/* Waterfall Pool */}
        <ellipse cx="615" cy="350" rx="30" ry="18" fill="#38bdf8" opacity="0.8" />
        <ellipse cx="615" cy="350" rx="22" ry="12" fill="#7dd3fc" opacity="0.6" />

        {/* Decorative Scenery: Palm Trees & Foliage */}
        {/* Beach Palm Trees */}
        <g transform="translate(130, 410) scale(0.7)">
          <path d="M 20 60 Q 28 30, 35 5" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 35 5 Q 10 5, 0 20" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 35 5 Q 25 -15, 20 -25" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 35 5 Q 55 -10, 65 -5" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 35 5 Q 50 15, 55 30" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
        <g transform="translate(210, 480) scale(0.6)">
          <path d="M 20 60 Q 15 30, 10 5" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 10 5 Q -10 5, -20 20" stroke="#15803d" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 10 5 Q 0 -15, 5 -25" stroke="#16a34a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 10 5 Q 30 -10, 40 -5" stroke="#22c55e" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>

        {/* Jungle Canopy Vines & Bushes */}
        <circle cx="280" cy="340" r="18" fill="#15803d" opacity="0.7" />
        <circle cx="310" cy="330" r="22" fill="#166534" opacity="0.8" />
        <circle cx="340" cy="270" r="24" fill="#14532d" opacity="0.75" />

        {/* Ancient Temple Pillars & Steps (visual backdrop) */}
        <g transform="translate(740, 160) scale(0.65)" opacity="0.9">
          {/* Temple Steps */}
          <rect x="0" y="60" width="100" height="12" rx="2" fill="#d97706" />
          <rect x="10" y="50" width="80" height="10" rx="2" fill="#b45309" />
          {/* Columns */}
          <rect x="15" y="20" width="10" height="30" fill="#fde68a" stroke="#78350f" strokeWidth="1.5" />
          <rect x="45" y="20" width="10" height="30" fill="#fde68a" stroke="#78350f" strokeWidth="1.5" />
          <rect x="75" y="20" width="10" height="30" fill="#fde68a" stroke="#78350f" strokeWidth="1.5" />
          {/* Roof Pediment */}
          <polygon points="5,20 50,0 95,20" fill="#d97706" stroke="#78350f" strokeWidth="2" />
        </g>

        {/* Pirate Sailboat in Distance */}
        <g transform="translate(80, 80) scale(0.65)">
          <path d="M 0 35 L 50 35 L 42 50 L 10 50 Z" fill="#78350f" />
          <line x1="25" y1="5" x2="25" y2="35" stroke="#451a03" strokeWidth="2.5" />
          <path d="M 25 8 L 48 22 L 25 25 Z" fill="#f8fafc" />
          <path d="M 25 10 L 8 24 L 25 27 Z" fill="#e2e8f0" />
          <polygon points="25,5 20,9 25,11" fill="#dc2626" />
        </g>

        {/* Compass Rose (Top Right) */}
        <g transform="translate(900, 60) scale(0.7)" opacity="0.8">
          <circle cx="0" cy="0" r="32" fill="#0f172a" fillOpacity="0.3" stroke="#fde68a" strokeWidth="2" />
          {/* Points */}
          <polygon points="0,-28 6,-8 0,0 -6,-8" fill="#dc2626" />
          <polygon points="0,28 6,8 0,0 -6,8" fill="#fde68a" />
          <polygon points="28,0 8,6 0,0 8,-6" fill="#fde68a" />
          <polygon points="-28,0 -8,6 0,0 -8,-6" fill="#fde68a" />
          <circle cx="0" cy="0" r="4" fill="#78350f" />
          <text x="0" y="-32" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">N</text>
        </g>

        {/* The Dotted Trail Path connecting the 6 locations */}
        {/* Background trail shadow */}
        <path
          d="M 180 470 C 210 380, 230 330, 290 280 C 350 230, 420 180, 480 160 C 540 150, 580 270, 620 350 C 670 410, 720 260, 770 190 C 820 140, 870 330, 820 450"
          stroke="#78350f"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
        {/* Dotted Gold Trail */}
        <path
          d="M 180 470 C 210 380, 230 330, 290 280 C 350 230, 420 180, 480 160 C 540 150, 580 270, 620 350 C 670 410, 720 260, 770 190 C 820 140, 870 330, 820 450"
          stroke="#fef08a"
          strokeWidth="4"
          strokeDasharray="9 9"
          strokeLinecap="round"
          fill="none"
        />

        {/* 6 Location Markers */}
        {ISLAND_LOCATIONS.map((loc, idx) => {
          const isCompleted = completedLocationIds.includes(loc.id);
          const isCurrent = idx === currentLocationIndex;
          const isLocked = !isCompleted && !isCurrent;

          return (
            <g
              key={loc.id}
              className={`transition-all duration-300 ${!isLocked ? 'cursor-pointer' : 'cursor-not-allowed'}`}
              onClick={() => {
                if (!isLocked && onSelectLocation) {
                  onSelectLocation(idx);
                }
              }}
            >
              {/* Outer pulsing ring for active/current location */}
              {isCurrent && (
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="34"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="3.5"
                  opacity="0.9"
                  className="animate-ping origin-center"
                  style={{ transformOrigin: `${loc.x}px ${loc.y}px` }}
                />
              )}

              {/* Halo Glow for Current */}
              {isCurrent && (
                <circle
                  cx={loc.x}
                  cy={loc.y}
                  r="32"
                  fill="#f59e0b"
                  opacity="0.35"
                  filter="url(#activeGlow)"
                />
              )}

              {/* Main Node Circle */}
              <circle
                cx={loc.x}
                cy={loc.y}
                r="24"
                fill={
                  isCompleted
                    ? '#059669' // Emerald for completed
                    : isCurrent
                    ? '#d97706' // Golden Amber for current
                    : '#475569' // Slate grey for locked
                }
                stroke={
                  isCompleted
                    ? '#34d399'
                    : isCurrent
                    ? '#fef08a'
                    : '#94a3b8'
                }
                strokeWidth={isCurrent ? '4' : '2.5'}
                filter="url(#mapShadow)"
              />

              {/* Node Icon or Number */}
              {isCompleted ? (
                // Green Checkmark (Tick)
                <path
                  d={`M ${loc.x - 8} ${loc.y} L ${loc.x - 2} ${loc.y + 6} L ${loc.x + 9} ${loc.y - 7}`}
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ) : isLocked ? (
                // Lock Icon
                <g transform={`translate(${loc.x - 7}, ${loc.y - 9}) scale(0.7)`}>
                  <rect x="2" y="9" width="16" height="12" rx="2" fill="#cbd5e1" />
                  <path
                    d="M 5 9 V 5 A 5 5 0 0 1 15 5 V 9"
                    stroke="#cbd5e1"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle cx="10" cy="14" r="1.5" fill="#475569" />
                </g>
              ) : (
                // Unlocked / Current: Glowing Star or Order Number
                <text
                  x={loc.x}
                  y={loc.y + 6}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="15"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  {idx + 1}
                </text>
              )}

              {/* Location Name Label Tag */}
              <g transform={`translate(${loc.x}, ${loc.y + 36})`}>
                <rect
                  x="-55"
                  y="-12"
                  width="110"
                  height="22"
                  rx="11"
                  fill={isCurrent ? '#78350f' : isCompleted ? '#064e3b' : '#1e293b'}
                  fillOpacity="0.92"
                  stroke={isCurrent ? '#fde047' : isCompleted ? '#10b981' : '#64748b'}
                  strokeWidth="1.5"
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fill={isCurrent ? '#fef08a' : isCompleted ? '#a7f3d0' : '#94a3b8'}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="'Cinzel', serif"
                >
                  {loc.shortName}
                </text>
              </g>
            </g>
          );
        })}

        {/* Animated Explorer Character Icon */}
        <motion.g
          animate={{
            x: currentLocation.x,
            y: currentLocation.y,
          }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 16,
            mass: 0.8,
          }}
          className="pointer-events-none"
        >
          {/* Explorer Character Group */}
          <g transform="translate(0, -32)">
            {/* Soft Shadow under explorer */}
            <ellipse cx="0" cy="30" rx="14" ry="5" fill="#000000" opacity="0.35" />

            {/* Bobbing Explorer Figure */}
            <g className="animate-float">
              {/* Backpack */}
              <rect x="-14" y="2" width="8" height="16" rx="3" fill="#854d0e" stroke="#451a03" strokeWidth="1.5" />
              <rect x="-13" y="-1" width="6" height="5" rx="2" fill="#ca8a04" />

              {/* Body / Jacket */}
              <rect x="-8" y="6" width="16" height="18" rx="4" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
              {/* Belt */}
              <rect x="-8" y="16" width="16" height="4" fill="#451a03" />
              <rect x="-2" y="16" width="4" height="4" fill="#fde047" />

              {/* Head */}
              <circle cx="0" cy="0" r="9" fill="#fed7aa" stroke="#78350f" strokeWidth="1.5" />
              {/* Eyes */}
              <circle cx="-3" cy="0" r="1.5" fill="#1e293b" />
              <circle cx="3" cy="0" r="1.5" fill="#1e293b" />
              {/* Smile */}
              <path d="M -3 4 Q 0 7, 3 4" stroke="#78350f" strokeWidth="1.2" strokeLinecap="round" fill="none" />

              {/* Adventurer Safari / Fedora Hat */}
              <ellipse cx="0" cy="-7" rx="15" ry="4" fill="#78350f" />
              <path d="M -9 -7 C -9 -18, 9 -18, 9 -7 Z" fill="#92400e" stroke="#451a03" strokeWidth="1" />
              <rect x="-9" y="-9" width="18" height="3" fill="#fde047" />

              {/* Binoculars or Compass in hand */}
              <g transform="translate(8, 12)">
                <circle cx="0" cy="0" r="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                <rect x="-1" y="2" width="2" height="4" fill="#78350f" />
              </g>

              {/* Explorer Flag / "YOU" indicator */}
              <g transform="translate(0, -22)">
                <polygon points="0,0 8,-5 0,-10" fill="#ef4444" />
                <line x1="0" y1="0" x2="0" y2="4" stroke="#451a03" strokeWidth="1.5" />
              </g>
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
};
