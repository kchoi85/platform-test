'use client';

import { useState, useEffect } from 'react';

type Suggestion = {
  id: string;
  center: [number, number];
  address: number; // 18
  text: string; // Yonge Street
  place_name: string; // 18 Yonge Street, Toronto, Ontario, M5E 1Z8, Canada
  context?: any[];
};

type AddressAutocompleteProps = {
  onSelect: (data: {
    address: string;
    latitude: number;
    longitude: number;
    street: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
  }) => void;
};

export function AddressAutocomplete({ onSelect }: AddressAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [hasSelected, setHasSelected] = useState(false);
  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

  useEffect(() => {
    // Skip fetching suggestions if a suggestion was just selected.
    if (hasSelected) return;

    if (!query) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${accessToken}&autocomplete=true&limit=5`;
        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(data.features || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, accessToken, hasSelected]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    // Reset the flag so that new suggestions can be fetched.
    setHasSelected(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        placeholder="Search for address..."
        onChange={handleInputChange}
        className="w-full border text-gray-900 border-gray-300 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded max-h-60 overflow-y-auto">
          {suggestions.map((sugg) => {
            const handleClick = () => {
              // Set the input to the full address and clear suggestions.
              setQuery(sugg.place_name);
              setSuggestions([]);
              // Mark that a suggestion has been selected.
              setHasSelected(true);

              const postalCode =
                sugg.context?.find((c) => c.id.includes('postcode'))?.text ||
                '';
              const city =
                sugg.context?.find((c) => c.id.includes('place'))?.text || '';
              const province =
                sugg.context?.find((c) => c.id.includes('region'))?.text || '';
              const country =
                sugg.context?.find((c) => c.id.includes('country'))?.text || '';
              const street = sugg?.address + ' ' + sugg.text || '';

              onSelect({
                address: sugg.place_name,
                street,
                city,
                province,
                country,
                postalCode,
                latitude: sugg.center[1],
                longitude: sugg.center[0],
              });
            };

            return (
              <li
                key={sugg.id}
                className="p-2 hover:bg-blue-100 cursor-pointer"
                onClick={handleClick}
              >
                {sugg.place_name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
