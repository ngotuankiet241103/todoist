package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.entity.Section;
import com.todo.todolistbackend.request.SectionRequest;
import com.todo.todolistbackend.service.SectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/sections")
@RequiredArgsConstructor
public class SectionController {
    private final SectionService sectionService;
    @GetMapping("/{project-code}")
    public ResponseEntity<?> getSectionByProjectId(@PathVariable("project-code") String projectCode){
        return ResponseEntity.ok(sectionService.findByProjectCode(projectCode));
    }
    @PostMapping("/{project-code}")
    public Section addSection(@RequestBody @Valid SectionRequest sectionRequest,
                                              @PathVariable("project-code") String projectCode){
        return sectionService.save(sectionRequest,projectCode);
    }
}
