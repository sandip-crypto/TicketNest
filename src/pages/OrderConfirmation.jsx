import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const OrderConfirmation = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-cyan-500">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white">
            Order Confirmed!
          </h1>
          <p className="mb-8 text-gray-400">
            Your order has been successfully placed. You can collect your items
            from the concession counter.
          </p>
          <Link
            to="/concessions"
            className="inline-block px-6 py-3 font-bold text-white transition-colors rounded-full bg-cyan-500 hover:bg-cyan-600"
          >
            Back to Concessions
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
