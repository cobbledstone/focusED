import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import studentPerformanceData from '../../data/studentPerformance.json'
import classesData from '../../data/classes.json'

function StudentDetail() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)

  useEffect(() => {
    const studentData = studentPerformanceData[studentId]
    if (studentData) {
      setStudent(studentData)
      // Set first subject as default
      const subjects = Object.keys(studentData.subjects)
      if (subjects.length > 0) {
        setSelectedSubject(subjects[0])
      }
    }
  }, [studentId])

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Student not found</p>
      </div>
    )
  }

  const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981']

  // Prepare participation chart data
  const participationChartData = student.participationData.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    quizzes: item.quizzes,
    time: item.time
  }))

  // Prepare subject mastery data for pie chart
  const subjectMasteryData = Object.entries(student.subjects).map(([key, value]) => ({
    name: key.toUpperCase(),
    value: value.mastery
  }))

  const currentSubject = selectedSubject ? student.subjects[selectedSubject] : null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/teacher/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <p className="text-gray-600">{student.email}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Overall Mastery</p>
            <p className="text-3xl font-bold text-gray-900">{student.overallMastery}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full"
                style={{ width: `${student.overallMastery}%` }}
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Engagement Index</p>
            <p className="text-3xl font-bold text-gray-900">{student.engagementIndex}</p>
            <span className={`text-xs font-semibold px-2 py-1 rounded mt-2 inline-block ${
              student.engagementIndex === 'High' ? 'bg-green-100 text-green-800' :
              student.engagementIndex === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {student.engagementIndex} Engagement
            </span>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Total Quizzes</p>
            <p className="text-3xl font-bold text-gray-900">
              {Object.values(student.subjects).reduce((sum, subj) => sum + subj.quizzesCompleted, 0)}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Avg. Score</p>
            <p className="text-3xl font-bold text-gray-900">
              {Math.round(
                Object.values(student.subjects).reduce((sum, subj) => sum + subj.averageScore, 0) /
                Object.values(student.subjects).length
              )}%
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Participation Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Participation Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={participationChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="quizzes" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Subject Mastery Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Subject Mastery Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={subjectMasteryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {subjectMasteryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Subject Performance</h3>
          <div className="flex gap-2 mb-6">
            {Object.keys(student.subjects).map((subjectKey) => (
              <button
                key={subjectKey}
                onClick={() => setSelectedSubject(subjectKey)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedSubject === subjectKey
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subjectKey.charAt(0).toUpperCase() + subjectKey.slice(1)}
              </button>
            ))}
          </div>

          {currentSubject && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Mastery</p>
                  <p className="text-2xl font-bold text-gray-900">{currentSubject.mastery}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Quizzes Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{currentSubject.quizzesCompleted}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{currentSubject.averageScore}%</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Topic Breakdown</h4>
                <div className="space-y-3">
                  {currentSubject.topics.map((topic, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{topic.name}</span>
                        <span className="text-sm font-semibold text-gray-700">{topic.mastery}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            topic.mastery >= 80 ? 'bg-green-500' :
                            topic.mastery >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${topic.mastery}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Last Score: {topic.lastScore}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {student.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                  <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                </div>
                {activity.score && (
                  <span className="text-sm font-semibold text-gray-700">{activity.score}%</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default StudentDetail

