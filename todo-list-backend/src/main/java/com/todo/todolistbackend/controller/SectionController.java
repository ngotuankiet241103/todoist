package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.entity.Section;
import com.todo.todolistbackend.request.SectionRequest;
import com.todo.todolistbackend.service.SectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class SectionController {
    private final SectionService sectionService;
    @GetMapping("/sections/{project-code}")
    public ResponseEntity<?> getSectionByProjectId(@PathVariable("project-code") String projectCode){
        return ResponseEntity.ok(sectionService.findByProjectCode(projectCode));
    }
    @GetMapping("/sections/code/{section-code}")
    public ResponseEntity<?> getSectionBySectionCode(@PathVariable("section-code") String sectionCode){
        return ResponseEntity.ok(sectionService.findBySectionCode(sectionCode));
    }
    @PostMapping("/sections/{project-code}")
    public Section addSection(@RequestBody @Valid SectionRequest sectionRequest,
                                              @PathVariable("project-code") String projectCode){
        return sectionService.save(sectionRequest,projectCode);
    }
    @PutMapping("/sections")
    public ResponseEntity<?> updateSection(@RequestBody SectionRequest sectionRequest) {
        return ResponseEntity.ok(sectionService.updateSection(sectionRequest));
    }
    @DeleteMapping("/sections")
    public ResponseEntity<?> addSection(@RequestBody  SectionRequest sectionRequest) {
        return ResponseEntity.ok(sectionService.deleteById(sectionRequest));
    }
}
