import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Background from './components/Background'
import Foreground from './components/Foreground'
import NewDocForm from './components/NewDocForm'

export default function App() {
  const [documents, setDocuments] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddDocument = (newDoc) => {
    setDocuments([...documents, newDoc])
  }

  return (
    <div className="relative w-full h-screen">
      <Background />
      <Foreground documents={documents} />
      
      <motion.button 
        onClick={() => setIsFormOpen(true)}
        className="fixed bottom-10 right-10 font-semibold p-4 bg-zinc-900/70 text-white rounded-full shadow-lg z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        + Add Document
      </motion.button>

      <AnimatePresence>
        {isFormOpen && (
          <NewDocForm
            onClose={() => setIsFormOpen(false)}
            onAddDocument={handleAddDocument}
          />
        )}
      </AnimatePresence>
    </div>
  )
}