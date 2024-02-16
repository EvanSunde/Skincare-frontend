import React from 'react';
import { timezones } from '@/data/TimeZone';

interface TimeZoneSelectorProps {
    onTimeZoneChange: (timezone: string) => void;
}

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({ onTimeZoneChange }) => {

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        onTimeZoneChange(newValue);
    };

    return (
        <select name="timezone_offset" id="timezone-offset" onChange={handleChange} className='w-[100%] sm:w-[45%] h-10 border rounded-[6px] border-gray-500 px-3 outline-none bg-white'>
            <option>--Select Timezone</option>
            {timezones.map((timezone, index) => (
                <option key={index} value={timezone}>{timezone}</option>
            ))}
        </select>)
}

export default TimeZoneSelector;