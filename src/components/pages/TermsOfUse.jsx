import React from "react";
import Layout from "../layout/Layout";
import {
  Shield,
  User,
  FileText,
  AlertTriangle,
  Check,
  X,
  BookOpen,
  Lock,
} from "lucide-react";

const TermsOfUse = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container max-w-4xl px-4 py-12 mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block p-3 mb-4 bg-blue-100 rounded-2xl">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Terms of Use
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Please read these terms carefully before using our services
            </p>
          </div>

          <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className="p-8">
              <section className="mb-10">
                <div className="flex items-center mb-6 space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Acceptance of Terms
                  </h2>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">
                    By accessing or using TicketNest's services, you agree to be
                    bound by these Terms of Use. If you disagree with any part
                    of the terms, you may not access the service.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <div className="flex items-center mb-6 space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Acceptable Use
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="p-6 bg-green-50 rounded-xl">
                    <h3 className="mb-3 font-semibold text-gray-900">
                      Permitted Uses
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3 text-gray-600">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>Lawful purposes only</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-600">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>Personal use</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-600">
                        <Check className="w-5 h-5 text-green-600" />
                        <span>Business transactions</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-6 bg-red-50 rounded-xl">
                    <h3 className="mb-3 font-semibold text-gray-900">
                      Prohibited Uses
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3 text-gray-600">
                        <X className="w-5 h-5 text-red-600" />
                        <span>Server manipulation</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-600">
                        <X className="w-5 h-5 text-red-600" />
                        <span>Network interference</span>
                      </li>
                      <li className="flex items-center space-x-3 text-gray-600">
                        <X className="w-5 h-5 text-red-600" />
                        <span>Unauthorized access</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <div className="flex items-center mb-6 space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    User Accounts
                  </h2>
                </div>
                <div className="p-6 bg-purple-50 rounded-xl">
                  <p className="mb-4 text-gray-600">
                    When creating an account, you must provide accurate and
                    complete information. Failure to maintain accurate account
                    information may result in account termination.
                  </p>
                  <div className="flex items-center text-purple-600">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">
                      Keep your account information up to date
                    </span>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <div className="flex items-center mb-6 space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Lock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Intellectual Property
                  </h2>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl">
                  <p className="text-gray-600">
                    All content, features, and functionality available through
                    our service are the exclusive property of TicketNest and
                    protected by international copyright, trademark, and other
                    intellectual property laws.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center mb-6 space-x-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Account Termination
                  </h2>
                </div>
                <div className="p-6 bg-red-50 rounded-xl">
                  <p className="text-gray-600">
                    We reserve the right to terminate or suspend access to our
                    service immediately, without prior notice or liability, for
                    any reason whatsoever, including but not limited to a breach
                    of the Terms.
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

export default TermsOfUse;
