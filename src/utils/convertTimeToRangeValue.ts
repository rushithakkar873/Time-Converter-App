// Function to convert time to range value
const convertTimeToRangeValue = (time: string) => {
  const [timePart, period] = time.split(' ');
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = timePart.split(':').map(Number);
  if (period.toUpperCase() === 'PM' && hours < 12) {
    hours += 12;
  } else if (period.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }
  return hours + minutes / 60;
}

export default convertTimeToRangeValue;