import { useGlobalState } from "../hooks/useGlobalState";
import ControlPanel from "./ControlPanel";
import TimeDisplay from "./TimeDisplay";

const TimeConverterContainer = () => {
    const { state } = useGlobalState();

    return (
        <div className="w-3/4 p-6 mx-auto grow">
            <ControlPanel />
            <div className="mt-6 p-2 flex flex-col space-y-5">
                {state.selectedTimeZones.length > 0 ? state.selectedTimeZones.map((timeZone) => (
                    <TimeDisplay key={timeZone.id} timeZone={timeZone} />
                )) : <></>}
            </div>
        </div>
    )
};
export default TimeConverterContainer;