export enum Language {
  ENGLISH = 'en',
  FRENCH = 'fr',
  RUSSIAN = 'ru',
}

export enum PolicyType {
  PRIVACY_POLICY = 'Privacy Policy',
  TERMS_CONDITIONS = 'Terms and Conditions',
  COOKIE_CONSENT = 'Cookie Consent Banner Text',
  COOKIE_POLICY = 'Cookies Policy',
  DISCLAIMER = 'Disclaimer',
  EULA = 'EULA (End-User License Agreement)',
  RETURN_REFUND = 'Return & Refund Policy',
}

export interface FormData {
  companyName: string;
  websiteUrl: string;
  contactEmail: string;
  country: string;
  address: string;
  effectiveDate: string;
  platformType: 'Website' | 'Mobile App' | 'Both';
}

export interface GeneratedPolicy {
  title: string;
  content: string; // Markdown or HTML string
  language: Language;
}

export const SUPPORTED_LANGUAGES = [
  { code: Language.ENGLISH, label: 'English', flag: '🇬🇧' },
  { code: Language.FRENCH, label: 'Français', flag: '🇫🇷' },
  { code: Language.RUSSIAN, label: 'Русский', flag: '🇷🇺' },
];

export const POLICY_OPTIONS = [
  { id: PolicyType.PRIVACY_POLICY, icon: 'Shield', label: { en: 'Privacy Policy', fr: 'Politique de Confidentialité', ru: 'Политика конфиденциальности' } },
  { id: PolicyType.TERMS_CONDITIONS, icon: 'FileText', label: { en: 'Terms & Conditions', fr: 'Termes et Conditions', ru: 'Условия использования' } },
  { id: PolicyType.COOKIE_POLICY, icon: 'Cookie', label: { en: 'Cookies Policy', fr: 'Politique des Cookies', ru: 'Политика использования файлов cookie' } },
  { id: PolicyType.RETURN_REFUND, icon: 'RefreshCcw', label: { en: 'Return Policy', fr: 'Politique de Retour', ru: 'Политика возврата' } },
  { id: PolicyType.DISCLAIMER, icon: 'AlertTriangle', label: { en: 'Disclaimer', fr: 'Avis de non-responsabilité', ru: 'Отказ от ответственности' } },
  { id: PolicyType.EULA, icon: 'Cpu', label: { en: 'EULA', fr: 'CLUF (EULA)', ru: 'Лицензионное соглашение (EULA)' } },
  { id: PolicyType.COOKIE_CONSENT, icon: 'MousePointerClick', label: { en: 'Consent Banner', fr: 'Bannière de Consentement', ru: 'Баннер согласия' } },
];