import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Send } from 'lucide-react';

const SubmitComplaint = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ministry: '',
        official_name: '',
        details: '',
        phone_number: '',
        nin: '',
        location: '',
        evidence: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/public/complaint', formData);
            // In a real app, we'd show a success modal or redirect to a success page
            // For MVP, we'll alert and redirect to track
            alert(`Complaint Submitted! Your Reference ID is: ${response.data.reference_id}`);
            navigate('/');
        } catch (error: any) {
            console.error('Error submitting complaint:', error);
            const errorMessage = error.response?.data?.detail || error.message || 'Unknown error';
            alert(`Failed to submit complaint. Error: ${errorMessage}. Please check your connection and try again.`);
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">National Identification Number (NIN)</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                placeholder="Enter your NIN"
                                value={formData.nin}
                                onChange={e => setFormData({ ...formData, nin: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all bg-white"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                            >
                                <option value="">Select Location</option>
                                <option value="Freetown">Freetown</option>
                                <option value="Bo">Bo</option>
                                <option value="Kenema">Kenema</option>
                                <option value="Makeni">Makeni</option>
                                <option value="Koidu">Koidu</option>
                                <option value="Port Loko">Port Loko</option>
                                <option value="Waterloo">Waterloo</option>
                                <option value="Kabala">Kabala</option>
                                <option value="Moyamba">Moyamba</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Ministry / Department</label>
                            <select
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all bg-white"
                                value={formData.ministry}
                                onChange={e => setFormData({ ...formData, ministry: e.target.value })}
                            >
                                <option value="">Select a Ministry</option>
                                <option value="Ministry of Transport and Aviation">Ministry of Transport and Aviation</option>
                                <option value="Ministry of Basic and Senior Secondary Education">Ministry of Basic and Senior Secondary Education</option>
                                <option value="Ministry of Health and Sanitation">Ministry of Health and Sanitation</option>
                                <option value="Ministry of Finance">Ministry of Finance</option>
                                <option value="Ministry of Works and Public Assets">Ministry of Works and Public Assets</option>
                                <option value="Sierra Leone Police">Sierra Leone Police</option>
                                <option value="Immigration Department">Immigration Department</option>
                                <option value="Other">Other</option>
                            </select>
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
                            <label className="block text-sm font-medium text-slate-700 mb-2">Photo Evidence (Optional)</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                onChange={e => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData({ ...formData, evidence: reader.result as string });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <p className="text-xs text-slate-500 mt-1">Upload an image (JPG, PNG) if you have evidence.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number (for SMS updates)</label>
                            <input
                                type="tel"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                placeholder="+232..."
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
