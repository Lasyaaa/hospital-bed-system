import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import type { BedAvailability, Hospital } from '../types';
import BedUpdateForm from '../components/BedUpdateForm';

const AdminDashboard = () => {
  const { user } = useAuth();

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [bedData, setBedData] = useState<BedAvailability | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const { data } = await API.get('/hospitals');
        setHospitals(data.hospitals);
        if (data.hospitals.length > 0) {
          setSelectedHospital(data.hospitals[0]);
        }
      } catch (err: any) {
        setError('Failed to load hospitals.');
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (!selectedHospital) return;
    const fetchBeds = async () => {
      try {
        const { data } = await API.get(`/beds/${selectedHospital._id}`);
        setBedData(data.beds);
      } catch (err: any) {
        setError('Failed to load bed data.');
      }
    };
    fetchBeds();
  }, [selectedHospital]);

  const handleBedUpdate = (updated: BedAvailability) => {
    setBedData(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500 text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, {user?.name}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
              Hospitals
            </h2>
            {hospitals.length === 0 ? (
              <p className="text-gray-400 text-sm">No hospitals found.</p>
            ) : (
              <ul className="space-y-2">
                {hospitals.map((hospital) => (
                  <li key={hospital._id}>
                    <button
                      onClick={() => setSelectedHospital(hospital)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition ${
                        selectedHospital?._id === hospital._id
                          ? 'bg-blue-50 text-blue-700 font-medium border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{hospital.name}</div>
                      <div className="text-xs text-gray-400 capitalize mt-0.5">
                        {hospital.city}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedHospital && bedData ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {selectedHospital.name}
                </h2>
                <p className="text-sm text-gray-400 capitalize mt-0.5">
                  {selectedHospital.city} · Last updated:{' '}
                  {new Date(bedData.lastUpdated).toLocaleString()}
                </p>
              </div>
              <BedUpdateForm
                hospitalId={selectedHospital._id}
                currentBeds={bedData}
                onUpdate={handleBedUpdate}
              />
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-center h-64">
              <p className="text-gray-400">Select a hospital to update bed counts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;