package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.config.OpenRouterRoutePlanner;
import com.sds.TravelPlanner.model.Schedule;
import com.sds.TravelPlanner.model.ScheduleItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendationsServiceImpl implements RecommendationsService {

    private final OpenRouterRoutePlanner routePlanner;
    private final PlaylistService playlistService;
    private final PlaceDetailsService placeDetailsService;

    public Schedule createRecommendedSchedule(Long playlistId) {
        var places = playlistService.getPlaylistDetails(playlistId).getPlaces();
        var placeDetails = places.stream()
                .map(place -> placeDetailsService.getDetails(place.getId()))
                .toList();
        List<ScheduleItem> recommendedPlaces = null;
        try {
            recommendedPlaces = routePlanner.sendQuery(placeDetails);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return new Schedule(recommendedPlaces);
    }
}
