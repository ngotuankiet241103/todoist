package com.todo.todolistbackend.mapping.impl;

import com.todo.todolistbackend.dto.TaskDTO;
import com.todo.todolistbackend.entity.Task;
import com.todo.todolistbackend.mapping.TaskMapping;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service

public class TaskMappingImpl implements TaskMapping {
    @Override
    public TaskDTO toDTO(Task task) {
        return TaskDTO.builder()
                .id(task.getId())
                .title(task.getTitle())
                .code(task.getCode())
                .description(task.getDescription())
                .expiredAt(task.getExpiredAt())
                .build();
    }
}
