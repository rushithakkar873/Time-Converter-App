// Function to convert range value to time
const convertRangeValueToTime = (value: number) => {
  value = Math.max(0, Math.min(24, value));
  const hours = Math.floor(value);
  let minutes = Math.round((value - hours) * 60);

  if (minutes === 60) {
    minutes = 0;
  }

  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes.toString();
  const period = hours < 12 || hours === 24 ? 'AM' : 'PM';

  return `${formattedHours}:${formattedMinutes} ${period}`;
}

export default convertRangeValueToTime;