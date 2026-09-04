'use client';
import React, { useEffect, useState } from 'react';
import { Plus, Edit2, QrCode, Star, Package, MapPin } from 'lucide-react';

interface Post {
  id: number;
  crop: string;
  grade: string;
  quantity: string;
  price: number;
  rating: number;
  isPredicted: boolean;
  createdAt: string;
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // Listen for custom event when new post is created from CameraModal
    window.addEventListener('refreshPosts', fetchPosts);
    return () => window.removeEventListener('refreshPosts', fetchPosts);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">Active Post Listings</h3>
          <p className="text-sm text-gray-500">Manage your produce available for sale</p>
        </div>
        <button className="bg-green-50 text-green-700 hover:bg-green-100 font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Listing</span>
        </button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded-xl w-full"></div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No active listings found. Use the AI Camera to grade and list your produce.
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="border border-gray-100 rounded-xl p-4 hover:border-green-300 transition-colors flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-800">{post.crop}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.grade === 'Grade A' ? 'bg-green-100 text-green-700' :
                      post.grade === 'Grade B' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {post.grade}
                    </span>
                    {post.isPredicted && (
                      <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">AI Priced</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" /> {post.quantity}</span>
                    <span className="flex items-center gap-1 text-yellow-500 font-medium">
                      <Star className="h-3.5 w-3.5 fill-yellow-500" /> {post.rating}
                    </span>
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> Local Mandi</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col items-end gap-2">
                <div className="text-lg font-bold text-gray-900">₹{post.price.toLocaleString('en-IN')}</div>
                <div className="flex gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Edit Price">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Generate QR Code">
                    <QrCode className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
