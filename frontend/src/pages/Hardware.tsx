import { useEffect, useState } from 'react';
import { HardDrive, Server, Cpu, TrendingDown, TrendingUp } from 'lucide-react';
import { getHardware, getHardwareAnalytics } from '../services/api';
import type { Hardware } from '../types/index.js';

export default function HardwarePage() {
  const [hardware, setHardware] = useState<Hardware[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hardwareRes, analyticsRes] = await Promise.all([
          getHardware(),
          getHardwareAnalytics(),
        ]);
        setHardware(hardwareRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error('Error fetching hardware:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">Hardware Utilization</h1>
        <p className="mt-2 text-gray-600">
          Track hardware performance and identify optimization opportunities
        </p>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Hardware</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.totalHardware}
                </div>
              </div>
              <Server className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Avg CPU Usage</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.averageCpuUtilization}%
                </div>
              </div>
              <Cpu className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Underutilized</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.underutilized}
                </div>
              </div>
              <TrendingDown className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Overutilized</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.overutilized}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
      )}

      {/* Hardware Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {hardware.map((item) => (
          <div
            key={item.id}
            className={`rounded-lg bg-white p-6 shadow-sm border-2 ${
              item.isUnderutilized
                ? 'border-yellow-200'
                : item.isOverutilized
                ? 'border-red-200'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  {item.type === 'server' ? (
                    <Server className="h-6 w-6 text-blue-600" />
                  ) : (
                    <HardDrive className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.manufacturer} {item.type}
                  </p>
                </div>
              </div>
              {item.isUnderutilized && (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">
                  Underutilized
                </span>
              )}
              {item.isOverutilized && (
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                  Overutilized
                </span>
              )}
            </div>

            <div className="mt-6 space-y-4">
              {/* CPU Utilization */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">CPU Utilization</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.cpuUtilization}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.cpuUtilization < 30
                        ? 'bg-yellow-500'
                        : item.cpuUtilization > 85
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${item.cpuUtilization}%` }}
                  />
                </div>
              </div>

              {/* Memory Utilization */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Memory Utilization</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.memoryUtilization}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.memoryUtilization < 30
                        ? 'bg-yellow-500'
                        : item.memoryUtilization > 85
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${item.memoryUtilization}%` }}
                  />
                </div>
              </div>

              {/* Disk Utilization */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Disk Utilization</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.diskUtilization}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      item.diskUtilization < 40
                        ? 'bg-green-500'
                        : item.diskUtilization > 80
                        ? 'bg-red-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${item.diskUtilization}%` }}
                  />
                </div>
              </div>
            </div>

            {item.optimizationSuggestion && (
              <div className="mt-4 rounded-lg bg-blue-50 p-3 border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Suggestion:</strong> {item.optimizationSuggestion}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
