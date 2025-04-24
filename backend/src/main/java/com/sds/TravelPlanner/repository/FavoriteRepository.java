package com.sds.TravelPlanner.repository;

import com.sds.TravelPlanner.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    List<Favorite> findByUserId(String userId);
    boolean existsByUserIdAndPlaceId(String userId, Long placeId);
}