package com.todo.todolistbackend.service;

import com.todo.todolistbackend.entity.Label;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.request.LabelRequest;

import java.util.List;
import java.util.Set;

public interface LabelService {
    Object save(LabelRequest labelRequest);

    void createLabel(User user);

    Label findByName(String labelName);



    Set<Label> findAllByCode(List<String> labelCodes);

    Object findAll();
}
