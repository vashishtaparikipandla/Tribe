import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { Building, Users, Search, Plus, ShieldCheck, Check, Info, Settings, LogOut, Download } from 'lucide-react';

const crowdVendors = [
  { id: 1, name: 'QuickFix Plumbing', category: 'Plumber', trustScore: 4.8, recommendations: 12 },
  { id: 2, name: 'Urban Cleaners', category: 'Deep Cleaning', trustScore: 4.5, recommendations: 8 },
  { id: 3, name: 'Sri Balaji Electricals', category: 'Electrician', trustScore: 4.2, recommendations: 5 },
];

const approvedVendors = [
  { id: 101, name: 'Ramesh Singh', category: 'Plumber', addedBy: 'Admin', date: 'Jan 15, 2026', notes: 'Building AMC contractor' },
  { id: 102, name: 'CoolBreeze AC Services', category: 'AC Repair', addedBy: 'Admin', date: 'Mar 2, 2026', notes: 'Verified vendor' },
];

export default function SocietyAdminScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<'approved'|'crowd'>('approved');

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }} className="animate-fade-in">
      
      {/* Top Navbar */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', background: '#6b21a8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 800 }}>T</span>
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Tribe for Societies</span>
        </div>
        <button onClick={() => onNavigate('home')} style={{ background: 'transparent', border: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          <LogOut size={16} /> Exit to Consumer App
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '240px', background: '#ffffff', borderRight: '1px solid #e2e8f0', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ padding: '0 12px 16px' }}>
            <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Active Society</div>
            <div style={{ fontSize: '15px', color: '#0f172a', fontWeight: 800 }}>Prestige Falcon City</div>
            <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <Building size={14} /> Premium Plan
            </div>
          </div>
          <button style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <ShieldCheck size={18} color="#6b21a8" /> Vendors
          </button>
          <button style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <Users size={18} /> Residents (452)
          </button>
          <button style={{ background: 'transparent', color: '#64748b', border: 'none', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
            <Settings size={18} /> Settings
          </button>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>Vendor Management</h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '15px', maxWidth: '600px', lineHeight: 1.5 }}>
                Manage the officially approved vendors for your society, or explore highly-rated vendors based on aggregated, anonymized recommendations from your residents.
              </p>
            </div>
            {activeTab === 'approved' && (
              <button style={{ background: '#0f172a', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <Plus size={16} /> Add Approved Vendor
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <button 
              onClick={() => setActiveTab('approved')}
              style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: activeTab === 'approved' ? '2px solid #6b21a8' : '2px solid transparent', color: activeTab === 'approved' ? '#6b21a8' : '#64748b', fontSize: '15px', fontWeight: 700, cursor: 'pointer' }}>
              Society Approved Vendors
            </button>
            <button 
              onClick={() => setActiveTab('crowd')}
              style={{ padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: activeTab === 'crowd' ? '2px solid #6b21a8' : '2px solid transparent', color: activeTab === 'crowd' ? '#6b21a8' : '#64748b', fontSize: '15px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Crowd-Trust List <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '11px', padding: '2px 6px', borderRadius: '4px' }}>Aggregated</span>
            </button>
          </div>

          {/* Table */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
            
            {/* Toolbar */}
            <div style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '16px', background: '#f8fafc' }}>
              <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', flex: 1, maxWidth: '300px' }}>
                <Search size={16} color="#94a3b8" />
                <input type="text" placeholder="Search vendors..." style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '14px', outline: 'none' }} />
              </div>
            </div>

            {/* Content */}
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '16px', fontWeight: 700 }}>Vendor Name</th>
                  <th style={{ padding: '16px', fontWeight: 700 }}>Category</th>
                  {activeTab === 'approved' ? (
                    <>
                      <th style={{ padding: '16px', fontWeight: 700 }}>Added By</th>
                      <th style={{ padding: '16px', fontWeight: 700 }}>Notes</th>
                    </>
                  ) : (
                    <>
                      <th style={{ padding: '16px', fontWeight: 700 }}>Trust Score</th>
                      <th style={{ padding: '16px', fontWeight: 700 }}>Recommendations</th>
                    </>
                  )}
                  <th style={{ padding: '16px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(activeTab === 'approved' ? approvedVendors : crowdVendors).map((vendor: any) => (
                  <tr key={vendor.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '16px' }}>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{vendor.name}</div>
                    </td>
                    <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{vendor.category}</td>
                    {activeTab === 'approved' ? (
                      <>
                        <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{vendor.addedBy}<br/><span style={{ fontSize: '12px', color: '#94a3b8' }}>{vendor.date}</span></td>
                        <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{vendor.notes}</td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '16px' }}>
                          <span style={{ background: '#f0fdf4', color: '#16a34a', padding: '4px 8px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <ShieldCheck size={14} /> {vendor.trustScore}
                          </span>
                        </td>
                        <td style={{ padding: '16px', color: '#475569', fontSize: '14px' }}>{vendor.recommendations} distinct residents</td>
                      </>
                    )}
                    <td style={{ padding: '16px', textAlign: 'right' }}>
                      <button style={{ background: 'transparent', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '6px', color: '#0f172a', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {activeTab === 'crowd' && (
              <div style={{ padding: '16px', background: '#f8fafc', color: '#64748b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', borderTop: '1px solid #e2e8f0' }}>
                <Info size={16} /> Data is anonymized and only shows providers with 3+ distinct recommendations to protect resident privacy.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
