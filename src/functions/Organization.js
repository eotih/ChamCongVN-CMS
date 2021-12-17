import JWTDecode from 'jwt-decode';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from './Axios';
import Login from '../pages/Login';

const token = localStorage.getItem('token');

async function getAllAccount() {
  const res = await Axios.get('Organization/Account');
  return res.data;
}
async function getAccountById() {
  if (!token) {
    return null;
  }
  try {
    const data = JWTDecode(token);
    const res = await Axios.get(`Organization/Account/${data.nameid[0]}`);
    if (res.data) {
      return res.data;
    }
    return <Login />;
  } catch (err) {
    return <Login />;
  }
}
async function GetEmployeeForAccount() {
  const res = await Axios.get('Organization/EmployeeForAccount');
  return res.data;
}
async function getAllPosition() {
  const res = await Axios.get('Organization/Position');
  return res.data;
}
async function getAllShift() {
  const res = await Axios.get('Organization/Shift');
  return res.data;
}
async function getAllOvertimes() {
  const res = await Axios.get('Organization/OverTime');
  return res.data;
}
async function getAllRole() {
  const res = await Axios.get('Organization/Role');
  return res.data;
}
async function getAllOrganization() {
  const res = await Axios.get('Organization/Organization');
  return res.data;
}
async function getAllLevels() {
  const res = await Axios.get('Organization/Level');
  return res.data;
}
export {
  getAllRole,
  getAllShift,
  getAccountById,
  getAllOvertimes,
  getAllPosition,
  getAllAccount,
  getAllOrganization,
  getAllLevels,
  GetEmployeeForAccount
};
