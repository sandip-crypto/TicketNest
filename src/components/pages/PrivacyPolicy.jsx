import React from "react";
import { Shield, Lock, FileText, Mail } from "lucide-react";
import Layout from "../layout/Layout";

export const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 py-16 mx-auto max-w-7xl">
          <div className="flex flex-col items-center mb-12 text-center">
            <Shield className="w-16 h-16 mb-4 text-teal-600" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Your privacy is our top priority
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-12">
            {/* Navigation Sidebar */}
            <div className="hidden md:block md:col-span-3">
              <div className="sticky p-4 bg-white rounded-lg shadow-sm top-8">
                <nav className="space-y-2">
                  {[
                    "Privacy",
                    "Information Collection",
                    "Information Usage",
                    "Contact",
                  ].map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="block px-4 py-2 text-sm text-gray-700 transition rounded-md hover:bg-teal-50 hover:text-teal-700"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-9">
              <div className="p-8 space-y-8 bg-white shadow-sm rounded-xl">
                <section id="privacy" className="pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-6 h-6 text-teal-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Privacy
                    </h2>
                  </div>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      We at TicketNest take our customers' data seriously. The
                      data we collect through mobile App and websites are
                      property of TicketNest only. The protection of your
                      personal information and all the content you store on our
                      service are well secured and are not disclosed to any
                      third party.
                    </p>
                    <p>
                      This privacy policy explains our practices for gathering,
                      using, and disclosing the personal data of App and website
                      visitors. Your personal information is only used by us to
                      operate, maintain and improve the App/website.
                    </p>
                  </div>
                </section>

                <section
                  id="information-collection"
                  className="pb-8 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-teal-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Information Collection
                    </h2>
                  </div>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      When you use TicketNest mobile app and web services we
                      collect various personal information. This information may
                      include:
                    </p>
                    <ul className="pl-5 space-y-2 list-disc">
                      <li>Name and contact details</li>
                      <li>Location information</li>
                      <li>Payment methods and details</li>
                      <li>Usage data and preferences</li>
                      <li>Device information</li>
                    </ul>
                  </div>
                </section>

                <section
                  id="information-usage"
                  className="pb-8 border-b border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <FileText className="w-6 h-6 text-teal-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      How Information Is Used
                    </h2>
                  </div>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      The personal information collected may be used to provide
                      you with information and updates on our services. We may
                      also make you aware of new additional products, services
                      and opportunities at our premises.
                    </p>
                    <div className="p-4 rounded-lg bg-gray-50">
                      <p className="text-sm">
                        Note: TicketNest's application makes third party social
                        media features available to our users. We will not
                        ensure the security of any information you choose to
                        make public in social media features.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="contact" className="pt-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Mail className="w-6 h-6 text-teal-600" />
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Contact Us
                    </h2>
                  </div>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      If you have any queries regarding this Policy, you can
                      contact us via email at:{" "}
                      <a
                        href="mailto:support@ticketnest.com"
                        className="text-teal-600 hover:underline"
                      >
                        support@ticketnest.com
                      </a>
                    </p>
                  </div>
                </section>

                <div className="pt-8 mt-8 text-sm text-center text-gray-500 border-t border-gray-100">
                  Last Updated: November 25, 2024
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
