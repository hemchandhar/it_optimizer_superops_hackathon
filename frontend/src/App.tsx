import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Licenses from './pages/Licenses';
import Workflows from './pages/Workflows';
import Hardware from './pages/Hardware';
import Storage from './pages/Storage';
import OverlapAnalysis from './pages/OverlapAnalysis';
import CloudAnalysis from './pages/CloudAnalysis';
import Reports from './pages/Reports';
import Integrations from './pages/Integrations';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/licenses" element={<Licenses />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/hardware" element={<Hardware />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/overlap" element={<OverlapAnalysis />} />
          <Route path="/cloud" element={<CloudAnalysis />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/integrations" element={<Integrations />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
