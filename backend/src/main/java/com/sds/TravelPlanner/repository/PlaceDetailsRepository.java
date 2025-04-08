package com.sds.TravelPlanner.repository;
import com.sds.TravelPlanner.model.PlaceDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceDetailsRepository extends JpaRepository<PlaceDetails, Long> {

    Optional<PlaceDetails> findByPlaceId(Long placeId);

}

