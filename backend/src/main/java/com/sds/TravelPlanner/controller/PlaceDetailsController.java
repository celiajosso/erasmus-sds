package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.controller.dto.PlaceDetailsDto;
import com.sds.TravelPlanner.controller.mapper.PlaceDetailsMapper;
import com.sds.TravelPlanner.service.PlaceDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/places")
@RequiredArgsConstructor
public class PlaceDetailsController {

    private final PlaceDetailsMapper placeDetailsMapper;
    private final PlaceDetailsServiceImpl placeDetailsServiceImpl;

    @GetMapping("/{id}/details")
    public ResponseEntity<PlaceDetailsDto> getPlaceWithDetails(@PathVariable Long id) {
        var details = placeDetailsServiceImpl.getDetails(id);

        return ResponseEntity.ok(placeDetailsMapper.toResponse(details));
    }
}

