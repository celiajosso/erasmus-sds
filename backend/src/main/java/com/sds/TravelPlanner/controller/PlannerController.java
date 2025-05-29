package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.service.RecommendationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/planner")
@RequiredArgsConstructor
public class PlannerController {

    private final RecommendationsService recommendationsService;

    @GetMapping("/{playlistId}/route")
    public ResponseEntity getRoute(@PathVariable Long playlistId) {
        var route = recommendationsService.createRecommendedSchedule(playlistId);

        return ResponseEntity.ok(route);
    }
}
