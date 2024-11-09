import React from 'react';
import { motion } from 'framer-motion';
import { Users, QrCode, Building2, Star } from 'lucide-react';

const stats = [
  {
    icon: <Users className="w-6 h-6" />,
    value: '50K+',
    label: 'Active Users',
    description: 'Trust our platform daily'
  },
  {
    icon: <QrCode className="w-6 h-6" />,
    value: '1M+',
    label: 'QR Codes Generated',
    description: 'And counting...'
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    value: '10K+',
    label: 'Business Clients',
    description: 'Across the globe'
  },
  {
    icon: <Star className="w-6 h-6" />,
    value: '4.9',
    label: 'User Rating',
    description: 'Based on 10K+ reviews'
  }
];

export default function Stats() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-black py-24 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-2xl bg-white/50 dark:bg-purple-900/20 backdrop-blur-sm
                         border border-purple-200 dark:border-purple-500/20 relative group
                         hover:border-purple-300 dark:hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent dark:from-purple-500/10
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 
                          dark:from-purple-500 dark:to-pink-500 flex items-center justify-center text-white mb-4"
              >
                {stat.icon}
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {stat.value}
              </motion.h3>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{stat.label}</h4>
              <p className="text-gray-600 dark:text-purple-200">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}