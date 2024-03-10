package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Priority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PriorityRepository extends JpaRepository<Priority,Long> {
    Optional<Priority> findByLevel(String priority);

    Optional<Priority> findByCode(String priorityCode);
}
