import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'How many QR codes can I generate?',
    answer: 'The number of QR codes you can generate depends on your plan. Free users can generate up to 50 QR codes per month, while Pro and Enterprise users have unlimited generation capabilities.'
  },
  {
    question: 'Can I customize the appearance of my QR codes?',
    answer: 'Yes! You can customize colors, add logos, and choose different patterns for your QR codes. Pro and Enterprise users get access to advanced customization options.'
  },
  {
    question: 'Are the generated QR codes dynamic or static?',
    answer: 'We offer both dynamic and static QR codes. Dynamic codes can be edited after creation and provide scanning analytics, while static codes are permanent.'
  },
  {
    question: 'What file formats are supported for download?',
    answer: 'We support multiple formats including PNG, SVG, PDF, and EPS. The available formats vary by plan, with Pro and Enterprise users having access to all formats.'
  },
  {
    question: 'Is there an API available for integration?',
    answer: 'Yes, we offer a comprehensive API for Pro and Enterprise users. This allows you to integrate our QR code generation capabilities directly into your applications.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <div className="bg-white dark:bg-black py-24 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 md:space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl border border-purple-200 dark:border-purple-500/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left bg-gradient-to-br from-purple-50 to-white 
                         dark:from-purple-900/40 dark:to-black hover:from-purple-100 hover:to-purple-50
                         dark:hover:from-purple-900/60 dark:hover:to-purple-900/40 transition-all duration-300"
              >
                <span className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/50 dark:bg-purple-900/20"
                  >
                    <p className="p-6 text-gray-700 dark:text-purple-100">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}