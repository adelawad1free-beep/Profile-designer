
import React from 'react';
import { Layout, Globe, ChevronDown, LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';
import { Language } from '../types';
import { logout, User } from '../services/firebase';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  user: User | null;
  onAuthClick: () => void;
}

const ADMIN_EMAIL = 'adelawad1free@gmail.com';

const Navbar: React.FC<NavbarProps> = ({ lang, onLanguageChange, user, onAuthClick }) => {
  const isArabic = lang === Language.AR;
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-transparent pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm">
        <div className="bg-yellow-400 p-1.5 rounded-lg">
          <Layout className="w-5 h-5 text-black" />
        </div>
        <span className="font-bold text-lg tracking-tight">BeeDesign AI</span>
      </div>

      <div className="hidden md:flex items-center gap-1 pointer-events-auto bg-white/80 backdrop-blur-md px-2 py-1.5 rounded-full shadow-sm">
        <NavItem label={isArabic ? 'الرئيسية' : 'Home'} />
        <NavItem label={isArabic ? 'الخدمات' : 'Services'} />
        {isAdmin && (
          <div className="flex items-center gap-1 px-3 py-1 text-indigo-600 font-bold text-sm bg-indigo-50 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>{isArabic ? 'لوحة المسؤول' : 'Admin'}</span>
          </div>
        )}
        <div className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-black cursor-pointer text-sm">
          <span>{isArabic ? 'المزيد' : 'More'}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-center gap-3 pointer-events-auto">
        <button 
          onClick={() => onLanguageChange(isArabic ? Language.EN : Language.AR)}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors text-sm font-medium"
        >
          <Globe className="w-4 h-4" />
          {isArabic ? 'English' : 'العربية'}
        </button>

        {user ? (
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md pl-1 pr-4 py-1 rounded-full shadow-sm border border-gray-100 group">
            <div className="relative">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"><UserIcon className="w-4 h-4 text-slate-500" /></div>
              )}
            </div>
            <div className={`flex flex-col ${isArabic ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{isArabic ? 'مرحباً' : 'Welcome'}</span>
              <span className="text-xs font-bold text-slate-900 truncate max-w-[80px]">{user.displayName?.split(' ')[0] || user.email?.split('@')[0]}</span>
            </div>
            <button 
              onClick={() => logout()}
              className="ml-2 p-1.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-400"
              title={isArabic ? 'تسجيل الخروج' : 'Logout'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={onAuthClick}
            className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"
          >
            <UserIcon className="w-4 h-4" />
            {isArabic ? 'تسجيل الدخول' : 'Login'}
          </button>
        )}
      </div>
    </nav>
  );
};

const NavItem: React.FC<{ label: string }> = ({ label }) => (
  <button className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-black hover:bg-white rounded-full transition-all">
    {label}
  </button>
);

export default Navbar;
