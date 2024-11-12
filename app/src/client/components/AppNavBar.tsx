import { Link, routes } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { BiLogIn } from 'react-icons/bi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Menu, QrCode } from 'lucide-react';
import { DocsUrl, BlogUrl } from '../../shared/common';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownUser from '../../user/DropdownUser';
import { UserMenuItems } from '../../user/UserMenuItems';
import { motion } from 'framer-motion';

const navigation = [
  { name: 'Pricing', href: routes.PricingPageRoute.build() },
  { name: 'Help', href: DocsUrl },
];

const NavLogo = () => (
  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white">
    <QrCode className="w-6 h-6" />
  </div>
);

export default function AppNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: user, isLoading: isUserLoading } = useAuth();
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

          <div className="flex lg:hidden">
            <button
              type='button'
              className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className='sr-only'>Open main menu</span>
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
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
        </div>
      </nav>

      <Dialog as='div' className='lg:hidden' open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className='fixed inset-0 z-50' />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/80 dark:bg-black/80 backdrop-blur-sm px-6 py-6 sm:max-w-sm">
          <div className='flex items-center justify-between'>
            <Link to={routes.LandingPageRoute.to} className="flex items-center gap-2">
              <NavLogo />
              <span className="text-xl font-bold text-gray-900 dark:text-white">QR Master</span>
            </Link>
            <button
              type='button'
              className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className='sr-only'>Close menu</span>
              <AiFillCloseCircle className='h-6 w-6' />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 dark:text-purple-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
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
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
