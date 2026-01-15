import { BsSun, BsMoon } from 'react-icons/bs'
import { useState, useEffect } from 'react'

function ThemeToggle() {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('theme') === 'light'
  })

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      document.body.classList.remove('light')
      localStorage.setItem('theme', 'dark')
    }
  }, [isLight])

  return (
    <button
      onClick={() => setIsLight(!isLight)}
      className="hover:text-primary"
    >
      {isLight ? <BsSun size={16} /> : <BsMoon size={16} />}
    </button>
  )
}

export default ThemeToggle