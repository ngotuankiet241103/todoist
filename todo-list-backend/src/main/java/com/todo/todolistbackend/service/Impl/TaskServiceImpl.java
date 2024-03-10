package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.dto.*;
import com.todo.todolistbackend.entity.*;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.mapping.*;
import com.todo.todolistbackend.repository.TaskRepository;
import com.todo.todolistbackend.request.TaskRequest;
import com.todo.todolistbackend.request.TaskUpdateRequest;
import com.todo.todolistbackend.service.*;
import com.todo.todolistbackend.util.HandleStrings;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final UserService userService;
    private final ProjectService projectService;
    private final LabelService labelService;
    private final SectionService sectionService;
    private final TaskMapping taskMapping;
    private final ProjectMapping projectMapping;
    private final SectionMapping sectionMapping;
    private final LabelMapping labelMapping;
    private final PriorityService priorityService;
    private final PriorityMapping priorityMapping;

    @Override
    public Object save(TaskRequest taskRequest) {
       Task task = generateTask(taskRequest);
        taskRepository.save(task);
        task.setCode(HandleStrings.generateCode(task.getTitle(),task.getId()));
        return singleMapping(taskRepository.save(task));
    }
    private Task generateTask(TaskRequest taskRequest){
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.findByid(userPrincipal.getId());
        Project project = taskRequest.getProjectCode().equals("") ? null : projectService.findByCode(taskRequest.getProjectCode());
        Set<Label> label = taskRequest.getLabelCodes().size() <= 0 ? null : labelService.findAllByCode(taskRequest.getLabelCodes());
        Section section = taskRequest.getSectionCode().equals("") ? null : sectionService.findByCode(taskRequest.getSectionCode());
        Priority priority = priorityService.findByCode(taskRequest.getPriorityCode());
        Task task = Task.builder()
                .title(taskRequest.getTitle())
                .description(taskRequest.getDescription())
                .project(project)
                .section(section)
                .labels(label)
                .user(user)
                .priority(priority)
                .isCompleted(false)
                .expiredAt(formatDate(taskRequest.getExpiredAt()))
                .build();
        return task;
    }
    private Date formatDate(Date date){
        Instant instant = date.toInstant();
        // Create a ZonedDateTime from the Instant
        // You can specify the time zone you want to use
        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
        // Extract LocalDate from ZonedDateTime
        LocalDate localDate = zonedDateTime.toLocalDate();
        LocalDateTime lastMoment = LocalDateTime.of(localDate, LocalTime.of(23, 59, 59));
        return Date.from(lastMoment.atZone(ZoneId.systemDefault()).toInstant());
    }
    @Override
    public List<TaskDTO> findAllByProjectCode(String projectCode) {

        List<Task> tasks = taskRepository.findAllByProjectCode(projectCode);
        return mappingList(tasks);
    }

    @Override
    public Object findAllByExpiredAt(String strDate) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            // Parse the string to obtain a Date object
            Date date = dateFormat.parse(strDate);
            Instant instant = date.toInstant();
            // Create a ZonedDateTime from the Instant
            // You can specify the time zone you want to use
            ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
            // Extract LocalDate from ZonedDateTime
            LocalDate localDateYesterday = zonedDateTime.toLocalDate();
            LocalDate localDateTommorow = zonedDateTime.toLocalDate();
            Date yesterday = Date.from(localDateYesterday.minusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant());
            Date tommorow = Date.from(localDateYesterday.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant()) ;
            List<Task> tasks = taskRepository.findByExpiredAtAndUserId(yesterday,tommorow,userPrincipal.getId());
            return mappingList(tasks);
        } catch (ParseException e) {
            // Handle the exception if the date string is not in the expected format
            System.out.println("Error parsing date: " + e.getMessage());
        }

        return  null;
    }

    @Override
    public Object findAllByProjectCodeAndSectionCode(String projectCode, String sectionCode) {
        List<Task> tasks = taskRepository.findAllByProjectCodeAndSectionCode(projectCode,sectionCode);
        return mappingList(tasks);
    }

    @Override
    public Object updateProject(TaskUpdateRequest taskUpdateRequest) {
        Project project = projectService.findByCode(taskUpdateRequest.getProjectCode());
        Section section = taskUpdateRequest.getSectionCode() != null? sectionService.findByCode(taskUpdateRequest.getSectionCode()) : null;
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElseThrow(() -> new BadRequestException("Task is not exits"));
        task.setProject(project);
        task.setSection(section);
        return singleMapping(taskRepository.save(task));
    }

    @Override
    public Object updateSection(TaskUpdateRequest taskUpdateRequest) {
        Section section = sectionService.findByCode(taskUpdateRequest.getSectionCode());
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElseThrow(() -> new BadRequestException("Task is not exits"));
        task.setSection(section);

        return singleMapping(taskRepository.save(task));
    }

    @Override
    public Object updateInfoProject(TaskUpdateRequest taskUpdateRequest) {
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElseThrow(() -> new BadRequestException("Task is not exits"));
        task.setTitle(taskUpdateRequest.getTitle());
        task.setDescription(taskUpdateRequest.getDescription());
        return singleMapping(taskRepository.save(task));
    }

    @Override
    public Object updateExpiredAt(TaskUpdateRequest taskUpdateRequest) {
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElseThrow(() -> new BadRequestException("Task is not exits"));
        task.setExpiredAt(formatDate(taskUpdateRequest.getExpiredAt()));
        return singleMapping(taskRepository.save(task));
    }

    @Override
    public Object updatePriority(TaskUpdateRequest taskUpdateRequest) {
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElseThrow(() -> new BadRequestException("Task is not exits"));
        Priority priority = priorityService.findByCode(taskUpdateRequest.getPriorityCode());
        task.setPriority(priority);
        return singleMapping(taskRepository.save(task));
    }

    @Override
    public Object updateLabel(TaskUpdateRequest taskUpdateRequest) {
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElseThrow(() -> new BadRequestException("Task is not exits"));
        Set<Label> labels  = taskUpdateRequest.getLabelCodes() != null ? labelService.findAllByCode(taskUpdateRequest.getLabelCodes()) : null;
        task.setLabels(labels);
        return singleMapping(taskRepository.save(task));
    }

    @Override
    public Object updateCompleted(TaskUpdateRequest taskUpdateRequest) {
        Task task = taskRepository.findById(taskUpdateRequest.getId()).orElseThrow(() -> new BadRequestException("Task is not exits"));
        task.setCompleted(true);
        return singleMapping(taskRepository.save(task));
    }

    @Override
    public Object updateTask(TaskRequest taskRequest,long id) {
        Task task = generateTask(taskRequest);
        task.setId(id);
        return singleMapping(taskRepository.save(task));
    }

    private List<TaskDTO> mappingList(List<Task> tasks){
        return tasks.stream().map(task -> singleMapping(task)).collect(Collectors.toList());
    }
    private TaskDTO singleMapping(Task task){
        TaskDTO taskDTO = taskMapping.toDTO(task);
        ProjectDTO projectDTO = projectMapping.toDTO(task.getProject());
        SectionDTO sectionDTO = sectionMapping.toDTO(task.getSection());
        PriorityDTO priorityDTO = priorityMapping.toDTO(task.getPriority());
        List<LabelDTO> lists =  task.getLabels() != null ? (List<LabelDTO>) task.getLabels().stream().map(label -> labelMapping.toDTO((Label) label)).collect(Collectors.toList()) : null;
        taskDTO.setProject(projectDTO);
        taskDTO.setSection(sectionDTO);
        taskDTO.setLabels(lists);
        taskDTO.setPriority(priorityDTO);
        return taskDTO;
    }


}
