import { useState, useEffect, useRef } from 'react'

export function Dropdown({ trigger, children, align = 'left' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const alignments = {
    left: 'left-0',
    right: 'right-0',
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 w-56 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 ${alignments[align]}`}
        >
          <div className="py-1" role="menu">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export function DropdownItem({ children, onClick, className = '' }) {
  return (
    <button
      onClick={() => {
        onClick?.()
      }}
      className={`block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${className}`}
      role="menuitem"
    >
      {children}
    </button>
  )
}
