import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    company: 'TechCorp',
    content: 'This QR code generator has revolutionized our marketing campaigns. The batch processing feature saves us hours of work!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    company: 'InnovateLabs',
    content: 'The customization options are incredible. We can perfectly match our brand identity with every QR code we generate.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Event Coordinator',
    company: 'EventPro',
    content: 'The ease of use and reliability of this platform is outstanding. It has become an essential tool for all our events.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150'
  }
];

export default function Testimonials() {
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What Our Users Say</h2>
          <p className="text-gray-600 dark:text-purple-200">Don't just take our word for it</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="p-4 md:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-white 
                         dark:from-purple-900/40 dark:to-black border border-purple-200 
                         dark:border-purple-500/20 hover:border-purple-300 dark:hover:border-purple-500/40 
                         transition-all duration-300 group"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 ring-2 ring-purple-500/20 group-hover:ring-purple-500/40 transition-all duration-300"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-gray-600 dark:text-purple-200">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-purple-100">{testimonial.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}