import React, { useState } from "react";

const PaymentIntegration = () => {
  const [stripeKey, setStripeKey] = useState("");
  const [paypalClientId, setPaypalClientId] = useState("");

  const handleStripeSubmit = (e) => {
    e.preventDefault();
    console.log("Stripe API Key submitted:", stripeKey);
    // Here you would typically send this to your backend
  };

  const handlePaypalSubmit = (e) => {
    e.preventDefault();
    console.log("PayPal Client ID submitted:", paypalClientId);
    // Here you would typically send this to your backend
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-white">
        Payment Integration
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">Stripe Integration</h2>
          <form onSubmit={handleStripeSubmit}>
            <input
              type="text"
              value={stripeKey}
              onChange={(e) => setStripeKey(e.target.value)}
              placeholder="Enter Stripe API Key"
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded"
            >
              Save Stripe Key
            </button>
          </form>
        </div>
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold">PayPal Integration</h2>
          <form onSubmit={handlePaypalSubmit}>
            <input
              type="text"
              value={paypalClientId}
              onChange={(e) => setPaypalClientId(e.target.value)}
              placeholder="Enter PayPal Client ID"
              className="w-full p-2 mb-4 border rounded"
            />
            <button
              type="submit"
              className="p-2 text-white bg-blue-500 rounded"
            >
              Save PayPal Client ID
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentIntegration;
