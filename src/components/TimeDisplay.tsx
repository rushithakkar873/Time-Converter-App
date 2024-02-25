import React, { useEffect, useState } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { MdDragIndicator } from 'react-icons/md';
import { TimeDisplayProps } from '../types';
import TimeSlider from './TimeSlider';
import { useGlobalState } from '../hooks/useGlobalState';
import formatDateAndTimezone from '../utils/formatDateAndTimeZone';
import { ActionTypes } from '../context/actionTypes';
import moment from 'moment';
import convertRangeValueToTime from '../utils/convertRangeValueToTime';
import convertTimeToRangeValue from '../utils/convertTimeToRangeValue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone }) => {
    const { state, dispatch } = useGlobalState();
    const [selectedTime, setSelectedTime] = useState('');
    const [rangeValue, setRangeValue] = useState(0);

    const handleTimeChange = (timeInput : string) => {
        setSelectedTime(timeInput)
        if (timeInput.match('[0-2][0-9]:[0-5][0-9] [AP][M]')) {
            // Convert the time to range value and update range value state
            const newRangeValue = convertTimeToRangeValue(timeInput);
            setRangeValue(newRangeValue);
            
            // Get the current date in the selected timezone
            const currentDate = moment.tz(timeZone.name).format('YYYY-MM-DD');
            const dateTimeString = `${currentDate} ${timeInput}`;
            
            // Convert the local datetime to UTC and global state update
            const utcTime = moment.tz(dateTimeString, 'YYYY-MM-DD hh:mm A', timeZone.name).utc().format();
            dispatch({ type: ActionTypes.CHANGE_TIME, payload: utcTime });
        }
    };

    const handleRangeValueChange = (value: number) => {
        const newTime = convertRangeValueToTime(value);
        setRangeValue(value);
        handleTimeChange(newTime);
    }

    useEffect(() => {
        const timeString = moment(state.baseTime).tz(timeZone.name).format('hh:mm A');
        setSelectedTime(timeString);
        setRangeValue(convertTimeToRangeValue(timeString));
    }, [state.baseTime, timeZone.name])

    return (
        <div className="relative p-8 bg-white rounded-md drop-shadow-md hover:ring-2 hover:ring-secondaryColor">
            <div className="relative flex items-center justify-between space-x-2">
                <div className='cursor-pointer'>
                    <MdDragIndicator className="w-6 h-6 text-gray-500 hover:text-black" aria-hidden="true" />
                </div>
                <div className='grow'>
                    <div className="text-2xl font-medium">{timeZone.abbreviation}</div>
                    <span className='text-md text-gray-400'>{timeZone.name}</span>
                </div>
                <div className='w-1/5'>
                    <div className="flex w-full px-4 py-3 cursor-default rounded-lg shadow-md sm:text-sm border">
                        <input
                            className="block w-full border-none text-sm leading-5 focus:ring-0 focus:outline-none"
                            value={selectedTime}
                            onChange={(e) => handleTimeChange(e.target.value)}
                            placeholder="HH:MM AM/PM"
                            pattern='[0-2][0-9]:[0-5][0-9] [AP][M]'
                        />
                        <div className="flex items-center">
                            <BiTimeFive className="w-5 h-5 text-gray-400 hover:text-primaryColor" aria-hidden="true" />
                        </div>
                    </div>
                    <div className='mt-2 flex justify-between text-sm text-gray-400'>
                        <span className=''>GMT {timeZone.offset}</span>
                        <span>{formatDateAndTimezone(state.selectedDate, timeZone.name)}</span>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <TimeSlider rangeValue={rangeValue} handleRangeValueChange={handleRangeValueChange} />
            </div>
            <IoClose onClick={() => dispatch({ type: ActionTypes.DELETE_TIME_ZONE, payload: timeZone })} className="absolute top-2 right-2 w-6 h-6 text-secondaryColor hover:text-primaryColor cursor-pointer" />
        </div>
    );
};

export default TimeDisplay;
