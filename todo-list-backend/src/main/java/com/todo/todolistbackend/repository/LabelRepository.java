package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Label;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LabelRepository extends JpaRepository<Label,Long> {
    Optional<Label> findByName(String labelName);

    Optional<Label> findByNameAndUserId(String labelName, long userId);


    Optional<Label> findByCode(String code);

    List<Label> findByUserId(long userId);
}
