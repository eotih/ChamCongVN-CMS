import Axios from './Axios';

async function getAllEmployees() {
  const res = await Axios.get('Employee/GetAllEmployee');
  return res.data;
}
export { getAllEmployees };
