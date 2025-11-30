import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LogOut, RefreshCw, Filter } from 'lucide-react';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

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
            fetchData(); // Refresh data
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
                    <h1 className="text-2xl font-bold text-slate-800">Ombudsman Dashboard</h1>
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
                                    <th className="px-6 py-4">Ref ID</th>
                                    <th className="px-6 py-4">NIN</th>
                                    <th className="px-6 py-4">Ministry</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Evidence</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredComplaints.map((complaint) => (
                                    <tr key={complaint.reference_id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm font-medium text-slate-900">{complaint.reference_id}</td>
                                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">{complaint.nin || 'N/A'}</td>
                                        <td className="px-6 py-4 text-slate-600">{complaint.ministry}</td>
                                        <td className="px-6 py-4 text-slate-500 text-sm">{new Date(complaint.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            {complaint.evidence ? (
                                                <button 
                                                    onClick={() => {
                                                        const win = window.open();
                                                        win?.document.write('<img src="' + complaint.evidence + '" style="max-width:100%"/>');
                                                    }}
                                                    className="text-sky-600 hover:text-sky-800 text-sm font-medium"
                                                >
                                                    View
                                                </button>
                                            ) : (
                                                <span className="text-slate-400 text-sm">None</span>
                                            )}
                                        </td>
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
                                        </td>
                                    </tr>
                                ))}
                                {filteredComplaints.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                                            No complaints found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
