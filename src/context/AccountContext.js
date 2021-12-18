import { useEffect, useState, createContext } from 'react';
import jwtDecode from 'jwt-decode';
import { getAccountById } from '../functions/Organization';

const AccountContext = createContext();

function AccountProvider({ children, token }) {
  const [account, setAccount] = useState({});
  const decodeToken = jwtDecode(token);
  const accountID = decodeToken.nameid[0];

  useEffect(() => {
    getAccountById(accountID).then((res) => setAccount(res));
  }, []);

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}
export { AccountContext, AccountProvider };
