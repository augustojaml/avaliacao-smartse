'use client'

import { useState } from 'react'
import { BsHammer } from 'react-icons/bs'

export const FloatingBidButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [showText, setShowText] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setTimeout(() => setShowText(true), 200)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setShowText(false)
  }

  return (
    <button
      className={`bg-primary-light hover:bg-primaryLight-light dark:bg-primary-dark dark:hover:bg-primaryLight-dark absolute right-8 bottom-8 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full text-center text-white shadow-lg transition-all duration-300 ${
        isHovered ? 'w-40' : 'w-12'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isHovered && <BsHammer className="h-6 w-6" />}
      {showText && (
        <span className="text text-center font-semibold opacity-100 transition-opacity duration-300">
          Cadastrar Leilão
        </span>
      )}
    </button>
  )
}
