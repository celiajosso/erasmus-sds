package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.service.PlaceService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/places")
@CrossOrigin("*")
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping
    public List<Place> getPlaces(@RequestParam(required = false) String name,
                                 @RequestParam(required = false) List<String> category) {
        return placeService.getAllPlaces(name, category);
    }

}

