import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordSlicenot } from '../../store/authSlice';

export default function ResetPassword() {
       const [formData, setFormData] = useState({ email: '', newPassword: '', confirmPassword: '' });
       const [errors, setErrors] = useState({});
       const [loading, setLoading] = useState(false);
       const [showPassword, setShowPassword] = useState(false);
       const [showConfirmPassword, setShowConfirmPassword] = useState(false);
       const navigate = useNavigate();
       const location = useLocation();
       const { forgotPasswordemail, isforgot } = useSelector(st => st.auth)

       useEffect(() => {
              if (!isforgot) {
                     navigate("/")
              }
       }, [])
       const dispatch = useDispatch()


       const validateForm = () => {
              const newErrors = {};
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordemail)) {
                     newErrors.email = 'Please enter a valid email address';
              }
              if (formData.newPassword.length < 8) {
                     newErrors.newPassword = 'Password must be at least 8 characters';
              }
              if (formData.newPassword !== formData.confirmPassword) {
                     newErrors.confirmPassword = 'Passwords do not match';
              }
              setErrors(newErrors);
              return Object.keys(newErrors).length === 0;
       };

       const handleChange = (e) => {
              const { name, value } = e.target;
              setFormData({ ...formData, [name]: value });
              setErrors((prev) => ({ ...prev, [name]: '' }));
       };

       const handleSubmit = async (e) => {
              e.preventDefault();
              if (!validateForm()) return;

              try {
                     setLoading(true);
                     const res = await resetPassword({
                            email: forgotPasswordemail,
                            newPassword: formData.newPassword,
                     });
                     if (res.data.success) {
                            dispatch(forgotPasswordSlicenot())
                            toast.success(res.data.message);
                            navigate('/login');
                     }
              } catch (err) {
                     const errorMessage = err.response?.data?.message || 'Failed to reset password';
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
                                          Reset Your <span className="text-indigo-400">Dream Pay</span> Password
                                   </h1>
                                   <p className="text-base text-gray-300">
                                          Enter your new password to complete the reset
                                   </p>
                            </div>

                            <div
                                   className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-indigo-600/50 hover:shadow-indigo-500/50 transition-all duration-300 animate-[fadeInUp_0.8s_ease-out]"
                                   data-aos="fade-up"
                                   data-aos-delay="100"
                            >
                                   <h2 className="text-2xl font-bold text-center text-white mb-6">Reset Password</h2>
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
                                                 <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                                                        New Password
                                                 </label>
                                                 <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        id="newPassword"
                                                        name="newPassword"
                                                        placeholder="Enter new password"
                                                        value={formData.newPassword}
                                                        onChange={handleChange}
                                                        className={`w-full p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400 transition-all ${errors.newPassword ? 'border-red-500' : 'border-gray-600'} pr-12`}
                                                        required
                                                        disabled={loading}
                                                 />
                                                 <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-[58%] -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                                        disabled={loading}
                                                 >
                                                        {showPassword ? (
                                                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.2M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21"
                                                                      />
                                                               </svg>
                                                        ) : (
                                                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                      />
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                      />
                                                               </svg>
                                                        )}
                                                 </button>
                                                 {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>}
                                          </div>
                                          <div className="relative">
                                                 <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                                                        Confirm Password
                                                 </label>
                                                 <input
                                                        type={showConfirmPassword ? 'text' : 'password'}
                                                        id="confirmPassword"
                                                        name="confirmPassword"
                                                        placeholder="Confirm new password"
                                                        value={formData.confirmPassword}
                                                        onChange={handleChange}
                                                        className={`w-full p-3 border rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:ring-indigo-400 focus:border-indigo-400 transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} pr-12`}
                                                        required
                                                        disabled={loading}
                                                 />
                                                 <button
                                                        type="button"
                                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                        className="absolute right-3 top-[58%] -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                                        disabled={loading}
                                                 >
                                                        {showConfirmPassword ? (
                                                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.2M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.79m0 0L21 21"
                                                                      />
                                                               </svg>
                                                        ) : (
                                                               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                      />
                                                                      <path
                                                                             strokeLinecap="round"
                                                                             strokeLinejoin="round"
                                                                             strokeWidth="2"
                                                                             d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                      />
                                                               </svg>
                                                        )}
                                                 </button>
                                                 {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
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
                                                               Resetting...
                                                        </span>
                                                 ) : (
                                                        'Reset Password'
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