package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.repository.PlaceRepository;
import com.sds.TravelPlanner.repository.PlaceSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;

    public List<Place> getAllPlaces(String name, List<String> category) {
        log.info("Fetching all places");
        var spec = PlaceSpecification.searchBy(name, category);
        return placeRepository.findAll(spec);
    }

}

