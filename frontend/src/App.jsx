import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProductionPlanning from './pages/ProductionPlanning'
import InventoryControl from './pages/InventoryControl'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="planning/production" element={<ProductionPlanning />} />
            <Route path="inventory" element={<InventoryControl />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
