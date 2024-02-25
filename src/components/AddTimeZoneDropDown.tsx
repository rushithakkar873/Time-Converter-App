import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { BiSolidAlarmAdd } from "react-icons/bi";
import { TimeZoneType } from "../types";
import generateTimeZonesList from "../utils/generateTimeZonesList";
import { useGlobalState } from "../hooks/useGlobalState";
import { ActionTypes } from "../context/actionTypes";

const AddTimeZoneDropdown = () => {
    const timeZones: TimeZoneType[] = generateTimeZonesList();
    const { dispatch } = useGlobalState();
    const [selectedTimeZone, setSelectedTimeZone] = useState<TimeZoneType | null>();
    const [query, setQuery] = useState('');

    const filteredTimeZones = query === '' ? timeZones : timeZones.filter((tz) =>
        tz.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleAddTimeZone = (timeZone: TimeZoneType) => {
        console.log('Adding timezone:', timeZone);
        dispatch({ type: ActionTypes.ADD_TIME_ZONE, payload: timeZone });
        setQuery('');
        setSelectedTimeZone(null);
    }

    return (
        <div className="w-72">
            <Combobox value={selectedTimeZone} onChange={handleAddTimeZone}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg shadow-md focus:outline-none sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-3 pl-4 pr-10 text-sm leading-5 focus:ring-0"
                            displayValue={(tz: TimeZoneType) => tz?.name}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Add timezone..."
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <BiSolidAlarmAdd className="h-6 w-6 text-secondaryColor hover:text-primaryColor" aria-hidden="true" />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setSelectedTimeZone(null)}
                    >
                        <Combobox.Options className="absolute mt-2 max-h-60 w-full bg-white overflow-auto rounded-md text-base shadow-lg focus:outline-none sm:text-sm z-50">
                            {filteredTimeZones.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-white bg-primaryColor">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredTimeZones.map((timeZone) => (
                                    <Combobox.Option
                                        key={timeZone.id}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-primaryColor text-white' : ''}`
                                        }
                                        value={timeZone}
                                    >
                                        <span
                                            className={`block truncate`}
                                        >
                                            {timeZone.name}
                                        </span>
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default AddTimeZoneDropdown;
