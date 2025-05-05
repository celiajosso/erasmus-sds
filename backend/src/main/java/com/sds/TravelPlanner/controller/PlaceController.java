package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.controller.dto.PlacesDto;
import com.sds.TravelPlanner.controller.mapper.PlaceMapper;
import com.sds.TravelPlanner.service.PlaceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/places")
public class PlaceController {

    private final PlaceMapper placeMapper;
    private final PlaceServiceImpl placeServiceImpl;

    @GetMapping
    public ResponseEntity<PlacesDto> getPlaces(@RequestParam(required = false) String name,
                                               @RequestParam(required = false) List<String> category) {
        var places = placeServiceImpl.getAllPlaces(name, category);

        return ResponseEntity.ok(placeMapper.toResponse(places));
    }

}

