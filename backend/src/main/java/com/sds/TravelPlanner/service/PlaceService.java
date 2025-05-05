package com.sds.TravelPlanner.service;

import com.sds.TravelPlanner.model.Place;

import java.util.List;

public interface PlaceService {

    List<Place> getAllPlaces(String name, List<String> category);

}
