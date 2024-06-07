package com.todo.todolistbackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Paging {
    private int page;
    private int totalPage;

    public Paging(int page) {
        this.page = page;
    }
}
