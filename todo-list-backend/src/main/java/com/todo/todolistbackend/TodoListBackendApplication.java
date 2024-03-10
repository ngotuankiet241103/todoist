package com.todo.todolistbackend;

import com.todo.todolistbackend.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;



@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class  TodoListBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoListBackendApplication.class, args);
	}



}
