import Axios from './Axios';

export async function getAllDeductions() {
  const res = await Axios.get('Salary/GetAllDeductionEmployee');
  return res.data;
}
export async function getAllLaudatorys() {
  const res = await Axios.get('Salary/GetAllLaudatoryEmployee');
  return res.data;
}
export async function getAllSalaryTables() {
  const res = await Axios.get('Salary/GetAllSalaryTable');
  return res.data;
}
