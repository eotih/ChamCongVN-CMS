// routes
import { useContext } from 'react';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import { AccountContext } from './context/AccountContext';
import Login from './pages/Login';

// ----------------------------------------------------------------------

export default function App() {
  const account = useContext(AccountContext);
  if (!account) {
    return <Login />;
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
