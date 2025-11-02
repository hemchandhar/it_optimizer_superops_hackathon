import { useEffect, useState } from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import { getLicenses, getLicenseOptimization } from '../services/api';
import type { License } from '../types/index.js';

export default function Licenses() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [optimization, setOptimization] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [licensesRes, optimizationRes] = await Promise.all([
          getLicenses(),
          getLicenseOptimization(),
        ]);
        setLicenses(licensesRes.data);
        setOptimization(optimizationRes.data);
      } catch (error) {
        console.error('Error fetching licenses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">License Management</h1>

      {/* Optimization Summary */}
      {optimization && (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-blue-50 p-6 border border-blue-200">
            <div className="text-sm font-medium text-blue-600">Total Licenses</div>
            <div className="mt-2 text-3xl font-bold text-blue-900">
              {optimization.totalLicenses}
            </div>
          </div>
          <div className="rounded-lg bg-yellow-50 p-6 border border-yellow-200">
            <div className="text-sm font-medium text-yellow-600">Underutilized</div>
            <div className="mt-2 text-3xl font-bold text-yellow-900">
              {optimization.underutilizedLicenses}
            </div>
          </div>
          <div className="rounded-lg bg-green-50 p-6 border border-green-200">
            <div className="text-sm font-medium text-green-600">Potential Savings</div>
            <div className="mt-2 text-3xl font-bold text-green-900">
              ${optimization.totalPotentialSavings.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Licenses Table */}
      <div className="rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Licenses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Software
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Seats
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Utilization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Monthly Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {licenses.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">
                          {license.software}
                        </div>
                        <div className="text-sm text-gray-500">
                          {license.department}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {license.vendor}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {license.usedSeats} / {license.totalSeats}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            Number(license.utilizationRate) < 50
                              ? 'bg-red-500'
                              : Number(license.utilizationRate) < 75
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${license.utilizationRate}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {Number(license.utilizationRate).toFixed(0)}%
                      </span>
                      {Number(license.utilizationRate) < 50 && (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${Number(license.totalCost).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        license.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {license.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
