package com.todo.todolistbackend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="priority")
@Getter
@Setter
@NoArgsConstructor
public class Priority extends BaseEntity {

    @Column
    private String name;
    @Column
    private String code;
    @Column
    private String level;

    public Priority(String name, String code, String level) {
        this.name = name;
        this.code = code;
        this.level = level;
    }
}
