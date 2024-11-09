import React from 'react';
import { Helmet } from 'react-helmet-async';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="text-black dark:text-bodydark">
      <Helmet>
        <title>Terms of Service | QRMaster</title>
        <meta
          name="description"
          content="QRMaster's Terms of Service - Read about the terms and conditions governing the use of our website and services."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="max-w-2xl mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using QRMaster's website and services, you agree to comply with and be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our website.
          </p>
          <p>
            These terms apply to all visitors, users, and others who access or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
          <p className="mb-4">
            You agree to use our services only for lawful purposes and in accordance with these Terms of Service. 
            You are prohibited from violating or attempting to violate the security of the website.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must not transmit any malicious code or harmful data</li>
            <li>You must not attempt to gain unauthorized access to our systems</li>
            <li>You must not interfere with other users' access to the service</li>
            <li>You must not use the service for any illegal or unauthorized purpose</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p className="mb-4">
            All content on this website, including but not limited to text, graphics, logos, and software, is the property 
            of QRMaster and protected by intellectual property laws.
          </p>
          <p>
            You may not use, reproduce, or distribute any content from this website without our explicit permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Contributions</h2>
          <p className="mb-4">
            By submitting content to our website, you grant QRMaster a non-exclusive, royalty-free license to use, 
            modify, and distribute the content.
          </p>
          <p>
            You represent and warrant that you own or control all rights to the content you post.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Account Responsibilities</h2>
          <p className="mb-4">
            If you create an account with us, you are responsible for maintaining the security of your account and 
            for all activities that occur under your account.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must maintain the confidentiality of your account credentials</li>
            <li>You must notify us immediately of any unauthorized access</li>
            <li>You are responsible for all content posted through your account</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
          <p className="mb-4">
            QRMaster provides its services "as is" and "as available" without any warranties, either express or implied.
          </p>
          <p>
            We do not guarantee that our services will be uninterrupted, timely, secure, or error-free.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>
            QRMaster shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            resulting from your use of our services or any content provided therein.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these Terms of Service at any time. We will notify users of any significant changes.
          </p>
          <p>
            Your continued use of the service after such modifications constitutes your acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the European Union, 
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{' '}
            <a href="mailto:hello@qrmaster.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              hello@qrmaster.com
            </a>
          </p>
        </section>
      </main>
    </div>
  );
};

export { TermsOfServicePage };
