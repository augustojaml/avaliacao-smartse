'use client'

import { useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { Button } from './button'

export const ToggleLanguageButton = () => {
  const [toggle, setToggle] = useState(false)

  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <Button variant="ghost" onClick={handleToggle}>
      <FiGlobe className="h-5 w-5" />
      {toggle ? 'EN' : 'PT-BR'}
    </Button>
  )
}

/**
 <button className="text-textPrimary-light hover:text-accentPurple dark:text-textPrimary-dark dark:hover:text-accentPurple flex items-center gap-1 rounded-lg px-1 py-2 text-sm font-medium transition">
             <FiGlobe className="h-5 w-5" />
             PT-BR
           </button>
 */
