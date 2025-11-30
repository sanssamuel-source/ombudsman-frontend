import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LogOut, RefreshCw, Filter, Eye, X } from 'lucide-react';
import { LOGO_BASE64 } from '../assets/LogoBase64';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);

    const token = localStorage.getItem('admin_token');

    useEffect(() => {
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchData();
    }, [token, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [complaintsRes, analyticsRes] = await Promise.all([
                axios.get('/api/admin/complaints', { headers: { 'x-admin-token': token } }),
                axios.get('/api/admin/analytics', { headers: { 'x-admin-token': token } })
            ]);
            setComplaints(complaintsRes.data);
            setAnalytics(analyticsRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                localStorage.removeItem('admin_token');
                navigate('/admin');
            }
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (refId: string, newStatus: string) => {
        try {
            await axios.patch(`/api/admin/complaint/${refId}/status`,
                { status: newStatus },
                { headers: { 'x-admin-token': token } }
            );
            fetchData();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update status');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin');
    };

    const filteredComplaints = filter === 'all'
        ? complaints
        : complaints.filter(c => c.status === filter);

    const statusData = analytics ? Object.entries(analytics.by_status).map(([name, value]) => ({ name, value })) : [];
    const ministryData = analytics && analytics.by_ministry ? Object.entries(analytics.by_ministry).map(([name, value]) => ({ name, value })) : [];
    const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-3">
                        <img src={LOGO_BASE64} alt="Logo" className="w-10 h-10 object-contain" />
                        <h1 className="text-2xl font-bold text-slate-800">Ombudsman Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={fetchData} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button onClick={handleLogout} className="flex items-center text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </button>
                    </div>
                </div>

                {/* Analytics Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 text-sm font-medium uppercase">Total Complaints</h3>
                        <p className="text-4xl font-bold text-slate-900 mt-2">{analytics?.total_complaints || 0}</p>
                    </div>
                    {/* Status Chart */}
                    <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                        <h3 className="text-slate-500 text-sm font-medium uppercase mb-4">Status Distribution</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={statusData}>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {statusData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Ministry Hotspots Chart */}
                    <div className="md:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                        <h3 className="text-slate-500 text-sm font-medium uppercase mb-4">Ministry Misconduct Hotspots</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ministryData} layout="vertical" margin={{ left: 40 }}>
                                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={150} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Complaints List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-slate-800">Recent Complaints</h2>
                        <div className="flex items-center space-x-2">
                            <Filter className="w-4 h-4 text-slate-500" />
                            <select
                                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 text-sm outline-none focus:ring-2 focus:ring-sky-500/20"
                                value={filter}
                                onChange={e => setFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="submitted">Submitted</option>
                                <option value="in_review">In Review</option>
                                <option value="resolved">Resolved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Ref ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Ministry</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Location</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredComplaints.map((complaint) => (
                                    <tr key={complaint.reference_id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-slate-500">#{complaint.reference_id}</td>
                                        <td className="px-6 py-4 text-slate-800 font-medium">{complaint.ministry}</td>
                                        <td className="px-6 py-4 text-slate-600">{complaint.location || 'Unspecified'}</td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">{new Date(complaint.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize
                        ${complaint.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                                    complaint.status === 'in_review' ? 'bg-amber-100 text-amber-700' :
                                                        complaint.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                                                            'bg-red-100 text-red-700'}`}>
                                                {complaint.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => setSelectedComplaint(complaint)}
                                                    className="p-2 hover:bg-sky-50 rounded-lg text-sky-600 transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <select
                                                    className="bg-white border border-slate-200 rounded px-2 py-1 text-sm outline-none focus:border-sky-500"
                                                    value={complaint.status}
                                                    onChange={(e) => updateStatus(complaint.reference_id, e.target.value)}
                                                >
                                                    <option value="submitted">Submitted</option>
                                                    <option value="in_review">In Review</option>
                                                    <option value="resolved">Resolved</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredComplaints.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                            No complaints found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Details Modal */}
            {selectedComplaint && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedComplaint(null)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Complaint Details</h2>
                                <p className="text-sm text-slate-500 mt-1">Ref ID: #{selectedComplaint.reference_id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedComplaint(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-slate-600">Ministry</label>
                                <p className="text-slate-900 mt-1">{selectedComplaint.ministry}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600">Location</label>
                                <p className="text-slate-900 mt-1">{selectedComplaint.location || 'Unspecified'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600">Official Name</label>
                                <p className="text-slate-900 mt-1">{selectedComplaint.official_name || 'Not provided'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600">Complaint Details</label>
                                <p className="text-slate-900 mt-1 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg">{selectedComplaint.details}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                                <p className="text-slate-900 mt-1">{selectedComplaint.phone_number || 'Not provided'}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600">Submitted</label>
                                <p className="text-slate-900 mt-1">{new Date(selectedComplaint.created_at).toLocaleString()}</p>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600">Status</label>
                                <p className="mt-1">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize
                                        ${selectedComplaint.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                            selectedComplaint.status === 'in_review' ? 'bg-amber-100 text-amber-700' :
                                                selectedComplaint.status === 'resolved' ? 'bg-emerald-100 text-emerald-700' :
                                                    'bg-red-100 text-red-700'}`}>
                                        {selectedComplaint.status.replace('_', ' ')}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
