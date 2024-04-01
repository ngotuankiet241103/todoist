package com.todo.todolistbackend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UploadImageService {
    String uploadImage(MultipartFile file) throws IOException;
}
