import Axios from './Axios';

async function GetAllTimeKeeping() {
  const res = await Axios.get('TimeKeeper/TimeKeeping');
  return res.data;
}
async function GetCountCheckedIn() {
  const res = await Axios.get('TimeKeeper/CheckIn/checked');
  return res.data;
}
async function GetCountLate() {
  const res = await Axios.get('TimeKeeper/CheckIn/late');
  return res.data;
}
async function GetCountHaventCheckedIn() {
  const res = await Axios.get('TimeKeeper/CheckIn/unchecked');
  return res.data;
}
export { GetAllTimeKeeping, GetCountHaventCheckedIn, GetCountLate, GetCountCheckedIn };
