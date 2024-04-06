package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.dto.ProjectDTO;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.mapping.ProjectMapping;
import com.todo.todolistbackend.repository.ProjectRepository;
import com.todo.todolistbackend.repository.TaskRepository;
import com.todo.todolistbackend.request.ProjectRequest;
import com.todo.todolistbackend.service.ProjectService;
import com.todo.todolistbackend.service.SectionService;
import com.todo.todolistbackend.service.UserService;
import com.todo.todolistbackend.util.HandleStrings;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final UserService userService;
    private final SectionService sectionService;
    private final ProjectMapping projectMapping;
    private final TaskRepository taskRepository;

    @Override
    public ProjectDTO save(ProjectRequest projectRequest) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByid(userPrincipal.getId());
        Project project = Project
                .builder()
                .name(projectRequest.getName())
                .user(user)
                .build();
        projectRepository.save(project);
        project.setCode(HandleStrings.generateCode(projectRequest.getName(),project.getId()));
        return signleMapping(projectRepository.save(project));
    }

    @Override
    public void createProject(User user) {
        String[] projectNames = new String[]{"Home","My Work","Education"};
        for(int i=0; i <= projectNames.length -1;i++){
            createSigleProjectAndSections(user,projectNames[i]);
        }

    }
    private void createSigleProjectAndSections(User user,String name){
        Project project = createSigleProject(user,name);
        sectionService.createSectionDefault(project);
    }
    private Project createSigleProject(User user,String name){
        System.out.println(name);
        Project project = Project.builder()
                .name(name)
                .user(user)
                .build();
        projectRepository.save(project);
        project.setCode(HandleStrings.generateCode(name,project.getId()));
        return  projectRepository.save(project);

    }


    @Override
    public Project findByName(String projectName) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByid(userPrincipal.getId());
        long userId = user.getId();
        return projectRepository.findByNameAndUserId(projectName,userId).orElseThrow(() -> new RuntimeException("project is not found"));
    }

    @Override
    public Project findByCode(String projectCode) {

        return projectRepository.findByCode(projectCode).orElseThrow(() -> new RuntimeException("project is not found"));
    }

    @Override
    public List<ProjectDTO> findAll() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        long userId = userPrincipal.getId();
        List<Project> projects = projectRepository.findAllByUserId(userId);

        return mappingAll(projects);
    }

    @Override
    public void createInbox(User user) {
        createSigleProject(user,"Inbox");
    }

    @Override
    public Object findProjectInbox() {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            long userId = userPrincipal.getId();
            Project project =  projectRepository.findByNameAndUserId("Inbox",userId).orElseThrow(() -> new BadRequestException("Request is not valid"));
            return signleMapping(project);
        }
        catch (Exception error){
            System.out.println(error);
        }
        return null;
    }

    @Override
    public Object updateProject(ProjectRequest projectRequest) {
        Project project = projectRepository.findById(projectRequest.getId()).orElseThrow(() -> new BadRequestException("project is not exist"));
        project.setCode(HandleStrings.generateCode(projectRequest.getName(),projectRequest.getId()));
        project.setName(projectRequest.getName());
        return signleMapping(projectRepository.save(project));
    }
    @Transactional
    @Override
    public Object deleteProject(ProjectRequest projectRequest) {
        sectionService.deleteByProjectId(projectRequest.getId());
        taskRepository.deleteByProjectId(projectRequest.getId());
        projectRepository.deleteById(projectRequest.getId());
        return null;
    }

    private List<ProjectDTO> mappingAll(List<Project> projects){
        return projects.stream().map(project -> {
            ProjectDTO projectDTO = signleMapping(project);
            long count = taskRepository.countByProjectId(project.getId());
            projectDTO.setTask_all(count);
            return projectDTO;
        }).collect(Collectors.toList());
    }
    private ProjectDTO signleMapping(Project project){
        return projectMapping.toDTO(project);
    }
}
