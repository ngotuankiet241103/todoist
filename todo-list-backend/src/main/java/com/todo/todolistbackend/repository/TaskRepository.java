package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    @Query("SELECT c,d FROM Task c JOIN User d ON c.user.id = d.id WHERE c.expiredAt < ?1 AND c.user.id = ?2 AND c.isCompleted =false")
    List<Task> findByExpiredAtAndUserId( Date tommorow, Long id);
    @Query("SELECT t FROM Task t WHERE t.project.code = ?1 AND t.isCompleted=false")
    List<Task> findAllByProjectCode(String projectCode);

    List<Task> findAllByProjectCodeAndSectionCode(String projectCode, String sectionCode);

    Optional<Task> findById(long id);
    @Modifying
    @Query(value = "DELETE FROM task_labels t WHERE t.labels_id = ?1",
            nativeQuery = true)
    void deleteByLabelId(long id);
    @Query(value = "Select t.task_id FROM task_labels t WHERE t.labels_id = ?1",
            nativeQuery = true)
    List<Long> findByLabelId(long id);

    void deleteById(long id);
    @Query(value = "SELECT t.* FROM Task t WHERE t.project_id = (SELECT q.id FROM Project q WHERE q.code = ?1) AND t.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?2)  AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?3) )  AND t.is_completed=false",nativeQuery = true)
    List<Task> findByProjectCodeWithConditional(String projectCode, List<String> priorityCode, List<String> labelCode);
    @Query(value = "SELECT t FROM Task t WHERE t.project.code = ?1 AND t.priority.code IN ?2 AND t.isCompleted=false ")

    List<Task> findByProjectCodeAndPriorityCode(String projectCode, List<String> priorityCode);
    @Query(value = "SELECT t.* FROM Task t WHERE t.project_id = (SELECT q.id FROM Project q WHERE q.code = ?1) AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?2) )  AND t.is_completed=false ",nativeQuery = true)
    List<Task> findByProjectCodeAndLabelCode(String projectCode, List<String> labelCode);
}
