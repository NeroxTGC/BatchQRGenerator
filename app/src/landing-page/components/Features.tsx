import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Download, Palette, Shield, Users, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Batch Processing',
    description: 'Generate hundreds of QR codes simultaneously with our powerful batch processing engine.'
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Custom Styling',
    description: 'Personalize your QR codes with custom colors, logos, and designs to match your brand.'
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Error Correction',
    description: 'Advanced error correction ensures your QR codes remain scannable even if partially damaged.'
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: 'Bulk Export',
    description: 'Export all your QR codes in various formats including PNG, SVG, and PDF.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Collaboration',
    description: 'Share and manage QR codes with your team members efficiently.'
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Mobile Friendly',
    description: 'Create and manage QR codes on any device with our responsive interface.'
  }
];

export default function Features() {
  return (
    <div className="bg-white dark:bg-black py-24 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100/50 to-transparent dark:from-purple-900/20 dark:to-transparent transition-colors duration-300" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Powerful Features</h2>
          <p className="text-gray-600 dark:text-purple-200 max-w-2xl mx-auto">
            Everything you need to create and manage QR codes at scale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/40 dark:to-pink-900/40 backdrop-blur-lg border border-purple-200 dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 flex items-center justify-center mb-4 text-white">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-purple-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}