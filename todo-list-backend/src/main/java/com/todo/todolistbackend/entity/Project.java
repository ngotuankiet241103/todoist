package com.todo.todolistbackend.entity;

import jakarta.persistence.*;
import lombok.*;
import net.minidev.json.annotate.JsonIgnore;


@Entity
@Table(name = "project")
@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Project extends BaseEntity{

    @Column
    private String name;
    @Column
    private String code;
    @JsonIgnore
    @ManyToOne
    private User user;
}
