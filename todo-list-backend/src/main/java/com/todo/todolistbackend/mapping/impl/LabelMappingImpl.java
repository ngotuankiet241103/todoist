package com.todo.todolistbackend.mapping.impl;

import com.todo.todolistbackend.dto.LabelDTO;
import com.todo.todolistbackend.entity.Label;
import com.todo.todolistbackend.mapping.LabelMapping;
import org.springframework.stereotype.Service;

@Service
public class LabelMappingImpl implements LabelMapping {
    @Override
    public LabelDTO toDTO(Label label) {

        return label != null ? new LabelDTO(label.getId(), label.getName(), label.getCode()) : null;
    }
}
