import { Globe, User } from 'lucide-react';
import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <h1 className="text-2xl font-bold text-green-800">Uzhavan Bazaar</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
              <Globe className="h-4 w-4 mr-1 text-green-600" />
              <span>EN / TA</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 cursor-pointer hover:bg-green-200 transition-colors">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
