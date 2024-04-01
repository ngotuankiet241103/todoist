package com.todo.todolistbackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "section")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Section extends BaseEntity {

    @Column
    private String name;
    @Column
    private String code;
    @JsonIgnore
    @ManyToOne
    private Project project;

}
