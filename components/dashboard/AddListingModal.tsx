import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AddListingModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddListingModal({ onClose, onSuccess }: AddListingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    crop: '',
    grade: 'Grade A',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    const handleVoiceCommand = (e: any) => {
      const text = e.detail.toLowerCase();
      // Simple NLP mock parsing
      if (text.includes('tomato') || text.includes('தக்காளி') || text.includes('टमाटर')) {
        setFormData(prev => ({ ...prev, crop: 'Tomato', quantity: '50kg', price: '30' }));
      }
    };
    window.addEventListener('voice-command', handleVoiceCommand);
    return () => window.removeEventListener('voice-command', handleVoiceCommand);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isPredicted: false
        })
      });

      if (res.ok) {
        onSuccess(); // Refresh the list
        onClose();
      } else {
        alert('Failed to add listing');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X className="w-6 h-6" />
        </button>
        <h3 className="text-xl font-bold mb-4">Add New Listing</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop Name</label>
            <input 
              required type="text" 
              value={formData.crop} 
              onChange={e => setFormData({...formData, crop: e.target.value})}
              placeholder="e.g. Tomatoes"
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quality Grade</label>
            <select
              value={formData.grade}
              onChange={e => setFormData({...formData, grade: e.target.value})}
              className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
            >
              <option value="Grade A">Grade A (Premium)</option>
              <option value="Grade B">Grade B (Standard)</option>
              <option value="Grade C">Grade C (Processing)</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity (e.g. 50kg)</label>
              <input 
                required type="text" 
                value={formData.quantity} 
                onChange={e => setFormData({...formData, quantity: e.target.value})}
                placeholder="50kg"
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Price (₹)</label>
              <input 
                required type="number" 
                value={formData.price} 
                onChange={e => setFormData({...formData, price: e.target.value})}
                placeholder="₹"
                className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500 outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 font-medium disabled:opacity-50">
              {isSubmitting ? 'Posting...' : 'Post Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
