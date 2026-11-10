import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language, TranslationKey, t as translate, tr as trHelper, formatDigits as formatDigitsHelper } from '@/lib/i18n/translations';

export const LANGUAGE_STORAGE_KEY = 'pori_language';

export interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  tr: (bn: string, en: string) => string;
  formatDigits: (val: string | number) => string;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: 'bn',
      setLanguage: (language: Language) => set({ language }),
      toggleLanguage: () => {
        const next: Language = get().language === 'bn' ? 'en' : 'bn';
        set({ language: next });
      },
      t: (key: TranslationKey) => translate(key, get().language),
      tr: (bn: string, en: string) => trHelper(bn, en, get().language),
      formatDigits: (val: string | number) => formatDigitsHelper(val, get().language),
    }),
    {
      name: LANGUAGE_STORAGE_KEY,
    },
  ),
);
