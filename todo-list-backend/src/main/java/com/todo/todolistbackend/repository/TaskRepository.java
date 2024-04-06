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
     String excludeCompleted = " AND t.isCompleted=false";
     String excludeDeleted = " AND t.isDeleted=false";
    String excludeNativeCompleted = " AND t.is_completed=false";
    String excludeNativeDeleted = " AND t.is_deleted=false";
     String excludeCommon = excludeCompleted + excludeDeleted;
     String excludeNativeCommon =  excludeNativeCompleted + excludeNativeDeleted;
    long countByProjectId(long id);

    List<Task> findAllByProjectIdOrSectionId(long projectId, int i);

    Task save(Task task);

    List<Task> findAllByProjectCodeAndSectionCode(String projectCode, String sectionCode);

    Optional<Task> findById(long id);

    @Query(value = "Select t.task_id FROM task_labels t WHERE t.labels_id = ?1",
            nativeQuery = true)
    List<Long> findByLabelId(long id);

    void deleteById(long id);
    // query base on project
    @Query("SELECT t FROM Task t WHERE t.project.code = ?1 " + excludeCommon)
    List<Task> findAllByProjectCode(String projectCode,Sort sort);
    @Query(value = "SELECT t.* FROM Task t WHERE t.project_id = (SELECT q.id FROM Project q WHERE q.code = ?1) AND t.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?2)  AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?3) ) " + excludeCommon,nativeQuery = true)
    List<Task> findByProjectCodeWithConditional(String projectCode, List<String> priorityCode, List<String> labelCode);
    @Query(value = "SELECT t FROM Task t WHERE t.project.code = ?1 AND t.priority.code IN ?2 " + excludeCommon)
    List<Task> findByProjectCodeAndPriorityCode(String projectCode, List<String> priorityCode,Sort sort);
    @Query(value = "SELECT t.* FROM Task t WHERE t.project_id = (SELECT q.id FROM Project q WHERE q.code = ?1) AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?2) ) " +excludeNativeCommon,nativeQuery = true)
    List<Task> findByProjectCodeAndLabelCode(String projectCode, List<String> labelCode);
    // query for task expired
    @Query("SELECT t,d FROM Task t JOIN User d ON t.user.id = d.id WHERE t.expiredAt < ?1 AND t.user.id = ?2 " + excludeCommon + " ORDER BY t.id DESC")
    List<Task> findByExpiredAtAndUserId( Date tommorow, Long id);
    @Query(value = "SELECT t.* FROM Task t WHERE t.expired_at < ?1 AND t.user_id = ?2 AND t.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?3)  AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?4) ) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findByExpiredAtAndUserIdConditional(Date tommorow, Long id, List<String> priorityCode, List<String> labelCode);
    @Query("SELECT t FROM Task t  WHERE t.expiredAt < ?1 AND t.user.id = ?2 AND t.priority.code IN ?3 " + excludeCommon +" ORDER BY t.id DESC")
    List<Task> findByExpiredAtAndUserIdAndPriorityCode(Date tommorow, Long id, List<String> priorityCode );
    @Query(value = "SELECT t.* FROM Task t WHERE t.expired_at < ?1 AND t.user_id = ?2 AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?3) ) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findByExpiredAtAndUserIdAndLabelCode(Date tommorow, Long id, List<String> labelCode);
    // query for task coming
    @Query("SELECT t FROM Task t  WHERE t.expiredAt < ?1 AND t.expiredAt != null AND t.user.id = ?2 " + excludeCommon)
    List<Task> findTaskComingByExpiredAt( Date tomorrow,Long id);
    @Query("SELECT t,d FROM Task t JOIN User d ON t.user.id = d.id WHERE t.expiredAt > ?1  AND t.expiredAt < ?2 AND t.expiredAt is not null AND t.user.id = ?3 " + excludeCommon)
    List<Task> findTaskUpcomingByUserId(Date yesterday, Date tomorrow, Long id);
    @Query(value="SELECT t.* FROM Task t WHERE t.expired_at > ?1  AND t.expired_at < ?2 AND t.expired_at is not null AND t.user_id=?3 AND t.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?4)  AND c.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?5) ) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findTaskUpcomingByExpiredAtAndUserIdConditional(Date yesterday, Date tomorrow, Long id, List<String> priorityCode, List<String> labelCode);
    @Query("SELECT t FROM Task t WHERE t.expiredAt > ?1  AND t.expiredAt < ?2 AND t.expiredAt is not null AND t.user.id = ?3 AND t.priority.code IN ?4 " + excludeCommon)
    List<Task> findTaskUpcomingByExpiredAtAndUserIdAndPriorityCode(Date yesterday, Date tomorrow, Long id, List<String> priorityCode);
    @Query(value = "SELECT t.* FROM Task t WHERE t.expired_at > ?1 AND t.expired_at <?2 AND t.expired_at is not null AND t.user_id = ?3 AND t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code IN ?4) ) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findTaskUpcomingByExpiredAtAndUserIdAndLabelCode(Date yesterday, Date tomorrow, Long id, List<String> labelCode);
    // query by label code
    @Query(value = "SELECT t.* FROM Task t WHERE t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1) ) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findAllByLabelCode(String labelsCode);
    @Query(value = "SELECT t.* FROM task t WHERE t.id IN (SELECT b.task_id FROM task_labels b WHERE b.labels_id IN (SELECT la.id FROM label la WHERE la.code IN ?3) AND b.task_id IN (SELECT a.task_id FROM task_labels a WHERE a.task_id IN\n" +
            "( SELECT f.id FROM Task f WHERE f.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1))) \n" +
            "AND t.priority_id IN (SELECT p.id FROM priority p WHERE p.code IN ?2) " +
            ")) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findByLabelCodeWithConditional(String labelCode, List<String> priorityCode, List<String> labelsCode);
    @Query(value = "SELECT t.* FROM Task t WHERE t.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1) AND t.priority_id IN (SELECT p.id FROM priority p WHERE  p.code IN ?2) ) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findByLabelCodeAndPriorityCode(String labelCode, List<String> priorityCode);
    @Query(value = "SELECT t.* FROM task t WHERE t.id IN (SELECT b.task_id FROM task_labels b WHERE b.labels_id IN (SELECT la.id FROM label la WHERE la.code IN ?2) AND b.task_id IN (SELECT a.task_id FROM task_labels a WHERE a.task_id IN\n" +
            "( SELECT q.id FROM Task q WHERE q.id IN (SELECT d.task_id FROM task_labels d WHERE d.labels_id IN (SELECT l.id FROM label l WHERE l.code = ?1))) \n" +
            "\n" +
            ")) " + excludeNativeCommon,nativeQuery = true)
    List<Task> findByLabelCodeAndLabelsCode(String labelCode, List<String> labelsCode);
    // delete task
    @Modifying
    @Query(value = "UPDATE task set is_deleted = true  " +
            " WHERE id IN  (SELECT t.task_id FROM task_labels t WHERE t.labels_id =?1)",
            nativeQuery = true)
    void deleteByLabelId(long id);
    @Modifying
    @Query("UPDATE Task t SET t.isDeleted = true WHERE t.project.id = ?1 ")
    void deleteByProjectId(long id);
    @Modifying
    @Query("UPDATE Task t SET t.isDeleted = true WHERE t.section.id = ?1 ")
    void deleteBySectionId(long id);
}
