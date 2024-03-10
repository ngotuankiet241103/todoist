package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.TaskDTO;
import com.todo.todolistbackend.request.TaskRequest;
import com.todo.todolistbackend.request.TaskUpdateRequest;

import java.util.Date;
import java.util.List;

public interface TaskService {
    Object save(TaskRequest taskRequest);


    List<TaskDTO> findAllByProjectCode(String projectCode);

    Object findAllByExpiredAt(String date);

    Object findAllByProjectCodeAndSectionCode(String projectCode, String sectionCode);

    Object updateProject(TaskUpdateRequest taskUpdateRequest);

    Object updateSection(TaskUpdateRequest taskUpdateRequest);

    Object updateInfoProject(TaskUpdateRequest taskUpdateRequest);

    Object updateExpiredAt(TaskUpdateRequest taskUpdateRequest);

    Object updatePriority(TaskUpdateRequest taskUpdateRequest);

    Object updateLabel(TaskUpdateRequest taskUpdateRequest);

    Object updateCompleted(TaskUpdateRequest taskUpdateRequest);

    Object updateTask(TaskRequest taskRequest,long  id);
}
