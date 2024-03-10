package com.todo.todolistbackend.service;

import com.todo.todolistbackend.dto.UserDTO;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.request.SignUpRequest;
import com.todo.todolistbackend.request.UserRequest;
import com.todo.todolistbackend.response.AuthenticationResponse;

public interface UserService {

    boolean existEmail(String email);

    User findByid(Long id);

    Object createUserName(UserRequest user);

    UserDTO findUById(long id);
}
