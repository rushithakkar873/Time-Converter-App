import { MdDarkMode, MdOutlineSwapVert } from "react-icons/md";
import { IoCalendarNumber } from "react-icons/io5";
import AddTimeZoneDropdown from "./AddTimeZoneDropDown";
import Button from "./Button";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalState } from "../hooks/useGlobalState";
import { ActionTypes } from "../context/actionTypes";
import moment from "moment";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomInput = (props: any) => {
  return (
    <div className="input-group flex items-center w-full cursor-default overflow-hidden rounded-lg bg-white shadow-md focus:outline-none sm:text-sm">
      <input
        type="text"
        className="form-control w-full border-none py-3 px-4 pr-10 text-sm leading-5 focus:ring-0"
        onClick={props.onClick}
        value={props.value}
        onChange={props.onChange}
      />
      <div className="input-group-append pr-3">
        <span className="input-group-text">
          <IoCalendarNumber className="h-6 w-6 text-secondaryColor hover:text-primaryColor cursor-pointer" />
        </span>
      </div>
    </div>
  );
}

const ControlPanel = () => {
  const {state, dispatch} = useGlobalState();

  const handleReverseOrder = () => {
    // Implement the reverse order functionality
    dispatch({type: ActionTypes.REVERSE_TIME_ZONES});
  }

  const handleThemeToggle = () => {
    // Implement the theme toggle functionality
    dispatch({type: ActionTypes.CHANGE_THEME, payload: state.theme === 'light' ? 'dark' : 'light'});
  }

  return (
    <div className="flex justify-between items-center">
      <AddTimeZoneDropdown />
      <div>
        <DatePicker
          selected={moment(state.selectedDate).toDate()}
          onChange={(date: Date) => dispatch({type: ActionTypes.CHANGE_DATE, payload: date.toUTCString()})}
          customInput={<CustomInput />}
          dateFormat="MM/dd/yyyy"
        />
      </div>
      <div className="flex space-x-2">
        <Button handleClick={handleReverseOrder}>
          <MdOutlineSwapVert className="h-6 w-6" />
        </Button>
        <Button handleClick={handleThemeToggle}>
          <MdDarkMode className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

export default ControlPanel;
