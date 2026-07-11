import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Camera, Shield, ChevronDown } from 'lucide-react';

export default function EditProfileScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [name, setName] = useState('Vashishta P.');
  const [city, setCity] = useState('Hyderabad');

  const handleSave = () => {
    // Mock save action
    onNavigate('user-profile');
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      
      {/* Header */}
      <div style={{
        background: '#ffffff',
        padding: '64px 24px 16px',
        borderBottom: '1px solid #f1f5f9',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 10
      }}>
        <button onClick={() => onNavigate('user-profile')} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={24} color="#0f172a" />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Edit Profile</h1>
        <button onClick={handleSave} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', color: '#7e22ce', fontSize: '16px', fontWeight: 700 }}>
          Save
        </button>
      </div>

      <div style={{ padding: '24px' }}>
        
        {/* Photo Picker */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" 
              alt="Profile"
              style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e2e8f0' }}
            />
            <button style={{
              position: 'absolute', bottom: 0, right: 0,
              background: '#7e22ce', color: '#ffffff', border: '2px solid #ffffff', borderRadius: '50%',
              width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <Camera size={16} />
            </button>
          </div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '12px', fontWeight: 500 }}>
            Photos are reviewed for community safety
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Full Name
            </label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1',
                background: '#ffffff', fontSize: '16px', color: '#0f172a', fontWeight: 500, outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              City (Home Location)
            </label>
            <div style={{ position: 'relative' }}>
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #cbd5e1',
                  background: '#ffffff', fontSize: '16px', color: '#0f172a', fontWeight: 500, outline: 'none',
                  appearance: 'none'
                }}
              >
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
              <ChevronDown size={20} color="#64748b" style={{ position: 'absolute', right: '16px', top: '16px', pointerEvents: 'none' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 0', lineHeight: 1.4 }}>
              This sets the default center for map browsing and local recommendations.
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Phone Number
            </label>
            <div style={{
              width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0',
              background: '#f1f5f9', fontSize: '16px', color: '#64748b', fontWeight: 500,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              +91 98765 43210
              <Shield size={16} color="#94a3b8" />
            </div>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '6px 0 0', lineHeight: 1.4 }}>
              To change your number, go to Account & Security settings.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
