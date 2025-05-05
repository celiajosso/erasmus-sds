package com.sds.TravelPlanner.controller.mapper;

import com.sds.TravelPlanner.controller.dto.PlacesDto;
import com.sds.TravelPlanner.model.Place;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlaceMapper {

    default PlacesDto toResponse(List<Place> places) {
        return new PlacesDto(places);
    }
}
