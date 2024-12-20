package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.TaskDTO;
import com.todo.todolistbackend.entity.Task;
import com.todo.todolistbackend.request.TaskRequest;
import com.todo.todolistbackend.request.TaskUpdateRequest;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;

public interface TaskService {
    Object save(TaskRequest taskRequest);


    List<TaskDTO> findAllByProjectCode(String projectCode, List<String> priorityCode, List<String> labelCode);

    Object findAllByExpiredAt(String date, List<String> priorityCode, List<String> labelCode);

    Object findAllByProjectCodeAndSectionCode(String projectCode, String sectionCode);

    Object updateProject(TaskUpdateRequest taskUpdateRequest);

    Object updateSection(TaskUpdateRequest taskUpdateRequest);

    Object updateInfoProject(TaskUpdateRequest taskUpdateRequest);

    Object updateExpiredAt(TaskUpdateRequest taskUpdateRequest);

    Object updatePriority(TaskUpdateRequest taskUpdateRequest);

    Object updateLabel(TaskUpdateRequest taskUpdateRequest);

    Object updateCompleted(TaskUpdateRequest taskUpdateRequest);

    Object updateTask(TaskRequest taskRequest,long  id);

    Object findTaskUpcoming(String from, String to, List<String> priorityCode, List<String> labelCode);

    Object findAllByLabelCode(String labelCode, List<String> priorityCode, List<String> labelsCode);

    Object findTaskCompleted(int page);

    List<Task> findByExpiredAt(Date today, Date lastToday);

    Object getAllByType(Pageable pageable);
}
