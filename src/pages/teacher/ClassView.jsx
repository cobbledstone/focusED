import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import classesData from '../../data/classes.json'

function ClassView() {
  const { classId } = useParams()
  const navigate = useNavigate()
  const [classData, setClassData] = useState(null)

  useEffect(() => {
    const found = classesData.find(c => c.id === classId)
    setClassData(found)
  }, [classId])

  if (!classData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Class not found</p>
      </div>
    )
  }

  const getTrendIcon = (trend) => {
    if (trend === 'improving') return '📈'
    if (trend === 'declining') return '📉'
    return '➡️'
  }

  const getTrendColor = (trend) => {
    if (trend === 'improving') return 'text-green-600'
    if (trend === 'declining') return 'text-red-600'
    return 'text-gray-600'
  }

  const getMasteryColor = (mastery) => {
    if (mastery >= 80) return 'bg-green-500'
    if (mastery >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  // Prepare data for class performance chart
  const performanceData = classData.students.map((student, index) => ({
    name: student.name.split(' ')[0],
    mastery: student.mastery
  }))

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
              <h1 className="text-2xl font-bold text-gray-900">{classData.name}</h1>
              <p className="text-gray-600">{classData.subject} • {classData.totalStudents} students</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Class Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Average Mastery</p>
            <p className="text-3xl font-bold text-gray-900">{classData.averageMastery}%</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">{classData.totalStudents}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Engagement</p>
            <p className="text-3xl font-bold text-gray-900">{classData.averageEngagement}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <button
              onClick={() => navigate('/teacher/assignment/create')}
              className="w-full bg-primary-600 text-white py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              + Assign Work
            </button>
          </div>
        </div>

        {/* Class Performance Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Class Performance Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="mastery" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Students</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search students..."
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mastery</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Engagement</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Assignments</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Trend</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Active</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {classData.students.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                    onClick={() => navigate(`/teacher/student/${student.id}`)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getMasteryColor(student.mastery)}`}
                            style={{ width: `${student.mastery}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 w-12">{student.mastery}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        student.engagement === 'High' ? 'bg-green-100 text-green-800' :
                        student.engagement === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.engagement}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">
                        <span className="text-green-600 font-semibold">{student.assignmentsCompleted}</span>
                        <span className="text-gray-400"> / </span>
                        <span className="text-gray-600">{student.assignmentsCompleted + student.assignmentsPending}</span>
                        {student.assignmentsPending > 0 && (
                          <span className="ml-2 text-red-600 font-semibold">({student.assignmentsPending} pending)</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-lg ${getTrendColor(student.trend)}`}>
                        {getTrendIcon(student.trend)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {new Date(student.lastActive).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/teacher/student/${student.id}`)
                        }}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ClassView

