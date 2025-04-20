import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import { BookingProvider } from './contexts/BookingContext';
import { ChatBotProvider } from './contexts/ChatBotContext';
import ScrollToTop from './ScrollToTop';

// Eagerly load only the most critical components needed for initial render
// All other components are lazy-loaded to reduce initial bundle size

// Lazy-loaded primary pages (still high priority but not needed for LCP)
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Book = lazy(() => import('./pages/Book'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Portfolio = lazy(() => import('./components/Portfolio'));

// Lazy-loaded service pages (lower priority, load only when user navigates to specific service)
const DigitalMarketing = lazy(() => import('./pages/services/DigitalMarketing'));
const Photography = lazy(() => import('./pages/services/Photography'));
const Videography = lazy(() => import('./pages/services/Videography'));
const BrandDevelopment = lazy(() => import('./pages/services/BrandDevelopment'));
const SocialMedia = lazy(() => import('./pages/services/SocialMedia'));
const ContentCreation = lazy(() => import('./pages/services/ContentCreation'));

// Lazy-loaded non-critical features
const Survey = lazy(() => import('./pages/Survey'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const InitialForm = lazy(() => import('./pages/InitialForm'));
const BookingModal = lazy(() => import('./components/BookingModal'));
const ChatBot = lazy(() => import('./components/ChatBot'));

// Admin components bundle (separate chunk, rarely used by regular visitors)
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AppointmentsTab = lazy(() => import('./components/admin/AppointmentsTab'));
const SurveyStatsTab = lazy(() => import('./components/admin/SurveyStatsTab'));

// Simple loading fallback component
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-full bg-gray-800 h-12 w-12"></div>
      <div className="flex-1 space-y-4 py-1">
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  </div>
);

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
          <ScrollToTop />
          <div className="min-h-screen text-white relative bg-black">
            <Header />
            <main>
              {/* Wrap routes in Suspense to handle lazy loading */}
              <Suspense fallback={<PageLoadingFallback />}>
                <Routes>
                  {/* Home route is eagerly loaded for fastest LCP */}
                  <Route path="/" element={<Home />} />
                  
                  {/* Primary pages - lazy loaded but high priority */}
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/book" element={<Book />} />
                  
                  {/* Service-specific pages - lazy loaded, lower priority */}
                  <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
                  <Route path="/services/photography" element={<Photography />} />
                  <Route path="/services/videography" element={<Videography />} />
                  <Route path="/services/brand-development" element={<BrandDevelopment />} />
                  <Route path="/services/social-media" element={<SocialMedia />} />
                  <Route path="/services/content-creation" element={<ContentCreation />} />
                  
                  {/* Infrequently used pages */}
                  <Route path="/initial-form" element={<InitialForm />} />
                  <Route path="/survey" element={<Survey />} />
                  <Route path="/video" element={<VideoPage />} />

                  {/* Admin Routes - separate code chunk */}
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

                  {/* 404 Page */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            {/* Lazy load interactive components with separate Suspense boundary */}
            <Suspense fallback={null}>
              <BookingModal />
              <ChatBot />
            </Suspense>
          </div>
        </Router>
      </ChatBotProvider>
    </BookingProvider>
  );
}

export default App;