package com.todo.todolistbackend.dto;

import com.todo.todolistbackend.entity.Project;
import lombok.*;

import java.util.Date;
import java.util.List;
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDTO {
    private long id;
    private String title;
    private String code;
    private String description;
    private Date expiredAt;
    private PriorityDTO priority;
    private ProjectDTO project;
    private SectionDTO section;
    private List<LabelDTO> labels;
    private boolean isCompleted;
}
