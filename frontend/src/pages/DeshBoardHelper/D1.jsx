import React from 'react';

const D1 = ({ transaction, deposite }) => {
  // Simplify date formatting using JavaScript's Date object
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="flex p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-md mx-auto">
      {deposite ? (
        <div className="">
          <p className="text-blue-600 text-[12px] mb-[4px] ">
            Deposit on DreamPay
          </p>
          <div className="flex justify-between items-center w-full">

            <div className="flex items-center space-x-3">


              <p className="text-green-600 text-lg font-semibold">
                + ₹{transaction.money?.toLocaleString()}
              </p>
            </div>
            <p className="text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded">
              {formatDate(transaction.paymentDate)}
            </p>
          </div>
        </div>

      ) : (
        <div className="">
          <p className="text-red-600 text-[12px] mb-[4px] ">
            Withdraw from DreamPay
          </p>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-3">

              <p className="text-red-600 text-lg font-semibold">
                - ₹{transaction.money?.toLocaleString()}
              </p>
            </div>
            <p className="text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded">
              {formatDate(transaction.withdrawDate)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default D1;