package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    Optional<Project> findByNameAndUserId(String projectName, long userId);

    Optional<Project> findByCode(String projectCode);
    @Query("SELECT p,u FROM Project p JOIN User u ON p.user.id = u.id WHERE p.user.id = ?1 AND p.name != 'Inbox' ")
    List<Project> findAllByUserId(long userId);
}
