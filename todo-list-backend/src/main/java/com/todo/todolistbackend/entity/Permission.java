package com.todo.todolistbackend.entity;


public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    USER_READ("user:read"),
    USER_UPDATE("user:update"),
    USER_CREATE("user:create"),
    USER_DELETE("user:delete")
    ;
    private Permission(String permission) {
        this.permission = permission;
    }


    public String getPermission() {
        return permission;
    }


    private final String permission;
}
