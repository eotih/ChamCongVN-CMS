import Axios from './Axios';

async function getAllDepartments() {
  const res = await Axios.get('Component/GetAllDepartment');
  return res.data;
}
async function getAllGroups() {
  const res = await Axios.get('Component/GetAllGroup');
  return res.data;
}
async function getAllDegrees() {
  const res = await Axios.get('Component/GetAllDegrees');
  return res.data;
}
async function getAllSpecialities() {
  const res = await Axios.get('Component/GetAllSpecialities');
  return res.data;
}
async function getAllWorks() {
  const res = await Axios.get('Component/GetAllWork');
  return res.data;
}
export { getAllWorks, getAllSpecialities, getAllDegrees, getAllDepartments, getAllGroups };
