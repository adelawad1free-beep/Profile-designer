
import React, { border } from 'react';
import { Play, Sparkles, Wand2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ lang }) => {
  const isArabic = lang === Language.AR;

  return (
    <section className={`relative pt-32 pb-32 overflow-hidden ${isArabic ? 'text-right' : 'text-left'}`}>
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full text-xs font-bold mb-6 text-white animate-pulse uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            {isArabic ? 'خبرة 50 عاماً في متناول يدك' : '50 Years of Expertise at Your Fingertips'}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
            {isArabic ? (
              <>
                ابنِ <span className="text-slate-900">بروفايل</span> <br/>بلمسة عالمية
              </>
            ) : (
              <>
                Build your <br/><span className="text-slate-900">Profile</span> Globally
              </>
            )}
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
            {isArabic 
              ? 'مساعدك الشخصي المحترف في تصميم الهوية البصرية. نفهم نشاطك، نحلل مكانك، ونرسم لك طريق النجاح بجمال لا يقاوم.'
              : 'Your professional personal assistant in visual identity design. We understand your activity, analyze your location, and map your success.'}
          </p>
          
          <div className={`flex flex-wrap items-center gap-4 ${isArabic ? 'justify-end' : 'justify-start'}`}>
            <button className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1">
              <Wand2 className="w-5 h-5" />
              {isArabic ? 'استشر الخبير الآن' : 'Consult the Expert Now'}
            </button>
            <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all shadow-xl hover:-translate-y-1">
              <Play className="w-5 h-5 fill-current" />
              {isArabic ? 'نماذج أعمالنا' : 'Our Portfolio'}
            </button>
          </div>
        </div>

        <div className="flex-1 relative hidden lg:block">
          <div className="relative z-10 w-full max-w-md mx-auto">
             <img 
               src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800" 
               alt="Professional Design Office" 
               className="rounded-[3rem] shadow-2xl animate-float border-[10px] border-white/10 h-[500px] object-cover w-full"
             />
             
             {/* Floating Info Cards */}
             <div className={`absolute -bottom-8 ${isArabic ? '-left-8' : '-right-8'} glass-card p-6 rounded-3xl shadow-2xl w-48 animate-bounce delay-700`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-1 bg-yellow-400 rounded-full"></div>
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                </div>
                <div className="text-xs text-gray-500 font-bold mb-1">{isArabic ? 'دقة التحليل' : 'Analysis Depth'}</div>
                <div className="text-2xl font-black">99.9%</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
