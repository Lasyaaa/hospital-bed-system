import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import API from '../api/axios';
import type { BedAvailability } from '../types';
import HospitalCard from '../components/HospitalCard';
import SearchBar from '../components/SearchBar';
import StatsBar from '../components/StatsBar';
import useSocket from '../hooks/useSocket';

const HomePage = () => {
  const [allBeds, setAllBeds] = useState<BedAvailability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // Ref so the socket callback always reads fresh state
  const allBedsRef = useRef<BedAvailability[]>([]);
  allBedsRef.current = allBeds;

  useEffect(() => {
  const fetchBeds = async () => {
    try {
      const { data } = await API.get('/beds');

      console.log("API Response:", data);
      console.log("Beds:", data.beds);

      setAllBeds(data.beds);
    } catch (err: any) {
      console.error("FETCH ERROR:", err);

      setError('Failed to load hospital data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  fetchBeds();
}, []);

  // Called whenever server emits 'bedUpdated'
  const handleBedUpdated = useCallback((updatedBeds: BedAvailability) => {
    setAllBeds((prev) =>
      prev.map((bed) =>
        bed._id === updatedBeds._id ? updatedBeds : bed
      )
    );
    setLastUpdate(new Date().toLocaleTimeString());
  }, []);

  useSocket(handleBedUpdated);

  const cities = useMemo(() => {
    const citySet = new Set(allBeds.map((b) => b.hospitalId.city));
    return Array.from(citySet).sort();
  }, [allBeds]);

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

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Find Available Hospital Beds
          </h1>
          <p className="text-gray-400 mt-1">
            Real-time bed availability across all hospitals. Updated instantly.
          </p>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-green-700 font-medium">Live</span>
        </div>
      </div>

      {lastUpdate && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2.5 rounded-lg text-sm">
          🔄 Bed data updated at {lastUpdate}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <StatsBar beds={filteredBeds} />

      <SearchBar
        searchTerm={searchTerm}
        selectedCity={selectedCity}
        cities={cities}
        onSearchChange={setSearchTerm}
        onCityChange={setSelectedCity}
        onClear={handleClear}
      />

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