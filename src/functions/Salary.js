import Axios from './Axios';

async function getAllSalarys() {
  const res = await Axios.get('');
  return res.data;
}
async function getAllOvertimes() {
  const res = await Axios.get('Salary/OvertimeSalary');
  return res.data;
}
async function getAllDeductions() {
  const res = await Axios.get('Salary/DeductionEmployee');
  return res.data;
}
async function getAllLaudatorys() {
  const res = await Axios.get('Salary/LaudatoryEmployee');
  return res.data;
}
async function getAllSalaryTables() {
  const res = await Axios.get('Salary/SalaryTable');
  return res.data;
}
export { getAllLaudatorys, getAllSalaryTables, getAllDeductions, getAllOvertimes, getAllSalarys };
