package com.todo.todolistbackend.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticationResponse {
    private String access_token;
    private String refresh_token;
    private String tokenType = "Bearer";


}
