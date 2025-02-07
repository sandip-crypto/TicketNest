import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const { cart, total } = useCart();

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Clear cart and redirect
    setLoading(false);
    navigate("/order-confirmation");
  };

  return (
    <Layout>
      <div className="min-h-screen py-8 bg-gray-900">
        <div className="container max-w-4xl px-4 mx-auto">
          <h1 className="mb-8 text-3xl font-bold text-white">Checkout</h1>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Order Summary */}
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="mb-4 text-xl font-bold text-white">
                Order Summary
              </h2>
              <div className="mb-4 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between text-gray-300"
                  >
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>NPR {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span>NPR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="p-6 bg-gray-800 rounded-lg">
              <h2 className="mb-4 text-xl font-bold text-white">
                Payment Method
              </h2>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div className="space-y-2">
                  {["Credit Card", "Debit Card", "E-Sewa", "Khalti"].map(
                    (method) => (
                      <label
                        key={method}
                        className="flex items-center space-x-3 text-white cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="form-radio text-cyan-500 focus:ring-cyan-500"
                        />
                        <span>{method}</span>
                      </label>
                    )
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!paymentMethod || loading}
                  className={`w-full py-3 rounded-full font-bold text-white transition-colors ${
                    loading || !paymentMethod
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-cyan-500 hover:bg-cyan-600"
                  }`}
                >
                  {loading ? "Processing..." : "Complete Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
