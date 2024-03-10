package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.auth.AuthenticationService;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.repository.UserRepository;
import com.todo.todolistbackend.request.LoginRequest;
import com.todo.todolistbackend.request.SignUpRequest;
import com.todo.todolistbackend.request.TokenRequest;
import com.todo.todolistbackend.response.ErrorResponse;
import com.todo.todolistbackend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final AuthenticationService authService;
    @PostMapping("/sign-up")
    public ResponseEntity<?> signUpUser(@RequestBody  SignUpRequest userRequest){
        boolean check = userService.existEmail(userRequest.getEmail());
        if(check){
            return ResponseEntity.badRequest().
                    body(new ErrorResponse
                            (new Date(),"email is existed",
                                    HttpStatus.BAD_REQUEST.toString()));
        }
        return ResponseEntity.ok(authService.signUp(userRequest));
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody @Valid TokenRequest tokenRequest){
        return ResponseEntity.ok(authService.refreshToken(tokenRequest));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody  LoginRequest loginRequest){
        boolean check = userService.existEmail(loginRequest.getEmail());
        if(!check){
            return ResponseEntity.badRequest().
                    body(new ErrorResponse
                            (new Date(),"email is not exists",
                                    HttpStatus.BAD_REQUEST.toString()));
        }
        return ResponseEntity.ok(authService.login(loginRequest));
    }
}
