
import React from 'react';
import { DesignOutput, Language } from '../types';
import { CheckCircle2, Copy, Layout as LayoutIcon, Type as TypeIcon } from 'lucide-react';

interface ResultDisplayProps {
  data: DesignOutput;
  lang: Language;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, lang }) => {
  const isArabic = lang === Language.AR;

  return (
    <div className="max-w-6xl mx-auto px-6 mb-32 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Design Overview */}
        <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-3xl font-bold text-slate-800">{data.title}</h3>
            <span className="bg-purple-100 text-purple-600 px-4 py-1.5 rounded-full text-sm font-bold">
              {data.layoutStyle}
            </span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            {data.description}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                 <LayoutIcon className="w-6 h-6" />
               </div>
               <div>
                 <div className="text-sm text-gray-500">{isArabic ? 'نمط الخطوط' : 'Typography'}</div>
                 <div className="font-bold">{data.typography.headingFont} / {data.typography.bodyFont}</div>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
                 <TypeIcon className="w-6 h-6" />
               </div>
               <div>
                 <div className="text-sm text-gray-500">{isArabic ? 'إجمالي الأقسام' : 'Total Sections'}</div>
                 <div className="font-bold">{data.sections.length} {isArabic ? 'أقسام مقترحة' : 'Suggested Sections'}</div>
               </div>
            </div>
          </div>
        </div>

        {/* Color Palette Panel */}
        <div className="w-full md:w-80 bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white">
          <h4 className="text-xl font-bold mb-8 flex items-center gap-2">
            <Copy className="w-5 h-5 text-gray-400" />
            {isArabic ? 'لوحة الألوان' : 'Color Palette'}
          </h4>
          <div className="space-y-6">
            <ColorItem label={isArabic ? 'الأساسي' : 'Primary'} hex={data.colors.primary} />
            <ColorItem label={isArabic ? 'الثانوي' : 'Secondary'} hex={data.colors.secondary} />
            <ColorItem label={isArabic ? 'التمييز' : 'Accent'} hex={data.colors.accent} />
            <ColorItem label={isArabic ? 'الخلفية' : 'Background'} hex={data.colors.background} />
          </div>
          
          <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-sm font-medium transition-all">
            {isArabic ? 'نسخ كافة الرموز' : 'Copy All Hex Codes'}
          </button>
        </div>
      </div>

      {/* Sections Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.sections.map((section, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-lg transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                0{idx + 1}
              </div>
              <h5 className="font-bold text-lg text-slate-800">{section.name}</h5>
            </div>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              {section.description}
            </p>
            <div className="space-y-2">
              {section.keyElements.map((el, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {el}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ColorItem: React.FC<{ label: string, hex: string }> = ({ label, hex }) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="font-mono text-sm uppercase">{hex}</div>
    </div>
    <div className="w-10 h-10 rounded-xl shadow-lg border border-white/10" style={{ backgroundColor: hex }}></div>
  </div>
);

export default ResultDisplay;
