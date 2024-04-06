package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SectionRepository extends JpaRepository<Section,Long> {

    String excludeDeleted = "AND s.isDeleted = false";
    @Query("SELECT s FROM Section s WHERE s.name=?1 AND s.project.id = ?2 " + excludeDeleted)
    Optional<Section> findByNameAndProjectId(String sectionName, long id);
    @Query("SELECT s FROM Section s WHERE s.code = ?1 " + excludeDeleted )
    Optional<Section> findByCode(String sectionCode);
    @Query("SELECT s FROM Section s WHERE s.id = ?1 " + excludeDeleted)
    List<Section> findByProjectId(long id);
    @Query("SELECT s FROM Section s WHERE s.project.code=?1 " + excludeDeleted)
    List<Section> findByProjectCode(String projectCode);

    @Override
    @Modifying
    @Query("UPDATE Section s SET s.isDeleted=true WHERE s.id=?1")
    void deleteById(Long id);

    @Modifying
    @Query("UPDATE Section s SET s.isDeleted=true WHERE s.project.id=?1")
    void deleteByProjectId(long id);
}
