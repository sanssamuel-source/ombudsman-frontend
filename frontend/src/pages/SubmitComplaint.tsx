import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ArrowLeft, Send } from 'lucide-react'

const MINISTRIES = [
  'Ministry of Health',
  'Ministry of Education',
  'Ministry of Finance',
  'Ministry of Justice',
  'Ministry of Transport',
  'Ministry of Agriculture',
  'Other'
]

export default function SubmitComplaint() {
  const navigate = useNavigate()
  const [ministry, setMinistry] = useState('')
  const [details, setDetails] = useState('')
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)
  const [referenceId, setReferenceId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post('/api/public/complaint', {
        ministry,
        details,
        contact
      })
      setReferenceId(response.data.reference_id)
    } catch (error) {
      alert('Failed to submit complaint. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (referenceId) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h2>
          <p className="text-gray-600 mb-4">Your reference ID is:</p>
          <p className="text-3xl font-mono font-bold text-blue-600 mb-6">{referenceId}</p>
          <p className="text-sm text-gray-500 mb-6">Please save this ID to track your complaint</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Submit Complaint</h1>
          <p className="text-slate-500 mb-8">Report misconduct or irregularities</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Ministry/Department
              </label>
              <select
                required
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              >
                <option value="">Select a ministry...</option>
                {MINISTRIES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Complaint Details
              </label>
              <textarea
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                placeholder="Describe the issue in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Contact (Phone Number)
              </label>
              <input
                type="tel"
                required
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                placeholder="+1234567890"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-70 flex items-center justify-center"
            >
              {loading ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" /> Submit Complaint
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
