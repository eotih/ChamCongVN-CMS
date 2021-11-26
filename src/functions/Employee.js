import Axios from './Axios';

export async function getAllEmployees() {
  const res = await Axios.get('Employee/GetAllGetAllEmployee');
  return res.data;
}
