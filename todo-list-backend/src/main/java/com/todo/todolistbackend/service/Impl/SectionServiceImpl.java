package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.dto.SectionDTO;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.Section;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.mapping.SectionMapping;
import com.todo.todolistbackend.repository.ProjectRepository;
import com.todo.todolistbackend.repository.SectionRepository;
import com.todo.todolistbackend.repository.TaskRepository;
import com.todo.todolistbackend.request.SectionRequest;
import com.todo.todolistbackend.response.ResponseApi;
import com.todo.todolistbackend.service.SectionService;
import com.todo.todolistbackend.service.UserService;
import com.todo.todolistbackend.util.HandleStrings;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SectionServiceImpl implements SectionService {
    private final SectionRepository sectionRepository;
    private final UserService userService;
    private final ProjectRepository projectRepository;
    private final SectionMapping sectionMapping;
    private final TaskRepository taskRepository;
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

    @Override
    public void deleteByProjectId(long id) {
        sectionRepository.deleteByProjectId(id);
    }
    @Transactional
    @Override
    public Object deleteById(SectionRequest sectionRequest) {
        taskRepository.deleteBySectionId(sectionRequest.getId());
        sectionRepository.deleteById(sectionRequest.getId());

        return new ResponseApi(HttpStatus.OK.toString(),"delete section success",null);
    }

    @Override
    public Object updateSection(SectionRequest sectionRequest) {
        Section section = sectionRepository.findById(sectionRequest.getId()).orElseThrow(() -> new BadRequestException("section is not exist"));
        section.setName(sectionRequest.getName());
        section.setCode(HandleStrings.generateCode(sectionRequest.getName(),section.getId()));
        System.out.println(section.getCode());
        return singleMapping(sectionRepository.save(section));
    }

    @Override
    public Object findBySectionCode(String sectionCode) {
        Section section = findSectionByCode(sectionCode);
        return section != null ?  singleMapping(section) : null;
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
