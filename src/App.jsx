import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Shield, ShieldAlert, ShieldCheck, Link as LinkIcon, Activity, AlertOctagon, 
  Mail, ChevronRight, Lock, Globe, CheckCircle2, Lightbulb, 
  Wifi, Smartphone, Eye, EyeOff, Key, LogOut, User, Sparkles, CreditCard, Clock, Code, Database, Cpu, ArrowRight, BookOpen, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ==========================================
// 1. NAVBAR & FOOTER COMPONENTS
// ==========================================
const Navbar = ({ currentPage, changePage, globalUser, handleLogout }) => (
  <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => changePage('home')}>
        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-200">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-slate-900 leading-tight">
            SHIELD<span className="text-indigo-600">SMART</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">IoT Defense Platform</p>
        </div>
      </div>
      
      <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-500">
        <button onClick={() => changePage('home')} className={`hover:text-indigo-600 transition ${currentPage === 'home' ? 'text-indigo-600' : ''}`}>Home</button>
        <button onClick={() => changePage('scanner', 'url')} className={`hover:text-indigo-600 transition ${currentPage === 'scanner_url' ? 'text-indigo-600' : ''}`}>URL Scanner</button>
        <button onClick={() => changePage('scanner', 'email')} className={`hover:text-indigo-600 transition ${currentPage === 'scanner_email' ? 'text-indigo-600' : ''}`}>Email Scanner</button>
        <button onClick={() => changePage('tips')} className={`hover:text-indigo-600 transition ${currentPage === 'tips' ? 'text-indigo-600' : ''}`}>Security Tips</button>
        <button onClick={() => changePage('about')} className={`hover:text-indigo-600 transition ${currentPage === 'about' ? 'text-indigo-600' : ''}`}>About Us</button>
      </div>

      <div className="hidden md:flex items-center gap-4">
        {globalUser ? (
          <>
            <button onClick={() => changePage('pricing')} className="text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white px-4 py-2 rounded-xl transition shadow-lg shadow-orange-500/20 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Upgrade Pro
            </button>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl">
              <User className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-slate-700">{globalUser}</span>
            </div>
            <button onClick={handleLogout} className="text-sm font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition flex items-center gap-2">
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => changePage('pricing')} className="text-sm font-bold text-orange-500 hover:text-orange-600 transition flex items-center gap-2 mr-2">
              <Activity className="w-4 h-4" /> Subscriptions
            </button>
            <button onClick={() => changePage('auth', 'login')} className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition flex items-center gap-2">
              Sign In
            </button>
            <button onClick={() => changePage('auth', 'signup')} className="text-sm font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-5 py-2.5 rounded-xl transition border border-indigo-200">
              Create Account
            </button>
          </>
        )}
      </div>
    </div>
  </nav>
);

const Footer = ({ changePage }) => (
  <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-indigo-500" />
          <span className="text-lg font-black text-white tracking-tight">SHIELD<span className="text-indigo-500">SMART</span></span>
        </div>
        <p className="text-sm font-medium leading-relaxed mb-6">
          Advanced Deep Learning architecture designed to secure IoT perimeters from zero-day phishing attacks and social engineering payloads.
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Cybersecurity & Digital Forensics Final Year Project
        </p>
      </div>
      
      <div>
        <h4 className="text-white font-bold mb-6">Platform Services</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><button onClick={() => changePage('scanner', 'url')} className="hover:text-indigo-400 transition">IoT URL Scanner</button></li>
          <li><button onClick={() => changePage('scanner', 'email')} className="hover:text-indigo-400 transition">Payload Analyzer</button></li>
          <li><button onClick={() => changePage('tips')} className="hover:text-indigo-400 transition">Security Best Practices</button></li>
          <li><button onClick={() => changePage('pricing')} className="hover:text-indigo-400 transition">Subscription Plans</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6">Company & Research</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><button onClick={() => changePage('about')} className="hover:text-indigo-400 transition">About Us</button></li>
          <li><button className="hover:text-indigo-400 transition">Research Methodology</button></li>
          <li><button className="hover:text-indigo-400 transition">Contact Infrastructure</button></li>
          <li><button className="hover:text-indigo-400 transition">API Documentation</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-6">Legal & Compliance</h4>
        <ul className="space-y-4 text-sm font-medium">
          <li><button className="hover:text-indigo-400 transition">Privacy Policy</button></li>
          <li><button className="hover:text-indigo-400 transition">Terms of Service</button></li>
          <li><button className="hover:text-indigo-400 transition">Cookie Policy</button></li>
          <li><button className="hover:text-indigo-400 transition">Data Processing Agreement</button></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-sm font-medium">© 2026 ShieldSmart Research Team. All rights reserved.</p>
      <div className="flex items-center gap-2 text-sm font-medium">
        <Globe className="w-4 h-4" /> Global Defense Network Active
      </div>
    </div>
  </footer>
);

// ==========================================
// 2. SECURITY TIPS PAGE
// ==========================================
const SecurityTipsPage = () => {
  const tips = [
    { icon: <Wifi className="w-8 h-8 text-blue-500" />, title: "Secure IoT Networks", desc: "Always change default router passwords and create a separate guest network specifically for your IoT devices to isolate them from main hardware." },
    { icon: <LinkIcon className="w-8 h-8 text-rose-500" />, title: "Inspect Callbacks", desc: "Phishing in IoT often happens via malicious callback URLs in firmware updates. Always verify the SSL certificate of the update server." },
    { icon: <Key className="w-8 h-8 text-amber-500" />, title: "Zero-Trust Architecture", desc: "Never trust a device or network by default. Implement strict access controls and multi-factor authentication for device management portals." },
    { icon: <Eye className="w-8 h-8 text-indigo-500" />, title: "Monitor Traffic Anomalies", desc: "Watch for unusual outbound data spikes from smart devices, which can indicate they are part of a botnet or sending data to a phishing endpoint." },
    { icon: <Mail className="w-8 h-8 text-emerald-500" />, title: "Beware of Spoofed Alerts", desc: "Attackers send fake 'Device Offline' emails to steal login credentials. Always check the sender's actual email address, not just the display name." },
    { icon: <Smartphone className="w-8 h-8 text-purple-500" />, title: "Keep Firmware Updated", desc: "Outdated firmware is the #1 vulnerability in smart home devices. Enable auto-updates to patch security flaws immediately." },
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto flex-grow">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wide uppercase mb-4 shadow-sm">
          <Lightbulb className="w-4 h-4" /> Best Practices
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">IoT Phishing <span className="text-indigo-600">Defense Tips</span></h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Modern strategies to protect your smart infrastructure from zero-day exploits, social engineering, and malicious payloads.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tips.map((tip, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 hover:shadow-2xl transition-all hover:-translate-y-1">
            <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100">
              {tip.icon}
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-3">{tip.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{tip.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. PRICING / UPGRADE PAGE
// ==========================================
const PricingPage = ({ changePage, globalUser }) => {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto flex-grow">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold tracking-wide uppercase mb-4 shadow-sm">
          <Sparkles className="w-4 h-4" /> Flexible Plans
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Security Tier</span></h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">From individual researchers to enterprise IoT environments, we have a plan structured for your defense needs.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
          <h3 className="text-2xl font-black text-slate-900 mb-2">Basic Researcher</h3>
          <p className="text-slate-500 font-medium mb-6">Perfect for students and personal IoT setups.</p>
          <div className="mb-8"><span className="text-5xl font-black text-slate-900">Free</span></div>
          <ul className="space-y-4 mb-10">
            <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> 10 URL Scans per day</li>
            <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> 10 Email Payload Scans per day</li>
            <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle2 className="w-5 h-5 text-emerald-500"/> Standard XAI Explanations</li>
            <li className="flex items-center gap-3 text-slate-400 font-medium"><Lock className="w-5 h-5 text-slate-300"/> No API Access</li>
          </ul>
          <button onClick={() => !globalUser ? changePage('auth', 'signup') : changePage('scanner', 'url')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 rounded-xl transition">
            {globalUser ? "Current Plan" : "Start for Free"}
          </button>
        </div>

        <div className="bg-slate-900 p-10 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
          <h3 className="text-2xl font-black text-white mb-2 relative z-10">Enterprise Defense</h3>
          <p className="text-slate-400 font-medium mb-6 relative z-10">For cybersecurity teams and IoT infrastructures.</p>
          <div className="mb-8 relative z-10"><span className="text-5xl font-black text-white">$49</span><span className="text-slate-400 font-medium"> /month</span></div>
          <ul className="space-y-4 mb-10 relative z-10">
            <li className="flex items-center gap-3 text-slate-200 font-medium"><CheckCircle2 className="w-5 h-5 text-orange-500"/> Unlimited URL & Email Scans</li>
            <li className="flex items-center gap-3 text-slate-200 font-medium"><CheckCircle2 className="w-5 h-5 text-orange-500"/> Advanced Neural Net Priority</li>
            <li className="flex items-center gap-3 text-slate-200 font-medium"><CheckCircle2 className="w-5 h-5 text-orange-500"/> Developer API Access</li>
            <li className="flex items-center gap-3 text-slate-200 font-medium"><CheckCircle2 className="w-5 h-5 text-orange-500"/> Downloadable Threat PDF Reports</li>
          </ul>
          <button onClick={() => alert("Payment Gateway Integration (Stripe) is required for processing transactions. This feature will be available post-launch.")} className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-orange-500/30 relative z-10 flex justify-center items-center gap-2">
            <CreditCard className="w-5 h-5"/> Subscribe to Pro
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. MULTI-STEP AUTHENTICATION PAGE (ANIMATED, WOW UX)
// ==========================================
const AuthPage = ({ authMode, setGlobalUser, changePage }) => {
  const [view, setView] = useState(authMode); 
  const [step, setStep] = useState(1); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const rotatingTips = [
    { icon: <Lock className="w-6 h-6 text-indigo-400"/>, title: "Military-Grade Encryption", desc: "Your data is secured using industry-standard Bcrypt hashing protocols." },
    { icon: <Activity className="w-6 h-6 text-emerald-400"/>, title: "Zero-Trust Architecture", desc: "Session management via stateless JSON Web Tokens ensures robust API security." },
    { icon: <ShieldCheck className="w-6 h-6 text-blue-400"/>, title: "Real-Time Telemetry", desc: "Deep learning models analyze and block zero-day threats instantly." }
  ];

  useEffect(() => { 
    const interval = setInterval(() => { 
      setActiveTipIndex((prev) => (prev + 1) % rotatingTips.length); 
    }, 6000); 
    return () => clearInterval(interval); 
  }, []);
  
  useEffect(() => {
    let timer;
    if (step === 2 && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, timeLeft]);

  useEffect(() => { 
    setView(authMode); 
    setStep(1); 
    setErrorMsg(''); 
    setSuccessMsg(''); 
    setOtpCode('');
    setShowPassword(false);
  }, [authMode]);

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (!pass) return { score: 0, text: '', color: 'bg-slate-200', width: '0%' };
    if (pass.length > 7) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    if (score === 1) return { score, text: 'Weak', color: 'bg-rose-500', width: '25%' };
    if (score === 2) return { score, text: 'Fair', color: 'bg-amber-500', width: '50%' };
    if (score === 3) return { score, text: 'Good', color: 'bg-emerald-400', width: '75%' };
    if (score === 4) return { score, text: 'Strong', color: 'bg-emerald-600', width: '100%' };
    return { score: 0, text: 'Too Short', color: 'bg-rose-500', width: '10%' };
  };
  const passStrength = getPasswordStrength(password);

  const handleResendOTP = async () => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      if (view === 'signup') {
        await axios.post('https://hadijoiya-shieldsmart-api.hf.space/api/send-signup-otp', { name, email, password });
      } else if (view === 'forgot') {
        await axios.post('https://hadijoiya-shieldsmart-api.hf.space/api/send-reset-otp', { email });
      }
      setTimeLeft(60);
      setCanResend(false);
      setSuccessMsg("A new verification code has been dispatched to your email.");
      setTimeout(() => setSuccessMsg(''), 5000); 
    } catch (error) {
      setErrorMsg("Failed to resend code. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsSubmitting(true); 
    setErrorMsg(''); 
    setSuccessMsg('');

    try {
      if (view === 'login') {
        const response = await axios.post('https://hadijoiya-shieldsmart-api.hf.space/api/login', { email, password });
        localStorage.setItem('shieldToken', response.data.access_token);
        localStorage.setItem('shieldUserName', response.data.name);
        setGlobalUser(response.data.name);
        changePage('scanner', 'url'); 
      } 
      else if (view === 'signup' && step === 1) {
        await axios.post('https://hadijoiya-shieldsmart-api.hf.space/api/send-signup-otp', { name, email, password });
        setStep(2);
        setTimeLeft(60);
        setCanResend(false);
      }
      else if (view === 'signup' && step === 2) {
        await axios.post('https://hadijoiya-shieldsmart-api.hf.space/api/verify-signup', { name, email, password, otp: otpCode });
        setSuccessMsg("Account created successfully! You can now securely sign in.");
        setView('login'); 
        setStep(1); 
        setPassword(''); 
        setOtpCode('');
        setShowPassword(false);
      }
      else if (view === 'forgot' && step === 1) {
        await axios.post('https://hadijoiya-shieldsmart-api.hf.space/api/send-reset-otp', { email });
        setStep(2);
        setTimeLeft(60);
        setCanResend(false);
      }
      else if (view === 'forgot' && step === 2) {
        await axios.post('https://hadijoiya-shieldsmart-api.hf.space/api/reset-password', { email, otp: otpCode, new_password: password });
        setSuccessMsg("Password reset successfully. You can now securely sign in.");
        setView('login'); 
        setStep(1); 
        setPassword(''); 
        setOtpCode('');
        setShowPassword(false);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMsg(error.response.data.detail);
      } else {
        setErrorMsg("Network connection error. Please verify the server is running.");
      }
    } finally { 
      setIsSubmitting(false); 
    }
  };

  const renderRightColumn = () => {
    if (step === 2) {
      return (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="w-full md:w-7/12 p-10 md:p-14 flex flex-col justify-center bg-white relative z-10 text-center">
          <div className="mx-auto bg-indigo-50 p-4 rounded-full inline-flex mb-6 text-indigo-600 shadow-inner border border-indigo-100">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Verify Your Email</h2>
          <p className="text-slate-500 font-medium mb-8 text-sm max-w-sm mx-auto">
            Please enter the 6-digit security code we sent to <span className="font-bold text-slate-800">{email}</span>.
          </p>
          
          {errorMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <AlertOctagon className="w-4 h-4"/> {errorMsg}
            </motion.div>
          )}
          {successMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-emerald-50 border border-emerald-100 text-emerald-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4"/> {successMsg}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {view === 'forgot' && (
              <div className="text-left">
                <label className="block text-sm font-bold text-slate-700 mb-2">Create New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    required 
                    minLength="6" 
                    value={password} 
                    onChange={(e)=>setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium text-slate-900" 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition">
                    <AnimatePresence mode="wait">
                      <motion.div key={showPassword ? "visible" : "hidden"} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            )}

            <div className="relative">
              <input 
                type="text" 
                maxLength="6" 
                required 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="••••••" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-center text-3xl tracking-[0.8em] font-black text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-2 font-mono placeholder-slate-300 shadow-inner" 
              />
              <div className="flex justify-between px-4 text-[11px] uppercase font-bold tracking-wider text-slate-400 mt-2">
                <span>Verification Code</span>
                <span className={otpCode.length === 6 ? 'text-emerald-500' : ''}>{otpCode.length}/6</span>
              </div>
            </div>

            <button disabled={isSubmitting || otpCode.length < 6 || (view === 'forgot' && password.length < 6)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/20">
              {isSubmitting ? <Activity className="w-5 h-5 animate-spin" /> : (view === 'signup' ? 'Verify & Create Account' : 'Set New Password')} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-sm font-medium">
            {canResend ? (
               <p className="text-slate-500">Didn't receive the code? <button onClick={handleResendOTP} type="button" disabled={isSubmitting} className="text-indigo-600 font-bold hover:underline flex items-center justify-center gap-1 mx-auto mt-2"><RefreshCw className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`}/> Resend Code</button></p>
            ) : (
               <p className="text-slate-400 flex items-center justify-center gap-1.5"><Clock className="w-4 h-4"/> Resend code in <span className="text-slate-700 font-bold">00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span></p>
            )}
          </div>

          <button onClick={() => { setStep(1); setOtpCode(''); setShowPassword(false); }} className="mt-6 text-sm text-slate-400 font-bold hover:text-indigo-600 transition">
            &larr; Back to Email Entry
          </button>
        </motion.div>
      );
    }

    if (view === 'forgot' && step === 1) {
      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full md:w-7/12 p-10 md:p-14 flex flex-col justify-center bg-white relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Reset Password</h2>
            <p className="text-slate-500 mt-2 font-medium">Enter your email address to receive a secure recovery code.</p>
          </div>
          
          {errorMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-rose-50 border border-rose-100 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
              <AlertOctagon className="w-4 h-4"/> {errorMsg}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Registered Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder="name@domain.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium text-slate-900" 
              />
            </div>
            <button disabled={isSubmitting || !email} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition flex justify-center items-center gap-2 disabled:opacity-50">
              {isSubmitting ? <Activity className="w-5 h-5 animate-spin" /> : 'Send Recovery Code'} 
            </button>
          </form>
          
          <button onClick={() => {setView('login'); setErrorMsg(''); setShowPassword(false);}} className="mt-8 text-sm text-slate-500 font-bold hover:text-indigo-600 text-center mx-auto block transition">
            Back to Sign In
          </button>
        </motion.div>
      );
    }

    return (
      <div className="w-full md:w-7/12 p-10 md:p-14 flex flex-col justify-center bg-white relative z-10">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{view === 'login' ? 'Welcome Back' : 'Create an Account'}</h2>
            <p className="text-slate-500 mt-2 font-medium">{view === 'login' ? 'Access your secure IoT defense dashboard.' : 'Start your journey with ShieldSmart today.'}</p>
          </div>
          
          <AnimatePresence>
            {successMsg && (
              <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-700 px-5 py-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-sm">
                <div className="bg-emerald-100 p-1.5 rounded-full"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
                {successMsg}
              </motion.div>
            )}
          </AnimatePresence>

          {errorMsg && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 bg-rose-50 border border-rose-200 text-rose-600 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 flex-shrink-0" /> {errorMsg}
            </motion.div>
          )}
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {view === 'signup' && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    value={name} 
                    onChange={(e)=>setName(e.target.value)} 
                    placeholder="Enter your full name" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium text-slate-900" 
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e)=>setEmail(e.target.value)} 
                placeholder="name@domain.com" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium text-slate-900" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                 <label className="block text-sm font-bold text-slate-700">Password</label>
                 {view === 'login' && (
                   <button type="button" onClick={() => {setView('forgot'); setErrorMsg(''); setSuccessMsg(''); setShowPassword(false);}} className="text-sm font-bold text-indigo-600 hover:underline transition">
                     Forgot password?
                   </button>
                 )}
              </div>
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  required 
                  minLength="6" 
                  value={password} 
                  onChange={(e)=>setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition font-medium text-slate-900" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition">
                  <AnimatePresence mode="wait">
                    <motion.div key={showPassword ? "visible" : "hidden"} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.15 }}>
                      {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </motion.div>
                  </AnimatePresence>
                </button>
              </div>
              
              {view === 'signup' && password.length > 0 && (
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-slate-500">Security Strength</span>
                    <span className={`text-xs font-bold ${passStrength.score > 2 ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {passStrength.text}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden flex">
                    <div className={`h-full transition-all duration-300 ${passStrength.color}`} style={{ width: passStrength.width }}></div>
                  </div>
                </div>
              )}
            </div>
            
            <button disabled={isSubmitting || (view === 'signup' && passStrength.score < 2)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-indigo-200 mt-4 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? <Activity className="w-5 h-5 animate-spin" /> : (view === 'login' ? 'Sign In' : 'Create Account')}
            </button>
          </form>
          
          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            {view === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => {setView(view === 'login' ? 'signup' : 'login'); setErrorMsg(''); setSuccessMsg(''); setPassword(''); setShowPassword(false);}} className="text-indigo-600 font-bold hover:underline transition">
              {view === 'login' ? 'Create Account' : 'Sign In'}
            </button>
          </p>
        </div>
    );
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 flex-grow">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex overflow-hidden border border-slate-100 min-h-[650px]">
        
        {/* ENHANCED ANIMATED LEFT SIDEBAR */}
        <div className="hidden md:flex md:w-5/12 bg-slate-900 p-12 text-white flex-col justify-between relative overflow-hidden">
          <motion.div animate={{ y: [0, -30, 0], scale: [1, 1.05, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-0 w-80 h-80 bg-indigo-500 opacity-20 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></motion.div>
          <motion.div animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500 opacity-10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></motion.div>
          
          <div className="relative z-10 mb-8">
            <div className="bg-white/10 p-3 rounded-2xl inline-flex mb-6 backdrop-blur-md border border-white/10 shadow-lg">
              <Shield className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-black mb-2 text-white">ShieldSmart Security</h2>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">Secure your IoT infrastructure with military-grade precision and real-time deep learning.</p>
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-center">
             <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative min-h-[220px] flex flex-col justify-center shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTipIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5 shadow-inner">
                        {rotatingTips[activeTipIndex].icon}
                      </div>
                      <h4 className="font-bold text-white text-lg">{rotatingTips[activeTipIndex].title}</h4>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      {rotatingTips[activeTipIndex].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-6 left-8 flex gap-2">
                  {rotatingTips.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${activeTipIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-700'}`}></div>
                  ))}
                </div>
             </div>
          </div>
        </div>
        
        {renderRightColumn()}

      </motion.div>
    </div>
  );
};

// ==========================================
// 5. HOME, ABOUT US & SCANNER COMPONENTS 
// ==========================================
const IoTBlogSection = () => {
  const blogs = [
    { icon: <Globe className="w-6 h-6 text-blue-600"/>, bg: "bg-blue-50 border-blue-100", title: "The Rise of IoT Botnets", category: "Threat Intelligence", readTime: "4 min read", desc: "How unpatched smart home devices are being weaponized to launch massive DDoS attacks globally." },
    { icon: <Lock className="w-6 h-6 text-rose-600"/>, bg: "bg-rose-50 border-rose-100", title: "Why Traditional Firewalls Fail", category: "Network Security", readTime: "6 min read", desc: "Understanding the limitations of signature-based detection against zero-day polymorphic phishing payloads." },
    { icon: <Cpu className="w-6 h-6 text-emerald-600"/>, bg: "bg-emerald-50 border-emerald-100", title: "Demystifying XAI in Security", category: "Artificial Intelligence", readTime: "5 min read", desc: "How Agentic Explainable AI bridges the gap between deep learning accuracy and human-readable threat analysis." }
  ];

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="bg-white py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide uppercase mb-3"><BookOpen className="w-4 h-4" /> Research & Articles</div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">Threat Intelligence Hub</h2>
            <p className="text-slate-500 font-medium text-lg">Insights on IoT vulnerabilities and deep learning defense mechanisms.</p>
          </div>
          <button className="text-indigo-600 font-bold flex items-center gap-2 hover:gap-3 transition-all pb-2">Explore Documentation <ArrowRight className="w-5 h-5" /></button>
        </div>
        
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ y: -8, scale: 1.02 }} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <div className={`p-4 rounded-2xl border ${blog.bg} shadow-sm group-hover:scale-110 transition-transform duration-300`}>{blog.icon}</div>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"><Clock className="w-3.5 h-3.5"/> {blog.readTime}</span>
              </div>
              <span className="text-xs font-black tracking-widest text-indigo-500 uppercase mb-3">{blog.category}</span>
              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">{blog.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed flex-grow">{blog.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const HomePage = ({ changePage }) => (
  <div className="flex-grow flex flex-col bg-slate-50">
    <div className="py-24 px-6 max-w-5xl mx-auto text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
          Stop phishing before <br /> it breaches your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">IoT Network.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Explainable AI that scans URLs and emails in real-time — exposing credential-harvesting traps, spoofed domains, and social-engineering payloads before they reach your devices.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => changePage('scanner', 'url')} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-base font-bold px-8 py-4 rounded-xl transition shadow-lg shadow-indigo-200 w-full sm:w-auto">
            <LinkIcon className="w-5 h-5" /> Launch URL Scanner
          </button>
          <button onClick={() => changePage('scanner', 'email')} className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-base font-bold px-8 py-4 rounded-xl transition shadow-sm w-full sm:w-auto">
            <Mail className="w-5 h-5" /> Analyze Email Content
          </button>
        </div>
      </motion.div>
    </div>
    <IoTBlogSection />
  </div>
);

const AboutPage = () => {
  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

  return (
    <div className="py-24 px-6 max-w-6xl mx-auto flex-grow overflow-hidden">
      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-wide uppercase mb-6 shadow-sm"><Shield className="w-4 h-4" /> Platform Overview</div>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">About Us & Our Research</h2>
        <p className="text-lg text-slate-500 max-w-4xl mx-auto leading-relaxed font-medium">
          SHIELD SMART is an intelligent, real-time phishing detection platform engineered for IoT environments. Developed as our comprehensive Final Year Project (FYP) within the Department of Information and Communication Engineering, our architecture deploys a dual-engine Neural Network approach—utilizing CNN-LSTM for IoT endpoint verification and DistilBERT for payload semantic analysis. This is seamlessly fused with Agentic Explainability powered by Groq (Llama-3), delivering real-time, human-readable threat diagnostics.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-12 mb-8">
          <h3 className="text-2xl font-black text-slate-900 mb-8 text-center flex justify-center items-center gap-3"><User className="w-6 h-6 text-indigo-600"/> Core Research Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
               <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600 shadow-inner border border-indigo-100"><User className="w-10 h-10"/></div>
               <p className="font-black text-slate-900 text-xl">Hadi Hassan</p>
             </motion.div>
             <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
               <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-600 shadow-inner border border-emerald-100"><User className="w-10 h-10"/></div>
               <p className="font-black text-slate-900 text-xl">Nayerina Akhtar</p>
             </motion.div>
             <motion.div variants={itemVariants} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-transform duration-300 text-center flex flex-col items-center">
               <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mb-6 text-purple-600 shadow-inner border border-purple-100"><User className="w-10 h-10"/></div>
               <p className="font-black text-slate-900 text-xl">Muhammad Rizwan Aqeel</p>
             </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-12">
          <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-3 relative z-10"><Code className="w-7 h-7 text-indigo-600"/> Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-md transition">
                <div className="bg-white w-12 h-12 rounded-xl flex justify-center items-center mb-5 shadow-sm border border-slate-200"><Cpu className="w-6 h-6 text-indigo-600"/></div>
                <p className="text-slate-900 font-black text-lg mb-3">Dual-Engine AI & XAI</p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">TensorFlow (CNN-LSTM) for IoT URL forensics, PyTorch (DistilBERT) for payload semantics, and Groq Cloud (Llama-3) for Agentic Explainability.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-md transition">
                <div className="bg-white w-12 h-12 rounded-xl flex justify-center items-center mb-5 shadow-sm border border-slate-200"><Database className="w-6 h-6 text-indigo-600"/></div>
                <p className="text-slate-900 font-black text-lg mb-3">Backend Architecture</p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">Python FastAPI, SQLite Relational DB, SQLAlchemy ORM, Bcrypt Cryptography, and stateless JWT Auth.</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hover:shadow-md transition">
                <div className="bg-white w-12 h-12 rounded-xl flex justify-center items-center mb-5 shadow-sm border border-slate-200"><Globe className="w-6 h-6 text-indigo-600"/></div>
                <p className="text-slate-900 font-black text-lg mb-3">Frontend Interface</p>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">React.js, Tailwind CSS for utility styling, Framer Motion for UI animations, and Axios for secure API handling.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ==========================================
// CARD COMPONENT FOR SCAN HISTORY (Polished & Professional)
// ==========================================
const HistoryCard = ({ scan }) => {
  const isSafe = scan.status === 'Safe';
  
  // Logic: Summary text mein se 'RESULT: PHISHING' ya 'RESULT: SAFE' nikal kar sirf intelligence dikhayen
  const cleanSummary = scan.summary.replace(/RESULT: (PHISHING|SAFE)/gi, '').trim();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden h-full">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isSafe ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
      <div className="p-6 pl-8 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
            {scan.type === 'URL' ? <LinkIcon className="w-4 h-4"/> : <Mail className="w-4 h-4"/>} {scan.type} NODE
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${isSafe ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isSafe ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></div>
            {scan.status.toUpperCase()}
          </div>
        </div>
        
        <div className="text-indigo-900 font-black text-xl mb-3">Risk Score: {scan.confidence}%</div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono text-slate-600 mb-4 truncate" title={scan.query}>{scan.query}</div>
        
        {/* POLISHED HISTORY CARD UI */}
        <div className="flex-grow">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Threat Intelligence</p>
            <p className="text-sm text-slate-700 font-medium leading-relaxed italic">{cleanSummary}</p>
        </div>

        <div className="text-xs font-bold text-slate-400 mt-6 border-t border-slate-100 pt-4 flex justify-between">
          <span>{scan.type === 'URL' ? 'Endpoint Node' : 'Payload Node'}</span><span>{scan.date}</span>
        </div>
      </div>
    </div>
  );
};

const ScannerPage = ({ scanType, inputText, setInputText, handleScan, loading, result, limitRemaining, changePage, globalUser, scanHistory }) => {
  const filteredHistory = scanHistory.filter(scan => scan.type === scanType.toUpperCase());

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto flex-grow w-full">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-4 flex justify-center items-center gap-3">
          {scanType === 'url' ? <LinkIcon className="text-indigo-600 w-8 h-8"/> : <Mail className="text-indigo-600 w-8 h-8"/>}
          {scanType === 'url' ? 'Endpoint Threat Scanner' : 'Email Payload Analyzer'}
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">Deploying explainable Deep Learning to secure your infrastructure.</p>
        {globalUser && (
          <div className="mt-6 flex justify-center items-center">
            <div className={`px-4 py-1.5 rounded-full text-sm font-bold border flex items-center gap-2 ${limitRemaining > 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
              <Activity className="w-4 h-4" /> Daily {scanType.toUpperCase()} Limit: {limitRemaining}/10 Remaining
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-3xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center px-4">
            {scanType === 'url' ? (
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Enter IoT endpoint URL to analyze..." className="w-full text-lg text-slate-900 bg-transparent focus:outline-none font-medium placeholder-slate-400 py-3"/>
            ) : (
              <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste raw email content here to analyze..." rows="4" className="w-full text-lg text-slate-900 bg-transparent focus:outline-none font-medium placeholder-slate-400 py-3 resize-none"></textarea>
            )}
          </div>
          
          {!globalUser ? (
             <button onClick={() => changePage('auth', 'login')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl transition flex items-center justify-center gap-2 h-fit self-end md:self-auto shadow-lg shadow-slate-900/20">
               <Lock className="w-5 h-5" /> Sign in to Analyze
             </button>
          ) : limitRemaining > 0 ? (
            <button onClick={handleScan} disabled={loading || !inputText} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 h-fit self-end md:self-auto">
              {loading ? <Activity className="w-5 h-5 animate-spin" /> : "Analyze"} {!loading && <ChevronRight className="w-5 h-5" />}
            </button>
          ) : (
            <button onClick={() => changePage('pricing')} className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 h-fit self-end md:self-auto">
              <Sparkles className="w-5 h-5" /> Upgrade to Scan
            </button>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-1">
              <div className={`bg-white rounded-3xl p-8 border-t-4 shadow-xl h-full ${result.prediction === 'Safe' ? 'border-t-emerald-500' : 'border-t-rose-500'}`}>
                <div className={`inline-flex p-4 rounded-2xl mb-6 ${result.prediction === 'Safe' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {result.prediction === 'Safe' ? <ShieldCheck className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
                </div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Status</h3>
                <p className={`text-4xl font-black mb-8 ${result.prediction === 'Safe' ? 'text-emerald-600' : 'text-rose-600'}`}>{result.prediction.toUpperCase()}</p>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2"><span className="text-slate-500">Risk Score</span><span className="text-slate-900">{result.confidence}%</span></div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5"><div className={`h-2.5 rounded-full ${result.prediction === 'Safe' ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${result.confidence}%` }}></div></div>
                  </div>
                  <div className="flex justify-between text-sm font-bold"><span className="text-slate-500">Threat Risk Level</span><span className="text-slate-900">{result.risk_level}</span></div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 h-full">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                  <Activity className="w-6 h-6 text-indigo-600" />
                  <h3 className="text-xl font-extrabold text-slate-900">Intelligent Threat Diagnostics</h3>
                </div>
                <div className="space-y-4">
                  {(result.explanation || []).map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
                      <div className="mt-1">
                        {item.status === 'safe' ? <ShieldCheck className="w-6 h-6 text-emerald-500" /> : <AlertOctagon className="w-6 h-6 text-rose-500" />}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                        <p className="text-sm font-medium text-slate-600 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {globalUser && filteredHistory.length > 0 && !result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-16 w-full">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
            <Clock className="w-6 h-6 text-indigo-600"/>
            <h3 className="text-2xl font-black text-slate-900">Recent {scanType.toUpperCase()} Analysis Dashboard</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((scan, idx) => (<HistoryCard key={idx} scan={scan} />))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// ==========================================
// 6. MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState('login'); 
  const [scanType, setScanType] = useState('url');
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [globalUser, setGlobalUser] = useState(localStorage.getItem('shieldUserName') || null);
  const [urlLimit, setUrlLimit] = useState(10); 
  const [emailLimit, setEmailLimit] = useState(10); 
  const [scanHistory, setScanHistory] = useState([]);

  useEffect(() => {
    if (globalUser) {
      const today = new Date().toDateString(); 
      const savedDate = localStorage.getItem(`shieldDate_${globalUser}`);
      
      setScanHistory(JSON.parse(localStorage.getItem(`shieldHistory_${globalUser}`)) || []);

      if (savedDate !== today) {
        localStorage.setItem(`shieldUrlLimit_${globalUser}`, '10');
        localStorage.setItem(`shieldEmailLimit_${globalUser}`, '10');
        localStorage.setItem(`shieldDate_${globalUser}`, today);
        setUrlLimit(10);
        setEmailLimit(10);
      } else {
        // AUTO-CORRECT LOGIC: Agar purani 1000 wali limit browser me save reh gayi hai
        let currentUrlLimit = parseInt(localStorage.getItem(`shieldUrlLimit_${globalUser}`)) || 0;
        let currentEmailLimit = parseInt(localStorage.getItem(`shieldEmailLimit_${globalUser}`)) || 0;
        
        if (currentUrlLimit > 10) {
          currentUrlLimit = 10;
          localStorage.setItem(`shieldUrlLimit_${globalUser}`, '10');
        }
        if (currentEmailLimit > 10) {
          currentEmailLimit = 10;
          localStorage.setItem(`shieldEmailLimit_${globalUser}`, '10');
        }
        
        setUrlLimit(currentUrlLimit);
        setEmailLimit(currentEmailLimit);
      }
    }
  }, [globalUser]);

  const changePage = (page, type = 'url') => {
    if (page === 'auth') {
      setAuthMode(type); 
      setCurrentPage('auth');
    } else {
      setCurrentPage(page === 'scanner' ? `scanner_${type}` : page);
      if (page === 'scanner') setScanType(type);
    }
    setInputText('');
    setResult(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('shieldToken');
    localStorage.removeItem('shieldUserName');
    setGlobalUser(null);
    changePage('home');
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!inputText) return;
    
    const currentLimit = scanType === 'url' ? urlLimit : emailLimit;
    if (currentLimit <= 0) {
      alert(`Daily free limit reached for ${scanType.toUpperCase()}s. Please upgrade to the Pro plan.`);
      changePage('pricing');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post('https://hadijoiya-shieldsmart-api.hf.space/predict', { text: inputText, scan_type: scanType });
      const apiResult = response.data;
      setResult(apiResult);
      
      if (scanType === 'url') {
        const newLimit = urlLimit - 1;
        setUrlLimit(newLimit);
        localStorage.setItem(`shieldUrlLimit_${globalUser}`, newLimit);
      } else {
        const newLimit = emailLimit - 1;
        setEmailLimit(newLimit);
        localStorage.setItem(`shieldEmailLimit_${globalUser}`, newLimit);
      }

      const summaryText = apiResult.explanation && apiResult.explanation.length > 0 
          ? apiResult.explanation[apiResult.explanation.length - 1].text 
          : `The neural network verified the patterns as ${apiResult.prediction}.`;

      const newHistoryItem = {
        query: inputText,
        type: scanType.toUpperCase(),
        status: apiResult.prediction,
        confidence: apiResult.confidence,
        summary: summaryText,
        date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      const updatedHistory = [newHistoryItem, ...scanHistory].slice(0, 9); 
      setScanHistory(updatedHistory);
      localStorage.setItem(`shieldHistory_${globalUser}`, JSON.stringify(updatedHistory));

    } catch (err) {
      alert("Error connecting to backend API.");
    } finally {
      setLoading(false);
    }
  };

  const activeLimit = scanType === 'url' ? urlLimit : emailLimit;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col">
      <Navbar currentPage={currentPage} changePage={changePage} globalUser={globalUser} handleLogout={handleLogout} />
      
      <main className="flex-grow flex flex-col">
        {currentPage === 'home' && <HomePage changePage={changePage} />}
        {currentPage.startsWith('scanner') && <ScannerPage scanType={scanType} inputText={inputText} setInputText={setInputText} handleScan={handleScan} loading={loading} result={result} limitRemaining={activeLimit} changePage={changePage} globalUser={globalUser} scanHistory={scanHistory} />}
        {currentPage === 'pricing' && <PricingPage changePage={changePage} globalUser={globalUser} />}
        {currentPage === 'auth' && <AuthPage authMode={authMode} setGlobalUser={setGlobalUser} changePage={changePage} />}
        {currentPage === 'tips' && <SecurityTipsPage />}
        {currentPage === 'about' && <AboutPage />}
      </main>

      <Footer changePage={changePage} />
    </div>
  );
}