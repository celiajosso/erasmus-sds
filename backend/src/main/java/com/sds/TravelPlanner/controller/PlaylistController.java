package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.model.Playlist;
import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.repository.PlaylistRepository;
import com.sds.TravelPlanner.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/playlists")
@RequiredArgsConstructor 
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class PlaylistController {

    private final PlaylistRepository playlistRepository;
    private final PlaceRepository placeRepository;

    // Get all playlists for a given user
    @GetMapping
    public List<Playlist> getPlaylists(@RequestParam String userId) {
        return playlistRepository.findByUserId(userId);
    }

    // Create a new playlist with a name and associated user
    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestParam String userId, @RequestParam String name) {
        Playlist playlist = new Playlist();
        playlist.setUserId(userId);
        playlist.setName(name);
        return ResponseEntity.ok(playlistRepository.save(playlist));
    }

    // Add a place to an existing playlist
    @PostMapping("/{playlistId}/places/{placeId}")
    public ResponseEntity<Playlist> addPlaceToPlaylist(@PathVariable Long playlistId, @PathVariable Long placeId) {
        Optional<Playlist> playlistOpt = playlistRepository.findById(playlistId);
        Optional<Place> placeOpt = placeRepository.findById(placeId);

        if (playlistOpt.isPresent() && placeOpt.isPresent()) {
            Playlist playlist = playlistOpt.get();
            playlist.getPlaces().add(placeOpt.get());
            return ResponseEntity.ok(playlistRepository.save(playlist));
        }
        return ResponseEntity.notFound().build();
    }

    // Get details of a specific playlist by its ID
    @GetMapping("/{playlistId}")
    public ResponseEntity<Playlist> getPlaylistDetails(@PathVariable Long playlistId) {
        return playlistRepository.findById(playlistId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Handle CORS preflight requests
    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }

    // Delete a playlist by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        System.out.println("Received DELETE request for playlist ID: " + id);
        if (playlistRepository.existsById(id)) {
            playlistRepository.deleteById(id);
            System.out.println("Playlist with ID " + id + " deleted successfully.");
            return ResponseEntity.noContent().build(); // 204 No Content
        } else {
            System.out.println("Playlist with ID " + id + " not found.");
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }

    // Remove a specific place from a specific playlist
    @DeleteMapping("/{playlistId}/places/{placeId}")
    public ResponseEntity<Void> removePlaceFromPlaylist(@PathVariable Long playlistId, @PathVariable Long placeId) {
        Optional<Playlist> playlistOpt = playlistRepository.findById(playlistId);

        if (playlistOpt.isPresent()) {
            Playlist playlist = playlistOpt.get();
            // Remove the place by matching its ID
            playlist.getPlaces().removeIf(place -> place.getId().equals(placeId));
            playlistRepository.save(playlist);
            return ResponseEntity.noContent().build(); // HTTP 204
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404
        }
    }
}
