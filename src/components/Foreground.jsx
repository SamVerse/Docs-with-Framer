import React, { useRef } from 'react'
import Card from './Card'

export default function Foreground({ documents }) {
  const ref = useRef(null)

  return (
    <div ref={ref} className="fixed z-10 top-0 left-0 w-full h-full flex flex-wrap gap-7 p-5">
      {documents.map((item, index) => (
        <Card key={index} data={item} reference={ref} />
      ))}
    </div>
  )
}