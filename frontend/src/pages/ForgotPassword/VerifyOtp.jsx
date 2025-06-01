import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifyforgotOtp,  } from '../../services/api';
import { useSelector } from 'react-redux';
// import { verifyOtp } from '../../services/api';

export default function VerifyOtp() {
       const [otp, setotp] = useState('');
       const [errors, setErrors] = useState({});
       const [loading, setLoading] = useState(false);
       const navigate = useNavigate();
       const location = useLocation();
       const {forgotPasswordemail,isforgot} = useSelector(st => st.auth)

       useEffect(()=>{
              if(!isforgot){
                     navigate("/")
              }
       },[])

       const validateForm = () => {
              const newErrors = {};
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordemail)) {
                     newErrors.email = 'Please enter a valid email address';
              }
              if (!/^\d{6}$/.test(otp)) {
                     newErrors.otp = 'OTP must be 6 digits';
              }
              setErrors(newErrors);
              return Object.keys(newErrors).length === 0;
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              if (!validateForm()) return;

              try {
                     setLoading(true);
                     const res = await verifyforgotOtp({ email: forgotPasswordemail, otp });
                     if (res.data.success) {
                            toast.success(res.data.message);
                            navigate('/reset-password');
                     }
              } catch (err) {
                     const errorMessage = err.response?.data?.message || 'Failed to verify OTP';
                     setErrors({ server: errorMessage });
                     toast.error(errorMessage);
              } finally {
                     setLoading(false);
              }
       };

       return (
              <div className="mt-20 min-h-screen flex flex-col items-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative">
                     {/* Background dots */}
                     <div className="absolute inset-0 pointer-events-none">
                            {[...Array(15)].map((_, i) => (
                                   <div
                                          key={`dot-${i}`}
                                          className="absolute bg-indigo-400/20 rounded-full animate-[float_10s_infinite]"
                                          style={{
                                                 width: `${Math.random() * 3 + 2}px`,
                                                 height: `${Math.random() * 3 + 2}px`,
                                                 top: `${Math.random() * 100}%`,
                                                 left: `${Math.random() * 100}%`,
                                                 animationDelay: `${Math.random() * 5}s`,
                                          }}
                                   />
                            ))}
                     </div>

                     <div className="max-w-md w-full mx-auto relative z-10">
                            <div className="mb-8 text-center animate-[fadeInDown_0.8s_ease-out]" data-aos="fade-down">
                                   <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                          Verify <span className="text-indigo-400">Dream Pay</span> OTP
                                   </h1>
                                   <p className="text-base text-gray-300">
                                          Enter the 6-digit OTP sent to your email
                                   </p>
                            </div>

                            <div
                                   className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-600/50 hover:shadow-indigo-500/50 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out]"
                                   data-aos="fade-up"
                                   data-aos-delay="100"
                            >
                                   <h2 className="text-2xl font-bold text-center text-white mb-6">Verify OTP</h2>
                                   {errors.server && (
                                          <p
                                                 className="text-red-400 text-center mb-6 bg-red-900/50 p-3 rounded-lg text-sm"
                                                 data-aos="fade-up"
                                                 data-aos-delay="200"
                                          >
                                                 {errors.server}
                                          </p>
                                   )}
                                   <form onSubmit={handleSubmit} className="space-y-5">
                                          
                                          <div className="relative">
                                                 <label htmlFor="otp" className="block text-sm font-semibold text-gray-300 mb-2">
                                                        OTP
                                                 </label>
                                                 <input
                                                        type="text"
                                                        id="otp"
                                                        name="otp"
                                                        placeholder="Enter 6-digit OTP"
                                                        value={otp}
                                                        onChange={(e) => setotp(e.target.value)}
                                                        className={`w-full p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400 transition-all ${errors.otp ? 'border-red-500' : 'border-gray-600'}`}
                                                        required
                                                        disabled={loading}
                                                 />
                                                 {errors.otp && <p className="text-red-400 text-sm mt-1">{errors.otp}</p>}
                                          </div>
                                          <button
                                                 type="submit"
                                                 className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg font-semibold transition-all hover:-translate-y-1 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'}`}
                                                 disabled={loading}
                                          >
                                                 {loading ? (
                                                        <span className="flex items-center justify-center">
                                                               <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                                                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                               </svg>
                                                               Verifying...
                                                        </span>
                                                 ) : (
                                                        'Verify OTP'
                                                 )}
                                          </button>
                                          <p className="mt-4 text-center text-sm text-gray-300">
                                                 Back to{' '}
                                                 <Link to="/login" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                                                        Login
                                                 </Link>
                                          </p>
                                   </form>
                            </div>
                     </div>
              </div>
       );
}