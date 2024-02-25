import moment from "moment";

// Function to format the selected date according to the selected timezone
const formatDateAndTimezone = (selectedDate: string, selectedTimezone: string) => {
    const momentDate = moment(selectedDate);
    const dateInTimezone = momentDate.tz(selectedTimezone);

    // Format the date in the desired format: "ddd, MMM DD"
    const formattedDate = dateInTimezone.format('ddd, MMM DD');

    return formattedDate;
};

export default formatDateAndTimezone;