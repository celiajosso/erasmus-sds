package com.sds.TravelPlanner.repository;

import com.sds.TravelPlanner.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    List<Playlist> findByUserId(String userId);
}