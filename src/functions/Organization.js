import Axios from './Axios';

async function getAllAccount() {
  const res = await Axios.get('Organization/Account');
  return res.data;
}
async function getAccountById() {
  const res = await Axios.get(`Organization/Account`);
  return res.data;
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
