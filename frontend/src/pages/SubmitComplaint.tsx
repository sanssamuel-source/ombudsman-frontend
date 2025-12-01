import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Send, Upload, ShieldCheck } from 'lucide-react';

const SubmitComplaint = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ministry: '',
        location: '',
        official_name: '',
        details: '',
        phone_number: '',
        evidence: '', // Base64 string
        nin: ''
    });
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size too large. Please upload an image under 2MB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, evidence: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
            const response = await axios.post(`${backendUrl}/public/complaint`, formData);
            alert(`Complaint Submitted! Your Reference ID is: ${response.data.reference_id}`);
            navigate('/');
        } catch (error: any) {
            console.error('Error submitting complaint:', error);
            const errorMessage = error.response?.data?.detail || error.message || 'Unknown error';
            alert(`Failed to submit complaint. Error: ${errorMessage}. \n\nPlease ensure the Backend URL is configured correctly.`);
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
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Government Ministry</label>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                                    value={formData.ministry}
                                    onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                                >
                                    <option value="">Select Ministry...</option>
                                    <option value="Education">Ministry of Education</option>
                                    <option value="Health">Ministry of Health</option>
                                    <option value="Transport">Ministry of Transport</option>
                                    <option value="Police">Police Force</option>
                                    <option value="Energy">Ministry of Energy</option>
                                    <option value="Lands">Ministry of Lands</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">District / Location</label>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                >
                                    <option value="">Select District...</option>
                                    <option value="Freetown">Freetown (Western Area)</option>
                                    <option value="Bo">Bo District</option>
                                    <option value="Kenema">Kenema District</option>
                                    <option value="Makeni">Makeni (Bombali)</option>
                                    <option value="Kono">Kono District</option>
                                    <option value="Port Loko">Port Loko District</option>
                                    <option value="Kailahun">Kailahun District</option>
                                    <option value="Moyamba">Moyamba District</option>
                                    <option value="Pujehun">Pujehun District</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
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

                        {/* New Fields: Evidence & NIN */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <span className="flex items-center"><Upload className="w-4 h-4 mr-1"/> Photo Evidence (Optional)</span>
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                                />
                                {formData.evidence && <p className="text-xs text-green-600 mt-1">Image attached successfully.</p>}
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1"/> National ID (NIN) (Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={11}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                    placeholder="11-digit NIN"
                                    value={formData.nin}
                                    onChange={e => setFormData({ ...formData, nin: e.target.value })}
                                />
                                {formData.nin.length === 11 && <p className="text-xs text-green-600 mt-1">Format valid.</p>}
                            </div>
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
