package com.todo.todolistbackend.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserUpdateRequest {
    private String name;
    private String password;
    private String email;
    private String newPassword;
    private String avatar;
}
