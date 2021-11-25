import Axios from './Axios';

export async function getAllDepartments() {
  const res = await Axios.get('Component/GetAllDepartment');
  return res.data;
}
