import Axios from './Axios';

async function getAllEmployees() {
  const res = await Axios.get('Employee/Employee');
  return res.data;
}
async function getAllRecruitments() {
  const res = await Axios.get('Employee/Recruitment');
  return res.data;
}
async function getRecruitmentByID(id) {
  const res = await Axios.get(`Employee/Recruitment/${id}`);
  return res.data;
}
async function getEmployeeByID(id) {
  const res = await Axios.get(`Employee/Employee/${id}`);
  return res.data;
}
export { getAllEmployees, getAllRecruitments, getRecruitmentByID, getEmployeeByID };
