import Axios from './Axios';

export async function getAllShift() {
  const res = await Axios.get('Organization/GetAllShift');
  return res.data;
}
export async function getAllRole() {
  const res = await Axios.get('Organization/GetAllRole');
  return res.data;
}
