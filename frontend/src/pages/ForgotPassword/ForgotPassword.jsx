import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { forgotPassword } from '../../services/api';
import { useDispatch } from 'react-redux';
import { forgotPasswordSlice } from '../../store/authSlice';

export default function ForgotPassword() {
       const [formData, setFormData] = useState({ email: '' });
       const [errors, setErrors] = useState({});
       const [loading, setLoading] = useState(false);
       const navigate = useNavigate();
       const dispatch = useDispatch()
       const validateEmail = (email) => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                     setErrors({ email: 'Please enter a valid email address' });
                     return false;
              }
              setErrors({});
              return true;
       };

       const handleChange = (e) => {
              const { name, value } = e.target;
              setFormData({ ...formData, [name]: value });
              if (name === 'email') validateEmail(value);
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              if (!validateEmail(formData.email)) return;
              let email = formData.email

              try {
                     setLoading(true);
                     const res = await forgotPassword({ email: formData.email });
                     if (res.data.success) {


                            dispatch(forgotPasswordSlice(email))
                            navigate('/verify-forgot-otp');
                            toast.success(res.data.message);


                     }
              } catch (err) {
                     const errorMessage = err.response?.data?.message || 'Failed to send OTP';
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
                                          Forgot Your <span className="text-indigo-400">Dream Pay</span> Password?
                                   </h1>
                                   <p className="text-base text-gray-300">
                                          Enter your email to receive a one-time password (OTP)
                                   </p>
                            </div>

                            <div
                                   className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-600/50 hover:shadow-indigo-500/50 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out]"
                                   data-aos="fade-up"
                                   data-aos-delay="100"
                            >
                                   <h2 className="text-2xl font-bold text-center text-white mb-6">Request OTP</h2>
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
                                                 <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                                        Email
                                                 </label>
                                                 <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        placeholder="Enter your email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className={`w-full p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400 transition-all ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                                                        required
                                                        disabled={loading}
                                                 />
                                                 {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
                                                               Sending...
                                                        </span>
                                                 ) : (
                                                        'Send OTP'
                                                 )}
                                          </button>
                                          <p className="mt-4 text-center text-sm text-gray-300">
                                                 Remember your password?{' '}
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