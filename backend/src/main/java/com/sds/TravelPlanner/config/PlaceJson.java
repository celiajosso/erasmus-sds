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
        private String[] opening_hours;
        private String[] closing_hours;
        private double price;
        private String phone;
        private String email;
        private String website;
        private double rating;
        private int reviews_count;
    }
}
