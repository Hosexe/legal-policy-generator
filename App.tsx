import React, { useState } from 'react';
import { 
  Shield, FileText, Cookie, RefreshCcw, AlertTriangle, Cpu, MousePointerClick, 
  ChevronRight, ArrowLeft, Download, Copy, Check, Loader2 
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Language, PolicyType, FormData, POLICY_OPTIONS, GeneratedPolicy } from './types';
import { generatePolicyContent } from './services/geminiService';
import { StepIndicator } from './components/StepIndicator';
import { LanguageSwitcher } from './components/LanguageSwitcher';

// UI Text Dictionary for Interface Translation
const UI_TEXT = {
  [Language.ENGLISH]: {
    title: 'Generate Legal Policies',
    subtitle: 'Where will your policy be used? Click to select.',
    step1: 'Select Policy',
    step2: 'Enter Details',
    step3: 'Review',
    generateBtn: 'Generate Policy',
    back: 'Back',
    website: 'Website',
    app: 'App',
    both: 'Both',
    companyName: 'Company / Site Name',
    websiteUrl: 'Website URL',
    email: 'Contact Email',
    country: 'Country',
    address: 'Physical Address',
    date: 'Effective Date',
    generating: 'Generating your document with AI...',
    complete: 'Document Ready',
    copy: 'Copy Text',
    copied: 'Copied!',
    startOver: 'Create Another Policy'
  },
  [Language.FRENCH]: {
    title: 'Générer des Politiques Légales',
    subtitle: 'Où votre politique sera-t-elle utilisée ? Cliquez pour sélectionner.',
    step1: 'Choisir la Politique',
    step2: 'Entrer les Détails',
    step3: 'Revoir',
    generateBtn: 'Générer la Politique',
    back: 'Retour',
    website: 'Site Web',
    app: 'Application',
    both: 'Les Deux',
    companyName: 'Nom de l\'entreprise / Site',
    websiteUrl: 'URL du Site Web',
    email: 'Email de Contact',
    country: 'Pays',
    address: 'Adresse Physique',
    date: 'Date d\'entrée en vigueur',
    generating: 'Génération de votre document par IA...',
    complete: 'Document Prêt',
    copy: 'Copier le texte',
    copied: 'Copié !',
    startOver: 'Créer une autre politique'
  },
  [Language.RUSSIAN]: {
    title: 'Генератор Юридических Документов',
    subtitle: 'Где будет использоваться ваша политика? Нажмите для выбора.',
    step1: 'Выбор политики',
    step2: 'Введите данные',
    step3: 'Просмотр',
    generateBtn: 'Создать документ',
    back: 'Назад',
    website: 'Веб-сайт',
    app: 'Приложение',
    both: 'Оба варианта',
    companyName: 'Название компании / сайта',
    websiteUrl: 'URL веб-сайта',
    email: 'Контактный Email',
    country: 'Страна',
    address: 'Физический адрес',
    date: 'Дата вступления в силу',
    generating: 'Генерация документа с помощью ИИ...',
    complete: 'Документ готов',
    copy: 'Копировать',
    copied: 'Скопировано!',
    startOver: 'Создать еще'
  }
};

export default function App() {
  const [step, setStep] = useState(1);
  const [lang, setLang] = useState<Language>(Language.ENGLISH);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    websiteUrl: '',
    contactEmail: '',
    country: '',
    address: '',
    effectiveDate: new Date().toISOString().split('T')[0],
    platformType: 'Website',
  });

  const t = UI_TEXT[lang];

  const handlePolicySelect = (id: PolicyType) => {
    setSelectedPolicy(id);
    setStep(2);
  };

  const handleGenerate = async () => {
    if (!selectedPolicy) return;
    setIsGenerating(true);
    try {
      const content = await generatePolicyContent(selectedPolicy, formData, lang);
      setGeneratedContent(content);
      setStep(3);
    } catch (error) {
      alert("Failed to generate content. Check API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStep(1);
    setGeneratedContent('');
    setSelectedPolicy(null);
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ElementType> = {
      Shield, FileText, Cookie, RefreshCcw, AlertTriangle, Cpu, MousePointerClick
    };
    const Icon = icons[iconName] || FileText;
    return <Icon className="w-8 h-8 mb-3 text-green-400" />;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{t.title}</h1>
            <p className="text-gray-500 mt-2">Professional Blogspot & Website Tools</p>
          </div>
          <LanguageSwitcher selectedLang={lang} onSelect={setLang} />
        </div>

        {/* Main Card */}
        <div className="bg-[#1a1f2e] rounded-2xl shadow-xl overflow-hidden border border-gray-800">
          
          {/* Progress Bar inside Card */}
          <div className="pt-8 pb-4">
             <StepIndicator currentStep={step} totalSteps={3} />
          </div>

          <div className="p-8">
            
            {/* STEP 1: Select Policy */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-semibold text-white mb-2 text-center">{t.step1}</h2>
                <p className="text-gray-400 text-center mb-8">{t.subtitle}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {POLICY_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handlePolicySelect(option.id)}
                      className="flex flex-col items-center justify-center p-6 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-green-500 rounded-xl transition-all duration-200 group text-center h-40"
                    >
                      <div className="group-hover:scale-110 transition-transform duration-200">
                        {getIcon(option.icon)}
                      </div>
                      <span className="font-medium text-gray-200 group-hover:text-white">
                        {option.label[lang] || option.label.en}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Input Details */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-2xl mx-auto">
                <div className="flex items-center mb-6">
                  <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-1" /> {t.back}
                  </button>
                  <h2 className="ml-auto text-xl font-semibold text-white">
                    {selectedPolicy}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">{t.companyName}</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        placeholder="My Awesome Blog"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">{t.websiteUrl}</label>
                      <input
                        type="url"
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        placeholder="https://mysite.blogspot.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">{t.email}</label>
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        placeholder="contact@mysite.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">{t.country}</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                        placeholder="France, USA, Russia..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">{t.address}</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      placeholder="123 Street Name, City, Zip"
                    />
                  </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">{t.date}</label>
                      <input
                        type="date"
                        value={formData.effectiveDate}
                        onChange={(e) => setFormData({...formData, effectiveDate: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Platform</label>
                       <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
                          {['Website', 'App', 'Both'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setFormData({...formData, platformType: type as any})}
                              className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${
                                formData.platformType === type 
                                  ? 'bg-gray-600 text-white' 
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                                {type === 'Website' ? t.website : type === 'App' ? t.app : t.both}
                            </button>
                          ))}
                       </div>
                    </div>
                   </div>

                  <div className="pt-6">
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex items-center justify-center text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-6 w-6" />
                          {t.generating}
                        </>
                      ) : (
                        <>
                          {t.generateBtn} <ChevronRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Preview & Download */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 h-full flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                       <Check className="text-green-500 mr-2" /> {t.complete}
                    </h2>
                    <div className="flex space-x-3">
                       <button 
                        onClick={handleCopy}
                        className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                       >
                         {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                         {copied ? t.copied : t.copy}
                       </button>
                       <button 
                        onClick={reset}
                        className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-medium"
                       >
                         {t.startOver}
                       </button>
                    </div>
                 </div>

                 {/* Document Preview Area */}
                 <div className="bg-white rounded-lg p-8 shadow-inner overflow-y-auto max-h-[600px] border-4 border-gray-700">
                    <article className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800">
                      <ReactMarkdown>{generatedContent}</ReactMarkdown>
                    </article>
                 </div>
              </div>
            )}

          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
           © {new Date().getFullYear()} Pro Policy Generator. Not legal advice. Consult a lawyer for specific needs.
        </div>

      </div>
    </div>
  );
}