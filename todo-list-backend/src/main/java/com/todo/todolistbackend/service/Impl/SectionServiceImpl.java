package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.dto.SectionDTO;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.Section;
import com.todo.todolistbackend.mapping.SectionMapping;
import com.todo.todolistbackend.repository.ProjectRepository;
import com.todo.todolistbackend.repository.SectionRepository;
import com.todo.todolistbackend.request.SectionRequest;
import com.todo.todolistbackend.service.SectionService;
import com.todo.todolistbackend.service.UserService;
import com.todo.todolistbackend.util.HandleStrings;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SectionServiceImpl implements SectionService {
    private final SectionRepository sectionRepository;
    private final UserService userService;
    private final ProjectRepository projectRepository;
    private final SectionMapping sectionMapping;
    @Override
    public Section findByName(String sectionName, Project project) {

        return sectionRepository.findByNameAndProjectId(sectionName,project.getId()).orElseThrow(() -> new RuntimeException("section is not found"));
    }

    @Override
    public Section findByCode(String sectionCode) {

        return sectionRepository.findByCode(sectionCode).orElseThrow(() -> new RuntimeException("section is not exits"));
    }

    @Override
    public void createSectionDefault(Project project) {
        String[] sectionNameDefault = new String[]{"Routines","Inspiration"};

        for(String s: sectionNameDefault){
            createSingleSection(project,s);
        }
    }

    @Override
    public Section save(SectionRequest sectionRequest, String projectCode) {
        Project project = projectRepository.findByCode(projectCode).orElseThrow(() -> new RuntimeException("project is not exits"));

        return createSingleSection(project,sectionRequest.getName());
    }

    @Override
    public Object findByProjectCode(String projectCode) {
        List<Section> sections = sectionRepository.findByProjectCode(projectCode);
        return mappingAll(sections);
    }

    @Override
    public Section findSectionByCode(String sectionCode) {
        return sectionRepository.findByCode(sectionCode).orElse(null);
    }


    private List<SectionDTO> mappingAll(List<Section> sections){
        return sections.stream().map(section -> singleMapping(section)).collect(Collectors.toList());
    }
    private SectionDTO singleMapping(Section section){
        return sectionMapping.toDTO(section);
    }
    private Section createSingleSection(Project project,String name){
        Section section = Section.builder()
                .name(name)
                .project(project)
                .build();
        sectionRepository.save(section);
        section.setCode(HandleStrings.generateCode(name,section.getId()));
        System.out.println(section.getProject().getUser().getName());
        return sectionRepository.save(section);
    }
}
