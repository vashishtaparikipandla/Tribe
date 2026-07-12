import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Search as SearchIcon, ChevronDown, ChevronUp, Stethoscope, Wrench, BookOpen, Car, Smile, Briefcase, Building, Check, Star } from 'lucide-react';

const societyVendors = [
  { id: 101, name: 'Ramesh Singh', category: 'Plumber', rating: 4.8 },
  { id: 102, name: 'CoolBreeze AC Services', category: 'AC Repair', rating: 4.5 },
];

const categoryGroups = [
  {
    id: 'home',
    title: 'Home Services',
    icon: Wrench,
    items: ['Plumber', 'Electrician', 'Carpenter', 'AC Repair', 'Pest Control', 'Painter']
  },
  {
    id: 'health',
    title: 'Health & Wellness',
    icon: Stethoscope,
    items: ['Doctor', 'Dentist', 'Physiotherapist', 'Dietitian', 'Yoga Instructor']
  },
  {
    id: 'education',
    title: 'Education',
    icon: BookOpen,
    items: ['Math Tutor', 'Science Tutor', 'Language Teacher', 'Music Teacher', 'Coaching Center']
  },
  {
    id: 'auto',
    title: 'Auto Services',
    icon: Car,
    items: ['Mechanic', 'Car Wash', 'Tire Repair', 'Towing Service']
  },
  {
    id: 'personal',
    title: 'Personal Care',
    icon: Smile,
    items: ['Salon at Home', 'Makeup Artist', 'Personal Trainer', 'Massage Therapist']
  },
  {
    id: 'professional',
    title: 'Professional',
    icon: Briefcase,
    items: ['Chartered Accountant', 'Lawyer', 'Real Estate Agent', 'Event Planner']
  }
];

export default function CategoryDirectoryScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['home', 'health']); // Default expand first two

  const toggleGroup = (id: string) => {
    setExpandedGroups(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const filteredGroups = categoryGroups.map(group => ({
    ...group,
    items: group.items.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(group => group.items.length > 0 || group.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #4c1d95, #3b0764)',
        padding: '64px 24px 24px', color: '#ffffff',
        borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px',
        boxShadow: '0 4px 20px rgba(76, 29, 149, 0.15)',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button onClick={() => onNavigate('home')} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '36px', height: '36px', color: '#ffffff', padding: 0,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}>
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            All Categories
          </h1>
        </div>

        {/* Search Bar */}
        <div style={{
          background: '#ffffff', borderRadius: '16px',
          display: 'flex', alignItems: 'center', padding: '14px 16px', gap: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <SearchIcon size={20} color="#7e22ce" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: '16px', width: '100%', color: '#0f172a', fontFamily: 'inherit', fontWeight: 500
            }}
          />
        </div>
      </div>

      {/* Directory Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Society Approved Section */}
        {searchQuery === '' && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ background: '#e0e7ff', color: '#4338ca', padding: '6px', borderRadius: '8px' }}>
                <Building size={16} />
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', margin: 0 }}>Prestige Falcon City Approved</h2>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {societyVendors.map(vendor => (
                <div key={vendor.id} onClick={() => onNavigate('provider-profile')} style={{ 
                  minWidth: '200px', background: '#ffffff', border: '1px solid #c7d2fe', borderRadius: '16px', padding: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(67, 56, 202, 0.05)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{vendor.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#f8fafc', padding: '2px 6px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, color: '#4338ca' }}>
                      <Star size={12} fill="#4338ca" /> {vendor.rating}
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>{vendor.category}</div>
                  <div style={{ fontSize: '11px', color: '#4338ca', fontWeight: 600, alignItems: 'center', gap: '4px', background: '#eef2ff', padding: '4px 8px', borderRadius: '12px', display: 'inline-flex' }}>
                    <Check size={12} /> Society Verified
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredGroups.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            <p style={{ fontSize: '16px', fontWeight: 500 }}>No categories found matching "{searchQuery}".</p>
            <button onClick={() => onNavigate('consensus-request')} style={{ marginTop: '16px', background: '#f5f3ff', color: '#6b21a8', border: 'none', borderRadius: '12px', padding: '12px 24px', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
              Ask your tribe instead
            </button>
          </div>
        ) : (
          filteredGroups.map(group => {
            const isExpanded = expandedGroups.includes(group.id) || searchQuery.length > 0;
            return (
              <div key={group.id} style={{ 
                background: '#ffffff', borderRadius: '20px', 
                border: '1px solid #f1f5f9', boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                overflow: 'hidden'
              }}>
                <button 
                  onClick={() => toggleGroup(group.id)}
                  style={{ 
                    width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#faf5ff', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <group.icon size={20} color="#7e22ce" />
                    </div>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{group.title}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
                </button>
                
                {isExpanded && (
                  <div style={{ padding: '0 20px 20px', borderTop: '1px solid #f8fafc' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '16px' }}>
                      {group.items.map(item => (
                        <button key={item} onClick={() => onNavigate('my-tribe')} style={{
                          background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '32px',
                          padding: '10px 16px', fontSize: '14px', color: '#334155', fontWeight: 600,
                          cursor: 'pointer', transition: 'background 0.2s'
                        }}>
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
