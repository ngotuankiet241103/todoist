package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.dto.ProjectDTO;
import com.todo.todolistbackend.entity.Project;
import com.todo.todolistbackend.request.ProjectRequest;
import com.todo.todolistbackend.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectDTO>> getProject(){
        return ResponseEntity.ok(projectService.findAll());
    }
    @GetMapping("/projects/inbox")
    public ResponseEntity<?> getProjectInbox() {

        return ResponseEntity.ok(projectService.findProjectInbox());
    }
    @PostMapping("/projects/add")
    public ResponseEntity<?> addProject(@RequestBody @Valid ProjectRequest projectRequest){
        return ResponseEntity.ok(projectService.save(projectRequest));
    }
    @PutMapping("/projects")
    public ResponseEntity<?> updateProject(@RequestBody @Valid ProjectRequest projectRequest){
        return ResponseEntity.ok(projectService.updateProject(projectRequest));
    }
    @DeleteMapping("/projects")
    public ResponseEntity<?> deleteProject(@RequestBody  ProjectRequest projectRequest){
        return ResponseEntity.ok(projectService.deleteProject(projectRequest));
    }

}
