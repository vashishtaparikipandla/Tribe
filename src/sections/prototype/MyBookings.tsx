// @ts-nocheck
import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Clock, Calendar, MapPin, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

export default function MyBookingsScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = [
    {
      id: 1,
      provider: 'Ramesh Plumbing',
      category: 'Plumber',
      date: 'Oct 16',
      time: '11:00 AM',
      status: 'waiting', // waiting, confirmed
      note: 'Kitchen sink leak',
    }
  ];

  const pastBookings = [
    {
      id: 2,
      provider: 'Dr. Anand Sharma',
      category: 'Cardiologist',
      date: 'Sep 10',
      time: '02:00 PM',
      status: 'completed',
    },
    {
      id: 3,
      provider: 'City Pipes',
      category: 'Plumber',
      date: 'Aug 05',
      time: '09:00 AM',
      status: 'cancelled',
    }
  ];

  const bookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      <div style={{
        background: '#ffffff', padding: '64px 24px 16px', borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={() => onNavigate('user-profile')} style={{
          background: 'none', border: 'none', padding: 0, color: '#0f172a', cursor: 'pointer',
          display: 'flex', alignItems: 'center'
        }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>My Bookings</h1>
      </div>

      <div style={{ display: 'flex', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <button
          onClick={() => setActiveTab('upcoming')}
          style={{
            flex: 1, padding: '16px', background: 'none', border: 'none', fontSize: '15px', fontWeight: 600,
            color: activeTab === 'upcoming' ? '#7e22ce' : '#64748b', cursor: 'pointer', position: 'relative'
          }}
        >
          Upcoming
          {activeTab === 'upcoming' && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '3px', background: '#7e22ce', borderRadius: '3px 3px 0 0' }} />}
        </button>
        <button
          onClick={() => setActiveTab('past')}
          style={{
            flex: 1, padding: '16px', background: 'none', border: 'none', fontSize: '15px', fontWeight: 600,
            color: activeTab === 'past' ? '#7e22ce' : '#64748b', cursor: 'pointer', position: 'relative'
          }}
        >
          Past
          {activeTab === 'past' && <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '3px', background: '#7e22ce', borderRadius: '3px 3px 0 0' }} />}
        </button>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            No bookings found.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bookings.map(booking => (
              <div key={booking.id} style={{
                background: '#ffffff', borderRadius: '20px', padding: '20px', border: '1px solid #f1f5f9',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)', cursor: 'pointer'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{booking.provider}</div>
                    <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>{booking.category}</div>
                  </div>
                  {booking.status === 'waiting' && (
                    <div style={{ background: '#fef3c7', color: '#d97706', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={14} /> Pending
                    </div>
                  )}
                  {booking.status === 'confirmed' && (
                    <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} /> Confirmed
                    </div>
                  )}
                  {booking.status === 'completed' && (
                    <div style={{ background: '#f1f5f9', color: '#64748b', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700 }}>
                      Completed
                    </div>
                  )}
                  {booking.status === 'cancelled' && (
                    <div style={{ background: '#fef2f2', color: '#ef4444', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <XCircle size={14} /> Cancelled
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#475569', fontWeight: 500 }}>
                    <Calendar size={16} color="#94a3b8" /> {booking.date}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#475569', fontWeight: 500 }}>
                    <Clock size={16} color="#94a3b8" /> {booking.time}
                  </div>
                </div>

                // @ts-ignore
                {booking.note && (
                  <div style={{ fontSize: '14px', color: '#475569', background: '#f8fafc', padding: '12px', borderRadius: '12px', marginBottom: '16px' }}>
                    // @ts-ignore
                    "{booking.note}"
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <button onClick={() => onNavigate('provider-profile')} style={{ background: 'none', border: 'none', color: '#6b21a8', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
                    View Profile
                  </button>
                  {activeTab === 'upcoming' && (
                    <button style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '14px', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
