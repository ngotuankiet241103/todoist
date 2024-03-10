package com.todo.todolistbackend.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.*;
import org.springframework.data.annotation.Id;

import java.util.Date;


public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @CreatedDate
    private Date createdDate;
    @CreatedBy
    private String createdBy;
    @LastModifiedDate
    private Date modifiedDate;
    @LastModifiedBy
    private String modifiedBy;
}
