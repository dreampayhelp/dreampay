import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const packages = [
       { id: 1, amount: 499, dailyIncome: 32, totalIncome: 800, packageName: "Basic", returnPercentage: 60 },
       { id: 2, amount: 999, dailyIncome: 66, totalIncome: 1650, packageName: "Medium", returnPercentage: 65 },
       { id: 3, amount: 1999, dailyIncome: 136, totalIncome: 3400, packageName: "Advance", returnPercentage: 70 },
       { id: 4, amount: 3999, dailyIncome: 288, totalIncome: 7200, packageName: "Bronze", returnPercentage: 80 },
       { id: 5, amount: 7999, dailyIncome: 592, totalIncome: 14800, packageName: "Silver", returnPercentage: 85 },
       { id: 6, amount: 14999, dailyIncome: 1140, totalIncome: 28500, packageName: "Gold", returnPercentage: 90 },
       { id: 7, amount: 29999, dailyIncome: 2340, totalIncome: 58500, packageName: "Diamond", returnPercentage: 95 },
       { id: 8, amount: 49999, dailyIncome: 4000, totalIncome: 100000, packageName: "Platinum", returnPercentage: 100 }
];

const F1 = () => {
       const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
       const navigate = useNavigate()
       const handleJoinClick = (pkgId) => {
              if (!isAuthenticated) {
                     toast.error("Please signup/signin to Join ")
                     navigate("/login")
              }
              else {
                     navigate(`/join/${pkgId}`)

              }
       };

       return (
              <section className="py-16 bg-none">
                     {/* Subtle background dots */}

                     <div className="absolute inset-0 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                   <div
                                          key={i}
                                          className="absolute bg-indigo-400/10 rounded-full"
                                          style={{
                                                 width: `${Math.random() * 4 + 2}px`,
                                                 height: `${Math.random() * 4 + 2}px`,
                                                 top: `${Math.random() * 100}%`,
                                                 left: `${Math.random() * 100}%`,
                                                 animation: `float ${Math.random() * 10 + 10}s infinite`,
                                          }}
                                   />
                            ))}
                     </div>
                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <h2
                                   className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 relative after:content-[''] after:block after:w-24 after:h-1 after:bg-gradient-to-r after:from-indigo-400 after:to-purple-400 after:mx-auto after:mt-2"
                                   data-aos="fade-up"
                            >
                                   Start Earning Big
                            </h2>
                            <p
                                   className="text-center text-lg text-indigo-300 mb-12"
                                   data-aos="fade-up"
                                   data-aos-delay="100"
                            >
                                   Invest today, earn tomorrow with our premium plans!
                            </p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-6">
                                   {packages.map((pkg, index) => (
                                          <div
                                                 key={pkg.id}
                                                 className={`relative bg-gray-800/80 backdrop-blur-xl p-6 rounded-xl border-2  ${pkg.featured
                                                        ? 'bg-gradient-to-r from-teal-500/50 to-cyan-500/50 bg-clip-padding'
                                                        : 'bg-gradient-to-r from-indigo-600/50 to-purple-600/50 bg-clip-padding'
                                                        } hover:shadow-2xl hover:shadow-${pkg.featured ? 'teal' : 'indigo'
                                                        }-500/50 hover:ring-2 hover:ring-${pkg.featured ? 'teal' : 'indigo'
                                                        }-400/30 transition-all duration-500 group hover:scale-105`}
                                                 data-aos="fade-up-right"
                                                 data-aos-delay={index * 10}
                                          >
                                                 {pkg.featured && (
                                                        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs font-semibold px-4 py-1 rounded-full animate-pulse">
                                                               Recommended
                                                        </span>
                                                 )}
                                                 <h3
                                                        className={`text-4xl  font-serif  font-bold text-yellow-400 my-5 text-center group-hover:text-${pkg.featured ? 'teal' : 'indigo'
                                                               }-300 transition-colors`}
                                                 >
                                                        {pkg.packageName}
                                                 </h3>
                                                 <p
                                                        className={`text-3xl text-teal-500 backdrop-blur-sm font-bold text-${pkg.featured ? 'teal' : 'indigo'
                                                               }-400 mb-3 text-center`}
                                                 >
                                                        ₹{pkg.amount.toLocaleString()}
                                                 </p>
                                                 <p className="text-md text-gray-300 my-4 text-center">One-Time Investment</p>
                                                 <ul className="text-gray-100 font-semibold mb-6 space-y-4 text-center">
                                                        <li className="flex items-center justify-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                               </svg>
                                                               Daily Income: ₹{pkg.dailyIncome.toLocaleString()}
                                                        </li>
                                                        <li className="flex items-center justify-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                               </svg>
                                                               Total Income: ₹{pkg.totalIncome.toLocaleString()}
                                                        </li>
                                                        <li className="flex items-center justify-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                               </svg>
                                                               Return Percentage : {pkg.returnPercentage.toLocaleString()}%
                                                        </li>
                                                        <li className="flex items-center justify-center">
                                                               <svg
                                                                      className="w-5 h-5 text-green-400 mr-2"
                                                                      fill="none"
                                                                      stroke="currentColor"
                                                                      viewBox="0 0 24 24"
                                                               >
                                                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                               </svg>
                                                               Package Expiry : 25 Days
                                                        </li>
                                                 </ul>
                                                 <div >
                                                        <button
                                                               onClick={() => handleJoinClick(pkg.id)}
                                                               className={`w-full py-3 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-1 ${pkg.featured
                                                                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'
                                                                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                                                                      } ${!isAuthenticated ? 'opacity-75 cursor-not-allowed' : ''}`}

                                                        >
                                                               Join Now
                                                        </button>
                                                 </div>
                                                 {!isAuthenticated && (
                                                        <span className="absolute hidden group-hover:block bg-gray-900/90 backdrop-blur-sm text-gray-300 text-xs rounded p-2 -mt-10 w-40 text-center left-1/2 -translate-x-1/2">
                                                               Log in to join this plan
                                                        </span>
                                                 )}
                                          </div>
                                   ))}
                            </div>
                     </div>
                     {/* Custom animation for background dots */}
                     <style>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { transform: translateY(-100vh); opacity: 0.05; }
        }
      `}</style>
              </section>
       );
};

export default F1;