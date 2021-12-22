/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from 'react';
import { AccountContext } from './AccountContext';

export const accountContext = () => {
  const account = useContext(AccountContext);
  return account;
};
