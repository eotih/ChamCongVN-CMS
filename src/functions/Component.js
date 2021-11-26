import Axios from './Axios';

export async function getAllDepartments() {
  const res = await Axios.get('Component/GetAllDepartment');
  return res.data;
}
export async function getAllGroups() {
  const res = await Axios.get('Component/GetAllGroup');
  return res.data;
}
export async function getAllDegrees() {
  const res = await Axios.get('Component/GetAllDegrees');
  return res.data;
}
export async function getAllSpecialities() {
  const res = await Axios.get('Component/GetAllSpecialities');
  return res.data;
}
export async function getAllWorks() {
  const res = await Axios.get('Component/GetAllWork');
  return res.data;
}
