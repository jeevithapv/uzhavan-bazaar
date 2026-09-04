'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, MessageSquare, X, Send } from 'lucide-react';
import { useAppContext } from '@/components/providers/AppProvider';
import { usePathname } from 'next/navigation';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isAudio?: boolean;
}

export default function AIVoiceAssistant() {
  const { language, t } = useAppContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Context-aware greeting on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      let greeting = "Hello! I am your Uzhavan Assistant. How can I help you today?";
      if (pathname.includes('/register')) {
        greeting = "Welcome to Registration. You can say your Name, Phone Number, and City, and I will fill them out for you.";
      } else if (pathname === '/dashboard') {
        greeting = "Welcome to your Dashboard! Ask me about Mandi rates, crop tips, or navigating the app.";
      }
      
      setMessages([{ id: Date.now().toString(), sender: 'assistant', text: greeting }]);
      speakText(greeting);
    }
  }, [isOpen, pathname]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Determine language code for TTS
      let langCode = 'en-US';
      if (language === 'ta') langCode = 'ta-IN';
      else if (language === 'hi') langCode = 'hi-IN';
      else if (language === 'te') langCode = 'te-IN';
      else if (language === 'ml') langCode = 'ml-IN';
      else if (language === 'kn') langCode = 'kn-IN';
      
      utterance.lang = langCode;
      utterance.rate = 0.9; // slightly slower, clearer
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSTT = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }
    
    setIsListening(true);
    
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    let langCode = 'en-US';
    if (language === 'ta') langCode = 'ta-IN';
    else if (language === 'hi') langCode = 'hi-IN';
    else if (language === 'te') langCode = 'te-IN';
    
    recognition.lang = langCode;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleUserInput(transcript, true);
      setIsListening(false);
      
      // Dispatch custom event for auto-filling forms
      window.dispatchEvent(new CustomEvent('voice-transcribed', { detail: transcript }));
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const processAIResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    let response = "I'm sorry, I didn't understand that. Could you please repeat?";

    if (lowerText.includes('tomato') || lowerText.includes('தக்காளி') || lowerText.includes('टमाटर')) {
      response = "Today's Mandi rate for Tomato is ₹30/kg. Prices are expected to rise by 10% next week. Would you like to create a listing?";
    } else if (lowerText.includes('pest') || lowerText.includes('பூச்சி') || lowerText.includes('disease')) {
      response = "For pest control, we recommend using Neem oil spray or consulting a local agri-expert. Let me open the AI camera for you to scan your crop.";
    } else if (lowerText.includes('farmer') || lowerText.includes('உழவர்')) {
      response = "Great! Let's proceed as a Farmer.";
    } else if (lowerText.includes('buyer') || lowerText.includes('வாங்குபவர்')) {
      response = "Great! Let's proceed as a Buyer.";
    } else {
      // Mock generic response
      response = `You said: "${text}". I have recorded this.`;
    }

    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'assistant', text: response }]);
    speakText(response);
  };

  const handleUserInput = (text: string, isAudio: boolean = false) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { id: Date.now().toString(), sender: 'user', text, isAudio }]);
    setInput('');
    
    // Simulate AI thinking delay
    setTimeout(() => {
      processAIResponse(text);
    }, 600);
  };

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      window.speechSynthesis.cancel();
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={toggleAssistant}
        className={`fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all ${
          isOpen ? 'bg-red-500 hover:bg-red-600 scale-90' : 'bg-green-600 hover:bg-green-700 animate-bounce'
        } text-white`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
      </button>
      
      {/* Tooltip for the FAB if closed */}
      {!isOpen && (
        <div className="fixed bottom-24 right-6 z-[50] bg-white text-green-800 text-xs font-bold px-3 py-2 rounded-xl shadow-lg border border-green-100 animate-[fade-in-up_0.5s_ease-out]">
          Tap to Speak / வழிகாட்டியை இயக்கவும்
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white border-b border-r border-green-100 transform rotate-45"></div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[90vw] sm:w-96 max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[450px] animate-[fade-in-up_0.3s_ease-out]">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-4 text-white flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Uzhavan AI Assistant</h3>
                <p className="text-xs text-green-200">Online & Listening</p>
              </div>
            </div>
            <button onClick={toggleAssistant} className="text-white hover:text-green-200 bg-white/10 p-1.5 rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                msg.sender === 'user' 
                  ? 'bg-green-600 text-white self-end rounded-br-sm shadow-sm' 
                  : 'bg-white text-gray-800 self-start border border-gray-100 shadow-sm rounded-bl-sm'
              }`}>
                {msg.text}
              </div>
            ))}
            
            {isListening && (
              <div className="bg-white border border-gray-100 text-gray-800 self-start max-w-[85%] rounded-2xl rounded-bl-sm p-3 shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <span className="text-xs text-gray-400 ml-2 italic">Listening...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
            <button 
              onClick={handleSTT}
              className={`p-3 rounded-full flex-shrink-0 transition-colors ${
                isListening ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserInput(input)}
              placeholder="Ask or say something..."
              className="flex-1 bg-gray-100 text-sm rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 transition-all"
            />
            <button 
              onClick={() => handleUserInput(input)}
              disabled={!input.trim()}
              className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
