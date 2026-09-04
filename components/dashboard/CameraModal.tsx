'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { X, Camera, RefreshCw, CheckCircle2, Loader2, QrCode } from 'lucide-react';

interface CameraModalProps {
  onClose: () => void;
}

interface GradingResult {
  crop: string;
  defectScore: number;
  ripeness: number;
  defectFree: number;
  grade: string;
  recommendedPrice: number;
}

export default function CameraModal({ onClose }: CameraModalProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [scanStage, setScanStage] = useState(0);
  const [result, setResult] = useState<GradingResult | null>(null);
  const [showQR, setShowQR] = useState(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      processImage();
    }
  }, [webcamRef]);

  const processImage = () => {
    setIsProcessing(true);
    setScanStage(1);
    
    // Simulate CV Processing Stages
    setTimeout(() => setScanStage(2), 800);
    setTimeout(() => setScanStage(3), 1600);
    
    setTimeout(() => {
      setResult({
        crop: 'Tomato',
        defectScore: 12,
        ripeness: 94,
        defectFree: 88,
        grade: 'Grade A',
        recommendedPrice: 30
      });
      setIsProcessing(false);
    }, 2500);
  };

  const createPost = async () => {
    if (!result) return;
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: result.crop,
          grade: result.grade,
          quantity: "100kg", // default mock value
          price: result.recommendedPrice,
          isPredicted: true
        })
      });
      // Optionally trigger a refresh or event to update post list
      window.dispatchEvent(new Event('refreshPosts'));
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">AI Produce Grading</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-y-auto">
          {!imageSrc ? (
            <div className="flex flex-col items-center">
              <div className="rounded-lg overflow-hidden border-2 border-dashed border-gray-300 w-full bg-black relative max-w-md aspect-[4/3] flex items-center justify-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{ facingMode: "environment" }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 pointer-events-none border-2 border-green-500/30 rounded-lg">
                  <div className="w-full h-1 bg-green-500/50 animate-[scan_2s_ease-in-out_infinite]" style={{ boxShadow: '0 0 8px 2px rgba(34, 197, 94, 0.5)' }}></div>
                </div>
              </div>
              <button
                onClick={capture}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-full flex items-center gap-2 transition-colors shadow-sm"
              >
                <Camera className="h-5 w-5" />
                Snap Photo
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <div className="rounded-lg overflow-hidden border border-gray-200 w-full relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imageSrc} alt="Captured produce" className="w-full h-auto object-cover aspect-[4/3]" />
                </div>
                {!isProcessing && (
                  <button 
                    onClick={() => { setImageSrc(null); setResult(null); }}
                    className="mt-4 text-gray-600 hover:text-green-600 font-medium flex items-center gap-2 transition-colors text-sm"
                  >
                    <RefreshCw className="h-4 w-4" /> Retake Photo
                  </button>
                )}
              </div>
              
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-8">
                    <div className="relative w-20 h-20 mb-6">
                      <svg className="w-full h-full animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#16a34a" strokeWidth="8" strokeDasharray="283" strokeDashoffset="70" strokeLinecap="round" />
                      </svg>
                      <Scan className="absolute inset-0 m-auto text-green-600 w-8 h-8 animate-pulse" />
                    </div>
                    <p className="text-gray-800 font-bold text-lg mb-1">
                      {scanStage === 1 ? 'Scanning image...' : scanStage === 2 ? 'Analyzing Ripeness...' : 'Grading Quality...'}
                    </p>
                    <p className="text-sm text-gray-500">Checking for defects and color consistency.</p>
                  </div>
                ) : result ? (
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-4 text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                      <h4 className="font-semibold text-lg">Grading Complete</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500 text-sm">Detected Crop</span>
                        <span className="font-semibold text-gray-800">{result.crop}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500 text-sm">Ripeness</span>
                        <span className="font-medium text-green-700">{result.ripeness}% (Optimal)</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500 text-sm">Defect Free</span>
                        <span className="font-medium text-blue-700">{result.defectFree}%</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500 text-sm">Grade Classification</span>
                        <span className={`font-bold ${result.grade === 'Grade A' ? 'bg-green-100 text-green-700' : result.grade === 'Grade B' ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'} px-2 py-0.5 rounded`}>
                          {result.grade}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-gray-500 text-sm">Est. Market Price</span>
                        <span className="font-bold text-green-700 text-lg">₹{result.recommendedPrice}/kg</span>
                      </div>
                    </div>

                    {!showQR ? (
                      <div className="mt-6 flex flex-col gap-2">
                        <button 
                          onClick={createPost}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm"
                        >
                          Create Post from Grade
                        </button>
                        <button 
                          onClick={() => setShowQR(true)}
                          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 border border-blue-200"
                        >
                          <QrCode className="w-4 h-4" /> Generate Quality Certificate
                        </button>
                      </div>
                    ) : (
                      <div className="mt-6 flex flex-col items-center bg-white p-4 rounded-xl border border-gray-200">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center mb-2 border-4 border-white shadow-sm">
                          {/* Placeholder QR Code SVG */}
                          <svg className="w-24 h-24 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v3h-3v-3zm-3 3h3v3h-3v-3zm3 3h3v3h-3v-3zm-3 3h3v3h-3v-3zm-3-9h3v3h-3v-3zm0 6h3v3h-3v-3z"/>
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500 font-bold">CERT: UZH-99482A</p>
                        <p className="text-[10px] text-gray-400 mt-1">Scan to verify authenticity</p>
                        <button onClick={createPost} className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-bold text-sm">Continue to Post</button>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
