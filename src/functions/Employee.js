import Axios from './Axios';

async function getAllEmployees() {
  const res = await Axios.get('Employee/GetAllGetAllEmployee');
  return res.data;
}
export { getAllEmployees };
