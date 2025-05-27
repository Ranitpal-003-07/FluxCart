import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Login';
import Dashboard from './pages/Dashboard';
import HowToUse from './pages/HowToUse';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth isSignUp />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/how-to-use" element={<HowToUse />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;