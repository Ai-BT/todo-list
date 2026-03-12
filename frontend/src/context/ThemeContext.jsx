import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

const themes = {
  light: {
    body: '#f5f5f5',
    text: '#333',
    textSecondary: '#888',
    textMuted: '#999',
    textPlaceholder: '#aaa',
    card: '#fff',
    cardShadow: '0 1px 3px rgba(0,0,0,0.1)',
    input: '#fff',
    inputBorder: '#ddd',
    filterActive: '#333',
    filterInactive: '#e0e0e0',
    filterActiveText: '#fff',
    filterInactiveText: '#333',
  },
  dark: {
    body: '#1a1a2e',
    text: '#e0e0e0',
    textSecondary: '#aaa',
    textMuted: '#777',
    textPlaceholder: '#666',
    card: '#16213e',
    cardShadow: '0 1px 3px rgba(0,0,0,0.3)',
    input: '#0f3460',
    inputBorder: '#0f3460',
    filterActive: '#e94560',
    filterInactive: '#16213e',
    filterActiveText: '#fff',
    filterInactiveText: '#aaa',
  },
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved === 'dark'
  })

  const theme = isDark ? themes.dark : themes.light

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.body.style.background = theme.body
    document.body.style.color = theme.text
  }, [isDark, theme])

  const toggleTheme = () => setIsDark((prev) => !prev)

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
