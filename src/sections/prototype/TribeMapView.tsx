import React, { useState } from 'react';
import { MapPin, Crosshair, Search, Phone, Star, User } from 'lucide-react';

const MetricBar = ({ label, score }: { label: string, score: number }) => (
  <div style={{ marginBottom: '8px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', fontWeight: 600, marginBottom: '2px' }}>
      <span>{label}</span>
      <span>{score}%</span>
    </div>
    <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{ width: `${score}%`, height: '100%', background: score > 80 ? '#10b981' : score > 60 ? '#f59e0b' : '#ef4444', borderRadius: '2px' }} />
    </div>
  </div>
);

export default function TribeMapView({ providers }: { providers: any[] }) {
  const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null);

  const selectedProvider = providers.find(p => p.id === selectedProviderId);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#e2e8f0' }}>
      {/* Static Map Background Simulating Geography */}
      <img 
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, filter: 'grayscale(0.3) contrast(1.1)' }} 
      />
      
      {/* Map Controls */}
      <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <button style={{
          background: '#ffffff', color: '#4c1d95', border: 'none', borderRadius: '20px',
          padding: '8px 16px', fontSize: '13px', fontWeight: 700,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'
        }}>
          <Search size={16} /> Search this area
        </button>
      </div>

      <div style={{ position: 'absolute', bottom: selectedProvider ? '260px' : '24px', right: '16px', zIndex: 10, transition: 'bottom 0.3s ease' }}>
        <button style={{
          background: '#ffffff', color: '#0f172a', border: 'none', borderRadius: '50%',
          width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer'
        }}>
          <Crosshair size={20} />
        </button>
      </div>

      {/* Map Pins */}
      {providers.map((p, i) => {
        // Deterministic dummy coordinates based on ID for demo purposes
        const top = 30 + (Math.sin(p.id) * 30); // 0-60%
        const left = 50 + (Math.cos(p.id) * 30); // 20-80%
        
        const isHighTrust = p.composite_score >= 9.0;
        const isSelected = selectedProviderId === p.id;

        return (
          <div key={p.id} onClick={() => setSelectedProviderId(p.id)} style={{
            position: 'absolute', top: `${top}%`, left: `${left}%`, transform: 'translate(-50%, -100%)',
            cursor: 'pointer', zIndex: isSelected ? 20 : 5
          }}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {isHighTrust ? (
                <>
                  <div style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                    background: '#10b981', borderRadius: '50%', opacity: 0.3, filter: 'blur(4px)',
                    animation: 'pulse 2s infinite'
                  }} />
                  <div style={{
                    width: isSelected ? '40px' : '32px', height: isSelected ? '40px' : '32px', 
                    background: '#7e22ce', borderRadius: '50%', border: '2px solid #ffffff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.2s', zIndex: 2
                  }}>
                    <Star size={isSelected ? 20 : 16} fill="#ffffff" />
                  </div>
                </>
              ) : (
                <div style={{
                  width: isSelected ? '32px' : '24px', height: isSelected ? '32px' : '24px', 
                  background: '#ffffff', borderRadius: '50%', border: '3px solid #7e22ce',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'all 0.2s'
                }}>
                  <div style={{ width: '8px', height: '8px', background: '#7e22ce', borderRadius: '50%' }} />
                </div>
              )}
              {/* Pin pointer tail */}
              <div style={{
                width: '0', height: '0', borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                borderTop: `8px solid ${isHighTrust ? '#7e22ce' : '#ffffff'}`,
                marginTop: '-2px', zIndex: 1
              }} />
            </div>
          </div>
        );
      })}

      {/* Bottom Sheet for Selected Pin */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#ffffff', borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
        padding: '24px', boxShadow: '0 -8px 24px rgba(0,0,0,0.1)',
        transform: selectedProvider ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', zIndex: 30
      }}>
        {selectedProvider && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <img src={selectedProvider.image} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{selectedProvider.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', fontSize: '13px', color: '#64748b', fontWeight: 500 }}>
                    <span style={{ color: '#059669', background: '#dcfce7', padding: '2px 6px', borderRadius: '6px', fontWeight: 700 }}>
                      Trust: {selectedProvider.composite_score}
                    </span>
                    <span>•</span>
                    <span>1.2 km away</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedProviderId(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
                X
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px', marginBottom: '20px' }}>
              <div>
                <MetricBar label="Budget" score={selectedProvider.metrics.budget} />
                <MetricBar label="Efficiency" score={selectedProvider.metrics.efficiency} />
              </div>
              <div>
                <MetricBar label="Quality" score={selectedProvider.metrics.quality} />
                <MetricBar label="Reliability" score={selectedProvider.metrics.reliability} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button style={{
                flex: 1, background: '#10b981', color: '#ffffff', border: 'none', borderRadius: '12px',
                padding: '14px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
              }}>
                <Phone size={18} fill="#ffffff" /> Call Now
              </button>
              <button style={{
                flex: 1, background: '#f8fafc', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '12px',
                padding: '14px', fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
              }}>
                <User size={18} /> View Profile
              </button>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}} />
    </div>
  );
}
