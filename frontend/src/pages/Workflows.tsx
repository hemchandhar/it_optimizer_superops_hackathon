import { useEffect, useState } from 'react';
import { Workflow as WorkflowIcon, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { getWorkflows, getWorkflowAnalytics, getInefficientWorkflows } from '../services/api';
import type { Workflow } from '../types/index.js';

export default function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workflowsRes, analyticsRes] = await Promise.all([
          getWorkflows(),
          getWorkflowAnalytics(),
        ]);
        setWorkflows(workflowsRes.data);
        setAnalytics(analyticsRes.data);
      } catch (error) {
        console.error('Error fetching workflows:', error);
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
        <h1 className="text-3xl font-bold text-gray-900">Workflow Management</h1>
        <p className="mt-2 text-gray-600">
          Monitor and optimize your automation workflows across platforms
        </p>
      </div>

      {/* Analytics Summary */}
      {analytics && (
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Total Workflows</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.totalWorkflows}
                </div>
              </div>
              <WorkflowIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Monthly Cost</div>
<div className="mt-2 text-3xl font-bold text-gray-900">
                  ${Number(analytics.summary.totalMonthlyCost).toFixed(2)}
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Avg Efficiency</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.averageEfficiency}%
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Inefficient</div>
                <div className="mt-2 text-3xl font-bold text-gray-900">
                  {analytics.summary.inefficientWorkflows}
                </div>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
      )}

      {/* Workflows Table */}
      <div className="rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Workflows</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Workflow Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Runs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {workflows.map((workflow) => (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <WorkflowIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{workflow.name}</div>
                        <div className="text-sm text-gray-500">{workflow.department}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                      {workflow.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{workflow.totalRuns} total</div>
                      <div className="text-xs text-green-600">
                        {workflow.successfulRuns} success
                      </div>
                      {workflow.failedRuns > 0 && (
                        <div className="text-xs text-red-600">
                          {workflow.failedRuns} failed
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            workflow.efficiencyScore < 70
                              ? 'bg-red-500'
                              : workflow.efficiencyScore < 85
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${workflow.efficiencyScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {Number(workflow.efficiencyScore).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>
                      <div>{workflow.creditsUsed} / {workflow.creditsAllotted}</div>
                      <div className="text-xs text-gray-500">
                        {((Number(workflow.creditsUsed) / Number(workflow.creditsAllotted)) * 100).toFixed(0)}% used
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    ${Number(workflow.monthlyCost).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {workflow.isInefficient ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                        <AlertCircle className="h-3 w-3" />
                        Needs Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3" />
                        Healthy
                      </span>
                    )}
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
