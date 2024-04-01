package com.todo.todolistbackend.controller;

import com.todo.todolistbackend.request.FileRequest;
import com.todo.todolistbackend.response.ResponseApi;
import com.todo.todolistbackend.service.UploadImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("${api.prefix}")
@RequiredArgsConstructor
public class CloudinaryController {
    private final UploadImageService fileUpload;
    @PostMapping("/file/upload")
    public ResponseEntity<?> uploadToCloud(@ModelAttribute FileRequest fileRequest){
        ResponseApi responseApi = new ResponseApi();
        try {
            if (fileRequest.getFile() != null) {
                String url = fileUpload.uploadImage(fileRequest.getFile());
                responseApi.setStatus(HttpStatus.OK.toString());
                responseApi.setMessage("upload file success");
                responseApi.setData(url);
            }
        } catch (IOException e) {
            // TODO Auto-generated catch block
            responseApi.setStatus(HttpStatus.BAD_REQUEST.toString());
            responseApi.setMessage("Upload file fail");
            e.printStackTrace();
        }
        return  ResponseEntity.ok(responseApi);
    }
}
