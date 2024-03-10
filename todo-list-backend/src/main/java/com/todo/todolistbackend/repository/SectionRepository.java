package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Section;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SectionRepository extends JpaRepository<Section,Long> {


    Optional<Section> findByNameAndProjectId(String sectionName, long id);

    Optional<Section> findByCode(String sectionCode);

    List<Section> findByProjectId(long id);

    List<Section> findByProjectCode(String projectCode);
}
