import Axios from './Axios';

async function getAllSalarys() {
  const res = await Axios.get('');
  return res.data;
}
async function getAllOvertimes() {
  const res = await Axios.get('Salary/GetAllDeductionEmployee');
  return res.data;
}
async function getAllDeductions() {
  const res = await Axios.get('Salary/GetAllDeductionEmployee');
  return res.data;
}
async function getAllLaudatorys() {
  const res = await Axios.get('Salary/GetAllLaudatoryEmployee');
  return res.data;
}
async function getAllSalaryTables() {
  const res = await Axios.get('Salary/GetAllSalaryTable');
  return res.data;
}
export { getAllLaudatorys, getAllSalaryTables, getAllDeductions, getAllOvertimes, getAllSalarys };
