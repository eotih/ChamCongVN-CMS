import Axios from './Axios';

async function getAllEmployees() {
  const res = await Axios.get('Employee/GetAllEmployee');
  return res.data;
}
async function getAllRecruitments() {
  const res = await Axios.get('Employee/GetAllRecruitment');
  return res.data;
}
export { getAllEmployees, getAllRecruitments };
