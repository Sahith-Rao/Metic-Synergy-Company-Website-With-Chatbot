import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './components/Portfolio';
import Contact from './pages/Contact';
import Book from './pages/Book';
import { BookingProvider } from './contexts/BookingContext';
import BookingModal from './components/BookingModal';

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book" element={<Book />} />
            </Routes>
          </main>
          <Footer />
          <BookingModal />
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;