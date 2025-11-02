import { useState } from 'react';
import { FileText, Download, TrendingUp, DollarSign, Users } from 'lucide-react';
import { getExecutiveReport, getMSPReport } from '../services/api';

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [executiveReport, setExecutiveReport] = useState<any>(null);
  const [mspReport, setMSPReport] = useState<any>(null);

  const handleGenerateExecutiveReport = async () => {
    setLoading(true);
    try {
      const response = await getExecutiveReport();
      setExecutiveReport(response.data);
    } catch (error) {
      console.error('Error generating executive report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMSPReport = async () => {
    setLoading(true);
    try {
      const response = await getMSPReport();
      setMSPReport(response.data);
    } catch (error) {
      console.error('Error generating MSP report:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Insights</h1>
        <p className="mt-2 text-gray-600">
          Generate executive reports and track ROI metrics
        </p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-8">
        {/* Executive Report */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Executive Summary</h3>
                <p className="text-sm text-gray-500">High-level IT optimization metrics</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleGenerateExecutiveReport}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>

        {/* MSP Report */}
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-50 p-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">MSP Client Report</h3>
                <p className="text-sm text-gray-500">Client profitability and growth insights</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleGenerateMSPReport}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Executive Report Display */}
      {executiveReport && (
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {executiveReport.reportType}
            </h2>
            <span className="text-sm text-gray-500">
              Generated: {new Date(executiveReport.generatedAt).toLocaleString()}
            </span>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-6">
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-medium text-blue-600">IT SPEND</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                ${executiveReport.keyMetrics.totalITSpend}
              </div>
            </div>

            <div className="rounded-lg bg-green-50 p-4 border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-xs font-medium text-green-600">SAVINGS</span>
              </div>
              <div className="text-2xl font-bold text-green-900">
                ${executiveReport.keyMetrics.potentialSavings}
              </div>
            </div>

            <div className="rounded-lg bg-purple-50 p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-purple-600" />
                <span className="text-xs font-medium text-purple-600">ROI</span>
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {executiveReport.keyMetrics.roi}
              </div>
            </div>

            <div className="rounded-lg bg-yellow-50 p-4 border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                <span className="text-xs font-medium text-yellow-600">SCORE</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900">
                {executiveReport.keyMetrics.optimizationScore}/100
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Priority Recommendations
            </h3>
            <div className="space-y-3">
              {executiveReport.recommendations.map((rec: any, index: number) => (
                <div
                  key={index}
                  className="rounded-lg bg-orange-50 p-4 border border-orange-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-orange-100 p-2">
                      <TrendingUp className="h-4 w-4 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{rec.action}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.impact}</p>
                      <p className="text-sm font-semibold text-green-600 mt-2">
                        Potential Savings: ${rec.potentialSavings}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Detailed Breakdown
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-medium text-gray-900 mb-2">Licenses</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">
                      {executiveReport.detailedBreakdown.licenses.totalLicenses}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">
                      ${executiveReport.detailedBreakdown.licenses.totalCost}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilization:</span>
                    <span className="font-medium">
                      {executiveReport.detailedBreakdown.licenses.overallUtilization}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4">
                <h4 className="font-medium text-gray-900 mb-2">Workflows</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-medium">
                      {executiveReport.detailedBreakdown.workflows.totalWorkflows}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost:</span>
                    <span className="font-medium">
                      ${executiveReport.detailedBreakdown.workflows.totalMonthlyCost}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Efficiency:</span>
                    <span className="font-medium">
                      {executiveReport.detailedBreakdown.workflows.averageEfficiency}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MSP Report Display */}
      {mspReport && (
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">{mspReport.reportType}</h2>
            <span className="text-sm text-gray-500">
              Generated: {new Date(mspReport.generatedAt).toLocaleString()}
            </span>
          </div>

          <div className="space-y-6">
            {/* Client Profitability */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Client Profitability
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="text-sm font-medium text-blue-600 mb-1">Total Revenue</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {mspReport.clientProfitability.totalRevenue}
                  </div>
                </div>
                <div className="rounded-lg bg-purple-50 p-4">
                  <div className="text-sm font-medium text-purple-600 mb-1">Total Costs</div>
                  <div className="text-2xl font-bold text-purple-900">
                    ${mspReport.clientProfitability.totalCosts}
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <div className="text-sm font-medium text-green-600 mb-1">Profit Margin</div>
                  <div className="text-2xl font-bold text-green-900">
                    {mspReport.clientProfitability.profitMargin}
                  </div>
                </div>
              </div>
            </div>

            {/* Optimization Impact */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Optimization Impact
              </h3>
              <div className="rounded-lg bg-green-50 p-4 border border-green-200">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-1">
                      Current Spend
                    </div>
                    <div className="text-xl font-bold text-green-900">
                      ${mspReport.optimizationImpact.currentSpend}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-1">
                      Projected Savings
                    </div>
                    <div className="text-xl font-bold text-green-900">
                      ${mspReport.optimizationImpact.projectedSavings}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-green-700 mb-1">
                      Value Delivered
                    </div>
                    <div className="text-xl font-bold text-green-900">
                      {mspReport.optimizationImpact.valueDelivered}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
