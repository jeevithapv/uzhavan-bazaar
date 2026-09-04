'use client';
import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';
import CameraModal from './CameraModal';

export default function AICameraBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
        <div className="absolute top-0 right-0 opacity-10">
          <Camera className="h-48 w-48 -mr-8 -mt-8" />
        </div>
        <div className="z-10 mb-4 md:mb-0 max-w-2xl">
          <h2 className="text-2xl font-bold mb-2 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-green-200" />
            AI Camera Grading
          </h2>
          <p className="text-green-50 text-lg">
            Take a picture of your produce to get an instant quality grade and recommended market price.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="z-10 bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-full shadow transition-all hover:scale-105 flex items-center whitespace-nowrap"
        >
          <Camera className="h-5 w-5 mr-2" />
          Capture Produce
        </button>
      </div>

      {isModalOpen && <CameraModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
