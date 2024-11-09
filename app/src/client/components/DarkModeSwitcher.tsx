import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import useColorMode from '../hooks/useColorMode';

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isInLightMode = colorMode === 'light';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (typeof setColorMode === 'function') {
          setColorMode(isInLightMode ? 'dark' : 'light');
        }
      }}
      className="p-3 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 
                hover:bg-purple-500/20 transition-all duration-300
                dark:text-purple-200 text-purple-800"
    >
      {isInLightMode ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </motion.button>
  );
};

export default DarkModeSwitcher;
