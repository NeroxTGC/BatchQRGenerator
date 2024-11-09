import React from 'react'
import { QRGenerator } from '../QRTools/QRCodeGenerator'

export function QRCodeGeneratorPage() {
  return (
    <div className='min-h-screen bg-white dark:bg-boxdark-2'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 mt-20'>
        <div className='text-center'>
          <h1 className='text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl'>
            QR Code Generator
          </h1>
          <p className='mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-4'>
            Generate QR codes from any text or URL
          </p>
        </div>
        
        <div className='mt-10'>
          <QRGenerator />
        </div>
      </div>
    </div>
  )
} 