
import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AssistantForm from './components/AssistantForm';
import GenerationCanvas from './components/GenerationCanvas';
import AuthModal from './components/AuthModal';
import { Language, DesignOutput } from './types';
import { Layout, ArrowUp } from 'lucide-react';
import { auth, onAuthStateChanged, User } from './services/firebase';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.AR);
  const [designResult, setDesignResult] = useState<DesignOutput | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const isArabic = lang === Language.AR;

  useEffect(() => {
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : 'en';
  }, [lang, isArabic]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleResult = (result: DesignOutput) => {
    setDesignResult(result);
    setIsGenerating(true);
    // Scroll to canvas after a brief delay for animation
    setTimeout(() => {
      canvasRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isArabic ? 'font-tajawal' : 'font-inter'}`}>
      <div className="bg-[#94a3ff] min-h-[65vh] pb-24 rounded-b-[5rem] relative overflow-hidden shadow-2xl">
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/20 rounded-full blur-3xl -z-10"></div>
        
        <Navbar 
          lang={lang} 
          onLanguageChange={setLang} 
          user={user} 
          onAuthClick={() => setIsAuthOpen(true)} 
        />
        
        <Hero lang={lang} />
      </div>

      <main className="relative pb-16 bg-gray-50 min-h-screen">
        <AssistantForm lang={lang} onResult={handleResult} />
        
        <div ref={canvasRef} className="pt-10">
          {designResult ? (
            <GenerationCanvas data={designResult} lang={lang} />
          ) : (
            <div className="max-w-6xl mx-auto px-6 py-12 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white shadow-xl text-[#94a3ff] mb-6 border border-gray-100">
                <Layout className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                {isArabic 
                  ? 'منصة بناء المواقع الذكية' 
                  : 'Smart Site Builder Platform'}
              </h3>
              <p className="text-slate-400 max-w-lg mx-auto text-base leading-relaxed">
                {isArabic
                  ? 'أدخل اسم شركتك ونشاطها، وسيقوم خبيرنا العبقري برسم خريطة بناء متكاملة لبروفايلك المهني.'
                  : 'Enter your company name and activity, and our genius expert will map out a complete build for your professional profile.'}
              </p>
            </div>
          )}
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        lang={lang} 
      />

      {isGenerating && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl hover:bg-slate-800 transition-all z-50 animate-bounce"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}

      <footer className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-[#94a3ff] p-2 rounded-xl">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight">BeeDesign AI</span>
            </div>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              {isArabic 
                ? 'دمج 50 عاماً من الخبرة في تصميم هوية الشركات مع قوة الذكاء الاصطناعي الفائق.'
                : 'Integrating 50 years of corporate identity design expertise with the power of Super AI.'}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">{isArabic ? 'الخبير' : 'The Expert'}</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>{isArabic ? 'تحليل الأنشطة' : 'Activity Analysis'}</li>
              <li>{isArabic ? 'سياق المكان' : 'Location Context'}</li>
              <li>{isArabic ? 'الهوية البصرية' : 'Visual Identity'}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">{isArabic ? 'تواصل' : 'Connect'}</h4>
            <div className="flex gap-3">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#94a3ff] hover:text-white transition-all cursor-pointer">In</div>
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[#94a3ff] hover:text-white transition-all cursor-pointer">Tw</div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 pt-12 mt-12 border-t border-white/5 text-center text-gray-500 text-sm">
          © 2025 BeeDesign AI. {isArabic ? 'بني بحب بواسطة الخبير الذكي' : 'Built with love by the Smart Expert'}.
        </div>
      </footer>
    </div>
  );
};

export default App;
