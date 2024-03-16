package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.request.TaskRequest;
import com.todo.todolistbackend.request.TaskUpdateRequest;
import com.todo.todolistbackend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    @GetMapping("/tasks/{project-code}")
    public ResponseEntity<?> getTasksByProjectCode(@PathVariable("project-code") String projectCode,
                                                   @RequestParam(name = "priorityCode",defaultValue = "") List<String> priorityCode,
                                                   @RequestParam(name = "labelCode",defaultValue = "") List<String> labelCode){
        return ResponseEntity.ok(taskService.findAllByProjectCode(projectCode,priorityCode,labelCode));
    }

    @GetMapping("/tasks/{project-code}/{section-code}")
    public ResponseEntity<?> getTasksByProjectCodeAndSectionCode(@PathVariable("project-code") String projectCode,
                                                                 @PathVariable("section-code") String sectionCode){
        return ResponseEntity.ok(taskService.findAllByProjectCodeAndSectionCode(projectCode,sectionCode));
    }
    @GetMapping("/tasks")
    public ResponseEntity<?> getTasksByExpiredAt(@RequestParam("expired_at") String date){
        return ResponseEntity.ok(taskService.findAllByExpiredAt(date));
    }
    @PostMapping("/tasks/add")
    public ResponseEntity<?> addTask(@RequestBody @Valid TaskRequest taskRequest){
        return ResponseEntity.ok(taskService.save(taskRequest));
    }
    @PutMapping("/tasks/project")
    public ResponseEntity<?> updateProject(@RequestBody TaskUpdateRequest taskUpdateRequest){
        return ResponseEntity.ok(taskService.updateProject(taskUpdateRequest));
    }
    @PutMapping("/tasks/{id}")
    public ResponseEntity<?> updateTask(@RequestBody @Valid TaskRequest taskRequest,@PathVariable("id") long id){
        return ResponseEntity.ok(taskService.updateTask(taskRequest,id));
    }
    @PutMapping("/tasks/label")
    public ResponseEntity<?> updateLabel(@RequestBody TaskUpdateRequest taskUpdateRequest){
        return ResponseEntity.ok(taskService.updateLabel(taskUpdateRequest));
    }
    @PutMapping("/tasks/completed")
    public ResponseEntity<?> updateCompleted(@RequestBody TaskUpdateRequest taskUpdateRequest){
        return ResponseEntity.ok(taskService.updateCompleted(taskUpdateRequest));
    }
    @PutMapping("/tasks/project/section")
    public ResponseEntity<?> updateSection(@RequestBody TaskUpdateRequest taskUpdateRequest){
        return ResponseEntity.ok(taskService.updateSection(taskUpdateRequest));
    }

    @PutMapping("/tasks/info")
    public ResponseEntity<?> updateInfoTask(@RequestBody TaskUpdateRequest taskUpdateRequest){
        return ResponseEntity.ok(taskService.updateInfoProject(taskUpdateRequest));
    }
    @PutMapping("/tasks/expired-at")
    public ResponseEntity<?> updateExpiredAt(@RequestBody TaskUpdateRequest taskUpdateRequest){
        return ResponseEntity.ok(taskService.updateExpiredAt(taskUpdateRequest));
    }
    @PutMapping("/tasks/priority")
    public ResponseEntity<?> updatePriority(@RequestBody TaskUpdateRequest taskUpdateRequest){
        return ResponseEntity.ok(taskService.updatePriority(taskUpdateRequest));
    }
}
