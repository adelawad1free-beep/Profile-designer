
export interface DesignOutput {
  title: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
  };
  sections: Array<{
    name: string;
    description: string;
    keyElements: string[];
    role: 'header' | 'about' | 'services' | 'contact' | 'footer' | 'other';
  }>;
  layoutStyle: 'Modern' | 'Minimal' | 'Bold' | 'Corporate';
}

export enum Language {
  AR = 'AR',
  EN = 'EN'
}

export type GenerationStep = 'analyzing' | 'branding' | 'structuring' | 'building' | 'complete';
