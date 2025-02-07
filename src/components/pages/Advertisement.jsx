import React from "react";
import Layout from "./../layout/Layout";
import {
  Monitor,
  Shield,
  Target,
  Users,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const Advertisement = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-4xl px-4 py-12 mx-auto">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Advertisement Policy
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Understanding how advertisements work on our platform
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="flex items-center mb-6 space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Monitor className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Ad Types
                  </h2>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Display advertisements</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Sponsored content</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Email promotions</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>In-app notifications</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-purple-50 rounded-xl">
                <div className="flex items-center mb-6 space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Content Guidelines
                  </h2>
                </div>
                <p className="mb-4 text-gray-600">
                  We maintain strict standards for advertisement content to
                  ensure quality and safety.
                </p>
                <div className="flex items-center text-purple-600">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">
                    Zero tolerance for misleading content
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <section className="p-6 bg-gray-50 rounded-xl">
                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-900">
                  <Target className="w-6 h-6 mr-3 text-blue-600" />
                  Targeted Advertising
                </h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-600">
                    We use advanced targeting to ensure you see relevant
                    advertisements. You can customize your ad preferences
                    anytime through your account settings.
                  </p>
                  <div className="flex items-center mt-4 text-blue-600">
                    <ExternalLink className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">
                      Manage your ad preferences
                    </span>
                  </div>
                </div>
              </section>

              <section className="p-6 bg-gray-50 rounded-xl">
                <h2 className="flex items-center mb-4 text-2xl font-semibold text-gray-900">
                  <Users className="w-6 h-6 mr-3 text-blue-600" />
                  Third-Party Partners
                </h2>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-600">
                    We work with trusted third-party ad networks to deliver some
                    advertisements. These partners adhere to strict privacy
                    standards and data protection guidelines.
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

export default Advertisement;
