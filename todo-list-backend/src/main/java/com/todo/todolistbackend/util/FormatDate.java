package com.todo.todolistbackend.util;

import java.time.*;
import java.util.Date;

public class FormatDate {
    public static Date formatDate(Date date, int hour, int minutes, int second){
        Instant instant = date.toInstant();
        // Create a ZonedDateTime from the Instant
        // You can specify the time zone you want to use
        ZonedDateTime zonedDateTime = instant.atZone(ZoneId.systemDefault());
        // Extract LocalDate from ZonedDateTime
        LocalDate localDate = zonedDateTime.toLocalDate();
        LocalDateTime lastMoment = LocalDateTime.of(localDate, LocalTime.of(hour, minutes, second));
        return Date.from(lastMoment.atZone(ZoneId.systemDefault()).toInstant());
    }
}
