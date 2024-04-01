package com.todo.todolistbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;



@Entity
@Table(name = "label")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Label extends BaseEntity{
    @Column
    private String name;
    @Column
    private String code;
    @JsonIgnore
    @ManyToOne
    private User user;
}
