package com.todo.todolistbackend.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class TaskUpdateRequest {
    private long id;
    private String title;
    private String description;
    private String projectCode;
    private String sectionCode;
    private List<String> labelCodes;
    private Date expiredAt;
    private String priorityCode;
}
