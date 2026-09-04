'use client';
import React, { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';

export default function FloatingMic() {
  const { language } = useAppContext();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Simulation of speech recognition since browser API can be flaky without HTTPS or right permissions in Vercel.
  // In a real app we'd use (window as any).SpeechRecognition or webkitSpeechRecognition
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isListening) {
      setTranscript('Listening...');
      timeout = setTimeout(() => {
        const phrases = {
          en: '50 kg Tomato at 30 rupees',
          ta: '50 கிலோ தக்காளி 30 ரூபாய்',
          hi: '50 किलो टमाटर 30 रुपये',
          te: '50 కిలోల టమోటా 30 రూపాయలు',
          kn: '50 ಕೆಜಿ ಟೊಮೆಟೊ 30 ರೂಪಾಯಿ',
          ml: '50 കിലോ തക്കാളി 30 രൂപയ്ക്ക്'
        };
        const text = phrases[language as keyof typeof phrases] || phrases['en'];
        setTranscript(text);
        
        // Dispatch custom event for AddListingModal to catch
        window.dispatchEvent(new CustomEvent('voice-command', { detail: text }));
        
        setTimeout(() => {
          setIsListening(false);
          setTranscript('');
        }, 2000);
      }, 2500); // simulate 2.5s of talking
    }
    return () => clearTimeout(timeout);
  }, [isListening, language]);

  return (
    <>
      <button 
        onClick={() => setIsListening(!isListening)}
        className={`fixed bottom-16 right-6 z-[60] w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-green-600 hover:bg-green-700'
        } text-white`}
      >
        {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </button>

      {isListening && transcript && (
        <div className="fixed bottom-32 right-6 z-[60] bg-white text-gray-800 p-3 rounded-xl shadow-xl border border-gray-100 max-w-[200px] text-sm animate-fade-in-up">
          {transcript}
        </div>
      )}
    </>
  );
}
