package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.repository.PlaceDetailsRepository;
import com.sds.TravelPlanner.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/places")
@RequiredArgsConstructor
public class PlaceDetailsController {

    private final PlaceRepository placeRepository;
    private final PlaceDetailsRepository placeDetailsRepository;

    @GetMapping("/{id}/details")
    public ResponseEntity<?> getPlaceWithDetails(@PathVariable Long id) {
        var place = placeRepository.findById(id);
        var details = placeDetailsRepository.findByPlaceId(id);

        if (place.isPresent() && details.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("place", place.get());
            response.put("details", details.get());
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.notFound().build();
    }
}

