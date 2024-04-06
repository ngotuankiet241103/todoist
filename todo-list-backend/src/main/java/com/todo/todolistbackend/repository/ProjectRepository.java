package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    String excludeDeleted = " AND p.isDeleted=false";
    @Query("SELECT p FROM Project p WHERE p.name = ?1 AND p.user.id = ?2 " + excludeDeleted)
    Optional<Project> findByNameAndUserId(String projectName, long userId);
    @Query("SELECT p FROM Project p WHERE p.code = ?1 " + excludeDeleted)
    Optional<Project> findByCode(String projectCode);
    @Query("SELECT p,u FROM Project p JOIN User u ON p.user.id = u.id WHERE p.user.id = ?1 AND p.name != 'Inbox' " +excludeDeleted)
    List<Project> findAllByUserId(long userId);

    @Override
    @Modifying
    @Query("UPDATE Project p SET p.isDeleted=true WHERE p.id = ?1")
    void deleteById(Long id);
}
