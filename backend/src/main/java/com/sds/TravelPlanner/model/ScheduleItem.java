package com.sds.TravelPlanner.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalTime;

@Data
public class ScheduleItem {
    private final LocalTime time;
    private final Place place;
    private double longitude;
    private double latitude;
}
