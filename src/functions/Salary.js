import Axios from './Axios';

async function getAllSalaries() {
  const res = await Axios.get('Salary/TotalSalaryPerMonth');
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
async function getAllSalaryTables() {
  const res = await Axios.get('Salary/SalaryTable');
  return res.data;
}
async function getAllAdvances() {
  const res = await Axios.get('Salary/Advances');
  return res.data;
}
async function getAllTotalSalary() {
  const res = await Axios.get('Salary/TotalSalary');
  return res.data;
}
export {
  getAllSalaryTables,
  getAllDeductions,
  getAllOvertimes,
  getAllSalaries,
  getAllAdvances,
  getAllTotalSalary
};
