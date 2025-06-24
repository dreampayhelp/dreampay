import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { getUserById, withdrawMoney } from '../services/api';
import toast from 'react-hot-toast';
import D1 from './DeshBoardHelper/D1';

const Balance = ({ userId }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [money, setMoney] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmWithdrawal, setConfirmWithdrawal] = useState(false);
  let { id } = useParams();
  const [sum, setSum] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);
  const fetchUser = async () => {
    try {
      setLoading(true);
      id = id ? id : userId
      const result = await getUserById({ id });
      if (result.data.success) {
        setUser(result.data.user);
      } else {
        toast.error('User info not available');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Failed to fetch user data. Please check your connection.');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.plans?.length) {
      const totalIncome = user?.plans?.reduce((acc, plan) => acc + ((plan?.dailyIncome) * (plan?.dailyDeposit)), 0);
      setSum(totalIncome);
    }
  }, [user]);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [isAuthenticated, navigate]);

  const requestPayment = async () => {
    try {
      setRequestLoading(true);
      const amount = Number(money);
      if (!user?.kycVerified) {
        throw new Error('Please verify your Account Details.');
      }
      if (isNaN(amount) || amount <= 0) {
        throw new Error('Please enter a valid amount.');
      }
      if ((user?.balance) - amount < 50 ) {
              throw new Error('Account balance should be greater than 50 Rs.');
      }
      if (amount > (user?.balance)) {
        throw new Error('Insufficient balance.');
      }
      if (amount < 50) {
        throw new Error('Minimum withdraw ₹50.');
      }
      
      if (!agreeTerms) {
        throw new Error('Please ensures to agree conditions ');
      }
      
      const res = await withdrawMoney({ userId: user?._id, money: amount });
      if (res.data.success) {
        await fetchUser();
        setMoney('');
        setMessage('Withdrawal request submitted. Funds will be credited within 24 hours.');
        setShowPopup(true)
        toast.success('Withdrawal request submitted successfully.');
        setConfirmWithdrawal(false);
      } else {
        throw new Error(res.data.error);
      }
    } catch (error) {
      toast.error(error.message);
      setMessage('');
    } finally {
      setRequestLoading(false);
    }
  };

  const handleConfirmWithdrawal = () => {
    setConfirmWithdrawal(true);
  };

  const cancelWithdrawal = () => {
    setConfirmWithdrawal(false);
    setMoney('');
  };
  return (
    <div
      className="min-h-screen mt-20 flex flex-col items-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-indigo-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-900 rounded-full opacity-20 blur-3xl animate-pulse-slow"
        ></div>
        {/* Particle Effects */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle absolute rounded-full bg-indigo-400 opacity-30"
            style={{
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="flex items-center space-x-3 animate-fade-in-up">
              <svg
                className="animate-spin h-10 w-10 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-2xl font-medium text-gray-300">Loading Balance...</p>
            </div>
          </div>
        ) : (
          <>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-white mb-12 animate-fade-in-down"
              data-aos="fade-down"
            >
              Manage Your Balance
            </h1>

            {/* Account Details */}
            <div
              className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-8 flex flex-col items-center 
              transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
              data-aos="fade-up"
            >
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Account Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                <div>
                  <p className="text-gray-400">Name</p>
                  <p className="text-lg font-medium text-white">{user?.name || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400">Referral Code</p>
                  <p className="text-lg font-medium text-white">{user?.referralCode || 'N/A'}</p>
                </div>
                <div className={`border-red-700 border-2 p-4 rounded-3xl shadow-2xl ${user?.kycVerified ? ' border-green-500' : 'border-red-700'} `}>
                  <p className="text-gray-400">KYC Status</p>
                  <p
                    className={`text-lg my-2 font-medium ${user?.kycVerified ? 'text-green-400' : 'text-red-400'
                      }`}
                  >
                    {user?.kycVerified ? 'Verified' : 'Not Verified'}
                  </p>
                  {!user?.kycVerified && (
                    <Link
                      to={'/request-otp'}
                      className="bg-gradient-to-r my-3 from-teal-500 to-cyan-500 text-white px-3 py-1 
                  rounded-md hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 
                  text-sm shadow-md hover:shadow-lg"
                    >
                      Verify KYC
                    </Link>
                  )}
                </div>
                <div>
                  <p className="text-gray-400">Total Withdrawals</p>
                  <p className="text-2xl font-extrabold font-mono text-green-600">
                    ₹{user?.withdrawMoney?.reduce((sum, w) => sum + w.money, 0) || '0'}
                  </p>
                </div>
              </div>
            </div>

            {/* Balance Breakdown */}
            <div
              className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-8 flex flex-col items-center 
              transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Balance Breakdown</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex gap-[60px]">
                  <div>
                    <p className="text-gray-400">Total Balance</p>
                    <p className="text-xl font-bold text-green-400">
                      ₹{user?.balance?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total withdrawal</p>
                    <p className="text-xl font-bold text-green-400">
                      ₹{user?.withdrawMoney?.reduce((sum, w) => sum + w.money, 0) || '0'}

                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400">Packages Income</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹{sum?.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400">Referral Bonus</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹{(user?.referralBonus)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Sign Up Bonus</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹ 50
                  </p>
                </div>
                {user?.referredBy?.length > 2 && <div>
                  <p className="text-gray-400">Referred Bonus</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹ 50
                  </p>
                </div>}
                <div>
                  <p className="text-gray-400">Level Inome</p>
                  <p className="text-2xl font-bold text-green-400">
                    ₹{(user?.levelBonus)}
                  </p>
                </div>
              </div>
            </div>


            {/* {errors.terms && <p className="text-red-400 text-sm mt-1">{errors.terms} */}
            {/* Withdraw Section */}
            <div
              className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-8 flex flex-col items-center 
              transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
              data-aos="fade-up"
              data-aos-delay="200"
            >

              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Withdraw Money</h2>
              <div className="w-full max-w-md mb-6">
                <input
                  type="number"
                  value={money}
                  onChange={(e) => setMoney(e.target.value)}
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 
                  focus:border-transparent transition-all duration-200 bg-gray-700 text-gray-200 
                  placeholder-gray-400 hover:bg-gray-600 ${money && (Number(money) < 50 || Number(money) > (user?.balance || 0))
                      ? 'border-red-500'
                      : 'border-gray-600'
                    }`}
                  placeholder="Enter amount for withdrawal (min ₹100)"
                  disabled={requestLoading}
                  min="0"
                />
              </div>
              <div className="flex items-center mb-5">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  className="h-4 w-4 text-indigo-400 focus:ring-indigo-400 border-gray-600 rounded bg-gray-700"
                  disabled={loading}
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTermsPopup(true)}
                    className="text-indigo-400 hover:text-indigo-300 hover:underline"
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>
              {confirmWithdrawal ? (
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                  <button
                    onClick={requestPayment}
                    className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 
                    rounded-full focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 
                    transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform 
                    hover:-translate-y-1 flex items-center justify-center ${requestLoading ? 'opacity-75 cursor-not-allowed' : 'hover:from-green-600 hover:to-green-700'
                      }`}
                    disabled={requestLoading}
                  >
                    {requestLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Withdrawal'
                    )}
                  </button>
                  <button
                    onClick={cancelWithdrawal}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 
                    rounded-full focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2 
                    transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform 
                    hover:-translate-y-1 hover:from-red-600 hover:to-red-700"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConfirmWithdrawal}
                  className={`w-full max-w-md bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 
                  rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-offset-2 
                  transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform 
                  hover:-translate-y-1 flex items-center justify-center ${requestLoading || !money ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                    }`}
                  disabled={requestLoading || !money}
                >
                  Request Withdrawal
                </button>
              )}

              {message && (
                <p
                  className="text-green-400 text-md text-center mt-4 font-medium animate-fade-in-up"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  {message}
                </p>
              )}
              <p className="text-gray-400 text-sm text-center mt-3">
                Note: Funds will be credited within 24 hours of withdrawal request.
              </p>
              <div>
                <p className="text-red-400 mt-5">Withdrwal service tax : (5%)</p>
                <p className="text-red-400 ">Company service tax : (5%)</p>

              </div>
            </div>
            {/* Terms and Conditions Popup */}
            {showTermsPopup && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div
                  className="relative bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl w-full max-w-md border-2 border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-padding hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-center text-white mb-4">
                      Terms and Conditions
                    </h3>
                    <div className="max-h-64 overflow-y-auto text-gray-300 text-sm mb-6">
                      {terms}
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => {
                          setAgreeTerms(true);
                          setShowTermsPopup(false);
                        }}
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 hover:-translate-y-1 transition-all"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setShowTermsPopup(false)}
                        className="flex-1 bg-gray-600 text-white p-3 rounded-lg font-semibold hover:bg-gray-700 hover:-translate-y-1 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Congratulatory Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="relative bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl w-full max-w-md border-2 border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-padding hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500">
                  {/* Confetti Dots */}
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={`confetti-${i}`}
                      className={`absolute rounded-full ${i % 2 ? 'bg-teal-400' : 'bg-indigo-400'} animate-[confetti_3s_ease-out]`}
                      style={{
                        width: `${Math.random() * 6 + 4}px`,
                        height: `${Math.random() * 6 + 4}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 0.5}s`,
                      }}
                    />
                  ))}
                  <div className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 animate-[pulse_2s_infinite]">
                      Congratulations!
                    </h3>
                    <p className="text-gray-300 text-center mb-6 text-base">
                      Your Withdrawal has been successfully raised <span className="text-teal-400 font-semibold">Dream Pay</span> 
                      
                    </p>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-4 rounded-lg hover:from-teal-600 hover:to-cyan-600 hover:-translate-y-1 hover:ring-2 hover:ring-teal-400/30 transition-all text-lg font-semibold"
                    >
                      Continue earning
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div
              className="bg-gray-800 my-10 rounded-3xl shadow-lg p-8 transform hover:shadow-xl 
                hover:shadow-indigo-500/30 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 text-center">
                Recent Transactions
              </h2>
              {user?.paymentScreenshots?.length || user?.withdrawMoney?.length ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {user?.paymentScreenshots?.map((item, idx) => (
                    <D1 transaction={item} deposite={true} key={`deposit-${idx}`} />
                  ))}
                  {user?.withdrawMoney?.map((item, idx) => (
                    <D1 transaction={item} deposite={false} key={`withdraw-${idx}`} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center text-lg">
                  No recent transactions yet.
                </p>
              )}
            </div>
            {/* Transaction History */}
            <div
              className="bg-gray-800 p-8 rounded-2xl shadow-xl mb-8 flex flex-col 
              transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-200">Transaction History</h2>
                <button
                  onClick={fetchUser}
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 
                  transition-all duration-300 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
              {user?.withdrawMoney?.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-600 scrollbar-track-gray-700 pr-2">
                  {user?.withdrawMoney?.map((transaction, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center border-b border-gray-600 py-4 
                      text-gray-300 hover:bg-gray-700 transition-colors duration-300 rounded-lg px-4 
                      animate-fade-in-up"
                    >
                      <div>
                        <p className="font-medium text-white">
                          Withdrawal #{transaction._id.slice(-6)}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(transaction.withdrawDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-medium text-green-400">
                          ₹{transaction?.money?.toLocaleString()}
                        </p>
                        <p
                          className={`text-sm ${transaction.status === 'pending'
                            ? 'text-yellow-400'
                            : transaction.status === 'approved'
                              ? 'text-green-400'
                              : 'text-red-400'
                            }`}
                        >
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center text-lg">
                  No withdrawal requests yet.
                </p>
              )}
            </div>

            {/* Help Section */}
            <div
              className="bg-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center 
              transform hover:shadow-indigo-500/50 transition-all duration-300 animate-fade-in-up"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h2 className="text-2xl font-semibold text-gray-200 mb-4">Need Help?</h2>
              <p className="text-gray-400 text-center mb-6">
                For any questions about withdrawals or your account, check our FAQ or contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/faq"
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 px-6 
                  rounded-full hover:from-teal-600 hover:to-cyan-600 transition-all duration-300 
                  font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 
                  focus:ring-teal-400 focus:ring-offset-2"
                >
                  View FAQ
                </Link>
                <Link
                  to="/contact"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 
                  rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 
                  font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 
                  focus:ring-indigo-400 focus:ring-offset-2"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Custom CSS for animations and scrollbar */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulseSlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.3;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 30 - 15}px);
            opacity: 0.2;
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-indigo-600 {
          scrollbar-color: #4f46e5 #1f2937;
        }
        .scrollbar-track-gray-700 {
          scrollbar-color: #4f46e5 #1f2937;
        }
        .particle {
          animation: float linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Balance;
const terms = ` Terms & Conditions – Dream Pay 
By accessing, browsing, registering, or utilizing any services or features provided under the brand name "Dream Pay" (hereinafter referred to as "the Company"), the user explicitly consents and agrees to be unconditionally bound by the following comprehensive Terms and Conditions. These provisions govern the entirety of the user's relationship with the platform and shall supersede any prior understandings or agreements, whether verbal or written. The user affirms that their participation is fully voluntary and has been initiated without any compulsion, pressure, or misrepresentation from the Company's side or any of its associated representatives.

The Company categorically declares that it does not operate under any financial authority, government regulation, or recognized investment advisory body such as the Reserve Bank of India (RBI), Securities and Exchange Board of India (SEBI), or any other statutory institution. As such, any engagement with Dream Pay shall not be construed as an investment, loan, savings, deposit, mutual fund, chit fund, NBFC scheme, or any recognized financial instrument governed under Indian financial laws. The platform operates solely as a reward-based, performance-driven community system designed to function independently of conventional financial obligations.

All users acknowledge and accept that any financial contribution, plan purchase, or monetary transaction made within or toward the system is executed solely at the user’s own discretion, and the entire risk of gain or loss rests solely with the user. The Company does not extend any promise, warranty, or guarantee of return, income, bonus, reward, or payout of any kind, either in part or full. No assurance is provided regarding the frequency, continuity, or sustainability of payouts. Earnings are subject to variable factors including, but not limited to, system load, user performance, algorithmic evaluations, manual verifications, and internal protocols.

The user affirms that all payments made are final and non-refundable under all circumstances. Submitting a payment, uploading a receipt, or initiating a transaction shall not imply entitlement to any return or liability on part of the Company. All withdrawal requests are subject to rigorous scrutiny, manual evaluation, and may be approved or denied based on the Company’s internal policies, without any mandatory obligation to notify the user of specific reasons.

The user further agrees that any participation in team-based structures, referral systems, level incomes, or other features constitutes a performance-based mechanism and not a financial contract. The Company shall not be held responsible for any failure on part of other users, team members, or referrals. The user explicitly agrees not to hold the Company, its promoters, developers, or associates accountable for any indirect, incidental, consequential, or punitive damages, including but not limited to profit loss, data breach, system failure, or miscommunication arising out of participation in the platform.

Any misuse, misrepresentation, illegal promotion, unauthorized activity, mass spamming, fake referral practices, or violation of any local or cyber laws will lead to immediate account suspension or termination without any refund or warning. The Company reserves the sole right to revise, update, modify, or withdraw these terms at any time without prior notice.

By proceeding to register, submit details, or interact with the platform in any way, the user unequivocally affirms that they have read, understood, and agreed to the above-stated Terms & Conditions and shall not have any claim against the Company in any forum, legal or otherwise, in case of any personal, financial, or reputational loss.

If the user is not in complete agreement with the Terms & Conditions herein, they are advised to discontinue and refrain from registering or using any feature of the platform immediately.`
