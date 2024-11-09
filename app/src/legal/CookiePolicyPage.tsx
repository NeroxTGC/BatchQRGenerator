import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../landing-page/components/Header';
import {
  navigation,
} from '../landing-page/contentSections';
const CookiePolicyPage: React.FC = () => {
  return (
    <div className="text-black dark:text-bodydark">
      <Helmet>
        <title>Cookie Policy | QRMaster</title>
        <meta
          name="description"
          content="QRMaster's Cookie Policy - Learn about how we use cookies to improve your browsing experience."
        />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header navigation={navigation} />
      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Preliminary Considerations</h2>
          <p className="mb-4">
            A user shall be understood as any person browsing the website www.qrmaster.com, hereinafter simply referred to as the website.
          </p>
          <p className="mb-4">
            The publisher shall be understood as the owner of the website, who is QRMaster and is identified in the legal notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Definition and Function of Cookies</h2>
          <p className="mb-4">
            Cookies are information stored in a website user's browser to track previous activity and remember certain data for future visits. 
            They may also be called web beacons, pixels, bugs, trackers, but for the purposes of these policies, they will only be referred to as cookies.
          </p>
          <p className="mb-4">
            They typically store technical data, usage statistics, profile customization, social network links, personal preference management, 
            among other functions, in order to adapt the website to the user's needs and settings, thus improving the browsing experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Types of Cookies We Use</h2>
          <h3 className="text-xl font-semibold mb-2">By Entity:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>First-party cookies: managed by QRMaster</li>
            <li>Third-party cookies: managed by external service providers</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">By Purpose:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Technical cookies: For operational website management</li>
            <li>Preference cookies: For remembering user preferences</li>
            <li>Analytics cookies: For tracking and analyzing user behavior</li>
            <li>Advertising cookies: For managing advertising spaces</li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">By Duration:</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Session cookies: Active only during the browsing session</li>
            <li>Persistent cookies: Remain active for a defined period</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Specific Cookies Used</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Provider</th>
                  <th className="px-4 py-2 text-left">Purpose</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2">moove_gdpr_popup</td>
                  <td className="px-4 py-2">qrmaster.com</td>
                  <td className="px-4 py-2">Stores cookie consent state</td>
                  <td className="px-4 py-2">1 year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Managing Your Cookie Preferences</h2>
          <p className="mb-4">
            You can manage your cookie preferences through your browser settings. Here are links to instructions for common browsers:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="https://support.google.com/chrome/answer/95647?hl=en" 
                className="text-blue-600 dark:text-blue-400 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" 
                className="text-blue-600 dark:text-blue-400 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer">
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a href="https://support.microsoft.com/help/17442/windows-internet-explorer-delete-manage-cookies" 
                className="text-blue-600 dark:text-blue-400 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer">
                Internet Explorer
              </a>
            </li>
            <li>
              <a href="https://support.apple.com/guide/safari/sfri11471/mac" 
                className="text-blue-600 dark:text-blue-400 hover:underline" 
                target="_blank" 
                rel="noopener noreferrer">
                Safari
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at{' '}
            <a href="mailto:hello@qrmaster.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              hello@qrmaster.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export { CookiePolicyPage };
