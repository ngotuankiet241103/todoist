package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.PriorityDTO;
import com.todo.todolistbackend.entity.Priority;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface PriorityService {
    Priority findByLevel(String priorityLevel);

    List<PriorityDTO> findAll();

    Priority findByCode(String priorityCode);
}
