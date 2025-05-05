package com.sds.TravelPlanner.controller.mapper;

import com.sds.TravelPlanner.controller.dto.PlaceDetailsDto;
import com.sds.TravelPlanner.controller.dto.PlacesDto;
import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.model.PlaceDetails;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlaceDetailsMapper {

    default PlaceDetailsDto toResponse(PlaceDetails placeDetails) {
        return new PlaceDetailsDto(placeDetails.getPlace(), placeDetails);
    }
}
