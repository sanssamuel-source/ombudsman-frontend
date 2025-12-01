import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
            const response = await axios.get(`/api/public/complaint/${refId}`);
            setComplaint(response.data);
        } catch (err) {
            setError('Complaint not found. Please check your Reference ID.');
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
