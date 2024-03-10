package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.request.LabelRequest;
import com.todo.todolistbackend.service.LabelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class LabelController {
    private final LabelService labelService;
    @GetMapping("/labels")
    public ResponseEntity<?> getLabels(){
        return ResponseEntity.ok(labelService.findAll());
    }
    @PostMapping("/labels/add")
    public ResponseEntity<?> addLabel(@RequestBody @Valid LabelRequest labelRequest){
        return ResponseEntity.ok(labelService.save(labelRequest));
    }
}
