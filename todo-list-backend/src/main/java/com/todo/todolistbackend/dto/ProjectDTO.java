package com.todo.todolistbackend.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectDTO {
    private long id;
    private String name;
    private String code;
    private long task_all;

    public ProjectDTO(long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }
}
