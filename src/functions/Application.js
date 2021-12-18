import Axios from './Axios';

async function getAllAbsentApplication() {
  const res = await Axios.get('Application/Application/AbsentApplication');
  return res.data;
}
async function getAllOverTimeApplication() {
  const res = await Axios.get('Application/OverTimeApplication');
  return res.data;
}
export { getAllOverTimeApplication, getAllAbsentApplication };
