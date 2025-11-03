import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // <-- 1. IMPORT FOOTER
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Donate from './pages/Donate';
import Request from './pages/Request';
import OrganForm from './pages/OrganForm';
import MyProfile from './pages/MyProfile';
import BrowseDonations from './pages/BrowseDonations';
import BrowseRequests from './pages/BrowseRequests';

// This component handles the page transitions
function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/request" element={<Request />} />
        <Route path="/organ-form" element={<OrganForm />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/browse-donations" element={<BrowseDonations />} />
        <Route path="/browse-requests" element={<BrowseRequests />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main> {/* Wrap routes in main tag for clarity */}
        <AppRoutes />
      </main>
      <Footer /> {/* <-- 2. ADD GLOBAL FOOTER HERE (ONLY ONCE) */}
    </BrowserRouter>
  );
}

export default App;