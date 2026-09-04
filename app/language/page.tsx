'use client';
import { useRouter } from 'next/navigation';

import { useAppContext } from '@/components/providers/AppProvider';

export default function LanguageSelection() {
  const router = useRouter();
  const { setLanguage } = useAppContext();

  const handleSelect = (lang: string) => {
    setLanguage(lang);
    router.push('/select-role');
  };

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Select Your Preferred Language</h2>
        <p className="text-center text-gray-500 mb-8 font-medium">உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className="flex flex-col items-center justify-center p-6 border-2 border-gray-100 rounded-xl hover:border-green-500 hover:bg-green-50 hover:shadow-md transition-all group"
            >
              <span className="text-2xl font-bold text-gray-800 group-hover:text-green-700">{lang.native}</span>
              <span className="text-sm text-gray-500 group-hover:text-green-600 mt-2">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
