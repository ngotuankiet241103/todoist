package com.todo.todolistbackend.service.Impl;

import com.todo.todolistbackend.entity.Task;
import com.todo.todolistbackend.service.EmailSerivice;
import com.todo.todolistbackend.service.NotificationService;
import com.todo.todolistbackend.service.TaskService;
import com.todo.todolistbackend.util.FormatDate;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.*;


@Component
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final EmailSerivice emailSerivice;
    private  final TaskService taskService;
    @Async
    @Scheduled( cron = "0 50 20 * * *")
    @Override
    public void notificationTask() throws InterruptedException {
        System.out.println(
                "Fixed rate task async - " + System.currentTimeMillis() / 1000);
        Date today  = FormatDate.formatDate(new Date(),0,0,0);

        Date  lastToday  = FormatDate.formatDate(new Date(),23,59,59);
        List<Task> tasks = taskService.findByExpiredAt(today,lastToday);
        System.out.println(
                "Total task - " + tasks.size());
        Map<String,List<Task>> remainTask = new HashMap();
        tasks.stream().forEach(task -> {
            String email = task.getUser().getEmail();
            if(remainTask.containsKey(email)){
                List<Task> curTasks = remainTask.get(email);
                curTasks.add(task);
                remainTask.put(email,curTasks);
            }
            else{
                List<Task> curTasks = new ArrayList<>();
                curTasks.add(task);
                remainTask.put(email,curTasks);
            }
        });
        List<String> keys = new ArrayList<>(remainTask.keySet());
        keys.stream().forEach(key -> {
           List<Task> totalTask = (List<Task>) remainTask.get(key);
            System.out.println(
                    "key - " + key);
           emailSerivice.sendEmail(key,tasks.size());
        });
        Thread.sleep(2000);
    }
}
