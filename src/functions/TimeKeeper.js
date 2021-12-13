import Axios from './Axios';

async function GetAllTimeKeeping() {
  const res = await Axios.get('TimeKeeper/GetAllTimeKeeping');
  return res.data;
}
async function GetCountCheckedIn() {
  const res = await Axios.get('TimeKeeper/GetCountCheckedIn');
  return res.data;
}
async function GetCountLate() {
  const res = await Axios.get('TimeKeeper/GetCountLate');
  return res.data;
}
async function GetCountHaventCheckedIn() {
  const res = await Axios.get('TimeKeeper/GetCountHaventCheckedIn');
  return res.data;
}
export { GetAllTimeKeeping, GetCountHaventCheckedIn, GetCountLate, GetCountCheckedIn };
