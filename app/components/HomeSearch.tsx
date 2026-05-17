'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterModal from './FilterModal';

export default function HomeSearch({ dict }: { dict: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchParams.get('query') || '');
  
  const currentType = searchParams.get('type') || 'All';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set('query', searchInput);
    } else {
      params.delete('query');
    }
    // Reset to page 1 on new search
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleTypeClick = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === 'All') {
      params.delete('type');
    } else {
      params.set('type', type);
    }
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const types = [
    { value: 'All', label: dict.home.filters.all },
    { value: 'House', label: dict.home.filters.house },
    { value: 'Apartment', label: dict.home.filters.apartment },
    { value: 'Villa', label: dict.home.filters.villa },
    { value: 'Penthouse', label: dict.home.filters.penthouse }
  ];

  return (
    <>
      <div className="bg-white p-2 rounded-2xl shadow-lg border border-nordic-dark/5 flex items-center mb-8 relative z-10 focus-within:ring-2 focus-within:ring-mosque/50 transition-all">
        <span className="material-icons text-nordic-muted ml-4 text-xl">search</span>
        <form onSubmit={handleSearchSubmit} className="flex-grow">
          <input
            className="w-full bg-transparent border-0 text-nordic-dark placeholder-nordic-muted px-4 py-4 focus:ring-0 text-lg outline-none"
            placeholder={dict.home.search.placeholder}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        <button 
          onClick={handleSearchSubmit}
          className="bg-mosque hover:bg-primary-hover text-white px-8 py-3.5 rounded-xl font-medium transition-colors shadow-md hidden sm:block"
        >
          {dict.home.search.button}
        </button>
      </div>
      
      <div className="flex flex-wrap items-center justify-center gap-3">
        {types.map((typeObj) => (
          <button
            key={typeObj.value}
            onClick={() => handleTypeClick(typeObj.value)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              currentType === typeObj.value
                ? 'bg-nordic-dark text-white shadow-md'
                : 'bg-white text-nordic-dark hover:bg-nordic-dark/5 shadow-sm border border-nordic-dark/5'
            }`}
          >
            {typeObj.label}
          </button>
        ))}
        
        <div className="h-6 w-px bg-nordic-dark/10 mx-2 hidden sm:block"></div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2.5 rounded-full text-sm font-medium bg-white text-nordic-dark hover:bg-nordic-dark/5 transition-all shadow-sm border border-nordic-dark/5 flex items-center gap-2"
        >
          <span className="material-icons text-lg">tune</span> {dict.home.filters.button}
        </button>
      </div>

      <FilterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} dict={dict} />
    </>
  );
}
