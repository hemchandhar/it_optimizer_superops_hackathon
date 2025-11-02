import { useEffect, useState } from 'react';
import { DollarSign, TrendingDown, Target, Award } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import { getDashboardSummary, getRecommendations } from '../services/api';
import type { DashboardSummary, Recommendation } from '../types/index.js';

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, recsRes] = await Promise.all([
          getDashboardSummary(),
          getRecommendations(),
        ]);
        setSummary(summaryRes.data);
        setRecommendations(recsRes.data.urgent || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">No data available</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          IT Optimization Dashboard
        </h1>
        <p className="mt-2 text-gray-600">
          Real-time insights into your IT resource utilization and cost optimization
          opportunities
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total IT Spend"
          value={`$${parseFloat(summary.summary.totalITSpend).toLocaleString()}`}
          subtitle="Monthly recurring cost"
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Potential Savings"
          value={`$${parseFloat(summary.summary.potentialSavings).toLocaleString()}`}
          subtitle={`${summary.summary.savingsPercentage}% of total spend`}
          icon={TrendingDown}
          color="green"
          trend={{ value: '12%', isPositive: true }}
        />
        <StatCard
          title="Optimization Score"
          value={summary.summary.optimizationScore}
          subtitle="Out of 100"
          icon={Target}
          color="purple"
        />
        <StatCard
          title="Active Optimizations"
          value={summary.overlaps.consolidatableOverlaps}
          subtitle="Ready to implement"
          icon={Award}
          color="yellow"
        />
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        {/* License Overview */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            License Utilization
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Licenses</span>
              <span className="font-semibold">{summary.licenses.totalLicenses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Utilization Rate</span>
              <span className="font-semibold">
                {summary.licenses.overallUtilization}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Cost</span>
              <span className="font-semibold">
                ${summary.licenses.totalCost.toLocaleString()}
              </span>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{
                    width: `${summary.licenses.overallUtilization}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Storage Overview */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Storage Optimization
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Storage</span>
              <span className="font-semibold">
                {summary.storage.totalCapacityGB} GB
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Used</span>
              <span className="font-semibold">
                {summary.storage.totalUsedGB} GB
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Potential Savings</span>
              <span className="font-semibold text-green-600">
                ${summary.storage.potentialSavings}
              </span>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600"
                  style={{
                    width: `${summary.storage.overallUtilization}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Priority Recommendations
        </h3>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg bg-orange-50 border border-orange-200"
            >
              <div className="mt-1 rounded-full bg-orange-100 p-2">
                <TrendingDown className="h-5 w-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900">{rec.action}</h4>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                    {rec.priority} Priority
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{rec.impact}</p>
                <p className="mt-2 text-sm font-semibold text-green-600">
                  Potential Savings: ${rec.potentialSavings.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
