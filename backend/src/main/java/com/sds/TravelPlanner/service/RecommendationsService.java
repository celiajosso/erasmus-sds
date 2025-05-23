package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.model.Schedule;

public interface RecommendationsService {

    Schedule createRecommendedSchedule(Long playlistId);

}
