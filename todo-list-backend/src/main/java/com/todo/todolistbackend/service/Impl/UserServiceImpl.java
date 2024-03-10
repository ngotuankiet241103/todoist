package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.dto.UserDTO;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.mapping.UserMapping;
import com.todo.todolistbackend.repository.UserRepository;
import com.todo.todolistbackend.request.UserRequest;
import com.todo.todolistbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapping userMapping;

    @Override
    public boolean existEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User findByid(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found"));
    }

    @Override
    public Object createUserName(UserRequest user) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userEntity = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new BadRequestException("user not found"));
        userEntity.setName(user.getName());
        return userRepository.save(userEntity);
    }

    @Override
    public UserDTO findUById(long id) {
        return userRepository.findById(id).map(user -> userMapping.toDTO(user)).orElseThrow(() -> new BadRequestException("user is not exist"));
    }
}
