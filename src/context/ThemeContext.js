import { useEffect, useState, createContext } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children, token }) {
  const [theme, setTheme] = useState({});
  // check invalid token jwt

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
export { ThemeContext, ThemeProvider };
