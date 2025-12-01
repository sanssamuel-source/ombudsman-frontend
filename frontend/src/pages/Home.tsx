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
