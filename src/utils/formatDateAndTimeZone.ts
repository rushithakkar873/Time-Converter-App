import moment from "moment";

// Function to format the date
const formatDateAndTimezone = (selectedDate: string, selectedTimezone: string) => {
    const momentDate = moment(selectedDate);
    const dateInTimezone = momentDate.tz(selectedTimezone);

    const formattedDate = dateInTimezone.format('ddd, MMM DD');

    return formattedDate;
};

export default formatDateAndTimezone;