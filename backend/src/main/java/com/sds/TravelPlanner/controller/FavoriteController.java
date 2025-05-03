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
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class FavoriteController {

    private final FavoriteRepository favoriteRepository;
    private final PlaceRepository placeRepository;

    // Endpoint to add a new favorite place for a user
    @PostMapping
    public ResponseEntity<?> addFavorite(@RequestParam String userId, @RequestParam Long placeId) {
        // Check if the place is already in the user's favorites
        if (favoriteRepository.existsByUserIdAndPlaceId(userId, placeId)) {
            return ResponseEntity.badRequest().body("Place already in favorites");
        }

        // Retrieve the Place entity from the database
        Place place = placeRepository.findById(placeId).orElse(null);
        if (place == null) {
            return ResponseEntity.badRequest().body("Invalid place ID");
        }

        // Create a new Favorite and save it
        Favorite favorite = new Favorite();
        favorite.setUserId(userId);
        favorite.setPlace(place);
        favoriteRepository.save(favorite);

        System.out.println("Deleting favorite for userId: "); 

        return ResponseEntity.ok("Place added to favoritess");
    }

    // Endpoint to retrieve all favorite places for a user
    @GetMapping
    public List<Favorite> getFavorites(@RequestParam String userId) {
        return favoriteRepository.findByUserId(userId);
    }

    // Handle preflight OPTIONS requests (CORS)
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }

    // Endpoint to delete a favorite by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFavorite(@PathVariable Long id) {
        System.out.println("Received DELETE request for favorite ID: " + id);
        if (favoriteRepository.existsById(id)) {
            favoriteRepository.deleteById(id);
            System.out.println("Favorite with ID " + id + " deleted successfully.");
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            System.out.println("Favorite with ID " + id + " not found.");
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

}
