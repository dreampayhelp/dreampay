import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Regiter';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import Footer from './components/Footer';
import Balance from './pages/Balance';
import RequestOTP from './pages/RequestOtp';
import VerifyOTP from './pages/VerifyOtp';
import UsersList from './pages/Admin/UsersList';
import UserDetails from './pages/Admin/UserDetails';
import Join from './pages/Join';
import About from './pages/About';
import InvestmentPackages from './pages/homeHelper/InvestmentPage';
import Profile from './pages/Admin/Profile';
import { Toaster } from 'react-hot-toast'
import StreakTracker from './pages/DeshBoardHelper/StreakTracker';
import UserPlans from './pages/DeshBoardHelper/UserPlans';
import ContactUs from './pages/ContactUs';
import D3 from './pages/DeshBoardHelper/D3';
import F1 from './pages/homeHelper/F1';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import VerifyOtp from './pages/ForgotPassword/VerifyOtp';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import ReactGA from 'react-ga4';
// Protected Route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
function App() {
  function GAListener() {
    const location = useLocation();

    useEffect(() => {
      ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

    return null;
  }
  return (
    <div className="">
      <Toaster />
      <BrowserRouter>
        <GAListener />
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/balance/:id" element={<ProtectedRoute><Balance /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-forgot-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/request-otp" element={<RequestOTP />} /> {/* Add RequestOTP route */}
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/invest" element={<InvestmentPackages />} />
            <Route path="/plans/:id" element={<UserPlans />} />
            <Route path="/plans" element={<D3 />} />
            <Route path="/streak" element={<StreakTracker />} />
            <Route path="/join/:packageId" element={<Join />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/admin/user/:userId" element={<UserDetails />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;