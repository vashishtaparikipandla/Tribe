import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export default function BookingFlowScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [step, setStep] = useState<'date' | 'time' | 'confirm' | 'success'>('date');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const dates = [
    { day: 'Mon', date: '15' },
    { day: 'Tue', date: '16' },
    { day: 'Wed', date: '17' },
    { day: 'Thu', date: '18' },
    { day: 'Fri', date: '19' },
  ];

  const times = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column' }} className="animate-slide-up-fade">
      <div style={{
        background: '#ffffff', padding: '64px 24px 16px', borderBottom: '1px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: '16px', position: 'sticky', top: 0, zIndex: 10
      }}>
        <button onClick={() => onNavigate('provider-profile')} style={{
          background: 'none', border: 'none', padding: 0, color: '#0f172a', cursor: 'pointer',
          display: 'flex', alignItems: 'center'
        }}>
          <ArrowLeft size={24} />
        </button>
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Book Appointment</h1>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        {step === 'date' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Select Date</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Ramesh Plumbing is available this week.</p>
            
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none' }}>
              {dates.map((d) => (
                <button
                  key={d.date}
                  onClick={() => setSelectedDate(d.date)}
                  style={{
                    minWidth: '72px', padding: '16px 8px', borderRadius: '16px',
                    border: selectedDate === d.date ? '2px solid #7e22ce' : '1px solid #e2e8f0',
                    background: selectedDate === d.date ? '#faf5ff' : '#ffffff',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 600, color: selectedDate === d.date ? '#7e22ce' : '#64748b' }}>{d.day}</span>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: selectedDate === d.date ? '#7e22ce' : '#0f172a' }}>{d.date}</span>
                </button>
              ))}
            </div>

            <button
              disabled={!selectedDate}
              onClick={() => setStep('time')}
              style={{
                width: '100%', padding: '16px', marginTop: '24px', borderRadius: '16px', fontSize: '16px', fontWeight: 700,
                background: selectedDate ? '#7e22ce' : '#cbd5e1', color: '#ffffff', border: 'none', cursor: selectedDate ? 'pointer' : 'not-allowed'
              }}
            >
              Continue
            </button>
          </div>
        )}

        {step === 'time' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Select Time</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Available slots on the selected date.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  style={{
                    padding: '16px', borderRadius: '12px',
                    border: selectedTime === t ? '2px solid #7e22ce' : '1px solid #e2e8f0',
                    background: selectedTime === t ? '#faf5ff' : '#ffffff',
                    fontSize: '15px', fontWeight: 600, color: selectedTime === t ? '#7e22ce' : '#0f172a',
                    cursor: 'pointer'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              <button
                onClick={() => setStep('date')}
                style={{ flex: 1, padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 700, background: '#f1f5f9', color: '#0f172a', border: 'none', cursor: 'pointer' }}
              >
                Back
              </button>
              <button
                disabled={!selectedTime}
                onClick={() => setStep('confirm')}
                style={{
                  flex: 2, padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 700,
                  background: selectedTime ? '#7e22ce' : '#cbd5e1', color: '#ffffff', border: 'none', cursor: selectedTime ? 'pointer' : 'not-allowed'
                }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="animate-fade-in">
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginBottom: '24px' }}>Confirm Details</h2>
            
            <div style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <Calendar color="#64748b" />
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Date</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: 700 }}>Oct {selectedDate}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <Clock color="#64748b" />
                <div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Time</div>
                  <div style={{ fontSize: '16px', color: '#0f172a', fontWeight: 700 }}>{selectedTime}</div>
                </div>
              </div>
            </div>

            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>Add a note (Optional)</label>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="What do you need done?"
              style={{
                width: '100%', height: '100px', padding: '16px', borderRadius: '16px',
                border: '1px solid #e2e8f0', background: '#ffffff', fontSize: '15px',
                fontFamily: 'inherit', color: '#0f172a', resize: 'none', boxSizing: 'border-box',
                marginBottom: '16px'
              }}
            />
            
            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '16px', borderRadius: '12px', marginBottom: '32px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                <strong style={{ color: '#0f172a' }}>Next Step:</strong> Ramesh will confirm within 2 hours. If no response, the request will automatically cancel.
              </p>
            </div>

            <button
              onClick={() => setStep('success')}
              style={{
                width: '100%', padding: '18px', background: 'linear-gradient(135deg, #6b21a8, #4c1d95)',
                color: '#ffffff', border: 'none', borderRadius: '16px', fontSize: '16px',
                fontWeight: 700, cursor: 'pointer'
              }}
            >
              Request Booking
            </button>
          </div>
        )}

        {step === 'success' && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ width: '80px', height: '80px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <CheckCircle2 size={40} color="#16a34a" />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Request Sent!</h2>
            <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', lineHeight: 1.5 }}>
              We've notified Ramesh Plumbing. You'll receive a confirmation within 2 hours.
            </p>
            <button
              onClick={() => onNavigate('my-bookings')}
              style={{
                width: '100%', padding: '16px', background: '#f1f5f9', color: '#0f172a',
                border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer'
              }}
            >
              View My Bookings
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
