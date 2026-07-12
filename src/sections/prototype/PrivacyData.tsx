import { useState } from 'react';
import type { Screen } from '@/components/PrototypePage';
import { ArrowLeft, Users, Download, Trash2, FileText, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function PrivacyDataScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteSuccess(true);
    }, 2000);
  };

  if (deleteSuccess) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', textAlign: 'center' }} className="animate-fade-in">
        <div style={{ width: '80px', height: '80px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={40} color="#16a34a" />
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>Account Deleted</h2>
        <p style={{ fontSize: '15px', color: '#64748b', marginBottom: '32px', lineHeight: 1.5 }}>
          Your personal data has been securely deleted. Your past recommendations have been anonymized.
        </p>
        <button onClick={() => window.location.reload()} style={{
          width: '100%', padding: '16px', background: '#0f172a', color: '#ffffff',
          border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 700, cursor: 'pointer'
        }}>
          Return to Start
        </button>
      </div>
    );
  }

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
        <h1 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>Privacy & Data</h1>
      </div>

      <div style={{ padding: '24px', flex: 1 }}>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px', lineHeight: 1.5 }}>
          Manage your data, privacy settings, and view our legal agreements.
        </p>

        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '24px' }}>
          <button style={{
            width: '100%', padding: '20px', background: 'none', border: 'none', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#0f172a" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Sync Contacts</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Last synced 2 days ago</div>
            </div>
            <ChevronRight size={20} color="#94a3b8" />
          </button>

          <button style={{
            width: '100%', padding: '20px', background: 'none', border: 'none', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Download size={20} color="#0f172a" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Export My Data</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Download your profile and history</div>
            </div>
            <ChevronRight size={20} color="#94a3b8" />
          </button>

          <button onClick={() => setShowDeleteConfirm(true)} style={{
            width: '100%', padding: '20px', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trash2 size={20} color="#ef4444" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#ef4444' }}>Delete Account</div>
              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Permanently remove your account</div>
            </div>
            <ChevronRight size={20} color="#94a3b8" />
          </button>
        </div>

        <div style={{ background: '#ffffff', borderRadius: '24px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <button onClick={() => onNavigate('legal-document')} style={{
            width: '100%', padding: '20px', background: 'none', border: 'none', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color="#0f172a" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Privacy Policy</div>
            </div>
            <ChevronRight size={20} color="#94a3b8" />
          </button>
          <button onClick={() => onNavigate('legal-document')} style={{
            width: '100%', padding: '20px', background: 'none', border: 'none',
            display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', textAlign: 'left'
          }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={20} color="#0f172a" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>Terms & Conditions</div>
            </div>
            <ChevronRight size={20} color="#94a3b8" />
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 100, display: 'flex', alignItems: 'flex-end', animation: 'fadeIn 0.2s ease-out' }}>
          <div style={{ background: '#ffffff', width: '100%', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', padding: '32px 24px 48px', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={24} color="#ef4444" />
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>Delete Account?</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>This action cannot be undone.</p>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '32px' }}>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#475569', fontSize: '14px', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>All your personal data, saved providers, and booking history will be permanently deleted.</li>
                <li>Your past recommendations will not be deleted, but they will be anonymized (attributed to "a former member") so they do not break the trust graph.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowDeleteConfirm(false)} disabled={isDeleting} style={{
                flex: 1, padding: '16px', background: '#f1f5f9', color: '#0f172a',
                border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer'
              }}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={isDeleting} style={{
                flex: 1, padding: '16px', background: '#ef4444', color: '#ffffff',
                border: 'none', borderRadius: '16px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                opacity: isDeleting ? 0.7 : 1
              }}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
