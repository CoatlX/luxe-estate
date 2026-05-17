'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: any;
}

export default function FilterModal({ isOpen, onClose, dict }: FilterModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params if present
  const [location, setLocation] = useState(searchParams.get('query') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'Any Type');
  const [beds, setBeds] = useState(parseInt(searchParams.get('beds') || '0', 10));
  const [baths, setBaths] = useState(parseInt(searchParams.get('baths') || '0', 10));

  if (!isOpen) return null;

  const handleClearAll = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setPropertyType('Any Type');
    setBeds(0);
    setBaths(0);
  };

  const handleApply = () => {
    const params = new URLSearchParams();
    if (location) params.set('query', location);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (propertyType !== 'Any Type') params.set('type', propertyType);
    if (beds > 0) params.set('beds', beds.toString());
    if (baths > 0) params.set('baths', baths.toString());

    router.push(`/?${params.toString()}`);
    onClose();
  };

  return (
    <>
      {/* Modal Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Main Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto relative w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl sticky top-0 z-30">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">{dict.modal.title}</h1>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
              <span className="material-icons">close</span>
            </button>
          </header>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-10">
            {/* Location */}
            <section>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{dict.modal.location_label}</label>
              <div className="relative group">
                <span className="material-icons absolute left-4 top-3.5 text-gray-400 group-focus-within:text-mosque transition-colors">location_on</span>
                <input 
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-mosque focus:bg-white transition-all shadow-sm" 
                  placeholder={dict.home.search.placeholder} 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </section>

            {/* Price Range */}
            <section>
              <div className="flex justify-between items-end mb-4">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{dict.modal.price_range}</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                  <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">{dict.modal.min_price}</label>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">$</span>
                    <input 
                      className="w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm" 
                      type="number" 
                      placeholder="0"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-transparent focus-within:border-mosque/30 transition-colors">
                  <label className="block text-[10px] text-gray-500 uppercase font-medium mb-1">{dict.modal.max_price}</label>
                  <div className="flex items-center">
                    <span className="text-gray-400 mr-1">$</span>
                    <input 
                      className="w-full bg-transparent border-0 p-0 text-gray-900 font-medium focus:ring-0 text-sm" 
                      type="number" 
                      placeholder={dict.modal.any}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Property Details */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Property Type */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">{dict.modal.property_type}</label>
                <div className="relative">
                  <select 
                    className="w-full bg-gray-50 border-0 rounded-lg py-3 pl-4 pr-10 text-gray-900 appearance-none focus:ring-2 focus:ring-mosque cursor-pointer"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="Any Type">{dict.modal.any_type}</option>
                    <option value="House">{dict.home.filters.house}</option>
                    <option value="Apartment">{dict.home.filters.apartment}</option>
                    <option value="Villa">{dict.home.filters.villa}</option>
                    <option value="Penthouse">{dict.home.filters.penthouse}</option>
                  </select>
                  <span className="material-icons absolute right-3 top-3 text-gray-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Rooms */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{dict.modal.bedrooms}</span>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
                    <button 
                      onClick={() => setBeds(Math.max(0, beds - 1))}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque transition-colors"
                    >
                      <span className="material-icons text-base">remove</span>
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{beds > 0 ? `${beds}+` : dict.modal.any}</span>
                    <button 
                      onClick={() => setBeds(beds + 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                    >
                      <span className="material-icons text-base">add</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">{dict.modal.bathrooms}</span>
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
                    <button 
                      onClick={() => setBaths(Math.max(0, baths - 1))}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-mosque transition-colors"
                    >
                      <span className="material-icons text-base">remove</span>
                    </button>
                    <span className="text-sm font-semibold w-4 text-center">{baths > 0 ? `${baths}+` : dict.modal.any}</span>
                    <button 
                      onClick={() => setBaths(baths + 1)}
                      className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                    >
                      <span className="material-icons text-base">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-100 rounded-b-xl px-8 py-6 sticky bottom-0 z-30 flex items-center justify-between">
            <button 
              onClick={handleClearAll}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors underline decoration-gray-300 underline-offset-4"
            >
              {dict.modal.clear_all}
            </button>
            <button 
              onClick={handleApply}
              className="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-mosque/30 transition-all hover:shadow-mosque/40 flex items-center gap-2 transform active:scale-95"
            >
              {dict.modal.show_homes}
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}
