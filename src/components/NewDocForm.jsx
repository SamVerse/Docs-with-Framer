import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoClose } from 'react-icons/io5'

export default function NewDocForm({ onClose, onAddDocument }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !file) {
      alert("Please provide a title and select a file.")
      return
    }

    const newDoc = {
      title,
      description,
      file,
      fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
    }

    onAddDocument(newDoc)
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
    >
      <div className="bg-zinc-950/90 p-6 rounded-lg shadow-xl w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-300 font-bold">Add New Document</h2>
          <button onClick={onClose} className="text-gray-100 hover:text-gray-700">
            <IoClose size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block bg-gray-300 w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full bg-gray-300 border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
            />
          </div>
          <div>
            <label htmlFor="file" className="block text-sm font-medium text-gray-300">File</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm  text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-zinc-900
                hover:file:bg-blue-100"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-zinc-900/90 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300"
          >
            Add Document
          </button>
        </form>
      </div>
    </motion.div>
  )
}