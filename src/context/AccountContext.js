import { useEffect, useState, createContext } from 'react';
import { getAccountById } from '../functions/Organization';

const AccountContext = createContext();

function AccountProvider({ children }) {
  const [account, setAccount] = useState({});

  useEffect(() => {
    getAccountById().then((res) => setAccount(res).catch((err) => console.log(err)));
  }, []);

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
}
export { AccountContext, AccountProvider };