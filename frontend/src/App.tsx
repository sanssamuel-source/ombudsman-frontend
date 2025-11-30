import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackComplaint from './pages/TrackComplaint';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/submit" element={<SubmitComplaint />} />
                    <Route path="/track" element={<TrackComplaint />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
