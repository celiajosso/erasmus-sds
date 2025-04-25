package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.model.Favorite;
import com.sds.TravelPlanner.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.repository.PlaceRepository;


import java.util.List;
import java.util.Optional;

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
     System.out.println("Deleting favorite for userId: ");

        return ResponseEntity.ok("Place added to favoritess");
    }

    @GetMapping
    public List<Favorite> getFavorites(@RequestParam String userId) {
        return favoriteRepository.findByUserId(userId);
    }

    

@DeleteMapping("/api/favorites")
public ResponseEntity<?> deleteFavorite(@RequestParam String userId, @RequestParam Long id) {
    System.out.println("Received delete request for userId=" + userId + ", id=" + id);

    Optional<Favorite> favoriteOpt = favoriteRepository.findByIdAndUserId(id, userId);
    if (favoriteOpt.isPresent()) {
        favoriteRepository.delete(favoriteOpt.get());
        return ResponseEntity.noContent().build(); 
    } 
    else {
        return ResponseEntity.notFound().build();
    }
}


}