package com.todo.todolistbackend.mapping;

public interface ObjectMapping<T,R>{
    R toDTO(T t);
}
