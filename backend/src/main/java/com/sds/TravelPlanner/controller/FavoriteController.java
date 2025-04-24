package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.model.Favorite;
import com.sds.TravelPlanner.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.repository.PlaceRepository;


import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") 

public class FavoriteController {

    private final FavoriteRepository favoriteRepository;
    private final PlaceRepository placeRepository;

    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestParam String userId, @RequestParam Long placeId) {
        if (favoriteRepository.existsByUserIdAndPlaceId(userId, placeId)) {
            return ResponseEntity.badRequest().body("Place already in favorites");
        }

        Place place = placeRepository.findById(placeId).orElse(null);
        if (place == null) {
            return ResponseEntity.badRequest().body("Invalid place ID");
        }

        Favorite favorite = new Favorite();
        favorite.setUserId(userId);
        favorite.setPlace(place);
        favoriteRepository.save(favorite);

        return ResponseEntity.ok("Place added to favorites");
    }

    @GetMapping
    public List<Favorite> getFavorites(@RequestParam String userId) {
        return favoriteRepository.findByUserId(userId);
    }

    @DeleteMapping
    public ResponseEntity<?> removeFavorite(@RequestParam String userId, @RequestParam Long placeId) {
        favoriteRepository.deleteAll(favoriteRepository.findByUserId(userId).stream()
                .filter(fav -> fav.getPlace().getId().equals(placeId))
                .toList());
        return ResponseEntity.ok("Place removed from favorites");
    }
}