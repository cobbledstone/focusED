# FocusED - Adaptive Mastery Education Platform

A clickable, semi-functional prototype of an adaptive learning platform built with React, Vite, and Tailwind CSS.

## 🎯 Overview

FocusED is a student-side prototype that demonstrates adaptive learning behavior using mock data. The platform adapts quiz difficulty based on student performance and provides personalized recommendations.

## ✨ Features

- **Student Dashboard** with mastery tracking, engagement metrics, and AI recommendations
- **Adaptive Quiz System** that adjusts difficulty based on performance
- **Subject & Topic Navigation** for organized learning paths
- **Performance Feedback** with personalized recommendations
- **Mock Data System** using local JSON files (no backend required)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **Local JSON** - Mock database

## 📦 Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🚀 Usage

### Login
- Enter any email and password (no authentication required for demo)
- Click "Sign In" to access the dashboard

### Dashboard
- View overall mastery percentage (circular progress)
- Check engagement index and rewards
- See AI recommendations for priority topics
- Browse subject mastery levels
- View participation trends

### Taking a Quiz
1. Navigate to a subject from the dashboard
2. Select a topic
3. Answer 5-7 questions (difficulty adapts based on previous performance)
4. View results and feedback
5. Get recommendations for next steps

### Adaptive Logic
The system uses simple rule-based adaptivity:
- **Score < 50%** → Next quiz: Easy difficulty
- **Score 50-75%** → Next quiz: Medium difficulty
- **Score > 75%** → Next quiz: Hard difficulty

## 📁 Project Structure

```
focused-adaptive-learning/
├── src/
│   ├── data/              # Mock JSON data files
│   │   ├── student.json
│   │   ├── subjects.json
│   │   ├── questions_easy.json
│   │   ├── questions_medium.json
│   │   ├── questions_hard.json
│   │   └── participation.json
│   ├── pages/             # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── SubjectPage.jsx
│   │   ├── Quiz.jsx
│   │   └── Feedback.jsx
│   ├── utils/             # Utility functions
│   │   └── storage.js
│   ├── App.jsx            # Main app with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎨 Key Components

### Dashboard
- Overall Mastery circular progress indicator
- Engagement Index (High/Medium/Low)
- Leaderboard & Points display
- AI Recommendation card with priority topics
- Subject Mastery section with progress bars
- Participation trend chart
- Duel Mode card (UI only)

### Quiz System
- Adaptive difficulty selection
- Progress tracking
- Question-by-question navigation
- Score calculation
- Results summary

### Feedback System
- Performance analysis
- Difficulty recommendations
- Next topic suggestions
- Revision prompts for low scores

## 📝 Mock Data

All data is stored in JSON files in `src/data/`:
- **student.json** - Student profile and stats
- **subjects.json** - Subjects, topics, and mastery levels
- **questions_*.json** - Questions grouped by difficulty
- **participation.json** - Participation trend data

## 🔧 Development

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## ⚠️ Important Notes

- This is a **prototype/demo** - no backend, authentication, or real ML
- All data is **mock data** stored in local JSON files
- Quiz results are stored in **localStorage** (browser only)
- The adaptive logic is **rule-based**, not machine learning
- Designed for demonstration purposes

## 🎯 Demo Flow

1. **Login** → Enter any credentials
2. **Dashboard** → View stats and recommendations
3. **Subject** → Click on a subject (e.g., Computer Science)
4. **Topic** → Select a topic (e.g., While Loops)
5. **Quiz** → Answer questions (difficulty adapts)
6. **Feedback** → See results and recommendations
7. **Repeat** → Try different topics to see adaptivity

## 📊 Adaptive Behavior Demo

To see the adaptive system in action:
1. Take a quiz and score below 50%
2. Take the same topic quiz again → Should get easier questions
3. Score above 75%
4. Take the quiz again → Should get harder questions

## 🤝 Contributing

This is a prototype project. Feel free to extend it with:
- More questions and topics
- Additional subjects
- Enhanced UI components
- More sophisticated adaptive rules

## 📄 License

This project is created for educational/demonstration purposes.

---

**Built with ❤️ for adaptive learning demonstration**

