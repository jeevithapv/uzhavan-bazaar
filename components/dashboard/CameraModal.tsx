'use client';
import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { X, Camera, RefreshCw, CheckCircle2, Loader2 } from 'lucide-react';

interface CameraModalProps {
  onClose: () => void;
}

interface GradingResult {
  crop: string;
  defectScore: number;
  grade: string;
  recommendedPrice: number;
}

export default function CameraModal({ onClose }: CameraModalProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
      processImage();
    }
  }, [webcamRef]);

  const processImage = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
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
                    <Loader2 className="h-10 w-10 text-green-600 animate-spin mb-4" />
                    <p className="text-gray-600 font-medium">Analyzing produce quality...</p>
                    <p className="text-xs text-gray-400 mt-2">Checking for defects, ripeness, and color.</p>
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
                        <span className="text-gray-500 text-sm">Grade Classification</span>
                        <span className={`font-bold ${result.grade === 'Grade A' ? 'text-green-600' : result.grade === 'Grade B' ? 'text-yellow-600' : 'text-orange-600'}`}>
                          {result.grade}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span className="text-gray-500 text-sm">Defect Score</span>
                        <span className="font-medium text-gray-800">{result.defectScore}%</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-gray-500 text-sm">Est. Market Price</span>
                        <span className="font-bold text-green-700 text-lg">₹{result.recommendedPrice}/kg</span>
                      </div>
                    </div>

                    <button 
                      onClick={createPost}
                      className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-sm"
                    >
                      Create Post from Grade
                    </button>
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
