import React from "react";
import TaskList, { TaskListResponse } from "../task/TaskList";
import { Droppable } from "react-beautiful-dnd";
import { getListStyle } from "../../utils/dragContext";

const SubProjectItem = ({
  title,
  tasks,
  code
}: {
  title: string;
  tasks: TaskListResponse;
  code: string;
}) => {
  return (
    <>
      <h2 className="font-semibold">{title}</h2>
      <Droppable droppableId={`${code}`}>
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
               <TaskList tasks={tasks}></TaskList>
              {provided.placeholder}
            </div>
          </>
        )}
      </Droppable>
    </>
  );
};

export default SubProjectItem;
