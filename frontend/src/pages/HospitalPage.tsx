import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import type { Hospital, BedAvailability } from '../types';

const DetailRow = ({
  label,
  available,
  total,
}: {
  label: string;
  available: number;
  total: number;
}) => {
  const percentage = total > 0 ? Math.round((available / total) * 100) : 0;

  const barColor =
    percentage === 0
      ? 'bg-red-400'
      : percentage < 30
      ? 'bg-orange-400'
      : 'bg-green-400';

  return (
    <div className="py-4 border-b border-gray-50 last:border-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">
          <span className="font-bold text-gray-800">{available}</span> / {total} available
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-gray-400 mt-1">{percentage}% available</div>
    </div>
  );
};

const HospitalPage = () => {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [beds, setBeds] = useState<BedAvailability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const { data } = await API.get(`/hospitals/${id}`);
        setHospital(data.hospital);
        setBeds(data.beds);
      } catch (err: any) {
        setError('Hospital not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchHospital();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🏥</div>
        <p className="text-gray-500">{error}</p>
        <Link to="/" className="text-blue-600 text-sm mt-4 inline-block hover:underline">
          ← Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Back link */}
      <Link
        to="/"
        className="text-sm text-blue-600 hover:text-blue-800 transition mb-6 inline-block"
      >
        ← Back to search
      </Link>

      {/* Hospital info card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{hospital.name}</h1>
            <p className="text-gray-400 capitalize mt-1">📍 {hospital.city}</p>
            <p className="text-gray-500 text-sm mt-1">{hospital.address}</p>
          </div>
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              beds?.oxygenAvailable
                ? 'bg-green-50 text-green-700 border-green-200'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            {beds?.oxygenAvailable ? '✓ Oxygen Available' : '✗ No Oxygen'}
          </span>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex gap-6 text-sm text-gray-500">
          <span>📞 {hospital.phone}</span>
          {hospital.email && <span>✉️ {hospital.email}</span>}
        </div>
      </div>

      {/* Bed availability card */}
      {beds ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Bed Availability</h2>
            <span className="text-xs text-gray-400">
              Updated {new Date(beds.lastUpdated).toLocaleString()}
            </span>
          </div>

          <DetailRow
            label="ICU Beds"
            available={beds.icuBeds.available}
            total={beds.icuBeds.total}
          />
          <DetailRow
            label="Oxygen Beds"
            available={beds.oxygenBeds.available}
            total={beds.oxygenBeds.total}
          />
          <DetailRow
            label="Ventilator Beds"
            available={beds.ventilatorBeds.available}
            total={beds.ventilatorBeds.total}
          />
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-gray-400">
          No bed data available for this hospital.
        </div>
      )}
    </div>
  );
};

export default HospitalPage;