package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.service.PriorityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class PriorityController {
    private final PriorityService priorityService;
    @GetMapping("/priorities")
    public ResponseEntity<?> getPriorities(){
        return ResponseEntity.ok(priorityService.findAll());
    }
}
