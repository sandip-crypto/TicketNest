import React from "react";
import { useNavigate } from "react-router-dom";
import { XOctagon, HomeIcon, RotateCcw } from "lucide-react";

const ConcertFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <XOctagon className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Payment Failed
          </h1>
          <p className="mb-8 text-gray-600">
            There was an issue processing your payment. This could be due to
            insufficient funds, an expired card, or a temporary system issue.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center w-full px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <HomeIcon className="w-5 h-5 mr-2" />
              Return to Homepage
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            If you continue to experience issues, please contact our support
            team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConcertFailure;
