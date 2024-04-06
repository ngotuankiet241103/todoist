package com.todo.todolistbackend.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SectionRequest {
    private long id;
    @NotBlank
    private String name;

}
