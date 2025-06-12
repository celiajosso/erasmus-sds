package com.sds.TravelPlanner.controller;

import com.sds.TravelPlanner.model.Playlist;
import com.sds.TravelPlanner.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/playlists")
@RequiredArgsConstructor
@CrossOrigin("*")
public class PlaylistController {

    private final PlaylistService playlistService;

    @GetMapping
    public List<Playlist> getPlaylists(@RequestParam String userId) {
        return playlistService.getPlaylists(userId);
    }

    @PostMapping
    public ResponseEntity<Playlist> createPlaylist(@RequestParam String userId, @RequestParam String name) {
        return ResponseEntity.ok(playlistService.createPlaylist(userId, name));
    }

    @PostMapping("/{playlistId}/places/{placeId}")
    public ResponseEntity<?> addPlaceToPlaylist(@PathVariable Long playlistId, @PathVariable Long placeId) {
        try {
            Playlist updatedPlaylist = playlistService.addPlaceToPlaylist(playlistId, placeId);
            return ResponseEntity.ok(updatedPlaylist);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{playlistId}")
    public ResponseEntity<?> getPlaylistDetails(@PathVariable Long playlistId) {
        try {
            Playlist playlist = playlistService.getPlaylistDetails(playlistId);
            return ResponseEntity.ok(playlist);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlaylist(@PathVariable Long id) {
        try {
            playlistService.deletePlaylist(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{playlistId}/places/{placeId}")
    public ResponseEntity<Void> removePlaceFromPlaylist(@PathVariable Long playlistId, @PathVariable Long placeId) {
        try {
            playlistService.removePlaceFromPlaylist(playlistId, placeId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<?> handleOptions() {
        return ResponseEntity.ok().build();
    }
}