import { useState } from 'react';

const TimeSlider = () => {
    const [value, setValue] = useState(0);

    // Convert the slider value to a 12-hour format
    const formatTime = (value: number) => {
        const hours = value % 12 === 0 ? 12 : value % 12;
        const amPm = value < 12 || value === 24 ? 'AM' : 'PM';
        return `${hours} ${amPm}`;
    };

    return (
        <div className="relative flex flex-col items-center space-y-4">
            <input
                type="range"
                min="0"
                max="24"
                value={value}
                onChange={(e) => {setValue(Number(e.target.value)); console.log(e.target.value)}}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 z-10"
                step="0.25"
            />
            <div className="relative -top-2 w-full flex justify-between text-xs">
                {[...Array(9)].map((_, index) => (
                    <span key={index} className={`relative`}>
                        <div className="absolute -top-2 h-4 w-0.5 bg-gray-500" style={{ left: `calc(${(index / 8) * 100}% - 2px)` }}></div>
                        <div className='mt-2 text-gray-500'>
                            {formatTime(index * 3)}
                        </div>
                    </span>
                ))}
            </div>
            <div className="absolute w-full flex justify-between">
                {[...Array(25)].map((_, index) => (
                    <div key={index} className="relative">
                        <div className={`absolute -top-2 h-2 w-0.5 bg-gray-500 ${index % 3 === 0 ? 'hidden' : ''}`} style={{ left: `calc(${(index / 24) * 100}% - 2px)` }}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimeSlider;