import type { BedAvailability } from '../types';

interface Props {
  beds: BedAvailability[];
}

const StatsBar = ({ beds }: Props) => {
  const totalICU = beds.reduce((sum, b) => sum + b.icuBeds.available, 0);
  const totalOxygen = beds.reduce((sum, b) => sum + b.oxygenBeds.available, 0);
  const totalVent = beds.reduce((sum, b) => sum + b.ventilatorBeds.available, 0);
  const hospitalsWithOxygen = beds.filter((b) => b.oxygenAvailable).length;

  const stats = [
    { label: 'ICU Beds Available', value: totalICU, color: 'text-blue-600' },
    { label: 'Oxygen Beds Available', value: totalOxygen, color: 'text-green-600' },
    { label: 'Ventilators Available', value: totalVent, color: 'text-purple-600' },
    { label: 'Hospitals with Oxygen', value: hospitalsWithOxygen, color: 'text-orange-600' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 py-4 text-center"
        >
          <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;