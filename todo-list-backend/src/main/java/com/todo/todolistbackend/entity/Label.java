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
public class Label{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String name;
    @Column
    private String code;
    @JsonIgnore
    @ManyToOne
    private User user;
}
