import { useEffect, useState, useMemo } from 'react';
import API from '../api/axios';
import type { BedAvailability } from '../types';
import HospitalCard from '../components/HospitalCard';
import SearchBar from '../components/SearchBar';
import StatsBar from '../components/StatsBar';

const HomePage = () => {
  const [allBeds, setAllBeds] = useState<BedAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const { data } = await API.get('/beds');
        setAllBeds(data.beds);
      } catch (err: any) {
        setError('Failed to load hospital data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchBeds();
  }, []);

  // Derive unique city list from bed data
  const cities = useMemo(() => {
    const citySet = new Set(allBeds.map((b) => b.hospitalId.city));
    return Array.from(citySet).sort();
  }, [allBeds]);

  // Filter hospitals by search term and selected city
  const filteredBeds = useMemo(() => {
    return allBeds.filter((b) => {
      const matchesName = b.hospitalId.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity
        ? b.hospitalId.city === selectedCity
        : true;
      return matchesName && matchesCity;
    });
  }, [allBeds, searchTerm, selectedCity]);

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCity('');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 text-lg">Loading hospitals...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

      {/* Hero */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Find Available Hospital Beds
        </h1>
        <p className="text-gray-400 mt-1">
          Real-time bed availability across all hospitals. Updated instantly.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Summary stats */}
      <StatsBar beds={filteredBeds} />

      {/* Search and filter */}
      <SearchBar
        searchTerm={searchTerm}
        selectedCity={selectedCity}
        cities={cities}
        onSearchChange={setSearchTerm}
        onCityChange={setSelectedCity}
        onClear={handleClear}
      />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-medium text-gray-700">{filteredBeds.length}</span>{' '}
          {filteredBeds.length === 1 ? 'hospital' : 'hospitals'}
          {selectedCity && (
            <span>
              {' '}in{' '}
              <span className="capitalize font-medium text-gray-700">
                {selectedCity}
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Hospital cards grid */}
      {filteredBeds.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🏥</div>
          <p className="text-lg font-medium">No hospitals found</p>
          <p className="text-sm mt-1">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredBeds.map((beds) => (
            <HospitalCard key={beds._id} beds={beds} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;