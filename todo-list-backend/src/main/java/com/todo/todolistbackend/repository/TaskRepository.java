package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends Repository<Task,Long> {
    long countByProjectId(long id);

    List<Task> findAllByProjectIdOrSectionId(long projectId, int i);

    Task save(Task task);
    @Query("SELECT c FROM Task c WHERE c.expiredAt > ?1 AND c.expiredAt < ?2 AND c.isCompleted = false")
    List<Task> findByExpiredAt(Date yesterday, Date tommorow);
    @Query("SELECT c,d FROM Task c JOIN User d ON c.user.id = d.id WHERE c.expiredAt > ?1 AND c.expiredAt < ?2 AND c.user.id = ?3 AND c.isCompleted =false")
    List<Task> findByExpiredAtAndUserId(Date yesterday, Date tommorow, Long id);
    @Query("SELECT t FROM Task t WHERE t.project.code = ?1  AND t.section.id IS NULL AND t.isCompleted=false")
    List<Task> findAllByProjectCode(String projectCode);

    List<Task> findAllByProjectCodeAndSectionCode(String projectCode, String sectionCode);

    Optional<Task> findById(long id);
}
