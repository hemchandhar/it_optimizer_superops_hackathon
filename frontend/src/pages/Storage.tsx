import { useEffect, useState } from 'react';
import { Database, Cloud, HardDrive, AlertTriangle } from 'lucide-react';
import { getStorage, getStorageAnalytics } from '../services/api';
import type { Storage } from '../types/index.js';

export default function StoragePage() {
  const [storage, setStorage] = useState<Storage[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storageRes, analyticsRes] = await Promise.all([
          getStorage(),
          getStorageAnalytics(),
        ]);
        setStorage(storageRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error('Error fetching storage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Storage Management</h1>
        <p className="mt-2 text-gray-600">
          Analyze storage utilization and identify duplicate data
        </p>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Storage</div>
                <div className="mt-2 text-2xl font-bold text-gray-900">
                  {analytics.summary.totalCapacityGB} GB
                </div>
              </div>
              <Database className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Utilization</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.overallUtilization}%
                </div>
              </div>
              <HardDrive className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Monthly Cost</div>
                <div className="mt-2 text-2xl font-bold text-gray-900">
                  ${analytics.summary.totalMonthlyCost}
                </div>
              </div>
              <Cloud className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Potential Savings</div>
                <div className="mt-2 text-2xl font-bold text-green-600">
                  ${analytics.summary.potentialSavings}
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      )}

      {/* Storage Solutions Grid */}
      <div className="grid grid-cols-1 gap-6">
        {storage.map((item) => (
          <div key={item.id} className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-50 p-3">
                  {item.type === 'cloud' ? (
                    <Cloud className="h-6 w-6 text-purple-600" />
                  ) : (
                    <Database className="h-6 w-6 text-purple-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.provider} • {item.type}
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-900">
                ${item.monthlyCost}/mo
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Capacity</div>
                <div className="mt-1 text-2xl font-bold text-gray-900">
                  {item.totalCapacityGB} GB
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Used</div>
                <div className="mt-1 text-2xl font-bold text-blue-600">
                  {item.usedCapacityGB} GB
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600">Available</div>
                <div className="mt-1 text-2xl font-bold text-green-600">
                  {item.totalCapacityGB - item.usedCapacityGB} GB
                </div>
              </div>
            </div>

            {/* Utilization Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Storage Utilization</span>
                <span className="text-sm font-semibold text-gray-900">
                  {Number(item.utilizationRate).toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    item.utilizationRate < 50
                      ? 'bg-green-500'
                      : item.utilizationRate < 75
                      ? 'bg-blue-500'
                      : 'bg-orange-500'
                  }`}
                  style={{ width: `${item.utilizationRate}%` }}
                />
              </div>
            </div>

            {/* Optimization Info */}
            {item.potentialSavings > 0 && (
              <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-yellow-900 mb-1">
                      Optimization Opportunity
                    </h4>
                    <p className="text-sm text-yellow-800">
                      {item.optimizationSuggestion}
                    </p>
                    <p className="text-sm font-semibold text-yellow-900 mt-2">
                      Potential Savings: ${item.potentialSavings}/month
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
