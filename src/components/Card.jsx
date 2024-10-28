import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
// import { IoClose } from 'react-icons/io5'

export default function Card({ data, reference }) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  const downloadFile = () => {
    if (!isDownloading && data.file) {
      setIsDownloading(true)
      setProgress(0)

      const url = URL.createObjectURL(data.file)
      const a = document.createElement('a')
      a.href = url
      a.download = data.file.name

      // Simulate download progress
      const totalSize = data.file.size
      let downloadedSize = 0
      const interval = setInterval(() => {
        downloadedSize += totalSize / 100 // Simulate downloading 1% at a time
        const newProgress = Math.min((downloadedSize / totalSize) * 100, 100)
        setProgress(newProgress)

        if (newProgress >= 100) {
          clearInterval(interval)
          a.click() // Start the actual download
          URL.revokeObjectURL(url)
          setIsDownloading(false)
        }
      }, 50) // Update every 50ms for a smooth progress bar

      // Cleanup function
      return () => {
        clearInterval(interval)
        URL.revokeObjectURL(url)
      }
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.1 }}
      dragElastic={0.2}
      dragMomentum
      dragTransition={{ bounceStiffness: 500, bounceDamping: 10 }}
      className="relative flex-shrink-0 w-60 h-72 rounded-[20px] bg-zinc-900/90 text-gray-200 px-6 py-6 overflow-hidden shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
      <p className="text-sm leading-tight mt-2">{data.description}</p>
      <div className="absolute bottom-0 w-full left-0">
        <div className="flex items-center justify-between py-3 px-6 mb-1">
          <h5 className="text-sm">{data.fileSize}</h5>
          {isDownloading ? (
            // <button
            //   onClick={() => {
            //     setIsDownloading(false)
            //     setProgress(0)
            //   }}
            //   className="w-7 h-7 rounded-full flex items-center justify-center bg-red-500 text-white"
            // >
            //   <IoClose />
            // </button> 
            null
          ) : (
            <button
              onClick={downloadFile}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-green-500 text-white"
            >
              <FiDownload />
            </button>
          )}
        </div>
        <motion.div
          className="w-full bg-blue-500 h-1"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        />
        {isDownloading && (
          <div className="w-full py-2 bg-blue-500 flex items-center justify-center">
            <h3 className="text-sm font-semibold text-white">
              Downloading... {Math.round(progress)}%
            </h3>
          </div>
        )}
      </div>
    </motion.div>
  )
}