package com.todo.todolistbackend.mapping.impl;

import com.todo.todolistbackend.dto.UserDTO;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.mapping.UserMapping;
import org.springframework.stereotype.Service;

@Service
public class UserMappingImpl implements UserMapping {
    @Override
    public UserDTO toDTO(User user) {
        return new UserDTO(user.getName(), user.getImageUrl());
    }
}
