const convertTime = (date) => {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  const min = newDate.getMinutes();
  const sec = newDate.getSeconds();
  return `${hour}:${min}:${sec}`;
};
const convertDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
};
export { convertDate, convertTime };
