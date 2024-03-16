import React from "react";
import TaskList, { TaskListResponse } from "../task/TaskList";
import { Droppable } from "react-beautiful-dnd";
import { getListStyle } from "../../utils/dragContext";

const SubProjectItem = ({
  title,
  tasks,
  code,
  isList,
}: {
  title?: string;
  tasks: TaskListResponse | [];
  code: string;
  isList: boolean;
}) => {
  return (
    <div>
      <h2 className="font-semibold mb-2">{title}</h2>
      <Droppable droppableId={`${code}`}>
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <TaskList isList={isList} tasks={tasks}></TaskList>
              {provided.placeholder}
            </div>
          </>
        )}
      </Droppable>
    </div>
  );
};

export default SubProjectItem;
