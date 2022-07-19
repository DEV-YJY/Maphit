import React, { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.theme)
  const colourTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove(colourTheme)
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, colourTheme])

  return [colourTheme, setTheme]
}
