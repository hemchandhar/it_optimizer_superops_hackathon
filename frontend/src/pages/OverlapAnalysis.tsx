import { useEffect, useState } from 'react';
import { GitCompare, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { getOverlaps, getOverlapAnalytics, detectOverlaps } from '../services/api';

export default function OverlapAnalysis() {
  const [overlaps, setOverlaps] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [detecting, setDetecting] = useState(false);

  const fetchData = async () => {
    try {
      const [overlapsRes, analyticsRes] = await Promise.all([
        getOverlaps(),
        getOverlapAnalytics(),
      ]);
      setOverlaps(overlapsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Error fetching overlaps:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDetectOverlaps = async () => {
    setDetecting(true);
    try {
      await detectOverlaps();
      await fetchData();
    } catch (error) {
      console.error('Error detecting overlaps:', error);
    } finally {
      setDetecting(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feature Overlap Analysis</h1>
          <p className="mt-2 text-gray-600">
            Identify redundant software solutions and consolidation opportunities
          </p>
        </div>
        <button
          onClick={handleDetectOverlaps}
          disabled={detecting}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <GitCompare className="h-4 w-4" />
          {detecting ? 'Detecting...' : 'Detect Overlaps'}
        </button>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Overlaps</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.totalOverlaps}
                </div>
              </div>
              <GitCompare className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Consolidatable</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.consolidatableOverlaps}
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Potential Savings</div>
                <div className="mt-2 text-2xl font-bold text-green-600">
                  ${Number(analytics.summary.totalPotentialSavings).toFixed(2)}
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
      )}

      {/* Overlaps List */}
      <div className="space-y-4">
        {overlaps.length === 0 ? (
          <div className="rounded-lg bg-white p-12 shadow-sm border border-gray-200 text-center">
            <GitCompare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Overlaps Detected
            </h3>
            <p className="text-gray-600 mb-4">
              Click "Detect Overlaps" to analyze your software for redundant features
            </p>
          </div>
        ) : (
          overlaps.map((overlap) => (
            <div
              key={overlap.id}
              className={`rounded-lg bg-white p-6 shadow-sm border-2 ${getSeverityColor(
                overlap.severity
              )}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {overlap.software1} ↔ {overlap.software2}
                    </h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase ${getSeverityColor(
                        overlap.severity
                      )}`}
                    >
                      {overlap.severity}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{overlap.featureOverlapCount} overlapping features</span>
                    <span>•</span>
                    <span>{Number(overlap.overlapPercentage).toFixed(0)}% overlap</span>
                    {overlap.isConsolidatable && (
                      <>
                        <span>•</span>
                        <span className="text-green-600 font-medium">Consolidatable</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Common Features */}
              <div className="mb-4">
                <div className="text-sm font-medium text-gray-700 mb-2">
                  Common Features:
                </div>
                <div className="flex flex-wrap gap-2">
                  {overlap.commonFeatures.map((feature: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              {overlap.recommendation && (
                <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">
                        Recommendation
                      </h4>
                      <p className="text-sm text-blue-800">{overlap.recommendation}</p>
                      {overlap.potentialSavings > 0 && (
                        <p className="text-sm font-semibold text-blue-900 mt-2">
                          Potential Savings: ${Number(overlap.potentialSavings).toFixed(2)}/month
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
