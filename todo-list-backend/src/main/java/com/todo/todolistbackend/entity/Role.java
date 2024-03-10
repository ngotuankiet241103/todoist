package com.todo.todolistbackend.entity;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.HashSet;
import java.util.Set;

import static com.todo.todolistbackend.entity.Permission.*;

public enum Role {
    USER(Set.of(USER_CREATE, USER_UPDATE, USER_DELETE,USER_READ)), OAUTH2_USER(Set.of(USER_CREATE, USER_UPDATE, USER_DELETE,USER_READ)),
//    MANAGER(Set.of(MANAGER_READ, MANAGER_UPDATE, MANAGER_DELETE, MANAGER_CREATE))

    ;

    private final Set<Permission> permissions;

    public Set<Permission> getPermissions() {
        return permissions;
    }

    Role(Set<Permission> permissions) {
        this.permissions = permissions;
    }

    public static Role forName(String roleName) {
        if (roleName == null) {
            throw new IllegalArgumentException("Role name must not be null");
        }

        Role role = valueOf(roleName);
        if (role == null) {
            throw new IllegalArgumentException("Invalid role name: " + roleName);
        }

        return role;
    }

    public Set<SimpleGrantedAuthority> getAuthorities() {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();

        for (Permission permission : getPermissions()) {
            System.out.println(permission.getPermission());
            authorities.add(new SimpleGrantedAuthority(permission.getPermission()));
        }
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}
