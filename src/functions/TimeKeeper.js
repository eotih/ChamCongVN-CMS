import Axios from './Axios';

async function GetAllTimeKeeping() {
  const res = await Axios.get('GetAllTimeKeeping');
  return res.data;
}
export { GetAllTimeKeeping };
