package com.todo.todolistbackend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class ProjectRequest {
    private long id;
    @NotBlank
    private String name;


}
