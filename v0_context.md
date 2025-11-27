# Project Context for v0.dev

Here is the current code for my React application. I want to improve the UI/UX.

## tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                },
                secondary: {
                    50: '#f8fafc',
                    900: '#0f172a',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
```

## src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 antialiased;
  }
}
```

## src/App.tsx
```tsx
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
```

## src/pages/Home.tsx
```tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, FileText, Search } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
            <div className="max-w-4xl w-full text-center space-y-8">
                <div className="flex justify-center mb-6">
                    <Shield className="w-20 h-20 text-sky-500" />
                </div>
                <h1 className="text-5xl font-bold tracking-tight">
                    Ombudsman <span className="text-sky-500">Digital Portal</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                    A secure, transparent platform for citizens to report public service issues and track their resolution.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-12">
                    <Link to="/submit" className="group relative p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all hover:shadow-lg hover:shadow-sky-500/20">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-sky-500/10 rounded-full group-hover:bg-sky-500/20 transition-colors">
                                <FileText className="w-8 h-8 text-sky-400" />
                            </div>
                            <h2 className="text-2xl font-semibold">File a Complaint</h2>
                            <p className="text-slate-400">Submit a new complaint against a ministry or official securely.</p>
                        </div>
                    </Link>

                    <Link to="/track" className="group relative p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="p-4 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                                <Search className="w-8 h-8 text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-semibold">Track Status</h2>
                            <p className="text-slate-400">Check the progress of an existing complaint using your Reference ID.</p>
                        </div>
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-700/50">
                    <Link to="/admin" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                        Admin Access
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
```

## src/pages/SubmitComplaint.tsx
```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { ArrowLeft, Send } from 'lucide-react';

const SubmitComplaint = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ministry: '',
        official_name: '',
        details: '',
        phone_number: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/public/complaint', formData);
            alert(`Complaint Submitted! Your Reference ID is: ${response.data.reference_id}`);
            navigate('/');
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Failed to submit complaint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate('/')} className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </button>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">File a Complaint</h1>
                        <p className="text-slate-500 mt-2">Please provide details about the incident. Your privacy is important to us.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Ministry / Department</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                placeholder="e.g. Ministry of Transport"
                                value={formData.ministry}
                                onChange={e => setFormData({ ...formData, ministry: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Official's Name (if known)</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                placeholder="Name of the official"
                                value={formData.official_name}
                                onChange={e => setFormData({ ...formData, official_name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Complaint Details</label>
                            <textarea
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                                placeholder="Describe what happened..."
                                value={formData.details}
                                onChange={e => setFormData({ ...formData, details: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number (for SMS updates)</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                placeholder="+1234567890"
                                value={formData.phone_number}
                                onChange={e => setFormData({ ...formData, phone_number: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : (
                                <>
                                    <span>Submit Complaint</span>
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitComplaint;
```

## src/pages/TrackComplaint.tsx
```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { ArrowLeft, Search, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const TrackComplaint = () => {
    const navigate = useNavigate();
    const [refId, setRefId] = useState('');
    const [complaint, setComplaint] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setComplaint(null);
        try {
            const response = await api.get(`/public/complaint/${refId}`);
            setComplaint(response.data);
        } catch (error) {
            setError('Complaint not found or invalid reference ID');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'submitted': return 'text-blue-500 bg-blue-50';
            case 'in_review': return 'text-amber-500 bg-amber-50';
            case 'resolved': return 'text-emerald-500 bg-emerald-50';
            case 'rejected': return 'text-red-500 bg-red-50';
            default: return 'text-slate-500 bg-slate-50';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'submitted': return <Clock className="w-6 h-6" />;
            case 'in_review': return <Search className="w-6 h-6" />;
            case 'resolved': return <CheckCircle className="w-6 h-6" />;
            case 'rejected': return <XCircle className="w-6 h-6" />;
            default: return <AlertCircle className="w-6 h-6" />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-2xl mx-auto">
                <button onClick={() => navigate('/')} className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </button>

                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Track Complaint</h1>
                        <p className="text-slate-500 mt-2">Enter your Reference ID to check the status.</p>
                    </div>

                    <form onSubmit={handleTrack} className="flex gap-4 mb-8">
                        <input
                            type="text"
                            required
                            className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all uppercase"
                            placeholder="REF-1234..."
                            value={refId}
                            onChange={e => setRefId(e.target.value)}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-70"
                        >
                            {loading ? 'Checking...' : 'Track'}
                        </button>
                    </form>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            {error}
                        </div>
                    )}

                    {complaint && (
                        <div className="border-t border-slate-100 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Status</h3>
                                    <div className={`flex items-center space-x-2 mt-1 px-3 py-1 rounded-full w-fit ${getStatusColor(complaint.status)}`}>
                                        {getStatusIcon(complaint.status)}
                                        <span className="font-semibold capitalize">{complaint.status.replace('_', ' ')}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Date Filed</h3>
                                    <p className="text-slate-900 font-medium mt-1">{new Date(complaint.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Ministry</h3>
                                    <p className="text-slate-900 text-lg">{complaint.ministry}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Details</h3>
                                    <p className="text-slate-700 bg-slate-50 p-4 rounded-lg mt-1">{complaint.details}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackComplaint;
```

## src/pages/AdminLogin.tsx
```tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await api.post('/admin/login', { token });
            localStorage.setItem('admin_token', token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid token');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-sky-500/10 rounded-full">
                        <Lock className="w-8 h-8 text-sky-500" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
                <p className="text-slate-400 text-center mb-8">Enter your secure token to continue.</p>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                            placeholder="Admin Token"
                            value={token}
                            onChange={e => setToken(e.target.value)}
                        />
                    </div>
                    {error && <div className="text-red-400 text-center">{error}</div>}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                        {loading ? 'Verifying...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
```
