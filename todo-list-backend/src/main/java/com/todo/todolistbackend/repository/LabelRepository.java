package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface LabelRepository extends JpaRepository<Label,Long> {
    String excludeDeleted = " AND l.isDeleted = false";
    Optional<Label> findByName(String labelName);
    @Query("SELECT l FROM Label l WHERE l.name = ?1 AND l.user.id = ?2 "+ excludeDeleted)
    Optional<Label> findByNameAndUserId(String labelName, long userId);
    @Query("SELECT l FROM Label l WHERE l.code = ?1 "+ excludeDeleted)
    Optional<Label> findByCode(String code);
    @Query("SELECT l FROM Label  l WHERE l.user.id = ?1 "+ excludeDeleted)
    List<Label> findByUserId(long userId);

    @Override
    @Modifying
    @Query("UPDATE Label l SET l.isDeleted = true WHERE l.user.id =?1 ")
    void deleteById(Long userId);
}
