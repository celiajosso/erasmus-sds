package com.sds.TravelPlanner.service.exception;

public class PlaceDetailsNotFoundException extends RuntimeException{

    public PlaceDetailsNotFoundException(String message) {
        super(message);
    }

}
