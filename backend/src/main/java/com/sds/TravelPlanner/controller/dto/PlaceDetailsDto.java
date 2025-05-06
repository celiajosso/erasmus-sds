package com.sds.TravelPlanner.controller.dto;

import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.model.PlaceDetails;

public record PlaceDetailsDto(Place place, PlaceDetails details) {
}
