import TaskItem, { TaskResponse } from "./TaskItem";
import { Draggable } from "react-beautiful-dnd";
import useOpenModal from "../../hooks/useOpenModal";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
const TaskAdd = lazy(() => import("./TaskAdd"));

const FormTask = lazy(() => import("../form/FormTask"));
export type TaskListResponse = TaskResponse[];
export const grid = 8;
export const getItemStyle = (draggableStyle, isDragging, isDraggingOver) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    marginBottom: grid,
    width: "100%",
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};
const TaskList = ({
  tasks,
  isList,
  isUpcoming
}: {
  tasks: TaskListResponse;
  isList: boolean;
  isUpcoming: string
}) => {
  const { isShow, handleToggleModel } = useOpenModal(false);
  const isDragging = useSelector((state: state) => state.status.isDragging);
  return (
    <div className="w-full">
      {tasks &&
        tasks.length > 0 &&
        tasks.map((task, index) => (
          <Draggable index={index} key={task.id} draggableId={task.id + ""}>
            {(provided, snapshot) => (
              <TaskItem
                key={index}
                task={task}
                isList={isList}
                innerref={provided.innerRef}
                provided={provided}
                style={getItemStyle(
                  provided.draggableProps.style,
                  snapshot.isDragging,
                  snapshot
                )}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              ></TaskItem>
            )}
          </Draggable>
        ))}
      <Suspense fallback={<div>loading</div>}>
        {!isShow && <TaskAdd className={`${isDragging ? '' : 'active'}`} onclick={() => handleToggleModel()}></TaskAdd>}
        {isShow && (
          <FormTask
            isList={isList}
            isUpcoming={isUpcoming}
            isFixed={false}
            visibile={true}
            onclick={() => handleToggleModel()}
          ></FormTask>
        )}
      </Suspense>
    </div>
  );
};

export default TaskList;
