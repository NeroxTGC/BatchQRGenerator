import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="text-black dark:text-bodydark">
      <Helmet>
        <title>Privacy Policy | QRMaster</title>
        <meta
          name="description"
          content="QRMaster's Privacy Policy - Learn how we protect your personal information and respect your privacy."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Data Controller</h2>
          <p>
            QRMaster, registered in The European Union, hereinafter referred to as THE WEBSITE MANAGER, 
            whose contact email is hello@qrmaster.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect and Purpose</h2>
          <ul className="list-disc pl-6 mt-2 space-y-3">
            <li>
              <strong>Contact Forms:</strong> Name, surname, and email address for direct communication regarding inquiries, 
              comments, suggestions, or service requests.
            </li>
            <li>
              <strong>Blog Comments:</strong> Name and email address to enable comments on the website's blog.
            </li>
            <li>
              <strong>Payment Information:</strong> Name, surname, address, telephone, email address, tax identification 
              number for processing payments and client-related matters.
            </li>
            <li>
              <strong>Newsletter:</strong> Name, telephone, and email address for sending commercial newsletters 
              (with express consent).
            </li>
            <li>
              <strong>Client Area Access:</strong> Email address for account access.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Age Restriction</h2>
          <p>
            Users under 16 years of age must have authorization from their parents or legal guardians to provide personal data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Processors</h2>
          <p className="mb-4">
            We work with the following third-party service providers:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-3">
            <li>
              <strong>SendGrid:</strong> For newsletter automation and email communications, provided by Twilio Inc.
            </li>
            <li>
              <strong>Google Analytics:</strong> For web analytics, provided by Google LLC under EU-US Privacy Shield Framework.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p>
            You can exercise your rights of access, rectification, cancellation, portability, forgetting, or opposition 
            by contacting us at hello@qrmaster.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
          <ul className="list-disc pl-6 mt-2 space-y-3">
            <li>Billing and purchase data: Retained for the legally required period</li>
            <li>Newsletter and blog comments: Retained until user unsubscription or removal request</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
          <p>
            Links to third-party websites have their own privacy policies. Users are responsible for reviewing and 
            accepting these separate policies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            For any questions about this Privacy Policy or to exercise your rights, please contact us at hello@qrmaster.com.
          </p>
        </section>
      </main>
    </div>
  );
};

export { PrivacyPolicyPage };
