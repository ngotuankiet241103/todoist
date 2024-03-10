package com.todo.todolistbackend.mapping.impl;

import com.todo.todolistbackend.dto.PriorityDTO;
import com.todo.todolistbackend.entity.Priority;
import com.todo.todolistbackend.mapping.PriorityMapping;
import org.springframework.stereotype.Component;

@Component
public class PriorityMappingImpl implements PriorityMapping {
    @Override
    public PriorityDTO toDTO(Priority priority) {
        return new PriorityDTO(priority.getId(),priority.getName(),priority.getCode(),priority.getLevel());
    }
}
