import React, { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

type QRGeneratorProps = {
  defaultValue?: string
  size?: number
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({ 
  defaultValue = '', 
  size = 256 
}) => {
  const [text, setText] = useState(defaultValue)
  const [qrSize, setQrSize] = useState(size)

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = 'qrcode.png'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }

  return (
    <div className='flex flex-col items-center gap-4 p-4'>
      <div className='w-full max-w-md'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
          Text or URL
        </label>
        <input
          type='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Enter text or URL to generate QR code'
          className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400'
        />
      </div>

      <div className='w-full max-w-md'>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1'>
          Size (px)
        </label>
        <input
          type='number'
          value={qrSize}
          onChange={(e) => setQrSize(Number(e.target.value))}
          min={128}
          max={512}
          step={32}
          className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
            rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        />
      </div>

      <div className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-700'>
        <QRCodeCanvas 
          value={text}
          size={qrSize}
          level='H'
          includeMargin
          className='dark:bg-white rounded-md'
        />
      </div>

      <button
        onClick={handleDownload}
        disabled={!text}
        className='px-4 py-2 bg-blue-500 text-white rounded-md 
          hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed
          dark:disabled:bg-gray-700 dark:hover:bg-blue-700
          transition-colors duration-200'
      >
        Download QR
      </button>
    </div>
  )
}
