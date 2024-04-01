package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.dto.UserDTO;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.exception.BadRequestException;
import com.todo.todolistbackend.mapping.UserMapping;
import com.todo.todolistbackend.repository.UserRepository;
import com.todo.todolistbackend.request.UserRequest;
import com.todo.todolistbackend.request.UserUpdateRequest;
import com.todo.todolistbackend.response.ApiResponse;
import com.todo.todolistbackend.response.ErrorResponse;
import com.todo.todolistbackend.response.ResponseApi;
import com.todo.todolistbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapping userMapping;
    private  PasswordEncoder passwordEncoder;
    @Autowired
    public void setPasswordEncoder(@Lazy PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

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

    @Override
    public Object updatePassword(UserUpdateRequest user) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userEntity = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new BadRequestException("user is not exist"));
        if(!passwordEncoder.matches(userEntity.getPassword(),userPrincipal.getPassword())){
            ErrorResponse errorResponse = new ErrorResponse(new Date(),"password is not matches", HttpStatus.BAD_REQUEST.toString());
            return  errorResponse;
        }
        userEntity.setPassword(passwordEncoder.encode(user.getNewPassword()));
        userRepository.save(userEntity);
        ApiResponse apiResponse = new ApiResponse(true,"Change password success");

        return apiResponse;
    }

    @Override
    public Object updateName(UserUpdateRequest user) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userEntity = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new BadRequestException("user is not exist"));
        userEntity.setName(user.getName());
        userRepository.save(userEntity);
        ApiResponse apiResponse = new ApiResponse(true,"Change name success");
        return apiResponse;
    }

    @Override
    public Object updateEmail(UserUpdateRequest user) {
        boolean isExist = userRepository.existsByEmail(user.getEmail());
        if(isExist){
            ErrorResponse errorResponse = new ErrorResponse(new Date(),"Email is exist", HttpStatus.BAD_REQUEST.toString());
            return  errorResponse;
        }
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userEntity = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new BadRequestException("user is not exist"));
        if(!passwordEncoder.matches(user.getPassword(),userEntity.getPassword())){
            ErrorResponse errorResponse = new ErrorResponse(new Date(),"Password is not matches", HttpStatus.BAD_REQUEST.toString());
            return  errorResponse;

        }
        userEntity.setEmail(user.getEmail());
        ApiResponse apiResponse = new ApiResponse(true,"Change email success");
        return apiResponse;

    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }

    @Override
    public Object updateAvatar(UserUpdateRequest user) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new BadRequestException("user is not exist"));
        currentUser.setImageUrl(user.getAvatar());
        userRepository.save(currentUser);
        return new ResponseApi(HttpStatus.OK.toString(),"change avatar success",null);
    }

    @Override
    public Object updateAddPassword(UserUpdateRequest user) {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new BadRequestException("user is not exist"));
        currentUser.setPassword(passwordEncoder.encode(user.getNewPassword()));
        userRepository.save(currentUser);
        return new ResponseApi(HttpStatus.OK.toString(),"add password success",null);
    }
}
