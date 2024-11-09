import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, QrCode, ChevronDown, Scan, QrCode as QrCodeIcon, Share2, Database } from 'lucide-react';
import { BiLogIn } from 'react-icons/bi';
import DarkModeSwitcher from '../../client/components/DarkModeSwitcher';
import DropdownUser from '../../user/DropdownUser';
import { useAuth } from 'wasp/client/auth';
import { routes } from 'wasp/client/router'
import { Link } from 'react-router-dom';
import { UserMenuItems } from '../../user/UserMenuItems';

interface NavigationItem {
  name: string;
  href: string;
}

interface HeaderProps {
  navigation: NavigationItem[];
}

interface FeatureItem {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

const features: FeatureItem[] = [
  {
    name: 'QR Code Generator',
    description: 'Create multiple QR codes at once',
    href: '/todo/qr-generator/quick',
    icon: Database
  },
  {
    name: 'Bulk QR Code Generator',
    description: 'Scan QR codes instantly',
    href: '/todo/qr-generator/projects',
    icon: Scan
  }
];

export default function Header({ navigation }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: user, isLoading: isUserLoading } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFeaturesOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-purple-200/20 dark:border-purple-500/20">
      <nav className="px-8">
        <div className="flex items-center justify-between py-4 max-w-[1920px] mx-auto">
          <div className="flex items-center gap-2">
            <Link to={routes.LandingPageRoute.to}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white"
              >
                <QrCode className="w-6 h-6" />
              </motion.div>
            </Link>
            <Link to={routes.LandingPageRoute.to}>
              <span className="text-xl font-bold text-gray-900 dark:text-white">QR Master</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              item.name === 'Features' ? (
                <div key={item.name} className="relative" ref={dropdownRef}>
                  <motion.button
                    className="flex items-center gap-1 p-2 rounded-lg bg-purple-500/10 backdrop-blur-sm 
                              border border-purple-500/20 text-gray-900 dark:text-white 
                              hover:bg-purple-500/20 transition-all duration-300"
                    onClick={() => setFeaturesOpen(!featuresOpen)}
                  >
                    Features
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${featuresOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {featuresOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute z-50 left-1/2 -translate-x-1/2 mt-2 w-[560px] rounded-xl 
                                 bg-white dark:bg-gray-900/95 backdrop-blur-lg border border-purple-500/20 
                                 shadow-xl"
                        style={{ marginLeft: '-240px' }}
                      >
                        <div className="relative grid grid-cols-2 gap-4 p-6">
                          {features.map((feature) => (
                            <a
                              key={feature.name}
                              href={feature.href}
                              className="flex items-start gap-4 p-3 rounded-lg hover:bg-purple-500/10 
                                       dark:hover:bg-purple-900/20 transition-colors duration-300"
                            >
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 
                                            dark:bg-purple-900/50 flex items-center justify-center 
                                            text-purple-600 dark:text-purple-400">
                                <feature.icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                  {feature.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {feature.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  className="text-gray-600 dark:text-purple-200 hover:text-purple-600 
                           dark:hover:text-purple-400 transition-colors duration-300"
                >
                  {item.name}
                </motion.a>
              )
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <DarkModeSwitcher />
            {isUserLoading ? null : !user ? (
              <Link 
                to={routes.LoginRoute.to}
                className="px-4 py-2 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-300"
              >
                <div className="flex items-center">
                  Log in <BiLogIn size='1.1rem' className='ml-1' />
                </div>
              </Link>
            ) : (
              <div className="ml-4">
                <DropdownUser user={user} />
              </div>
            )}
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
            className="md:hidden py-4 max-w-[1920px] mx-auto"
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
                {isUserLoading ? null : !user ? (
                  <Link 
                    to={routes.LoginRoute.to}
                    className="flex-1 px-4 py-2 rounded-lg bg-purple-600 dark:bg-purple-500 text-white font-semibold hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-center">
                      Log in <BiLogIn size='1.1rem' className='ml-1' />
                    </div>
                  </Link>
                ) : (
                  <UserMenuItems user={user} setMobileMenuOpen={setMobileMenuOpen} />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}