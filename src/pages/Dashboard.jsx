import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import studentData from '../data/student.json'
import subjectsData from '../data/subjects.json'
import participationData from '../data/participation.json'
import leaderboardData from '../data/leaderboard.json'

function Dashboard({ onLogout }) {
  const navigate = useNavigate()
  const [student, setStudent] = useState(studentData)
  const [subjects, setSubjects] = useState(subjectsData)
  
  // Sort leaderboard by points (descending) and add rank
  const sortedLeaderboard = [...leaderboardData]
    .sort((a, b) => b.points - a.points)
    .map((student, index) => ({
      ...student,
      rank: index + 1
    }))

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userRole')
      navigate('/login')
    }
  }

  // Find priority topic (lowest mastery or flagged as priority)
  const getPriorityRecommendation = () => {
    let priorityTopic = null
    let minMastery = 100

    subjects.forEach(subject => {
      subject.topics.forEach(topic => {
        if (topic.priority || topic.mastery < minMastery) {
          minMastery = topic.mastery
          priorityTopic = { ...topic, subjectName: subject.name, subjectId: subject.id }
        }
      })
    })

    return priorityTopic
  }

  const priorityTopic = getPriorityRecommendation()

  const getStatusColor = (status) => {
    if (status === 'Mastered') return 'text-green-600'
    if (status === 'Improving') return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusBg = (status) => {
    if (status === 'Mastered') return 'bg-green-100'
    if (status === 'Improving') return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getSubjectIcon = (subjectId) => {
    if (subjectId === 'math') return '√'
    if (subjectId === 'physics') return '⚛'
    if (subjectId === 'cs') return '💻'
    return '📚'
  }

  // Calculate mastery percentage for circular progress
  const masteryPercentage = 78 // Updated to match design
  const masteryTrend = 4

  // Use participation data directly (already has day labels)
  const chartData = participationData

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold">F</span>
            </div>
            <span className="text-xl font-bold">focusED</span>
          </div>
          
          <nav className="space-y-2">
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 bg-gray-700 rounded-lg text-left">
              <span>🏠</span>
              <span className="font-medium">Dashboard</span>
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition text-left">
              <span>📚</span>
              <span className="font-medium">Subjects</span>
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition relative text-left">
              <span>📋</span>
              <span className="font-medium">Assignments</span>
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition text-left">
              <span>⚔️</span>
              <span className="font-medium">Duels</span>
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition text-left">
              <span>❓</span>
              <span className="font-medium">Doubts</span>
            </button>
            <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition text-left">
              <span>🏆</span>
              <span className="font-medium">Rewards</span>
            </button>
          </nav>

          <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Weekly Goal</h4>
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>15/20 Tasks Done</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-sm text-gray-600">Class 12 - Science Stream</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{student.name}</p>
                    <p className="text-xs text-gray-600">Level 12 Scholar</p>
                  </div>
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {student.name.charAt(0)}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Top Row Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Overall Mastery */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Overall Mastery</h3>
                <div className="flex items-center justify-center mb-3">
                  <div className="relative w-24 h-24">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 42}`}
                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - masteryPercentage / 100)}`}
                        className="text-green-500 transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{masteryPercentage}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-green-600 font-semibold">
                  ↑+{masteryTrend}% this week
                </p>
              </div>

              {/* Engagement Index */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Engagement Index</h3>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-3xl font-bold text-green-600 mb-2">High</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600">Top 15% of your class</p>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Leaderboard</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sortedLeaderboard.slice(0, 5).map((entry) => (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        entry.id === student.id ? 'bg-purple-50 border border-purple-200' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold w-6 text-center ${
                          entry.rank === 1 ? 'text-yellow-500' :
                          entry.rank === 2 ? 'text-gray-400' :
                          entry.rank === 3 ? 'text-orange-600' :
                          'text-gray-600'
                        }`}>
                          #{entry.rank}
                        </span>
                        <span className={`text-sm font-medium ${
                          entry.id === student.id ? 'text-purple-700 font-semibold' : 'text-gray-900'
                        }`}>
                          {entry.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {entry.points.toLocaleString()} pts
                      </span>
                    </div>
                  ))}
                </div>
                {sortedLeaderboard.length > 5 && (
                  <a href="#" className="text-xs text-gray-600 hover:text-gray-900 text-right block mt-3">
                    View All &gt;
                  </a>
                )}
              </div>
            </div>

            {/* AI Recommendation Card */}
            {priorityTopic && (
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 mb-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex gap-2 mb-3">
                      <span className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">AI Recommendation</span>
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">Priority</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3">
                      Master '{priorityTopic.name}' in {priorityTopic.subjectName}
                    </h2>
                    <p className="text-purple-100 mb-4">
                      We noticed your mastery in {priorityTopic.name} dropped to {priorityTopic.mastery}% during the last quiz. Let's fix that with a quick adaptive session.
                    </p>
                    <div className="flex items-center gap-4 text-sm text-purple-200">
                      <span className="flex items-center gap-1">
                        <span>⏱</span>
                        ~10 mins
                      </span>
                      <span className="flex items-center gap-1">
                        <span>📊</span>
                        Medium Difficulty
                      </span>
                      <span className="flex items-center gap-1">
                        <span>⭐</span>
                        +50 Points Potential
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/quiz/${priorityTopic.subjectId}/${priorityTopic.id}`)}
                    className="ml-6 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>▶</span>
                    Start Adaptive Practice
                  </button>
                </div>
              </div>
            )}

            {/* Middle Row - Subject Mastery & Participation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Subject Mastery */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">Subject Mastery</h3>
                  <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">View All</a>
                </div>
                <div className="space-y-3">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                      onClick={() => navigate(`/subject/${subject.id}`)}
                    >
                      <div className="text-2xl">{getSubjectIcon(subject.id)}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-gray-900">{subject.name}</span>
                          <span className="text-sm font-semibold text-gray-700">{subject.mastery}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                subject.status === 'Mastered' ? 'bg-green-500' :
                                subject.status === 'Improving' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${subject.mastery}%` }}
                            />
                          </div>
                          <span className={`text-xs font-semibold ${getStatusColor(subject.status)}`}>
                            {subject.status}
                          </span>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Participation Trend */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-1">Participation Trend</h3>
                <p className="text-sm text-gray-600 mb-4">Last 7 days activity</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="quizzes" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Duel Mode Card */}
            <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">⚔️ Duel Mode</h3>
                    <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">Live</span>
                  </div>
                  <p className="text-orange-100 mb-4">
                    Challenge a peer on your weak topic and win points!
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold mb-1">You</div>
                        <div className="text-xs text-orange-100">vs</div>
                        <div className="text-2xl font-bold mt-1">?</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span className="text-xl font-bold">Win 10 pts</span>
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                    Find Opponent
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
