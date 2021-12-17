// routes
import { useContext } from 'react';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import Login from './pages/Login';

// ----------------------------------------------------------------------

const getToken = () => {
  const token = localStorage.getItem('token');
  return token;
};
const setToken = (token) => {
  localStorage.setItem('token', token);
};
export default function App() {
  const token = getToken();
  if (!token) {
    return (
      <ThemeConfig>
        <Login setToken={setToken} />
      </ThemeConfig>
    );
  }
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
