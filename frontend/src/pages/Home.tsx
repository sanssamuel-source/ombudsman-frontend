import { Link } from 'react-router-dom';
import { FileText, Search, Phone, Mail, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-5xl w-full text-center space-y-8">
        {/* Logo and Header */}
        <div className="flex justify-center mb-6">
          <img 
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9Ijk1IiBmaWxsPSIjMDA4YTU5IiBzdHJva2U9IiMxNDJmMzMiIHN0cm9rZS13aWR0aD0iNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNzUiIGZpbGw9IndoaXRlIi8+PHBhdGggZD0iTTEwMCA0NUw4MCA3NUgxMjBaIiBmaWxsPSIjMDA4YTU5Ii8+PHJlY3QgeD0iNzAiIHk9Ijc1IiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiMxNDJmMzMiLz48cGF0aCBkPSJNNzAgOTBIMTMwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEzNSIgcj0iOCIgZmlsbD0iIzAwOGE1OSIvPjx0ZXh0IHg9IjUwJSIgeT0iMTcwIiBmb250LWZhbWlseT0ic2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiMxNDJmMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtd2VpZ2h0PSJib2xkIj5PTUJVRFNNQU48L3RleHQ+PC9zdmc+"
            alt="Sierra Leone Ombudsman Logo" 
            className="w-40 h-40 object-contain drop-shadow-2xl" 
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          The Office of the <span className="text-sky-400">Ombudsman</span>
        </h1>
        <p className="text-lg text-sky-300 font-medium">
          Republic of Sierra Leone
        </p>
        
        {/* Mission Statement */}
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 max-w-3xl mx-auto">
          <p className="text-slate-200 leading-relaxed">
            Our mission is to investigate maladministration and injustices within Ministries, Departments, Agencies, Higher Education Institutions, and publicly funded institutions in Sierra Leone.
          </p>
          <p className="text-slate-400 text-sm mt-3 italic">
            Current Ombudsman: Mr. Emmanuel Sahr Tondoneh Esq.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <Link
            to="/submit"
            className="group relative p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-sky-500 transition-all hover:shadow-lg hover:shadow-sky-500/20"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-sky-500/10 rounded-full group-hover:bg-sky-500/20 transition-colors">
                <FileText className="w-8 h-8 text-sky-400" />
              </div>
              <h2 className="text-2xl font-semibold">File a Complaint</h2>
              <p className="text-slate-400">Submit a complaint against a government ministry, agency, or publicly funded institution.</p>
            </div>
          </Link>

          <Link
            to="/track"
            className="group relative p-8 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all hover:shadow-lg hover:shadow-emerald-500/20"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                <Search className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold">Track Complaint</h2>
              <p className="text-slate-400">Check the status of your complaint using your Reference ID.</p>
            </div>
          </Link>
        </div>

        {/* Contact Information */}
        <div className="mt-12 p-6 bg-slate-800/40 rounded-xl border border-slate-700/50 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4 text-slate-200">Contact Us</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-sky-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400">Head Office</p>
                <p className="text-slate-200">26 Charlotte Street, Freetown</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-emerald-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400">Complaints</p>
                <p className="text-slate-200">+232-88-601523</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400">Enquiries</p>
                <p className="text-slate-200">+232-76-945926</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-slate-200 text-sm">complaint@ombudsman.gov.sl</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <Link to="/admin" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Admin Access
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
