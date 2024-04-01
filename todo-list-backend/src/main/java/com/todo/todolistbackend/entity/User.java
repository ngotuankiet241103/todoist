package com.todo.todolistbackend.entity;

import com.todo.todolistbackend.entity.AuthProvider;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity  implements Serializable {

    @Column
    private String email;
    @Column
    private String password;
    @Column
    private String name;
    @Column
    private AuthProvider provider;
    @Column
    private String providerId;
    @Column(columnDefinition = "TEXT")
    private String imageUrl;
    @Column
    private boolean isEnabled;
    @Column
    private String role;

}
