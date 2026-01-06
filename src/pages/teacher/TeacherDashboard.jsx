import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import teacherData from '../../data/teacher.json'
import classesData from '../../data/classes.json'
import assignmentsData from '../../data/assignments.json'

function TeacherDashboard({ onLogout }) {
  const navigate = useNavigate()
  const [classes] = useState(classesData)
  const [assignments] = useState(assignmentsData)

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userRole')
      navigate('/login')
    }
  }

  // Calculate class statistics
  const classStats = classes.map(cls => ({
    name: cls.name.split(' - ')[0],
    mastery: cls.averageMastery,
    students: cls.totalStudents
  }))

  // Calculate assignment completion rates
  const assignmentStats = assignments.map(assign => ({
    name: assign.title.substring(0, 15) + '...',
    completed: assign.submitted,
    pending: assign.pending,
    completionRate: Math.round((assign.submitted / assign.totalStudents) * 100)
  }))

  const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

  const getEngagementColor = (engagement) => {
    if (engagement === 'High') return 'text-green-600 bg-green-100'
    if (engagement === 'Medium') return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {teacherData.name}</h1>
              <p className="text-gray-600">{teacherData.department}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/teacher/assignment/create')}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                + Create Assignment
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('isLoggedIn')
                  localStorage.removeItem('userRole')
                  navigate('/login')
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-3xl font-bold text-gray-900">{classes.length}</p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">
                  {classes.reduce((sum, cls) => sum + cls.totalStudents, 0)}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Assignments</p>
                <p className="text-3xl font-bold text-gray-900">{assignments.length}</p>
              </div>
              <div className="text-4xl">📝</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Mastery</p>
                <p className="text-3xl font-bold text-gray-900">
                  {Math.round(classes.reduce((sum, cls) => sum + cls.averageMastery, 0) / classes.length)}%
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Class Mastery Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Class Average Mastery</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={classStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="mastery" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Assignment Completion Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Assignment Completion Rates</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={assignmentStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="completionRate" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Classes Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">My Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/teacher/class/${cls.id}`)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{cls.name}</h4>
                    <p className="text-sm text-gray-600">{cls.subject}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${getEngagementColor(cls.averageEngagement)}`}>
                    {cls.averageEngagement}
                  </span>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Average Mastery</span>
                    <span className="font-semibold text-gray-900">{cls.averageMastery}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${cls.averageMastery}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>👥 {cls.totalStudents} students</span>
                  <span className="text-primary-600 hover:text-primary-700 font-medium">
                    View Class →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Assignments</h3>
          <div className="space-y-4">
            {assignments.map((assign) => (
              <div
                key={assign.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{assign.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{assign.subject}</span>
                      <span>•</span>
                      <span>Due: {new Date(assign.dueDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{assign.submitted}/{assign.totalStudents} submitted</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900 mb-1">
                      {assign.averageScore ? `${assign.averageScore}%` : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-500">Avg. Score</div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(assign.submitted / assign.totalStudents) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default TeacherDashboard

