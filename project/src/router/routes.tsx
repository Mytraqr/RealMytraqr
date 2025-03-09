import { createBrowserRouter } from 'react-router-dom';
import MainHome from '../pages/MainHome';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Terms from '../pages/Terms';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ErrorBoundary from '../components/ErrorBoundary';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';
import Contact from '../pages/Contact';
import ProtectedRoute from '../components/auth/ProtectedRoute';

// Guide Components
import GolfGuide from '../pages/guides/GolfGuide';
import DietGuide from '../pages/guides/DietGuide';
import MentalGuide from '../pages/guides/MentalGuide';
import StudyGuide from '../pages/guides/StudyGuide';

// Golf Traqr Components
import DashboardLayout from '../components/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Rounds from '../pages/Rounds';
import EnterRound from '../pages/EnterRound';
import CourseInformation from '../pages/CourseInformation';
import Stats from '../pages/Stats';
import ChatAnalysis from '../pages/ChatAnalysis';
import Settings from '../pages/Settings';
import Information from '../pages/Information';

// Diet Traqr Components
import DietDashboardLayout from '../components/diet/DietDashboardLayout';
import DietDashboard from '../pages/diet/DietDashboard';
import DietQuestionnaire from '../pages/diet/DietQuestionnaire';
import LogDay from '../pages/diet/LogDay';
import DietStats from '../pages/diet/DietStats';
import DietChat from '../pages/diet/DietChat';
import Goals from '../pages/diet/Goals';
import DietSettings from '../pages/diet/Settings';

// Mental Traqr Components
import MentalDashboardLayout from '../components/mental/MentalDashboardLayout';
import MentalDashboard from '../pages/mental/MentalDashboard';
import DailyLog from '../pages/mental/DailyLog';
import MentalStats from '../pages/mental/MentalStats';
import MentalSettings from '../pages/mental/Settings';

// Study Traqr Components
import StudyDashboardLayout from '../components/study/StudyDashboardLayout';
import StudyDashboard from '../pages/study/StudyDashboard';
import ActivityLog from '../pages/study/ActivityLog';
import StudyStats from '../pages/study/StudyStats';
import StudyMethods from '../pages/study/StudyMethods';
import StudyTools from '../pages/study/StudyTools';
import StudySettings from '../pages/study/StudySettings';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainHome />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/terms",
    element: <Terms />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/blog",
    element: <Blog />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
    errorElement: <ErrorBoundary />
  },
  // Guide Routes
  {
    path: "/guides/golf",
    element: <GolfGuide />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/guides/diet",
    element: <DietGuide />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/guides/mental",
    element: <MentalGuide />,
    errorElement: <ErrorBoundary />
  },
  {
    path: "/guides/study",
    element: <StudyGuide />,
    errorElement: <ErrorBoundary />
  },
  // Golf Traqr Routes
  {
    path: "/",
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "rounds", element: <Rounds /> },
      { path: "enter-round", element: <EnterRound /> },
      { path: "courses", element: <CourseInformation /> },
      { path: "stats", element: <Stats /> },
      { path: "chat", element: <ChatAnalysis /> },
      { path: "information", element: <Information /> },
      { path: "settings", element: <Settings /> }
    ]
  },
  // Diet Traqr Routes
  {
    path: "/diet",
    element: <ProtectedRoute><DietDashboardLayout /></ProtectedRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "dashboard", element: <DietDashboard /> },
      { path: "questionnaire", element: <DietQuestionnaire /> },
      { path: "log-day", element: <LogDay /> },
      { path: "stats", element: <DietStats /> },
      { path: "chat", element: <DietChat /> },
      { path: "goals", element: <Goals /> },
      { path: "settings", element: <DietSettings /> }
    ]
  },
  // Mental Traqr Routes
  {
    path: "/mental",
    element: <ProtectedRoute><MentalDashboardLayout /></ProtectedRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "dashboard", element: <MentalDashboard /> },
      { path: "daily-log", element: <DailyLog /> },
      { path: "stats", element: <MentalStats /> },
      { path: "settings", element: <MentalSettings /> }
    ]
  },
  // Study Traqr Routes
  {
    path: "/study",
    element: <ProtectedRoute><StudyDashboardLayout /></ProtectedRoute>,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "dashboard", element: <StudyDashboard /> },
      { path: "activity-log", element: <ActivityLog /> },
      { path: "stats", element: <StudyStats /> },
      { path: "methods", element: <StudyMethods /> },
      { path: "tools", element: <StudyTools /> },
      { path: "settings", element: <StudySettings /> }
    ]
  }
]);