package com.todo.todolistbackend.service.Impl;

import com.cloudinary.Cloudinary;
import com.todo.todolistbackend.auth.UserPrincipal;
import com.todo.todolistbackend.entity.User;
import com.todo.todolistbackend.service.UploadImageService;
import com.todo.todolistbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadImageServiceImpl implements UploadImageService {
    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        String url  = cloudinary.uploader()
                .upload(file.getBytes(), Map.of("public_id", UUID.randomUUID().toString()))
                .get("url")
                .toString();

        return url;
    }
}
