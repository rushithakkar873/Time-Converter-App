import moment from 'moment-timezone';

// Function to generate a list of timezones
const generateTimeZonesList = () => {
  const timeZoneNames = moment.tz.names();

  const timeZonesList = timeZoneNames.map((tzName) => {
    const now = moment.tz(tzName);

    return {
      id: tzName,
      name: tzName, 
      abbreviation: now.zoneAbbr(),
      offset: now.format('Z'),
    };
  });

  return timeZonesList;
};

export default generateTimeZonesList;
