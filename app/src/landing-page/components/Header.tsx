import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, QrCode } from 'lucide-react';
import DarkModeSwitcher from '../../client/components/DarkModeSwitcher';

interface NavigationItem {
  name: string;
  href: string;
}

interface HeaderProps {
  navigation: NavigationItem[];
}

export default function Header({ navigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-purple-200/20 dark:border-purple-500/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white"
            >
              <QrCode className="w-6 h-6" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">QR Master</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className="text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <DarkModeSwitcher />
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-300"
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-purple-200/20 dark:border-purple-500/20">
                <DarkModeSwitcher />
                <a
                  href="/login"
                  className="flex-1 px-4 py-2 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-300"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}