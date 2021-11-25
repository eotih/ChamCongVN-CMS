import Axios from './Axios';

export async function getAllShift() {
  const res = await Axios.get('Organization/GetAllShift');
  return res.data;
}
