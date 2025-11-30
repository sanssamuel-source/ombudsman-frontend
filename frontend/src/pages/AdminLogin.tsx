import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, we'd verify with backend, but for MVP we just store it
        // The backend will reject invalid tokens anyway
        if (token) {
            localStorage.setItem('admin_token', token);
            navigate('/admin/dashboard');
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
                    <button
                        type="submit"
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-lg transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
