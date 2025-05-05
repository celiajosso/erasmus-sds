package com.sds.TravelPlanner.service.exception;

public class PlaceNotFoundException extends RuntimeException{

    public PlaceNotFoundException(String message) {
        super(message);
    }

}
