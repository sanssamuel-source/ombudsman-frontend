import { useNavigate } from 'react-router-dom'
import { FileText, Search, Shield } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Ombudsman Portal</h1>
          <p className="text-xl text-gray-600">Report misconduct and track your complaints</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <button
            onClick={() => navigate('/submit')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Submit Complaint</h2>
            <p className="text-gray-600">File a new complaint about misconduct</p>
          </button>

          <button
            onClick={() => navigate('/track')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Search className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Track Complaint</h2>
            <p className="text-gray-600">Check the status of your complaint</p>
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Shield className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h2>
            <p className="text-gray-600">Manage and review complaints</p>
          </button>
        </div>
      </div>
    </div>
  )
}
