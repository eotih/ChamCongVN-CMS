import Axios from './Axios';

async function getAllDepartments() {
  const res = await Axios.get('Component/Department');
  return res.data;
}
async function getAllGroups() {
  const res = await Axios.get('Component/Group');
  return res.data;
}
async function getAllDegrees() {
  const res = await Axios.get('Component/Degrees');
  return res.data;
}
async function getAllSpecialities() {
  const res = await Axios.get('Component/Specialities');
  return res.data;
}
async function getAllWorks() {
  const res = await Axios.get('Component/Work');
  return res.data;
}
async function getAllState() {
  const res = await Axios.get('Component/State');
  return res.data;
}
export {
  getAllWorks,
  getAllSpecialities,
  getAllDegrees,
  getAllDepartments,
  getAllGroups,
  getAllState
};
