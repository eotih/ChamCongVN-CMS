import { useEffect, useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { getAccountById } from '../functions/Organization';

const AccountContext = createContext();

function AccountProvider({ children, token }) {
  const [account, setAccount] = useState({});
  // check invalid token jwt
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      getAccountById(decoded.nameid[0]).then((res) => {
        setAccount(res);
      });
    }
  }, [token]);

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}
export { AccountContext, AccountProvider };
