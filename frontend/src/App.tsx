import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './components/Portfolio';
import ChatBot from './components/ChatBot';
import { ChatBotProvider } from './contexts/ChatBotContext';
import Contact from './pages/Contact';
import Book from './pages/Book';
import { BookingProvider } from './contexts/BookingContext';
import BookingModal from './components/BookingModal';
import DigitalMarketing from './pages/services/DigitalMarketing';
import Photography from './pages/services/Photography';
import Videography from './pages/services/Videography';
import BrandDevelopment from './pages/services/BrandDevelopment';
import SocialMedia from './pages/services/SocialMedia';
import ContentCreation from './pages/services/ContentCreation';
import Survey from './pages/Survey';
import VideoPage from './pages/VideoPage';
import InitialForm from './pages/InitialForm';
import { useState, useEffect } from 'react';

// Admin Components (add these to your pages folder)
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AppointmentsTab from './components/admin/AppointmentsTab';
import SurveyStatsTab from './components/admin/SurveyStatsTab';

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        // You could add an API call here to verify the token if needed
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <BookingProvider>
      <ChatBotProvider>
        <Router>
          <div className="min-h-screen text-white relative bg-black">
            <Header />
            <main>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book" element={<Book />} />
                <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                <Route path="/services/photography" element={<Photography />} />
                <Route path="/services/videography" element={<Videography />} />
                <Route path="/services/brand-development" element={<BrandDevelopment />} />
                <Route path="/services/social-media" element={<SocialMedia />} />
                <Route path="/services/content-creation" element={<ContentCreation />} />
                <Route path="/initial-form" element={<InitialForm />} />
                <Route path="/survey" element={<Survey />} />
                <Route path="/video" element={<VideoPage />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AppointmentsTab />} />
                  <Route path="appointments" element={<AppointmentsTab />} />
                  <Route path="survey-stats" element={<SurveyStatsTab />} />
                </Route>

                {/* 404 Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            <BookingModal />
            <ChatBot />
          </div>
        </Router>
      </ChatBotProvider>
    </BookingProvider>
  );
}

export default App;