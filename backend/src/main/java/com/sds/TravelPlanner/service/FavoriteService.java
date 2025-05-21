package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.model.Favorite;
import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.repository.FavoriteRepository;
import com.sds.TravelPlanner.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final PlaceRepository placeRepository;

    public Favorite addFavorite(String userId, Long placeId) {
        if (favoriteRepository.existsByUserIdAndPlaceId(userId, placeId)) {
            throw new IllegalStateException("Place already in favorites");
        }

        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid place ID"));

        Favorite favorite = new Favorite();
        favorite.setUserId(userId);
        favorite.setPlace(place);

        return favoriteRepository.save(favorite);
    }

    public List<Favorite> getFavorites(String userId) {
        return favoriteRepository.findByUserId(userId);
    }

    public void deleteFavorite(Long id) {
        if (!favoriteRepository.existsById(id)) {
            throw new IllegalArgumentException("Favorite not found");
        }
        favoriteRepository.deleteById(id);
    }
}
