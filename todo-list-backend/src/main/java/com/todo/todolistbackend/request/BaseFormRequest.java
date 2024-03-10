package com.todo.todolistbackend.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseFormRequest {
    @Email
    @NotNull
    private String email;
    @NotNull
    private String password;
}
