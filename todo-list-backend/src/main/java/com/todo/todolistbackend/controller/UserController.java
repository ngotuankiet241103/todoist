package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.request.UserRequest;
import com.todo.todolistbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(){
        try {
            UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            long id = userPrincipal.getId();
            return ResponseEntity.ok(userService.findUById(id));
        }
        catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    @PostMapping("/profile/name")
    public ResponseEntity<?> createUserName(@RequestBody  UserRequest user){
        return ResponseEntity.ok(userService.createUserName(user));
    }
}
