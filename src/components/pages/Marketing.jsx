import React from "react";
import Layout from "./../layout/Layout";
import { Mail, Bell, Share2, Settings, Calendar, Shield } from "lucide-react";

const Marketing = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-4xl px-4 py-12 mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Marketing Policy
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Learn how we communicate with you and handle your information for
              marketing purposes
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className="grid grid-cols-1 divide-y divide-gray-100 md:grid-cols-3 md:divide-y-0 md:divide-x">
              <div className="p-6 bg-blue-50">
                <div className="flex items-center mb-4 space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Our Approach
                  </h2>
                </div>
                <p className="text-gray-600">
                  We prioritize transparency and ethical practices in all our
                  marketing communications.
                </p>
              </div>

              <div className="p-6 bg-purple-50">
                <div className="flex items-center mb-4 space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Bell className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Communications
                  </h2>
                </div>
                <p className="text-gray-600">
                  Multiple channels to keep you informed about our services and
                  updates.
                </p>
              </div>

              <div className="p-6 bg-green-50">
                <div className="flex items-center mb-4 space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Data Usage
                  </h2>
                </div>
                <p className="text-gray-600">
                  Your data is handled securely and used responsibly for
                  personalization.
                </p>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <section>
                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-900">
                  <Share2 className="w-6 h-6 mr-3 text-blue-600" />
                  Communication Channels
                </h2>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <li className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span>Email newsletters</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-purple-600" />
                      <span>SMS notifications</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span>Push notifications</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Share2 className="w-5 h-5 text-indigo-600" />
                      <span>Social media updates</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-900">
                  <Settings className="w-6 h-6 mr-3 text-blue-600" />
                  Managing Your Preferences
                </h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-600">
                    You have full control over your marketing preferences. Each
                    communication includes an unsubscribe option, and you can
                    manage all preferences through your account settings at any
                    time.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-900">
                  <Shield className="w-6 h-6 mr-3 text-blue-600" />
                  Data Protection
                </h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-600">
                    We use your interaction data to personalize content and
                    improve our services, always in compliance with our Privacy
                    Policy and applicable data protection laws.
                  </p>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <p className="text-sm text-center text-gray-500">
                Last Updated: November 25, 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Marketing;
