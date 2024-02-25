import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useGlobalState } from "../hooks/useGlobalState";
import ControlPanel from "./ControlPanel";
import TimeDisplay from "./TimeDisplay";
import { ActionTypes } from "../context/actionTypes";

const TimeConverterContainer = () => {
    const { state, dispatch } = useGlobalState();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDragEnd = (result: any) => {
        const newTimeZonesList = Array.from(state.selectedTimeZones);
        const [removed] = newTimeZonesList.splice(result.source.index, 1);
        newTimeZonesList.splice(result.destination.index, 0, removed);
        dispatch({ type: ActionTypes.CHANGE_ORDER, payload: newTimeZonesList })
    };

    return (
        <div className="w-3/4 p-6 mx-auto grow">
            <ControlPanel />
            <div className="mt-6 p-2">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div className="flex flex-col space-y-5" ref={provided.innerRef} {...provided.droppableProps}>
                                {state.selectedTimeZones.length > 0 ? state.selectedTimeZones.map((timeZone, index) => (
                                    <Draggable key={timeZone.id} draggableId={timeZone.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <TimeDisplay timeZone={timeZone} />
                                            </div>
                                        )}
                                    </Draggable>
                                )) : <div className="text-gray-400 text-center text-lg">Select time zone to see time conversion</div>}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    )
};
export default TimeConverterContainer;