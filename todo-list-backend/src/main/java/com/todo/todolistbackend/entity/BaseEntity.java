package com.todo.todolistbackend.entity;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.*;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;


@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
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
