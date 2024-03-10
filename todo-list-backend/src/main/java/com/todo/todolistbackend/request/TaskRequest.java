package com.todo.todolistbackend.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class TaskRequest {
    @NotBlank
    private String title;
    private String description;
    private String projectCode;
    private String sectionCode;
    private List<String> labelCodes;
    private String priorityCode;
    private Date expiredAt;

}
