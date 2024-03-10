package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.dto.PriorityDTO;
import com.todo.todolistbackend.entity.Priority;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.mapping.PriorityMapping;
import com.todo.todolistbackend.repository.PriorityRepository;
import com.todo.todolistbackend.service.PriorityService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PriorityServiceImpl implements PriorityService {
    private final PriorityRepository priorityRepository;
    private final PriorityMapping priorityMapping;
//    @PostConstruct
    private void createListPriority(){
        List<Priority> priorities = List.of(
                new Priority("Priority 1","priority-1","high"),
                new Priority("Priority 2","priority-2","low"),
                new Priority("Priority 3","priority-3","medium"),
                new Priority("Priority 4","priority-4","default")
        );
        priorities.stream().forEach(priority -> priorityRepository.save(priority));
    }

    @Override
    public Priority findByLevel(String priority) {
        return priorityRepository.findByLevel(priority).orElseThrow(() -> new BadRequestException("priority is not valid"));
    }

    @Override
    public List<PriorityDTO> findAll() {
        return priorityRepository.findAll().stream()
                .map(priority -> priorityMapping.toDTO(priority)).collect(Collectors.toList());
    }

    @Override
    public Priority findByCode(String priorityCode) {
        return priorityRepository.findByCode(priorityCode).orElseThrow(() -> new BadRequestException("priority is not valid"));
    }
}
