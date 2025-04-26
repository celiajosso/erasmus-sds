package com.sds.TravelPlanner.config;

import lombok.Data;

@Data
public class PlaceJson {
    private String name;
    private String category;
    private String image_url;
    private DetailsJson details;

    @Data
    public static class DetailsJson {
        private String description;
        private int duration;
        private String accessibility_info;
        private String location_details;
        private double latitude;
        private double longitude;
    }
}
