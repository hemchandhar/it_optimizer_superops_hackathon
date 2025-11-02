import { useEffect, useState } from 'react';
import { Settings, Cloud, Workflow, Database, CheckCircle, RefreshCw } from 'lucide-react';
import { getIntegrations, syncIntegration } from '../services/api';

export default function Integrations() {
  const [integrations, setIntegrations] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      const response = await getIntegrations();
      setIntegrations(response.data);
    } catch (error) {
      console.error('Error fetching integrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (integrationName: string) => {
    setSyncing(integrationName);
    try {
      await syncIntegration(integrationName);
      alert(`Successfully synced data from ${integrationName}`);
    } catch (error) {
      console.error('Error syncing integration:', error);
      alert(`Failed to sync ${integrationName}`);
    } finally {
      setSyncing(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cloud Platforms':
        return Cloud;
      case 'Workflow Automation':
        return Workflow;
      case 'Storage':
        return Database;
      default:
        return Settings;
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <p className="mt-2 text-gray-600">
          Connect your enterprise systems to sync data automatically
        </p>
      </div>

      {/* Integration Categories */}
      {integrations && (
        <div className="space-y-8">
          {/* License Management */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              License Management Systems
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {integrations.licenseManagement.map((integration: any, index: number) => (
                <IntegrationCard
                  key={index}
                  integration={integration}
                  syncing={syncing}
                  onSync={handleSync}
                />
              ))}
            </div>
          </div>

          {/* Cloud Platforms */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cloud Platforms</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {integrations.cloudPlatforms.map((integration: any, index: number) => (
                <IntegrationCard
                  key={index}
                  integration={integration}
                  syncing={syncing}
                  onSync={handleSync}
                />
              ))}
            </div>
          </div>

          {/* Workflow Automation */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Workflow Automation
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {integrations.workflowAutomation.map((integration: any, index: number) => (
                <IntegrationCard
                  key={index}
                  integration={integration}
                  syncing={syncing}
                  onSync={handleSync}
                />
              ))}
            </div>
          </div>

          {/* Storage */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Storage Solutions</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {integrations.storage.map((integration: any, index: number) => (
                <IntegrationCard
                  key={index}
                  integration={integration}
                  syncing={syncing}
                  onSync={handleSync}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface IntegrationCardProps {
  integration: any;
  syncing: string | null;
  onSync: (name: string) => void;
}

function IntegrationCard({ integration, syncing, onSync }: IntegrationCardProps) {
  const isSyncing = syncing === integration.name;

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-2">
            <Settings className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{integration.name}</h3>
            <p className="text-xs text-gray-500">{integration.category}</p>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            integration.status === 'available'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {integration.status === 'available' && (
            <CheckCircle className="h-3 w-3" />
          )}
          {integration.status}
        </span>
      </div>

      <button
        onClick={() => onSync(integration.name)}
        disabled={isSyncing}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
        {isSyncing ? 'Syncing...' : 'Sync Data'}
      </button>
    </div>
  );
}
