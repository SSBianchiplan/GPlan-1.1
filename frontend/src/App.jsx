import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import FinancialPlanning from './pages/FinancialPlanning';
import Inventory from './pages/Inventory';
import Audits from './pages/Audits';
import Orders from './pages/Orders';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/financial-planning" element={<FinancialPlanning />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/audits" element={<Audits />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
