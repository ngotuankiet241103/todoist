package com.todo.todolistbackend.mapping.impl;

import com.todo.todolistbackend.dto.ProjectDTO;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.mapping.ProjectMapping;
import org.springframework.stereotype.Service;

@Service
public class ProjectMappingImpl implements ProjectMapping {
    @Override
    public ProjectDTO toDTO(Project project) {

        return project != null ? new ProjectDTO(project.getId(),project.getName(),project.getCode()) : null;
    }
}
