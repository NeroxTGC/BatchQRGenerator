import React from 'react';
import { motion } from 'framer-motion';
import { QrCode, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Complex gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-purple-50 dark:from-indigo-950 dark:via-purple-900 dark:to-pink-900 transition-colors duration-300">
        {/* Decorative gradient circles */}
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/40 dark:from-purple-500/20 dark:to-pink-500/20 blur-3xl" />
        <div className="absolute top-[60%] right-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-br from-indigo-200/40 to-purple-200/40 dark:from-indigo-500/20 dark:to-purple-500/20 blur-3xl" />
        <div className="absolute top-[40%] left-[60%] w-[25%] h-[25%] rounded-full bg-gradient-to-br from-pink-200/40 to-purple-200/40 dark:from-pink-500/20 dark:to-purple-500/20 blur-3xl" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-100/5 to-transparent dark:via-purple-900/5 opacity-50" 
             style={{
               backgroundImage: `linear-gradient(to right, rgba(128, 90, 213, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(128, 90, 213, 0.05) 1px, transparent 1px)`,
               backgroundSize: '24px 24px'
             }}
        />
      </div>
      
      {/* Added -mt-20 to shift content up slightly while maintaining center alignment */}
      <div className="relative flex items-center min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full -mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
            <span className="text-purple-800 dark:text-purple-200">Batch QR Generation Made Simple</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Generate Multiple QRs
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400"> in Seconds</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-700 dark:text-purple-100 mb-10 max-w-2xl mx-auto"
          >
            Create beautiful, customizable QR codes for your business needs with our powerful batch generator.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            >
              <QrCode className="w-5 h-5" />
              Start Generating
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 text-gray-900 dark:text-white font-semibold hover:bg-purple-500/20 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent dark:from-black/50 dark:to-transparent transition-colors duration-300" />
    </div>
  );
};

export default Hero;