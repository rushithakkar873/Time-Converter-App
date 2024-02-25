import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useGlobalState } from "../hooks/useGlobalState";
import ControlPanel from "./ControlPanel";
import TimeDisplay from "./TimeDisplay";
import { ActionTypes } from '../context/actionTypes';

const TimeConverterContainer = () => {
    const { state, dispatch } = useGlobalState();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onDragEnd = (result: { destination: any; source: any; }) => {
        const { destination, source } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }
        const reorderedTimeZones = Array.from(state.selectedTimeZones);
        const [removed] = reorderedTimeZones.splice(source.index, 1);
        reorderedTimeZones.splice(destination.index, 0, removed);
        dispatch({ type: ActionTypes.CHANGE_ORDER, payload: reorderedTimeZones });
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-3/4 p-6 mx-auto grow">
                <ControlPanel />
                <Droppable droppableId="timezones">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="mt-6 p-2 flex flex-col space-y-5">
                            {state.selectedTimeZones.length > 0 ? state.selectedTimeZones.map((timeZone, index) => (
                                <Draggable key={timeZone.id} draggableId={timeZone.id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps}>
                                            <TimeDisplay timeZone={timeZone} dragHandleProps={provided.dragHandleProps} />
                                        </div>
                                    )}
                                </Draggable>
                            )) : <div className='text-gray-400 text-center text-lg'>Add time zone to see time converion</div>}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default TimeConverterContainer;
