import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student') // 'student' or 'teacher'

  const handleSubmit = (e) => {
    e.preventDefault()
    // Dummy login - no actual authentication
    if (email && password) {
      onLogin(role)
      // Navigate based on role
      if (role === 'teacher') {
        navigate('/teacher/dashboard')
      } else {
        navigate('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-700 mb-2">focusED</h1>
          <p className="text-gray-600">Adaptive Mastery Education Platform</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Login as
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`py-3 px-4 rounded-lg border-2 font-semibold transition ${
                role === 'student'
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              👨‍🎓 Student
            </button>
            <button
              type="button"
              onClick={() => setRole('teacher')}
              className={`py-3 px-4 rounded-lg border-2 font-semibold transition ${
                role === 'teacher'
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              👨‍🏫 Teacher
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter any password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Sign In
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default Login

