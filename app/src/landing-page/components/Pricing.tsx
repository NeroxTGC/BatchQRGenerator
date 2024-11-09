import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Up to 50 QR codes/month',
      'Basic customization',
      'Standard support',
      'PNG downloads',
      'Basic analytics'
    ]
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Best for professionals',
    popular: true,
    features: [
      'Unlimited QR codes',
      'Advanced customization',
      'Priority support',
      'All file formats',
      'Advanced analytics',
      'Team collaboration',
      'API access'
    ]
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Custom solutions',
      'Dedicated support',
      'SLA guarantee',
      'Custom integration',
      'Advanced security',
      'Training sessions'
    ]
  }
];

export default function Pricing() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-black py-24 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 dark:text-purple-200">Choose the plan that's right for you</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 md:p-8 lg:p-10 rounded-2xl relative ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white'
                  : 'bg-white dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/20'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-white dark:bg-purple-900 text-purple-600 dark:text-purple-300 
                              px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className={plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-purple-200'}>/month</span>
                  )}
                </div>
                <p className={`mt-2 ${plan.popular ? 'text-white/80' : 'text-gray-600 dark:text-purple-200'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${plan.popular ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />
                    <span className={plan.popular ? 'text-white' : 'text-gray-700 dark:text-purple-100'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-semibold
                           ${
                             plan.popular
                               ? 'bg-white text-purple-600 hover:bg-purple-50'
                               : 'bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600'
                           } transition-colors duration-300`}
              >
                <Zap className="w-5 h-5" />
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}