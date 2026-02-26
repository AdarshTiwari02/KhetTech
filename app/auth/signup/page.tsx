'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User as UserIcon, ArrowRight, Eye, EyeOff, Sprout, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', otp: ''
  });
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedStep = localStorage.getItem('signup-step');
      if (savedStep === 'details' || savedStep === 'otp') setStep(savedStep);

      const savedData = localStorage.getItem('signup-data');
      if (savedData) {
        setFormData(prev => ({ ...prev, ...JSON.parse(savedData) }));
      }
    } catch (e) { }
  }, []);

  // Save state on change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('signup-step', step);
      // Don't save OTP or confirm password as they are highly temporal/sensitive
      const dataToSave = {
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      localStorage.setItem('signup-data', JSON.stringify(dataToSave));
    }
  }, [step, formData.name, formData.email, formData.password, isClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return setError('कृपया अपना नाम दर्ज करें');
    if (!formData.email.includes('@')) return setError('कृपया एक वैध ईमेल पता दर्ज करें');
    if (formData.password.length < 6) return setError('पासवर्ड कम से कम 6 अक्षर का होना चाहिए');
    if (formData.password !== formData.confirmPassword) return setError('पासवर्ड मेल नहीं खाते');
    if (!termsAccepted) return setError('कृपया नियम और शर्तें स्वीकार करें');

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep('otp');
        setError('');
      } else {
        setError(data.message || 'OTP भेजने में विफल');
      }
    } catch {
      setError('नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.otp || formData.otp.length !== 6) return setError('कृपया 6 अंकों का OTP दर्ज करें');

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email,
          password: formData.password, otp: formData.otp
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // Clear saved form data on success
        localStorage.removeItem('signup-step');
        localStorage.removeItem('signup-data');

        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        window.dispatchEvent(new Event('userChanged'));
        window.location.href = '/dashboard';
      } else {
        setError(data.message || 'खाता बनाने में विफल');
      }
    } catch {
      setError('नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '13px 14px 13px 42px', borderRadius: 10,
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#e2e8f0', fontSize: 15, outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', color: 'rgba(203,213,225,0.9)', fontSize: 13, fontWeight: 600, marginBottom: 8
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0d1f0f 0%, #0a1628 50%, #0d1f1a 100%)',
      padding: '20px', position: 'relative', overflow: 'hidden'
    }}>
      {/* Background blobs */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {!isClient ? (
        <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center' }}>
          <div className="spinner" style={{ width: 40, height: 40, borderWidth: 3, borderTopColor: '#10b981' }} />
        </div>
      ) : (
        <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 10 }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <Link href="/landing" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(16,185,129,0.4)' }}>
                <Sprout size={22} color="white" />
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>खेतटेक</span>
            </Link>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
                {step === 'otp' ? <CheckCircle size={14} /> : '1'}
              </div>
              <span style={{ color: '#6ee7b7', fontSize: 13, fontWeight: 600 }}>विवरण</span>
            </div>
            <div style={{ width: 32, height: 1, background: step === 'otp' ? '#10b981' : 'rgba(255,255,255,0.15)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: step === 'otp' ? 'linear-gradient(135deg,#10b981,#059669)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: step === 'otp' ? '#fff' : 'rgba(255,255,255,0.4)' }}>
                2
              </div>
              <span style={{ color: step === 'otp' ? '#6ee7b7' : 'rgba(255,255,255,0.3)', fontSize: 13, fontWeight: 600 }}>OTP सत्यापन</span>
            </div>
          </div>

          {/* Card */}
          <div style={{
            background: 'rgba(22,30,40,0.85)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20,
            padding: '32px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
            <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 6px' }}>
              {step === 'details' ? 'नया खाता बनाएं' : 'OTP सत्यापित करें'}
            </h1>
            <p style={{ color: 'rgba(148,163,184,0.7)', fontSize: 14, margin: '0 0 24px' }}>
              {step === 'details' ? (
                <>पहले से खाता है?{' '}<Link href="/auth/login" style={{ color: '#34d399', fontWeight: 600, textDecoration: 'none' }}>लॉगिन करें</Link></>
              ) : (
                <><strong style={{ color: '#34d399' }}>{formData.email}</strong> पर OTP भेजा गया</>
              )}
            </p>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>⚠️</span>
                <p style={{ color: '#fca5a5', fontSize: 14, margin: 0 }}>{error}</p>
              </div>
            )}


            {step === 'details' ? (
              <form onSubmit={handleSendOTP} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>पूरा नाम *</label>
                  <div style={{ position: 'relative' }}>
                    <UserIcon size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(100,116,139,0.8)', pointerEvents: 'none' }} />
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="अपना पूरा नाम दर्ज करें" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>ईमेल पता *</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(100,116,139,0.8)', pointerEvents: 'none' }} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="आपका ईमेल पता" required style={inputStyle}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={labelStyle}>पासवर्ड * <span style={{ color: 'rgba(148,163,184,0.5)', fontWeight: 400 }}>(न्यूनतम 6 अक्षर)</span></label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(100,116,139,0.8)', pointerEvents: 'none' }} />
                    <input type={showPass ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="पासवर्ड बनाएं" required style={{ ...inputStyle, paddingRight: 44 }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(100,116,139,0.8)', padding: 0 }}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label style={labelStyle}>पासवर्ड की पुष्टि करें *</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(100,116,139,0.8)', pointerEvents: 'none' }} />
                    <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="दोबारा पासवर्ड दर्ज करें" required style={{ ...inputStyle, paddingRight: 44 }}
                      onFocus={e => e.target.style.borderColor = 'rgba(16,185,129,0.6)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(100,116,139,0.8)', padding: 0 }}>
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)}
                    style={{ width: 16, height: 16, marginTop: 2, accentColor: '#10b981', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(148,163,184,0.8)', fontSize: 13, lineHeight: 1.5 }}>
                    मैं <a href="#" style={{ color: '#34d399', textDecoration: 'none' }}>सेवा की शर्तों</a> और <a href="#" style={{ color: '#34d399', textDecoration: 'none' }}>गोपनीयता नीति</a> से सहमत हूं
                  </span>
                </label>

                <button type="submit" disabled={isLoading} style={{
                  width: '100%', padding: '14px', borderRadius: 10, marginTop: 4,
                  background: isLoading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg,#10b981,#059669)',
                  color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: isLoading ? 'none' : '0 0 20px rgba(16,185,129,0.35)',
                  transition: 'all 0.2s',
                }}>
                  {isLoading ? <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />OTP भेजा जा रहा है...</> : <>OTP भेजें <ArrowRight size={18} /></>}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle}>6 अंकों का OTP दर्ज करें *</label>
                  <input type="text" name="otp" value={formData.otp} onChange={handleChange}
                    placeholder="○ ○ ○ ○ ○ ○" maxLength={6} required
                    style={{
                      width: '100%', padding: '18px 14px', borderRadius: 10, boxSizing: 'border-box',
                      background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(16,185,129,0.3)',
                      color: '#34d399', fontSize: 28, fontWeight: 800, outline: 'none',
                      textAlign: 'center', letterSpacing: 16, fontFamily: 'monospace',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => e.target.style.borderColor = '#34d399'}
                    onBlur={e => e.target.style.borderColor = 'rgba(16,185,129,0.3)'}
                  />
                  <p style={{ color: 'rgba(148,163,184,0.6)', fontSize: 12, marginTop: 8 }}>
                    ⏰ OTP 10 मिनट में समाप्त होगा
                  </p>
                </div>

                <button type="submit" disabled={isLoading} style={{
                  width: '100%', padding: '14px', borderRadius: 10,
                  background: isLoading ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg,#10b981,#059669)',
                  color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: isLoading ? 'none' : '0 0 20px rgba(16,185,129,0.35)',
                  transition: 'all 0.2s',
                }}>
                  {isLoading ? <><div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />सत्यापित हो रहा है...</> : <>सत्यापित करें और खाता बनाएं <ArrowRight size={18} /></>}
                </button>

                <button type="button" onClick={() => { setStep('details'); setError(''); }}
                  style={{ background: 'none', border: 'none', color: 'rgba(148,163,184,0.7)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', textDecorationColor: 'transparent', padding: '4px 0' }}>
                  ← ईमेल या विवरण बदलें
                </button>
              </form>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Link href="/landing" style={{ color: 'rgba(100,116,139,0.7)', fontSize: 13, textDecoration: 'none' }}>
              ← वापस होम पेज पर जाएं
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}