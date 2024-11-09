import { type User } from 'wasp/entities';
import { useEffect, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { UserMenuItems } from './UserMenuItems';
import { cn } from '../client/cn';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DropdownUser = ({ user }: { user: Partial<User> }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) {
        return;
      }
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className='relative'>
      <motion.button
        ref={trigger}
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='flex items-center gap-2 p-2 rounded-lg bg-purple-500/10 backdrop-blur-sm 
                  border border-purple-500/20 text-gray-900 dark:text-white hover:bg-purple-500/20 
                  transition-all duration-300'
      >
        <span className='hidden text-right lg:block'>
          <span className='block text-sm font-medium text-gray-900 dark:text-white'>{user.username}</span>
        </span>
        <CgProfile className='text-gray-900 dark:text-white' size='1.1rem' />
        <ChevronDown 
          className={cn('w-4 h-4 transition-transform duration-200 text-gray-900 dark:text-white', {
            'rotate-180': dropdownOpen,
          })}
        />
      </motion.button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            ref={dropdown}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className='absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-gray-900/95 
                      backdrop-blur-lg border border-purple-500/20 shadow-xl'
          >
            <UserMenuItems user={user} setMobileMenuOpen={toggleDropdown} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownUser;
