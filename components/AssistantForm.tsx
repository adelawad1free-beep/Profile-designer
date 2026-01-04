
import React, { useState } from 'react';
import { Send, Loader2, Palette, Sparkles, MapPin, Briefcase } from 'lucide-react';
import { generateDesignAssistance } from '../services/geminiService';
import { DesignOutput, Language } from '../types';

interface AssistantFormProps {
  lang: Language;
  onResult: (result: DesignOutput) => void;
}

const AssistantForm: React.FC<AssistantFormProps> = ({ lang, onResult }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const isArabic = lang === Language.AR;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const result = await generateDesignAssistance(input, lang);
      onResult(result);
    } catch (error) {
      alert(isArabic ? 'حدث خطأ ما، يرجى المحاولة مرة أخرى' : 'Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-10 -mt-28 mb-8 relative z-20">
      <div className="bg-white/80 backdrop-blur-3xl p-6 md:p-10 rounded-[3rem] shadow-[0_30px_80px_-15px_rgba(148,163,255,0.25)] border border-white/50">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 text-center md:text-right">
          <div className={`${isArabic ? 'md:text-right' : 'md:text-left'}`}>
            <div className="inline-flex items-center gap-2 bg-[#94a3ff]/20 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-[#94a3ff]/30">
              <Sparkles className="w-3.5 h-3.5" />
              {isArabic ? 'ذكاء اصطناعي فائق' : 'Super AI Powered'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {isArabic ? 'خبير التصميم برتبة مستشار' : 'Design Consultant Expert'}
            </h2>
          </div>
          <p className="text-slate-500 text-sm font-medium opacity-70 max-w-md">
            {isArabic 
              ? 'أكثر من 50 عاماً من الخبرة في بناء الهوية البصرية وبروفايلات الشركات الكبرى في خدمتك الآن.' 
              : 'Over 50 years of experience in visual identity building at your service now.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="relative mb-8">
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-white/90 border-2 border-[#94a3ff]/10 focus-within:border-[#94a3ff] focus-within:bg-white transition-all duration-500 shadow-sm">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isArabic ? 'اكتب اسم مشروعك أو تخصصك هنا بالتفصيل ليقوم الخبير بتحليله...' : 'Type your project name or niche in detail for analysis...'}
              className={`w-full p-8 pt-10 h-40 bg-transparent text-slate-800 ${isArabic ? 'text-right' : 'text-left'} placeholder-slate-300 outline-none transition-all resize-none text-xl md:text-2xl font-medium leading-relaxed`}
            />
            <button
              type="submit"
              disabled={loading}
              className={`absolute bottom-6 ${isArabic ? 'left-6' : 'right-6'} bg-slate-900 text-white p-5 rounded-[1.8rem] hover:bg-indigo-600 hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center shadow-xl active:scale-95 group`}
            >
              {loading ? (
                <Loader2 className="w-8 h-8 animate-spin" />
              ) : (
                <Send className={`w-8 h-8 transition-transform group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              )}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <PromptChip icon={<Briefcase className="w-4 h-4" />} label={isArabic ? 'شركة مقاولات مستدامة' : 'Sustainable Construction'} onClick={() => setInput(isArabic ? 'شركة مقاولات متخصصة في البناء المستدام والمدن الخضراء' : 'Construction company specializing in sustainable building and green cities')} />
          <PromptChip icon={<MapPin className="w-4 h-4" />} label={isArabic ? 'مطعم مأكولات بحرية' : 'Seafood Restaurant'} onClick={() => setInput(isArabic ? 'مطعم مأكولات بحرية فاخر على شاطئ البحر الأحمر' : 'Luxury seafood restaurant on the Red Sea coast')} />
          <PromptChip icon={<Palette className="w-4 h-4" />} label={isArabic ? 'هوية تقنية فخمة' : 'Luxury Tech Identity'} onClick={() => setInput(isArabic ? 'بروفايل شركة تقنية ناشئة بلمسة عصرية وفخمة' : 'Startup tech company profile with a modern and luxurious touch')} />
          <PromptChip icon={<Sparkles className="w-4 h-4" />} label={isArabic ? 'مكتب استشارات قانونية' : 'Legal Consultant'} onClick={() => setInput(isArabic ? 'تصميم هوية كاملة لمكتب محاماة واستشارات قانونية دولي' : 'Complete identity design for an international law and legal consultancy firm')} />
        </div>
      </div>
    </div>
  );
};

const PromptChip: React.FC<{ icon: React.ReactNode, label: string, onClick: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-3 px-6 py-4 bg-white border border-[#94a3ff]/5 rounded-2xl text-sm font-bold text-slate-600 hover:bg-[#94a3ff] hover:text-white hover:border-[#94a3ff] transition-all active:scale-95 shadow-sm hover:shadow-lg group"
  >
    <span className="opacity-50 group-hover:opacity-100 transition-opacity">{icon}</span>
    <span className="truncate">{label}</span>
  </button>
);

export default AssistantForm;
