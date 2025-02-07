import React from "react";
import { Cookie, Settings, List, MousePointer } from "lucide-react";
import Layout from "../layout/Layout";

export const CookiePolicy = () => {
  const cookieTypes = [
    {
      title: "Essential Cookies",
      description: "Required for basic website functionality",
      icon: <Cookie className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Functionality Cookies",
      description: "Remember your preferences and settings",
      icon: <Settings className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Analytics Cookies",
      description: "Help us understand how visitors use our site",
      icon: <List className="w-6 h-6 text-teal-600" />,
    },
    {
      title: "Advertising Cookies",
      description: "Used to deliver relevant advertisements",
      icon: <MousePointer className="w-6 h-6 text-teal-600" />,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container px-4 py-16 mx-auto max-w-7xl">
          <div className="flex flex-col items-center mb-12 text-center">
            <Cookie className="w-16 h-16 mb-4 text-teal-600" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Cookie Policy
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Understanding how we use cookies to improve your experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="p-8 space-y-8 bg-white shadow-sm rounded-xl">
              <section className="pb-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  What are cookies?
                </h2>
                <p className="text-gray-600">
                  Cookies are small text files that are placed on your computer
                  or mobile device when you visit a website. They are widely
                  used to make websites work more efficiently and provide
                  information to the owners of the site.
                </p>
              </section>

              <section className="pb-8 border-b border-gray-100">
                <h2 className="mb-6 text-2xl font-semibold text-gray-900">
                  Types of Cookies We Use
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {cookieTypes.map((type) => (
                    <div
                      key={type.title}
                      className="p-6 transition-shadow bg-gray-50 rounded-xl hover:shadow-md"
                    >
                      <div className="flex items-center mb-4 gap-x-3">
                        {type.icon}
                        <h3 className="text-lg font-medium text-gray-900">
                          {type.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{type.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pb-8 border-b border-gray-100">
                <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                  Managing Your Cookie Preferences
                </h2>
                <div className="p-6 rounded-lg bg-gray-50">
                  <p className="mb-4 text-gray-600">
                    You can control and manage cookies in various ways. Please
                    keep in mind that removing or blocking cookies can
                    negatively impact your user experience and parts of our
                    website may no longer be fully accessible.
                  </p>
                  <div className="space-y-4">
                    <details className="transition-all cursor-pointer group">
                      <summary className="flex items-center justify-between p-4 text-gray-700 bg-white rounded-lg hover:bg-gray-50">
                        <span className="font-medium">Browser Controls</span>
                        <span className="text-teal-600 transition-transform group-open:rotate-180">
                          ▼
                        </span>
                      </summary>
                      <div className="px-4 py-3 mt-2 text-gray-600 bg-white rounded-lg">
                        Most browsers automatically accept cookies, but you can
                        choose whether or not to accept cookies through your
                        browser controls.
                      </div>
                    </details>
                    <details className="transition-all cursor-pointer group">
                      <summary className="flex items-center justify-between p-4 text-gray-700 bg-white rounded-lg hover:bg-gray-50">
                        <span className="font-medium">Cookie Settings</span>
                        <span className="text-teal-600 transition-transform group-open:rotate-180">
                          ▼
                        </span>
                      </summary>
                      <div className="px-4 py-3 mt-2 text-gray-600 bg-white rounded-lg">
                        You can manage your cookie preferences by clicking on
                        the "Cookie Settings" button in our cookie banner.
                      </div>
                    </details>
                  </div>
                </div>
              </section>

              <div className="pt-8 mt-8 text-sm text-center text-gray-500 border-t border-gray-100">
                Last Updated: November 25, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookiePolicy;
