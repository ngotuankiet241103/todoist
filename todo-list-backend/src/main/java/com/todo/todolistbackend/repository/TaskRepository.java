package com.todo.todolistbackend.repository;

import com.todo.todolistbackend.entity.Task;
import org.springframework.data.domain.Sort;
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
    // query base on project
    @Query("SELECT t FROM Task t WHERE t.project.code = ?1 AND t.isCompleted=false")
    List<Task> findAllByProjectCode(String projectCode,Sort sort);
    @Query(value = "SELECT t.* FROM Task t WHERE t.project_id = (SELECT q.id FROM Project q WHERE q.code = ?1) AND t.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?2)  AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?3) )  AND t.is_completed=false",nativeQuery = true)
    List<Task> findByProjectCodeWithConditional(String projectCode, List<String> priorityCode, List<String> labelCode);
    @Query(value = "SELECT t FROM Task t WHERE t.project.code = ?1 AND t.priority.code IN ?2 AND t.isCompleted=false ")
    List<Task> findByProjectCodeAndPriorityCode(String projectCode, List<String> priorityCode,Sort sort);
    @Query(value = "SELECT t.* FROM Task t WHERE t.project_id = (SELECT q.id FROM Project q WHERE q.code = ?1) AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?2) )  AND t.is_completed=false ",nativeQuery = true)
    List<Task> findByProjectCodeAndLabelCode(String projectCode, List<String> labelCode);
    // query for task expired
    @Query("SELECT c,d FROM Task c JOIN User d ON c.user.id = d.id WHERE c.expiredAt < ?1 AND c.user.id = ?2 AND c.isCompleted =false ORDER BY c.id DESC")
    List<Task> findByExpiredAtAndUserId( Date tommorow, Long id);
    @Query(value = "SELECT t.* FROM Task t WHERE t.expired_at < ?1 AND t.user_id = ?2 AND t.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?3)  AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?4) )  AND t.is_completed=false",nativeQuery = true)
    List<Task> findByExpiredAtAndUserIdConditional(Date tommorow, Long id, List<String> priorityCode, List<String> labelCode);
    @Query("SELECT c FROM Task c  WHERE c.expiredAt < ?1 AND c.user.id = ?2 AND c.priority.code IN ?3 AND c.isCompleted =false ORDER BY c.id DESC")
    List<Task> findByExpiredAtAndUserIdAndPriorityCode(Date tommorow, Long id, List<String> priorityCode );
    @Query(value = "SELECT t.* FROM Task t WHERE t.expired_at < ?1 AND t.user_id = ?2 AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?3) )  AND t.is_completed=false ",nativeQuery = true)
    List<Task> findByExpiredAtAndUserIdAndLabelCode(Date tommorow, Long id, List<String> labelCode);
    // query for task coming
    @Query("SELECT c FROM Task c  WHERE c.expiredAt < ?1 AND c.expiredAt != null AND c.user.id = ?2 AND c.isCompleted =false")
    List<Task> findTaskComingByExpiredAt( Date tomorrow,Long id);
    @Query("SELECT c,d FROM Task c JOIN User d ON c.user.id = d.id WHERE c.expiredAt > ?1  AND c.expiredAt < ?2 AND c.expiredAt is not null AND c.user.id = ?3 AND c.isCompleted = false")
    List<Task> findTaskUpcomingByUserId(Date yesterday, Date tomorrow, Long id);
    @Query(value="SELECT c.* FROM Task c WHERE c.expired_at > ?1  AND c.expired_at < ?2 AND c.expired_at is not null AND c.user_id=?3 AND c.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?4)  AND c.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?5) ) AND c.is_completed = false",nativeQuery = true)
    List<Task> findTaskUpcomingByExpiredAtAndUserIdConditional(Date yesterday, Date tomorrow, Long id, List<String> priorityCode, List<String> labelCode);
    @Query("SELECT c FROM Task c WHERE c.expiredAt > ?1  AND c.expiredAt < ?2 AND c.expiredAt is not null AND c.user.id = ?3 AND c.priority.code IN ?4 AND c.isCompleted = false")
    List<Task> findTaskUpcomingByExpiredAtAndUserIdAndPriorityCode(Date yesterday, Date tomorrow, Long id, List<String> priorityCode);
    @Query(value = "SELECT t.* FROM Task t WHERE t.expired_at > ?1 AND t.expired_at <?2 AND t.expired_at is not null AND t.user_id = ?3 AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?4) )  AND t.is_completed=false ",nativeQuery = true)
    List<Task> findTaskUpcomingByExpiredAtAndUserIdAndLabelCode(Date yesterday, Date tomorrow, Long id, List<String> labelCode);
    // query by label code
    @Query(value = "SELECT t.* FROM Task t WHERE t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1) )",nativeQuery = true)
    List<Task> findAllByLabelCode(String labelsCode);
    @Query(value = "SELECT c.* FROM task c WHERE c.id IN (SELECT b.task_id FROM task_labels b WHERE b.labels_id IN (SELECT la.id FROM label la WHERE la.code IN ?3) AND b.task_id IN (SELECT a.task_id FROM task_labels a WHERE a.task_id IN\n" +
            "( SELECT t.id FROM Task t WHERE t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1))) \n" +
            "AND c.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?2) " +
            "))",nativeQuery = true)    List<Task> findByLabelCodeWithConditional(String labelCode, List<String> priorityCode, List<String> labelsCode);
    @Query(value = "SELECT t.* FROM Task t WHERE t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1) AND t.priority_id IN (SELECT p.id FROM priority p WHERE  p.code IN ?2) )",nativeQuery = true)
    List<Task> findByLabelCodeAndPriorityCode(String labelCode, List<String> priorityCode);
    @Query(value = "SELECT c.* FROM task c WHERE c.id IN (SELECT b.task_id FROM task_labels b WHERE b.labels_id IN (SELECT la.id FROM label la WHERE la.code IN ?2) AND b.task_id IN (SELECT a.task_id FROM task_labels a WHERE a.task_id IN\n" +
            "( SELECT t.id FROM Task t WHERE t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1))) \n" +
            "\n" +
            "))",nativeQuery = true)
    List<Task> findByLabelCodeAndLabelsCode(String labelCode, List<String> labelsCode);
}
