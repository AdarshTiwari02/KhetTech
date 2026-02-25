'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Sprout, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  /* ─── Step 1: Send OTP ─────────────────────────────── */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return setError('कृपया एक वैध ईमेल पता दर्ज करें');

    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send-otp', email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('otp');
      } else {
        setError(data.message || 'OTP भेजने में विफल');
      }
    } catch {
      setError('नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  /* ─── Step 2: Verify OTP ────────────────────────────── */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return setError('कृपया 6 अंकों का OTP दर्ज करें');

    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify-otp', email, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.dispatchEvent(new Event('userChanged'));
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'OTP सत्यापन विफल');
      }
    } catch {
      setError('नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d1f0f 0%, #0a1628 50%, #0d1f1a 100%)',
      padding: '20px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', zIndex: 10 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/landing" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(16,185,129,0.4)' }}>
              <Sprout size={24} color="white" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>खेतटेक</div>
              <div style={{ fontSize: 11, color: 'rgba(167,243,208,0.6)' }}>KhetTech</div>
            </div>
          </Link>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {step === 'otp' ? <CheckCircle size={14} color="white" /> : <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>1</span>}
            </div>
            <span style={{ color: '#6ee7b7', fontSize: 13, fontWeight: 600 }}>ईमेल</span>
          </div>
          <div style={{ width: 36, height: 1, background: step === 'otp' ? '#10b981' : 'rgba(255,255,255,0.12)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: step === 'otp' ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: step === 'otp' ? '#fff' : 'rgba(255,255,255,0.35)', fontSize: 12, fontWeight: 700 }}>2</span>
            </div>
            <span style={{ color: step === 'otp' ? '#6ee7b7' : 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600 }}>OTP सत्यापन</span>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(22,30,40,0.88)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
          padding: '36px 32px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>

          {step === 'email' ? (
            <>
              <div style={{ marginBottom: 28 }}>
                <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: '0 0 6px' }}>लॉगिन करें</h1>
                <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: 14, margin: 0 }}>
                  खाता नहीं है?{' '}
                  <Link href="/auth/signup" style={{ color: '#34d399', fontWeight: 600, textDecoration: 'none' }}>रजिस्टर करें</Link>
                </p>
              </div>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>⚠️</span>
                  <p style={{ color: '#fca5a5', fontSize: 14, margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(203,213,225,0.9)', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                    ईमेल पता
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(100,116,139,0.8)', pointerEvents: 'none' }} />
                    <input
                      type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }}
                      placeholder="आपका रजिस्टर्ड ईमेल पता" required autoFocus
                      style={{
                        width: '100%', padding: '14px 14px 14px 42px', borderRadius: 10, boxSizing: 'border-box',
                        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                        color: '#e2e8f0', fontSize: 15, outline: 'none', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                  </div>
                  <p style={{ color: 'rgba(100,116,139,0.7)', fontSize: 12, marginTop: 7 }}>
                    📩 आपके ईमेल पर एक OTP कोड भेजा जाएगा
                  </p>
                </div>

                <button type="submit" disabled={isLoading} style={{
                  width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                  background: isLoading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff', fontSize: 15, fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: isLoading ? 'none' : '0 0 20px rgba(16,185,129,0.35)',
                  transition: 'all 0.2s',
                }}>
                  {isLoading
                    ? <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> OTP भेजा जा रहा है...</>
                    : <>OTP भेजें <ArrowRight size={18} /></>}
                </button>
              </form>
            </>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>OTP सत्यापित करें</h1>
                <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: 14, margin: 0 }}>
                  <strong style={{ color: '#34d399' }}>{email}</strong> पर OTP भेजा गया
                </p>
              </div>


              {error && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span>⚠️</span>
                  <p style={{ color: '#fca5a5', fontSize: 14, margin: 0 }}>{error}</p>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', color: 'rgba(203,213,225,0.9)', fontSize: 13, fontWeight: 600, marginBottom: 10 }}>
                    6 अंकों का OTP कोड
                  </label>
                  {/* OTP boxes */}
                  <input
                    type="text" value={otp}
                    onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 6); setOtp(v); setError(''); }}
                    placeholder="○  ○  ○  ○  ○  ○"
                    maxLength={6} required autoFocus
                    style={{
                      width: '100%', padding: '20px 14px', borderRadius: 12, boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)',
                      border: '2px solid rgba(16,185,129,0.35)',
                      color: '#34d399', fontSize: 32, fontWeight: 800, outline: 'none',
                      textAlign: 'center', letterSpacing: 14, fontFamily: 'monospace',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#10b981'}
                    onBlur={e => e.target.style.borderColor = 'rgba(16,185,129,0.35)'}
                  />
                  <p style={{ color: 'rgba(100,116,139,0.7)', fontSize: 12, marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
                    <span>⏰ OTP 10 मिनट में समाप्त होगा</span>
                    <button type="button" onClick={() => { setStep('email'); setOtp(''); setError(''); }}
                      style={{ background: 'none', border: 'none', color: '#34d399', fontSize: 12, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                      ईमेल बदलें
                    </button>
                  </p>
                </div>

                <button type="submit" disabled={isLoading || otp.length !== 6} style={{
                  width: '100%', padding: '14px', borderRadius: 10, border: 'none',
                  background: (isLoading || otp.length !== 6) ? 'rgba(16,185,129,0.4)' : 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff', fontSize: 15, fontWeight: 700, cursor: (isLoading || otp.length !== 6) ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: (isLoading || otp.length !== 6) ? 'none' : '0 0 20px rgba(16,185,129,0.35)',
                  transition: 'all 0.2s',
                }}>
                  {isLoading
                    ? <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> सत्यापित हो रहा है...</>
                    : <>लॉगिन करें <ArrowRight size={18} /></>}
                </button>

                {/* Resend OTP */}
                <button type="button" onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                }} style={{
                  background: 'none', border: 'none', color: 'rgba(148,163,184,0.6)',
                  fontSize: 13, cursor: 'pointer', padding: '4px 0', textAlign: 'center',
                }}>
                  OTP नहीं मिला? दोबारा भेजें
                </button>
              </form>
            </>
          )}
        </div>

        {/* Back link */}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/landing" style={{ color: 'rgba(100,116,139,0.6)', fontSize: 13, textDecoration: 'none' }}>
            ← वापस होम पेज पर जाएं
          </Link>
        </div>
      </div>
    </div>
  );
}