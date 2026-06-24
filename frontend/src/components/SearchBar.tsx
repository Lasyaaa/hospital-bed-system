interface Props {
  searchTerm: string;
  selectedCity: string;
  cities: string[];
  onSearchChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onClear: () => void;
}

const SearchBar = ({
  searchTerm,
  selectedCity,
  cities,
  onSearchChange,
  onCityChange,
  onClear,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Hospital name search */}
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by hospital name..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* City filter dropdown */}
        <select
          value={selectedCity}
          onChange={(e) => onCityChange(e.target.value)}
          className="sm:w-48 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city.charAt(0).toUpperCase() + city.slice(1)}
            </option>
          ))}
        </select>

        {/* Clear filters button */}
        {(searchTerm || selectedCity) && (
          <button
            onClick={onClear}
            className="sm:w-auto px-4 py-2.5 text-sm text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;