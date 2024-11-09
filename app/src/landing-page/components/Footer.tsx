import React from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';

interface FooterProps {
  footerNavigation: {
    app: { name: string; href: string; }[];
    company: { name: string; href: string; }[];
    legal: { name: string; href: string; }[];
  };
}

export default function Footer({ footerNavigation }: FooterProps) {
  return (
    <footer className="bg-white dark:bg-black transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white"
              >
                <QrCode className="w-6 h-6" />
              </motion.div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">QR Master</span>
            </div>
            <p className="text-gray-600 dark:text-purple-200 mb-6 max-w-md">
              Create beautiful, customizable QR codes for your business needs with our powerful batch generator.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerNavigation.app.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerNavigation.company.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}