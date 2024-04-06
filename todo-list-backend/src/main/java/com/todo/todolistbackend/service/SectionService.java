package com.todo.todolistbackend.service;

import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.Section;
import com.todo.todolistbackend.request.SectionRequest;

public interface SectionService {
    Section findByName(String sectionName, Project project);

    Section findByCode(String sectionCode);

    void createSectionDefault(Project project);

    Section save(SectionRequest sectionRequest, String projectCode);

    Object findByProjectCode(String projectCode);

    Section findSectionByCode(String sectionCode);

    void deleteByProjectId(long id);

    Object deleteById(SectionRequest sectionRequest);

    Object updateSection(SectionRequest sectionRequest);

    Object findBySectionCode(String sectionCode);
}
