import { Link } from 'react-router-dom';
import type { BedAvailability } from '../types';

interface Props {
  beds: BedAvailability;
}

const BedBadge = ({
  label,
  available,
  total,
}: {
  label: string;
  available: number;
  total: number;
}) => {
  const percentage = total > 0 ? (available / total) * 100 : 0;

  const color =
    percentage === 0
      ? 'bg-red-50 text-red-700 border-red-200'
      : percentage < 30
      ? 'bg-orange-50 text-orange-700 border-orange-200'
      : 'bg-green-50 text-green-700 border-green-200';

  return (
    <div className={`border rounded-lg px-3 py-2 text-center ${color}`}>
      <div className="text-xs font-medium uppercase tracking-wide opacity-75">
        {label}
      </div>
      <div className="text-lg font-bold mt-0.5">{available}</div>
      <div className="text-xs opacity-60">of {total}</div>
    </div>
  );
};

const HospitalCard = ({ beds }: Props) => {
  const hospital = beds.hospitalId;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">

      {/* Hospital header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{hospital.name}</h3>
          <p className="text-sm text-gray-400 capitalize mt-0.5">
            📍 {hospital.city}
          </p>
        </div>

        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
            beds.oxygenAvailable
              ? 'bg-green-50 text-green-700 border-green-200'
              : 'bg-red-50 text-red-700 border-red-200'
          }`}
        >
          {beds.oxygenAvailable ? '✓ Oxygen' : '✗ No Oxygen'}
        </span>
      </div>

      {/* Bed counts */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <BedBadge
          label="ICU"
          available={beds.icuBeds.available}
          total={beds.icuBeds.total}
        />
        <BedBadge
          label="Oxygen"
          available={beds.oxygenBeds.available}
          total={beds.oxygenBeds.total}
        />
        <BedBadge
          label="Ventilator"
          available={beds.ventilatorBeds.available}
          total={beds.ventilatorBeds.total}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <span className="text-xs text-gray-400">
          Updated {new Date(beds.lastUpdated).toLocaleTimeString()}
        </span>
        <Link
          to={`/hospital/${hospital._id}`}
          className="text-sm text-blue-600 font-medium hover:text-blue-800 transition"
        >
          View details →
        </Link>
      </div>
    </div>
  );
};

export default HospitalCard;