// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import Login from './pages/Login';
import useToken from './services/useToken';

import { AccountProvider } from './context/AccountContext';
// ----------------------------------------------------------------------

export default function App() {
  const { token, setToken, removeToken } = useToken();
  if (!token) {
    return (
      <ThemeConfig>
        <Login setToken={setToken} />
      </ThemeConfig>
    );
  }
  return (
    <ThemeConfig>
      <AccountProvider removeToken={removeToken} token={token}>
        <ScrollToTop />
        <GlobalStyles />
        <BaseOptionChartStyle />
        <Router />
      </AccountProvider>
    </ThemeConfig>
  );
}
