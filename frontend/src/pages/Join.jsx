import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { addPlan } from '../services/api';
import toast from 'react-hot-toast';
import p3 from '../assets/p4.jpg'
const packages = [
  { id: 1, amount: 499, dailyIncome: 32, totalIncome: 800, packageName: "Basic", returnPercentage: 60 },
  { id: 2, amount: 999, dailyIncome: 66, totalIncome: 1650, packageName: "Medium", returnPercentage: 65 },
  { id: 3, amount: 1999, dailyIncome: 136, totalIncome: 3400, packageName: "Custom", returnPercentage: 70 },
  { id: 4, amount: 3999, dailyIncome: 288, totalIncome: 7200, packageName: "Custom", returnPercentage: 80 },
  { id: 5, amount: 7999, dailyIncome: 592, totalIncome: 14800, packageName: "Silver", returnPercentage: 85 },
  { id: 6, amount: 14999, dailyIncome: 1140, totalIncome: 28500, packageName: "Custom", returnPercentage: 90 },
  { id: 7, amount: 29999, dailyIncome: 2740, totalIncome: 68500, packageName: "Custom", returnPercentage: 95 },
  { id: 8, amount: 49999, dailyIncome: 4000, totalIncome: 100000, packageName: "Platinum", returnPercentage: 100 }
];

const Join = () => {

  const { user } = useSelector((s) => s.auth);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const { packageId } = useParams();
  const location = useLocation();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showTermsPopup, setShowTermsPopup] = useState(false);

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


  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Clean up image preview URL
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Convert string param to number
  const selectedPackage = packages.find((p) => p.id === parseInt(packageId));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast.error('Please upload a JPEG or PNG image.');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB.');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    setConfirmUpload(false);
  };

  const uploadSst = async () => {
    try {
      setLoading(true);
      if (!image) {
        throw new Error('Please upload a payment screenshot.');
      }
      if (!agreeTerms) {
        throw new Error('Please ensures to agree conditions');
      }
      const res = await addPlan({ packageId, userId: user?._id, image });
      if (res.data.success) {
        setImage(null);
        setImagePreview(null);
        setConfirmUpload(false);
        setShowPopup(true)
        toast.success('Screenshot uploaded successfully! Awaiting confirmation.');
      } else {
        throw new Error('Failed to upload screenshot.');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen mt-10 bg-gray-900 py-12 pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
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
        {/* Package Details */}
        <div
          className="mb-12 animate-fade-in-down"
          data-aos="fade-down"
        >
          {selectedPackage ? (
            <div
              className="bg-gray-800 p-6 rounded-2xl shadow-xl text-center border border-indigo-600/50 
              transform hover:shadow-indigo-500/50 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Selected Package
              </h3>
              <p className="text-lg md:text-xl text-gray-300">
                Amount:{' '}
                <span className="font-semibold text-green-400">
                  ₹{selectedPackage.amount.toLocaleString()}
                </span>
              </p>
              <p className="text-lg md:text-xl text-gray-300">
                Daily Income:{' '}
                <span className="font-semibold text-green-400">
                  ₹{selectedPackage.dailyIncome.toLocaleString()}
                </span>
              </p>
            </div>
          ) : (
            <div
              className="bg-gray-700 p-6 rounded-2xl shadow-xl text-center border border-red-600/50"
            >
              <p className="text-lg md:text-xl text-red-400 font-semibold">
                Invalid package selected
              </p>
            </div>
          )}
        </div>

        {/* Package Benefits */}
        {selectedPackage && (
          <div
            className="mb-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Why Choose This Package?
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>
                  <span className="font-medium text-white">Passive Income:</span> Earn ₹
                  {selectedPackage.dailyIncome.toLocaleString()} daily without active management.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>
                  <span className="font-medium text-white">Referral Bonuses:</span> Boost your earnings by inviting others to join Dream Pay.
                </p>
              </li>
              <li className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>
                  <span className="font-medium text-white">Scalable Growth:</span> Upgrade to higher packages anytime to increase your returns.
                </p>
              </li>
            </ul>
          </div>
        )}

        {/* Instructions Section */}
        <div
          className="mb-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            How to Join
          </h2>
          <ol className="space-y-6 text-gray-300">
            <li className="flex items-start space-x-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-900 
                text-indigo-400 rounded-full font-semibold"
              >
                1
              </span>
              <div>
                <p className="text-lg font-medium text-white">Pay the Package Amount</p>
                <p className="text-gray-400">
                  Use the QR code below or bank transfer to pay ₹
                  {selectedPackage?.amount.toLocaleString() || '0'}.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-900 
                text-indigo-400 rounded-full font-semibold"
              >
                2
              </span>

              <div>
                <p className="text-lg font-medium text-white">Upload Payment Screenshot</p>
                <p className="text-gray-400">
                  Take a clear screenshot of the payment confirmation and upload it below.
                </p>
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-900 
                text-indigo-400 rounded-full font-semibold"
              >
                3
              </span>
              <div>
                <p className="text-lg font-medium text-white">Wait for Confirmation</p>
                <p className="text-gray-400">
                  Your package will be activated within 24 hours after verification.
                </p>
              </div>
            </li>
          </ol>
        </div>

        {/* Main Content */}
        <div
          className="bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* QR Code Section */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Deposit via QR Code
              </h2>
              <img
                src={p3}
                alt="PhonePe QR Code"
                className="w-52 h-52 mb-4 rounded-lg shadow-md border border-indigo-600/50 
                transform hover:scale-105 transition-transform duration-300"
              />
              <p className="text-gray-300 mb-1 text-lg">
                Scan to deposit your amount
              </p>
              <p className="text-gray-400 text-sm">
                Use User ID ({user?._id.slice(-8)}) in the payment reference
              </p>
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
            {/* Upload Section */}
            <div className="flex flex-col items-center text-center w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Upload Payment Screenshot
              </h2>
              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Payment Screenshot Preview"
                    className="w-48 h-48 object-contain rounded-lg border border-indigo-600/50 
                    shadow-md"
                  />
                  <button
                    onClick={clearImage}
                    className="mt-2 text-red-400 hover:text-red-300 text-sm font-medium 
                    transition-colors duration-300"
                  >
                    Remove Image
                  </button>
                </div>
              )}
              <div className="mb-6 w-full max-w-sm">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png"
                  className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200 
                  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm 
                  file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 
                  file:text-white hover:file:from-indigo-700 hover:file:to-purple-700 
                  transition-all duration-200 disabled:opacity-50 focus:outline-none 
                  focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                  disabled={loading}
                />
              </div>
              {confirmUpload ? (
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                  <button
                    onClick={uploadSst}
                    className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 
                    rounded-full focus:outline-none focus:ring-4 focus:ring-green-400 
                    focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md 
                    hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:from-green-600 hover:to-green-700'
                      }`}
                    disabled={loading}
                  >
                    {loading ? (
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
                        Uploading...
                      </span>
                    ) : (
                      'Confirm Upload'
                    )}
                  </button>
                  <button
                    onClick={() => setConfirmUpload(false)}
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
                  onClick={() => setConfirmUpload(true)}
                  className={`w-full max-w-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                  py-3 px-6 rounded-full focus:outline-none focus:ring-4 focus:ring-indigo-400 
                  focus:ring-offset-2 transition-all duration-300 font-semibold shadow-md 
                  hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center ${loading || !image ? 'opacity-75 cursor-not-allowed' : 'hover:from-indigo-700 hover:to-purple-700'
                    }`}
                  disabled={loading || !image}
                >
                  Upload Screenshot
                </button>
              )}
              <p className="text-gray-400 text-sm mt-4">
                Note: Ensure the screenshot clearly shows the payment details. Funds will be credited within 24 hours.
              </p>
            </div>
          </div>
        </div>
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
                  You have successfully joined a  <span className="text-teal-400 font-semibold">Dream Pay {selectedPackage.packageName} Package </span>

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
        {/* Alternative Payment Instructions */}
        {/* <div
          className="mt-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Alternative Payment Method
          </h2>
          <p className="text-gray-300 text-center mb-6">
            If you can't scan the QR code, use the bank details below to make the payment.
          </p>
          <div className="bg-gray-700 p-6 rounded-lg border border-indigo-600/50 text-center">
            <p className="text-gray-200 font-medium">
              Bank: Dream Pay Financial Services
            </p>
            <p className="text-gray-200 font-medium">
              Account Number: 1234-5678-9012-3456
            </p>
            <p className="text-gray-200 font-medium">
              IFSC Code: DPAY0001234
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Include your User ID ({user?._id.slice(-8)}) in the payment remarks.
            </p>
          </div>
        </div> */}

        {/* FAQ Section */}
        <div
          className="mt-12 bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 animate-fade-in-up"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <p className="text-lg font-medium text-white">
                How long does it take to process my package?
              </p>
              <p className="text-gray-400">
                Your package will be processed within 24 hours after we verify your payment screenshot.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-white">
                What should the screenshot include?
              </p>
              <p className="text-gray-400">
                The screenshot must clearly show the payment amount, date, time, and transaction ID or reference number.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-white">
                Can I upgrade my package later?
              </p>
              <p className="text-gray-400">
                Yes, you can upgrade to a higher package at any time by selecting a new package and following the same process.
              </p>
            </div>
            <div>
              <p className="text-lg font-medium text-white">
                What if my payment is not processed?
              </p>
              <p className="text-gray-400">
                Contact our support team via the{' '}
                <a
                  href="/contact"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Contact
                </a>{' '}
                page, and we'll assist you promptly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations and particles */}
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
        .particle {
          animation: float linear infinite;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Join;
const terms = ` Terms & Conditions – Dream Pay 
By accessing, browsing, registering, or utilizing any services or features provided under the brand name "Dream Pay" (hereinafter referred to as "the Company"), the user explicitly consents and agrees to be unconditionally bound by the following comprehensive Terms and Conditions. These provisions govern the entirety of the user's relationship with the platform and shall supersede any prior understandings or agreements, whether verbal or written. The user affirms that their participation is fully voluntary and has been initiated without any compulsion, pressure, or misrepresentation from the Company's side or any of its associated representatives.

The Company categorically declares that it does not operate under any financial authority, government regulation, or recognized investment advisory body such as the Reserve Bank of India (RBI), Securities and Exchange Board of India (SEBI), or any other statutory institution. As such, any engagement with Dream Pay shall not be construed as an investment, loan, savings, deposit, mutual fund, chit fund, NBFC scheme, or any recognized financial instrument governed under Indian financial laws. The platform operates solely as a reward-based, performance-driven community system designed to function independently of conventional financial obligations.

All users acknowledge and accept that any financial contribution, plan purchase, or monetary transaction made within or toward the system is executed solely at the user’s own discretion, and the entire risk of gain or loss rests solely with the user. The Company does not extend any promise, warranty, or guarantee of return, income, bonus, reward, or payout of any kind, either in part or full. No assurance is provided regarding the frequency, continuity, or sustainability of payouts. Earnings are subject to variable factors including, but not limited to, system load, user performance, algorithmic evaluations, manual verifications, and internal protocols.

The user affirms that all payments made are final and non-refundable under all circumstances. Submitting a payment, uploading a receipt, or initiating a transaction shall not imply entitlement to any return or liability on part of the Company. All withdrawal requests are subject to rigorous scrutiny, manual evaluation, and may be approved or denied based on the Company’s internal policies, without any mandatory obligation to notify the user of specific reasons.

The user further agrees that any participation in team-based structures, referral systems, level incomes, or other features constitutes a performance-based mechanism and not a financial contract. The Company shall not be held responsible for any failure on part of other users, team members, or referrals. The user explicitly agrees not to hold the Company, its promoters, developers, or associates accountable for any indirect, incidental, consequential, or punitive damages, including but not limited to profit loss, data breach, system failure, or miscommunication arising out of participation in the platform.

Any misuse, misrepresentation, illegal promotion, unauthorized activity, mass spamming, fake referral practices, or violation of any local or cyber laws will lead to immediate account suspension or termination without any refund or warning. The Company reserves the sole right to revise, update, modify, or withdraw these terms at any time without prior notice.

By proceeding to register, submit details, or interact with the platform in any way, the user unequivocally affirms that they have read, understood, and agreed to the above-stated Terms & Conditions and shall not have any claim against the Company in any forum, legal or otherwise, in case of any personal, financial, or reputational loss.

If the user is not in complete agreement with the Terms & Conditions herein, they are advised to discontinue and refrain from registering or using any feature of the platform immediately.`