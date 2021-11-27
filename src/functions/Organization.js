import Axios from './Axios';

async function getAllAccount() {
  const res = await Axios.get('Organization/getAllAccount');
  return res.data;
}
async function getAllPosition() {
  const res = await Axios.get('Organization/getAllPosition');
  return res.data;
}
async function getAllShift() {
  const res = await Axios.get('Organization/GetAllShift');
  return res.data;
}
async function getAllRole() {
  const res = await Axios.get('Organization/GetAllRole');
  return res.data;
}
export { getAllRole, getAllShift, getAllPosition, getAllAccount };
