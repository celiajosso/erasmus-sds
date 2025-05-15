package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.model.Playlist;
import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.repository.PlaylistRepository;
import com.sds.TravelPlanner.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final PlaceRepository placeRepository;

    public List<Playlist> getPlaylists(String userId) {
        return playlistRepository.findByUserId(userId);
    }

    public Playlist createPlaylist(String userId, String name) {
        Playlist playlist = new Playlist();
        playlist.setUserId(userId);
        playlist.setName(name);
        return playlistRepository.save(playlist);
    }

    public Playlist addPlaceToPlaylist(Long playlistId, Long placeId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new IllegalArgumentException("Playlist not found"));
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new IllegalArgumentException("Place not found"));

        playlist.getPlaces().add(place);
        return playlistRepository.save(playlist);
    }

    public Playlist getPlaylistDetails(Long playlistId) {
        return playlistRepository.findById(playlistId)
                .orElseThrow(() -> new IllegalArgumentException("Playlist not found"));
    }

    public void deletePlaylist(Long id) {
        if (!playlistRepository.existsById(id)) {
            throw new IllegalArgumentException("Playlist not found");
        }
        playlistRepository.deleteById(id);
    }

    public void removePlaceFromPlaylist(Long playlistId, Long placeId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new IllegalArgumentException("Playlist not found"));

        playlist.getPlaces().removeIf(place -> place.getId().equals(placeId));
        playlistRepository.save(playlist);
    }
}
