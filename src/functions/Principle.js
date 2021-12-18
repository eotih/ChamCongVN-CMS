import Axios from './Axios';

async function getAllLaudatorys() {
  const res = await Axios.get('Principle/LaudatoryEmployee');
  return res.data;
}
async function getAllRegulations() {
  const res = await Axios.get('Principle/RegulationEmployee');
  return res.data;
}
export { getAllRegulations, getAllLaudatorys };
