import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SubjectPage from './pages/SubjectPage'
import Quiz from './pages/Quiz'
import Feedback from './pages/Feedback'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import ClassView from './pages/teacher/ClassView'
import StudentDetail from './pages/teacher/StudentDetail'
import CreateAssignment from './pages/teacher/CreateAssignment'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || 'student'
  })

  const handleLogin = (role) => {
    setIsLoggedIn(true)
    setUserRole(role)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userRole', role)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserRole('student')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userRole')
  }

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userRole', userRole)
    } else {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userRole')
    }
  }, [isLoggedIn, userRole])

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={<Login onLogin={handleLogin} />} 
        />
        {/* Student Routes */}
        <Route 
          path="/dashboard" 
          element={isLoggedIn && userRole === 'student' ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/subject/:subjectId" 
          element={isLoggedIn && userRole === 'student' ? <SubjectPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/quiz/:subjectId/:topicId" 
          element={isLoggedIn && userRole === 'student' ? <Quiz /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/feedback" 
          element={isLoggedIn && userRole === 'student' ? <Feedback /> : <Navigate to="/login" />} 
        />
        {/* Teacher Routes */}
        <Route 
          path="/teacher/dashboard" 
          element={isLoggedIn && userRole === 'teacher' ? <TeacherDashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teacher/class/:classId" 
          element={isLoggedIn && userRole === 'teacher' ? <ClassView /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teacher/student/:studentId" 
          element={isLoggedIn && userRole === 'teacher' ? <StudentDetail /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teacher/assignment/create" 
          element={isLoggedIn && userRole === 'teacher' ? <CreateAssignment /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App

