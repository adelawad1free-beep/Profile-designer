
import React, { useState, useEffect } from 'react';
import { DesignOutput, Language, GenerationStep } from '../types';
import { Loader2, CheckCircle2, Cpu, Palette, Layout, MousePointer2, Sparkles } from 'lucide-react';

interface GenerationCanvasProps {
  data: DesignOutput;
  lang: Language;
}

const GenerationCanvas: React.FC<GenerationCanvasProps> = ({ data, lang }) => {
  const [step, setStep] = useState<GenerationStep>('analyzing');
  const [visibleSections, setVisibleSections] = useState<number>(0);
  const isArabic = lang === Language.AR;

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1500));
      setStep('branding');
      await new Promise(r => setTimeout(r, 1500));
      setStep('structuring');
      await new Promise(r => setTimeout(r, 1500));
      setStep('building');
      
      for (let i = 1; i <= data.sections.length; i++) {
        await new Promise(r => setTimeout(r, 1200));
        setVisibleSections(i);
      }
      
      setStep('complete');
    };
    sequence();
  }, [data]);

  return (
    <div className="max-w-5xl mx-auto px-6 pb-32">
      {/* Dynamic Status Bar */}
      <div className="bg-slate-900 text-white p-6 rounded-[2rem] mb-12 shadow-2xl flex flex-wrap items-center justify-between gap-6 border border-white/10 sticky top-24 z-30 backdrop-blur-xl bg-slate-900/90">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-black">
            {step === 'complete' ? <CheckCircle2 className="w-6 h-6" /> : <Loader2 className="w-6 h-6 animate-spin" />}
          </div>
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">
              {isArabic ? 'حالة التوليد الذكي' : 'AI Generation Status'}
            </div>
            <div className="text-lg font-bold">
              {step === 'analyzing' && (isArabic ? 'تحليل النشاط والسياق الجغرافي...' : 'Analyzing activity & location...')}
              {step === 'branding' && (isArabic ? 'استنباط لوحة الألوان والخطوط...' : 'Extracting branding & typography...')}
              {step === 'structuring' && (isArabic ? 'رسم الخريطة العبقرية للموقع...' : 'Mapping site architecture...')}
              {step === 'building' && (isArabic ? `بناء الأقسام (${visibleSections}/${data.sections.length})` : `Building sections (${visibleSections}/${data.sections.length})`)}
              {step === 'complete' && (isArabic ? 'اكتمل بناء البروفايل بنجاح' : 'Corporate Profile Ready')}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <StatusChip active={step === 'analyzing'} icon={<Cpu className="w-3 h-3" />} />
          <StatusChip active={step === 'branding'} icon={<Palette className="w-3 h-3" />} />
          <StatusChip active={step === 'structuring'} icon={<Layout className="w-3 h-3" />} />
          <StatusChip active={step === 'building'} icon={<MousePointer2 className="w-3 h-3" />} />
        </div>
      </div>

      {/* The Build Canvas */}
      <div className="relative border-l-2 border-dashed border-gray-200 ml-4 pl-10 space-y-12">
        {data.sections.slice(0, visibleSections).map((section, idx) => (
          <div 
            key={idx} 
            className="relative group animate-in fade-in slide-in-from-top-10 duration-700"
          >
            {/* Connector Dot */}
            <div className="absolute -left-[3.15rem] top-8 w-6 h-6 rounded-full bg-white border-4 border-yellow-400 shadow-sm z-10" />
            
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 hover:border-yellow-200 transition-all hover:shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">
                    {section.role === 'header' && '🏛️'}
                    {section.role === 'about' && '📖'}
                    {section.role === 'services' && '🛠️'}
                    {section.role === 'contact' && '📞'}
                    {section.role === 'footer' && '🏁'}
                    {section.role === 'other' && '✨'}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{section.name}</h3>
                    <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest px-2 py-0.5 bg-yellow-50 rounded-md">
                      {section.role}
                    </span>
                  </div>
                </div>
                {idx === visibleSections - 1 && step !== 'complete' && (
                   <div className="flex items-center gap-2 text-yellow-500 font-medium text-sm animate-pulse">
                     <Sparkles className="w-4 h-4" />
                     {isArabic ? 'يتم البناء الآن...' : 'Building now...'}
                   </div>
                )}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                {section.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.keyElements.map((el, i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 p-4 rounded-2xl text-slate-700 border border-transparent hover:border-gray-200 transition-all">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    {el}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {step === 'complete' && (
          <div className="pt-10 text-center animate-bounce">
            <button className="bg-yellow-400 text-black px-10 py-4 rounded-full font-bold shadow-xl hover:bg-yellow-500 transition-all">
              {isArabic ? 'تصدير ملف البروفايل النهائي' : 'Export Final Profile'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const StatusChip: React.FC<{ active: boolean; icon: React.ReactNode }> = ({ active, icon }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${active ? 'bg-yellow-400 text-black scale-125 shadow-lg shadow-yellow-400/20' : 'bg-white/10 text-gray-500'}`}>
    {icon}
  </div>
);

export default GenerationCanvas;
