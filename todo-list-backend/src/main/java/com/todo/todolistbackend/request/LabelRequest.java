package com.todo.todolistbackend.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LabelRequest {
    @NotBlank
    private String name;

}
