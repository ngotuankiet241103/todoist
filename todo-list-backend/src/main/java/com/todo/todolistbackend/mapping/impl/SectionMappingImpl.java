package com.todo.todolistbackend.mapping.impl;

import com.todo.todolistbackend.dto.SectionDTO;
import com.todo.todolistbackend.entity.Section;
import com.todo.todolistbackend.mapping.SectionMapping;
import org.springframework.stereotype.Service;

@Service
public class SectionMappingImpl implements SectionMapping {
    @Override
    public SectionDTO toDTO(Section section) {
        return section != null ?  new SectionDTO(section.getId(), section.getName(),section.getCode()) : null;
    }
}
