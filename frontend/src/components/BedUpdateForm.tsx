import { useState } from 'react';
import type { FormEvent } from 'react';
import API from '../api/axios';
import type { BedAvailability } from '../types';

interface Props {
  hospitalId: string;
  currentBeds: BedAvailability;
  onUpdate: (updated: BedAvailability) => void;
}

const BedUpdateForm = ({ hospitalId, currentBeds, onUpdate }: Props) => {
  const [icuTotal, setIcuTotal] = useState(currentBeds.icuBeds.total);
  const [icuAvailable, setIcuAvailable] = useState(currentBeds.icuBeds.available);

  const [oxygenTotal, setOxygenTotal] = useState(currentBeds.oxygenBeds.total);
  const [oxygenAvailable, setOxygenAvailable] = useState(currentBeds.oxygenBeds.available);

  const [ventTotal, setVentTotal] = useState(currentBeds.ventilatorBeds.total);
  const [ventAvailable, setVentAvailable] = useState(currentBeds.ventilatorBeds.available);

  const [oxygenSupply, setOxygenSupply] = useState(currentBeds.oxygenAvailable);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    try {
      const { data } = await API.put(`/beds/${hospitalId}`, {
        icuBeds: { total: icuTotal, available: icuAvailable },
        oxygenBeds: { total: oxygenTotal, available: oxygenAvailable },
        ventilatorBeds: { total: ventTotal, available: ventAvailable },
        oxygenAvailable: oxygenSupply,
      });

      onUpdate(data.beds);
      setSuccess('Bed availability updated successfully!');

      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Update failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* ICU Beds */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          ICU Beds
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Total</label>
            <input
              type="number"
              min={0}
              value={icuTotal}
              onChange={(e) => setIcuTotal(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Available</label>
            <input
              type="number"
              min={0}
              value={icuAvailable}
              onChange={(e) => setIcuAvailable(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Oxygen Beds */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Oxygen Beds
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Total</label>
            <input
              type="number"
              min={0}
              value={oxygenTotal}
              onChange={(e) => setOxygenTotal(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Available</label>
            <input
              type="number"
              min={0}
              value={oxygenAvailable}
              onChange={(e) => setOxygenAvailable(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Ventilator Beds */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Ventilator Beds
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Total</label>
            <input
              type="number"
              min={0}
              value={ventTotal}
              onChange={(e) => setVentTotal(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Available</label>
            <input
              type="number"
              min={0}
              value={ventAvailable}
              onChange={(e) => setVentAvailable(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Oxygen Supply Toggle */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
        <span className="text-sm font-medium text-gray-700">Oxygen Supply Available</span>
        <button
          type="button"
          onClick={() => setOxygenSupply((prev) => !prev)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            oxygenSupply ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
              oxygenSupply ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Updating...' : 'Update Bed Availability'}
      </button>
    </form>
  );
};

export default BedUpdateForm;