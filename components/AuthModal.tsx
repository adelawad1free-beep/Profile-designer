
import React, { useState } from 'react';
import { X, Mail, Lock, User as UserIcon, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { loginWithGoogle, loginWithEmail, registerWithEmail } from '../services/firebase';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isArabic = lang === Language.AR;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      onClose();
    } catch (err: any) {
      setError(isArabic ? 'خطأ في البريد أو كلمة السر' : 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setError(isArabic ? 'فشل تسجيل الدخول عبر جوجل' : 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 pt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isLogin 
                ? (isArabic ? 'مرحباً بعودتك' : 'Welcome Back') 
                : (isArabic ? 'إنشاء حساب جديد' : 'Create Account')}
            </h2>
            <p className="text-slate-500 text-sm">
              {isLogin 
                ? (isArabic ? 'سجل دخولك لمتابعة تصاميمك' : 'Sign in to continue your designs') 
                : (isArabic ? 'انضم إلى مجتمع المصممين الأذكياء' : 'Join the smart designers community')}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-2xl border border-red-100 text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <UserIcon className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} w-5 h-5 text-slate-400 group-focus-within:text-[#94a3ff] transition-colors`} />
                <input
                  type="text"
                  required
                  placeholder={isArabic ? 'الاسم الكامل' : 'Full Name'}
                  className={`w-full ${isArabic ? 'pr-12' : 'pl-12'} p-4 bg-gray-50 border-2 border-transparent focus:border-[#94a3ff] focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="relative group">
              <Mail className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} w-5 h-5 text-slate-400 group-focus-within:text-[#94a3ff] transition-colors`} />
              <input
                type="email"
                required
                placeholder={isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                className={`w-full ${isArabic ? 'pr-12' : 'pl-12'} p-4 bg-gray-50 border-2 border-transparent focus:border-[#94a3ff] focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative group">
              <Lock className={`absolute top-4 ${isArabic ? 'right-4' : 'left-4'} w-5 h-5 text-slate-400 group-focus-within:text-[#94a3ff] transition-colors`} />
              <input
                type="password"
                required
                placeholder={isArabic ? 'كلمة المرور' : 'Password'}
                className={`w-full ${isArabic ? 'pr-12' : 'pl-12'} p-4 bg-gray-50 border-2 border-transparent focus:border-[#94a3ff] focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {isLogin ? (isArabic ? 'دخول' : 'Sign In') : (isArabic ? 'تسجيل' : 'Sign Up')}
                  {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </>
              )}
            </button>
          </form>

          <div className="relative my-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <span className="relative bg-white px-4 text-xs font-bold text-gray-300 uppercase tracking-widest">
              {isArabic ? 'أو عبر' : 'Or via'}
            </span>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-4 border-2 border-gray-100 rounded-2xl font-bold text-slate-700 hover:bg-gray-50 transition-all active:scale-95 mb-6"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            {isArabic ? 'المتابعة عبر جوجل' : 'Continue with Google'}
          </button>

          <div className="text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-[#94a3ff] hover:underline"
            >
              {isLogin 
                ? (isArabic ? 'ليس لديك حساب؟ سجل الآن' : "Don't have an account? Sign up") 
                : (isArabic ? 'لديك حساب بالفعل؟ سجل دخولك' : 'Already have an account? Sign in')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
