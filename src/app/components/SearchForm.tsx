'use client';
import { useState } from 'react';
import Image from 'next/image';

interface SearchFormProps {
  onSearch: (type: string, search: string) => void;
  types: string[];
}

export default function SearchForm({ onSearch, types }: SearchFormProps) {
  const [selectedType, setSelectedType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const onChangePokemonType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedType(value);
    onSearch(value, searchTerm);
  }

  const onSearchPokemon = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedType, searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div className="flex flex-col gap-4">
        <select
          value={selectedType}
          onChange={onChangePokemonType}
          className="w-full p-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>

        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Image src="/search_icon.png" alt="" width="25" height="25"/>
          </div>

          <input
            type="text"
            value={searchTerm}
            onChange={onSearchPokemon}
            placeholder="Search..."
            className="w-full pl-10 pr-20 py-3 text-lg border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-[#1B365C] text-white rounded-lg hover:bg-[#264773] transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
