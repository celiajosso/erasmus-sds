package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceService {

    private final PlaceRepository placeRepository;

    public List<Place> getAllPlaces() {
        log.info("Fetching all places");
        return placeRepository.findAll();
    }
}

