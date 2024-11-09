import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Wand2, Laptop, Share2, Shield, Users } from 'lucide-react';

const items = [
  {
    title: 'Lightning Fast',
    description: 'Generate QR codes instantly with our optimized engine',
    icon: <Zap className="w-6 h-6" />,
    className: 'md:col-span-2 md:row-span-2'
  },
  {
    title: 'AI Enhanced',
    description: 'Smart QR code optimization for better scanning',
    icon: <Wand2 className="w-6 h-6" />,
    className: 'md:col-span-1'
  },
  {
    title: 'Cross Platform',
    description: 'Works seamlessly across all devices',
    icon: <Laptop className="w-6 h-6" />,
    className: 'md:col-span-1'
  },
  {
    title: 'Easy Sharing',
    description: 'Share QR codes instantly with your team',
    icon: <Share2 className="w-6 h-6" />,
    className: 'md:col-span-1 md:row-span-2'
  },
  {
    title: 'Enterprise Ready',
    description: 'Advanced security features for business use',
    icon: <Shield className="w-6 h-6" />,
    className: 'md:col-span-2'
  }
];

export default function BentoGrid() {
  return (
    <div className="bg-white dark:bg-black py-24 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 dark:text-purple-200">Discover the power of our QR code platform</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`${item.className} p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white 
                         dark:from-purple-900/40 dark:to-black border border-purple-200 dark:border-purple-500/20 
                         hover:border-purple-300 dark:hover:border-purple-500/40 transition-all duration-300
                         group hover:shadow-lg hover:shadow-purple-500/10`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 
                            dark:from-purple-500 dark:to-pink-500 flex items-center justify-center text-white mb-4
                            group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-purple-200">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}