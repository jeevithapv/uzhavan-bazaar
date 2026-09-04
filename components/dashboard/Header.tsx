'use client';

import React, { useState } from 'react';
import { Globe, User, Bell } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';
import ProfileDrawer from '@/components/profile/ProfileDrawer';

export default function Header() {
  const { language, setLanguage } = useAppContext();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'ml', label: 'മലയാളം' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'हिन्दी' }
  ];

  const currentLangLabel = languages.find(l => l.code === language)?.label || 'EN';

  return (
    <>
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <h1 className="text-2xl font-bold text-green-800">Agrimelan</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              
              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => { setIsLangOpen(!isLangOpen); setIsNotifOpen(false); }}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600 transition-colors p-2 rounded-lg hover:bg-green-50"
                >
                  <Globe className="h-4 w-4 mr-1 text-green-600" />
                  <span>{currentLangLabel}</span>
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                        className={`block w-full text-left px-4 py-2 text-sm ${language === lang.code ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => { setIsNotifOpen(!isNotifOpen); setIsLangOpen(false); }}
                  className="relative p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-3 border-b border-gray-50 font-bold text-gray-700 bg-gray-50">Notifications</div>
                    <div className="max-h-64 overflow-y-auto">
                      <div className="p-3 border-b border-gray-50 hover:bg-green-50 cursor-pointer">
                        <p className="text-sm text-gray-800"><strong>Ramesh (Buyer)</strong> viewed your Tomatoes listing.</p>
                        <p className="text-xs text-gray-400 mt-1">2 mins ago</p>
                      </div>
                      <div className="p-3 border-b border-gray-50 hover:bg-green-50 cursor-pointer">
                        <p className="text-sm text-gray-800">Mandi Rate Alert: Onion prices up by ₹2/kg.</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Drawer Toggle */}
              <button 
                onClick={() => setIsProfileOpen(true)}
                className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 hover:bg-green-200 transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
