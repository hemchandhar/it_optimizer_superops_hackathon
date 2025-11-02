import { useEffect, useState } from 'react';
import { Cloud, Server, TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';
import { getCloudResources, getCloudAnalytics } from '../services/api';

export default function CloudAnalysis() {
  const [resources, setResources] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resourcesRes, analyticsRes] = await Promise.all([
          getCloudResources(),
          getCloudAnalytics(),
        ]);
        setResources(resourcesRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error('Error fetching cloud data:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">Cloud vs On-Premise Analysis</h1>
        <p className="mt-2 text-gray-600">
          Compare cloud and on-premise costs to optimize your infrastructure
        </p>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-6">
            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Total Resources</div>
                  <div className="mt-2 text-3xl font-bold text-gray-900">
                    {analytics.summary.totalResources}
                  </div>
                </div>
                <Cloud className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Cloud Cost</div>
                  <div className="mt-2 text-2xl font-bold text-blue-600">
                    ${analytics.summary.totalCloudCost}/mo
                  </div>
                </div>
                <Cloud className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">On-Prem Cost</div>
                  <div className="mt-2 text-2xl font-bold text-purple-600">
                    ${analytics.summary.totalOnPremiseCost}/mo
                  </div>
                </div>
                <Server className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-600">Potential Savings</div>
                  <div className="mt-2 text-2xl font-bold text-green-600">
                    ${analytics.summary.potentialSavings}/mo
                  </div>
                </div>
                <TrendingDown className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Cost Comparison Chart */}
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Comparison</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Cloud Cost</span>
                  <span className="text-lg font-bold text-blue-600">
                    ${analytics.summary.totalCloudCost}
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${
                        (analytics.summary.totalCloudCost /
                          Math.max(
                            analytics.summary.totalCloudCost,
                            analytics.summary.totalOnPremiseCost
                          )) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">On-Premise Cost</span>
                  <span className="text-lg font-bold text-purple-600">
                    ${analytics.summary.totalOnPremiseCost}
                  </span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600"
                    style={{
                      width: `${
                        (analytics.summary.totalOnPremiseCost /
                          Math.max(
                            analytics.summary.totalCloudCost,
                            analytics.summary.totalOnPremiseCost
                          )) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources List */}
      <div className="space-y-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className={`rounded-lg bg-white p-6 shadow-sm border-2 ${
              resource.isMigrationCandidate ? 'border-yellow-200' : 'border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  {resource.provider === 'on_premise' ? (
                    <Server className="h-6 w-6 text-purple-600" />
                  ) : (
                    <Cloud className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {resource.resourceName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800">
                      {resource.provider}
                    </span>
                    <span>•</span>
                    <span>{resource.resourceType}</span>
                    {resource.instanceType && (
                      <>
                        <span>•</span>
                        <span>{resource.instanceType}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {resource.isMigrationCandidate && (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800">
                  Migration Candidate
                </span>
              )}
            </div>

            {/* Cost Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-sm font-medium text-blue-700 mb-1">Current (Cloud)</div>
                <div className="text-2xl font-bold text-blue-900">
                  ${resource.monthlyCost}/mo
                </div>
              </div>

              <div className="rounded-lg bg-purple-50 p-4">
                <div className="text-sm font-medium text-purple-700 mb-1">
                  On-Premise Equivalent
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  ${resource.onPremiseEquivalentCost}/mo
                </div>
              </div>

              <div
                className={`rounded-lg p-4 ${
                  resource.costDifference > 0 ? 'bg-green-50' : 'bg-red-50'
                }`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    resource.costDifference > 0 ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {resource.costDifference > 0 ? 'Savings' : 'Additional Cost'}
                </div>
                <div
                  className={`text-2xl font-bold ${
                    resource.costDifference > 0 ? 'text-green-900' : 'text-red-900'
                  }`}
                >
                  ${Math.abs(resource.costDifference)}/mo
                </div>
              </div>
            </div>

            {/* Utilization */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Utilization Rate</span>
                <span className="text-sm font-semibold text-gray-900">
                  {resource.utilizationRate}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    resource.utilizationRate < 40
                      ? 'bg-yellow-500'
                      : resource.utilizationRate < 70
                      ? 'bg-blue-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${resource.utilizationRate}%` }}
                />
              </div>
            </div>

            {/* Recommendation */}
            {resource.recommendedAction && (
              <div
                className={`rounded-lg p-4 border ${
                  resource.isMigrationCandidate
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <ArrowRight
                    className={`h-5 w-5 mt-0.5 ${
                      resource.isMigrationCandidate ? 'text-yellow-600' : 'text-blue-600'
                    }`}
                  />
                  <div className="flex-1">
                    <h4
                      className={`text-sm font-semibold mb-1 ${
                        resource.isMigrationCandidate ? 'text-yellow-900' : 'text-blue-900'
                      }`}
                    >
                      Recommendation
                    </h4>
                    <p
                      className={`text-sm ${
                        resource.isMigrationCandidate ? 'text-yellow-800' : 'text-blue-800'
                      }`}
                    >
                      {resource.recommendedAction}
                    </p>
                    {resource.potentialSavings > 0 && (
                      <p
                        className={`text-sm font-semibold mt-2 ${
                          resource.isMigrationCandidate ? 'text-yellow-900' : 'text-blue-900'
                        }`}
                      >
                        Potential Savings: ${resource.potentialSavings}/month
                      </p>
                    )}
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
