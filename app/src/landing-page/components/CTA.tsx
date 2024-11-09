import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

export default function CTA() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-black py-24 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-purple-500/10 dark:bg-purple-500/20 backdrop-blur-sm border border-purple-500/20 
                      rounded-full px-6 py-2 inline-flex items-center gap-2 mb-8"
          >
            <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-800 dark:text-purple-200">Start generating QR codes today</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Ready to revolutionize your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              {' '}QR code workflow?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-purple-200 mb-10"
          >
            Join thousands of satisfied users who trust our platform for their QR code needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 
                       dark:from-purple-500 dark:to-pink-500 text-white font-semibold 
                       flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 
                       transition-all duration-300"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-lg bg-purple-500/10 backdrop-blur-sm 
                       border border-purple-500/20 text-gray-900 dark:text-white 
                       font-semibold hover:bg-purple-500/20 transition-all duration-300"
            >
              Contact Sales
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}