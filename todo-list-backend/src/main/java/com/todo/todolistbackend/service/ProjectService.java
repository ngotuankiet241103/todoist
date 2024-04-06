package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.ProjectDTO;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.request.ProjectRequest;

import java.util.List;

public interface ProjectService {
    ProjectDTO save(ProjectRequest projectRequest);

    void createProject(User user);

    Project findByName(String projectName);

    Project findByCode(String projectCode);

    List<ProjectDTO> findAll();

    void createInbox(User user);

    Object findProjectInbox();

    Object updateProject(ProjectRequest projectRequest);

    Object deleteProject(ProjectRequest projectRequest);
}
