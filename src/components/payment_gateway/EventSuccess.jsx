import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";
import { CheckCircle, XCircle, Loader2, HomeIcon } from "lucide-react";

const EventSuccess = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionId, setTransactionId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");
  const decoded = base64Decode(token);

  console.log("Decoded data: ", decoded);

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post(
        "/api/v1/payment/event-payment-status",
        {
          item: decoded.transaction_uuid,
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
        setTransactionId(response.data.transaction._id);
        setTransactionType(response.data.transaction.type); // Store the type (event or concert)
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-xl">
          <Loader2 className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-spin" />
          <h2 className="text-xl font-semibold text-gray-700">
            Confirming your payment...
          </h2>
          <p className="mt-2 text-gray-500">
            Please wait while we verify your transaction
          </p>
        </div>
      </div>
    );
  }

  if (!isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-xl">
          <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Oops! Payment Confirmation Failed
          </h1>
          <p className="mb-6 text-gray-600">
            We encountered an error while confirming your payment. Our team has
            been notified and will resolve this soon.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Payment Successful!
          </h1>
          <p className="mb-6 text-gray-600">
            Thank you for your payment. Your transaction was completed
            successfully.
          </p>

          {transactionId && (
            <div className="p-4 mb-6 rounded-lg bg-gray-50">
              <p className="mb-1 text-sm text-gray-500">Transaction ID</p>
              <p className="font-mono text-gray-700">{transactionId}</p>
            </div>
          )}

          {/* Update the redirect URL based on transaction type */}
          <button
            onClick={() =>
              (window.location.href = `/ticketnest/event-ticket/${transactionId}`)
            }
            className="inline-flex items-center px-6 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventSuccess;
