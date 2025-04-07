package com.sds.TravelPlanner.repository;

import com.sds.TravelPlanner.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PlaceRepository extends JpaRepository<Place, Long> {

    List<Place> findByCategory(String category);

}

