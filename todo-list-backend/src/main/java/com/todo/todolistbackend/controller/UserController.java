package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.request.UserRequest;
import com.todo.todolistbackend.request.UserUpdateRequest;
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
    @PutMapping("/profile/password")
    public ResponseEntity<?> updatePassword(@RequestBody UserUpdateRequest user){
        return ResponseEntity.ok(userService.updatePassword(user));

    }
    @PutMapping("/profile/password/add")
    public ResponseEntity<?> updateAddPassword(@RequestBody UserUpdateRequest user){
        return ResponseEntity.ok(userService.updateAddPassword(user));

    }
    @PutMapping("/profile/name")
    public ResponseEntity<?> updateName(@RequestBody UserUpdateRequest user){
        return ResponseEntity.ok(userService.updateName(user));

    }
    @PutMapping("/profile/email")
    public ResponseEntity<?> updateEmail(@RequestBody UserUpdateRequest user){
        return ResponseEntity.ok(userService.updateEmail(user));

    }
    @PutMapping("/profile/avatar")
    public ResponseEntity<?> updateAvatar(@RequestBody UserUpdateRequest user){
        return ResponseEntity.ok(userService.updateAvatar(user));

    }
}
