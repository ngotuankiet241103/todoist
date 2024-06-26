package com.todo.todolistbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

@Entity
@Table(name = "task")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task extends BaseEntity implements Serializable {
    @Column
    private String title;
    @Column
    private String description;
    @Column
    private String code;
    @Column
    private Date expiredAt;
    @Column
    private boolean isCompleted;
    @ManyToOne
    private Priority priority;
    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JsonIgnore
    private User user;
    @ManyToMany(targetEntity = Label.class)
    private Set labels;
    @ManyToOne
    private Project project;
    @ManyToOne
    private Section section;
    @Column
    private boolean isDeleted;

}
