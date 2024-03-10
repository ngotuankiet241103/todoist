package com.todo.todolistbackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Entity
@Table(name = "token")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column
    private String token;
    @Column
    private String type;
    @Column
    private Date expiredAt;
    @Column
    private boolean isActive = true;

    public Token(String token, Date expiredAt, String type) {
        this.token = token;
        this.type = type;
        this.expiredAt = expiredAt;
    }
}
