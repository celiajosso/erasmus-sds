package com.sds.TravelPlanner.controller.mapper;

import com.sds.TravelPlanner.controller.dto.PlaceDetailsDto;
import com.sds.TravelPlanner.model.PlaceDetails;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlaceDetailsMapper {

    default PlaceDetailsDto toResponse(PlaceDetails placeDetails) {
        return new PlaceDetailsDto(placeDetails.getPlace(), placeDetails);
    }
}
