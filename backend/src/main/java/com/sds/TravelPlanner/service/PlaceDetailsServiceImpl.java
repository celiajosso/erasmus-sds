package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.model.PlaceDetails;
import com.sds.TravelPlanner.repository.PlaceDetailsRepository;
import com.sds.TravelPlanner.service.exception.PlaceDetailsNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceDetailsServiceImpl implements PlaceDetailsService{

    private final PlaceDetailsRepository placeDetailsRepository;

    public PlaceDetails getDetails(Long id) {
        log.info("Fetching place details for id: {}", id);
        return placeDetailsRepository.findByPlaceId(id).orElseThrow(
                () -> new PlaceDetailsNotFoundException("Place details not found for id: " + id));
    }
}

