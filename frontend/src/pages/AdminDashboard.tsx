import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { LogOut, RefreshCw, Filter, Eye, X, Download, Calendar, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { LOGO_BASE64 } from '../assets/LogoBase64';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const handleExportCSV = () => {
        const headers = ['Ref ID', 'Ministry', 'Location', 'Official Name', 'Details', 'Phone', 'Status', 'Date', 'Verified'];
        const csvContent = [
            headers.join(','),
            ...filteredComplaints.map(c => [
                c.reference_id,
                `"${c.ministry}"`,
                `"${c.location || 'Unspecified'}"`,
                `"${c.official_name || ''}"`,
                `"${c.details.replace(/"/g, '""')}"`,
                c.phone_number || '',
                c.status,
                new Date(c.created_at).toISOString(),
                c.is_verified ? 'Yes' : 'No'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `complaints_export_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    };

    const filteredComplaints = complaints.filter(c => {
        const matchesStatus = filter === 'all' || c.status === filter;
        const complaintDate = new Date(c.created_at);
        const matchesStart = !startDate || complaintDate >= new Date(startDate);
        const matchesEnd = !endDate || complaintDate <= new Date(new Date(endDate).setHours(23, 59, 59));
        return matchesStatus && matchesStart && matchesEnd;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
    const paginatedComplaints = filteredComplaints.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const statusData = analytics ? Object.entries(analytics.by_status).map(([name, value]) => ({ name, value })) : [];
    const ministryData = analytics && analytics.by_ministry ? Object.entries(analytics.by_ministry).map(([name, value]) => ({ name, value })) : [];
    
    // Calculate location data from complaints (since backend analytics might not have it yet)
    const locationCounts = complaints.reduce((acc: any, curr: any) => {
        const loc = curr.location || 'Unspecified';
        acc[loc] = (acc[loc] || 0) + 1;
        return acc;
    }, {});
    const locationData = Object.entries(locationCounts).map(([name, value]) => ({ name, value }));

    const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

    return (
        <div className="min-h-screen bg-slate-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm gap-4">
                    <div className="flex items-center space-x-3">
                        <img src={LOGO_BASE64} alt="Logo" className="w-10 h-10 object-contain" />
                        <h1 className="text-2xl font-bold text-slate-800">Ombudsman Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={handleExportCSV} className="flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                            <Download className="w-4 h-4 mr-2" /> Export CSV
                        </button>
                        <button onClick={fetchData} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors">
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button onClick={handleLogout} className="flex items-center text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                            <LogOut className="w-4 h-4 mr-2" /> Logout
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Filters:</span>
                    </div>
                    <select
                        className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/20"
                        value={filter}
                        onChange={e => { setFilter(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="all">All Status</option>
                        <option value="submitted">Submitted</option>
                        <option value="in_review">In Review</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <input 
                            type="date" 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/20"
                            value={startDate}
                            onChange={e => { setStartDate(e.target.value); setCurrentPage(1); }}
                        />
                        <span className="text-slate-400">-</span>
                        <input 
                            type="date" 
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500/20"
                            value={endDate}
                            onChange={e => { setEndDate(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                    {(filter !== 'all' || startDate || endDate) && (
                        <button 
                            onClick={() => { setFilter('all'); setStartDate(''); setEndDate(''); setCurrentPage(1); }}
                            className="text-sm text-sky-600 hover:text-sky-700 font-medium ml-auto"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Analytics Cards */}
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <h3 className="text-slate-500 text-sm font-medium uppercase">Total Complaints</h3>
                        <p className="text-4xl font-bold text-slate-900 mt-2">{analytics?.total_complaints || 0}</p>
                        <p className="text-xs text-slate-400 mt-1">Showing {filteredComplaints.length} filtered</p>
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
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                        <h3 className="text-slate-500 text-sm font-medium uppercase mb-4">Ministry Hotspots</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ministryData} layout="vertical" margin={{ left: 40 }}>
                                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Location Hotspots Chart */}
                    <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-80">
                        <h3 className="text-slate-500 text-sm font-medium uppercase mb-4">Complaints by District</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={locationData} layout="vertical" margin={{ left: 40 }}>
                                <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                                <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} width={100} />
                                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Complaints List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-6 border-b border-slate-200">
                        <h2 className="text-lg font-bold text-slate-800">Recent Complaints</h2>
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
                                {paginatedComplaints.map((complaint) => (
                                    <tr key={complaint.reference_id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-sm text-slate-500">#{complaint.reference_id}</td>
                                        <td className="px-6 py-4 text-slate-800 font-medium">
                                            {complaint.ministry}
                                            {complaint.is_verified && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                                                </span>
                                            )}
                                        </td>
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
                                            No complaints found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredComplaints.length)}</span> of <span className="font-medium">{filteredComplaints.length}</span> results
                            </p>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                                </button>
                                <span className="text-sm font-medium text-slate-700">Page {currentPage} of {totalPages}</span>
                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <ChevronRight className="w-4 h-4 text-slate-600" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {selectedComplaint && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedComplaint(null)}>
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-semibold text-slate-600">Ministry</label>
                                    <p className="text-slate-900 mt-1 flex items-center">
                                        {selectedComplaint.ministry}
                                        {selectedComplaint.is_verified && (
                                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                                            </span>
                                        )}
                                    </p>
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
                                    <label className="text-sm font-semibold text-slate-600">Phone Number</label>
                                    <p className="text-slate-900 mt-1">{selectedComplaint.phone_number || 'Not provided'}</p>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-slate-600">Complaint Details</label>
                                <p className="text-slate-900 mt-1 whitespace-pre-wrap bg-slate-50 p-4 rounded-lg">{selectedComplaint.details}</p>
                            </div>

                            {/* Evidence Display */}
                            {selectedComplaint.evidence_data && (
                                <div>
                                    <label className="text-sm font-semibold text-slate-600">Attached Evidence</label>
                                    <div className="mt-2 border border-slate-200 rounded-lg overflow-hidden">
                                        <img 
                                            src={selectedComplaint.evidence_data} 
                                            alt="Evidence" 
                                            className="w-full h-auto max-h-96 object-contain bg-slate-50"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-slate-100 pt-4">
                                <h3 className="text-lg font-semibold text-slate-800 mb-3">Audit Log</h3>
                                {selectedComplaint.audit_logs && selectedComplaint.audit_logs.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedComplaint.audit_logs.map((log: any, idx: number) => (
                                            <div key={idx} className="flex items-start space-x-3 text-sm">
                                                <div className="w-2 h-2 rounded-full bg-slate-300 mt-1.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-slate-700">
                                                        Status changed from <span className="font-medium">{log.previous_status}</span> to <span className="font-medium text-sky-600">{log.new_status}</span>
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        {new Date(log.timestamp).toLocaleString()} by {log.changed_by}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 italic">No status changes recorded.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
