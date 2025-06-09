import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

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


const InvestmentPackages = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleJoinClick = (pkgId) => {
    if (!isAuthenticated) {
      return '/login'
    } else
      return `/join/${pkgId}`;
  };
  return (
    <div className="mt-20 py-10 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          data-aos="fade-up"
        >
          Investment Opportunities
        </h2>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 text-yellow-400 animate-fade-in-down"
          data-aos="fade-down"
        >
          🔥 Dream Pay Packages 📈📊
        </h1>
        <p className="text-center text-lg sm:text-xl md:text-2xl mb-12 text-gray-300 font-medium">
          Daily ROI: <span className="text-indigo-400 font-semibold">10% for 25 Days</span>
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mx-6">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`relative bg-gray-800/80 backdrop-blur-xl p-6 rounded-xl border-2 border-teal-400 ${pkg.featured
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
                className={`text-4xl  font-mono  font-bold text-yellow-400 my-5 text-center group-hover:text-${pkg.featured ? 'teal' : 'indigo'
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
              <Link to={handleJoinClick(pkg.id)}>
                <button
                  className={`w-full py-3 rounded-full text-white text-lg font-semibold transition-all duration-300 hover:-translate-y-1 ${pkg.featured
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600'
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                    } ${!isAuthenticated ? 'opacity-75 cursor-not-allowed' : ''}`}
                  disabled={!isAuthenticated}
                >
                  Join Now
                </button>
              </Link>
              {!isAuthenticated && (
                <span className="absolute hidden group-hover:block bg-gray-900/90 backdrop-blur-sm text-gray-300 text-xs rounded p-2 -mt-10 w-40 text-center left-1/2 -translate-x-1/2">
                  Log in to join this plan
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
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
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InvestmentPackages;