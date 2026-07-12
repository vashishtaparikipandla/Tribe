import { useState } from 'react';

export default function ConstellationGraph({ 
  contacts, 
  providers,
  onNodeClick 
}: { 
  contacts: any[], 
  providers: any[],
  onNodeClick?: (id: number) => void
}) {
  const [activeContactId, setActiveContactId] = useState<number | null>(null);

  // Take top 20 contacts to avoid cluttering
  const displayContacts = [...contacts]
    .sort((a, b) => b.interaction_score - a.interaction_score)
    .slice(0, 20);

  // Position them in a circle
  const centerX = 50;
  const centerY = 50;
  const radius = 35;

  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: '#0f172a', overflow: 'hidden' }}>
      {/* Background Grid & Glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #0f172a 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(#3b0764 1px, transparent 1px), linear-gradient(90deg, #3b0764 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        {/* Draw connections first */}
        {displayContacts.map((contact, i) => {
          const angle = (i / displayContacts.length) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          return (
            <line key={`line-${contact.id}`} x1={centerX} y1={centerY} x2={x} y2={y} stroke="rgba(192, 132, 252, 0.2)" strokeWidth="0.2" />
          );
        })}
        
        {/* If a contact is active, show their providers */}
        {activeContactId && providers.filter(p => p.recommender_id === activeContactId).map((provider, i, arr) => {
          const contactIndex = displayContacts.findIndex(c => c.id === activeContactId);
          if (contactIndex === -1) return null;
          
          const angle = (contactIndex / displayContacts.length) * Math.PI * 2;
          const cx = centerX + Math.cos(angle) * radius;
          const cy = centerY + Math.sin(angle) * radius;
          
          // Orbit providers around the active contact
          const pAngle = angle + (i - (arr.length-1)/2) * 0.4; // Spread them
          const px = cx + Math.cos(pAngle) * 15;
          const py = cy + Math.sin(pAngle) * 15;

          return (
            <g key={`p-group-${provider.id}`}>
              <line x1={cx} y1={cy} x2={px} y2={py} stroke="#c084fc" strokeWidth="0.3" strokeDasharray="1,1" />
              <rect x={px - 8} y={py - 3} width="16" height="6" rx="1" fill="#1e293b" stroke="#a855f7" strokeWidth="0.2" style={{ cursor: 'pointer' }} onClick={() => onNodeClick?.(provider.id)} />
              <text x={px} y={py + 0.5} textAnchor="middle" fill="#ffffff" fontSize="2.5" fontWeight="bold" pointerEvents="none">{provider.name}</text>
              <text x={px} y={py + 2} textAnchor="middle" fill="#10b981" fontSize="1.5" fontWeight="bold" pointerEvents="none">Trust: {provider.composite_score}</text>
            </g>
          );
        })}

        {/* Draw User (Center) */}
        <circle cx={centerX} cy={centerY} r="4" fill="#7e22ce" />
        <text x={centerX} y={centerY + 0.5} textAnchor="middle" fill="#ffffff" fontSize="2.5" fontWeight="bold">You</text>

        {/* Draw Contacts */}
        {displayContacts.map((contact, i) => {
          const angle = (i / displayContacts.length) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const isActive = activeContactId === contact.id;
          
          return (
            <g key={`contact-${contact.id}`} onClick={() => setActiveContactId(isActive ? null : contact.id)} style={{ cursor: 'pointer' }}>
              <defs>
                <clipPath id={`clip-${contact.id}`}>
                  <circle cx={x} cy={y} r="3" />
                </clipPath>
              </defs>
              {isActive && <circle cx={x} cy={y} r="4" fill="none" stroke="#c084fc" strokeWidth="0.5" />}
              <image href={contact.image} x={x - 3} y={y - 3} width="6" height="6" clipPath={`url(#clip-${contact.id})`} preserveAspectRatio="xMidYMid slice" />
              <text x={x} y={y + 4.5} textAnchor="middle" fill="#cbd5e1" fontSize="2" fontWeight="bold">{contact.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
