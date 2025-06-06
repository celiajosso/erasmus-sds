package com.sds.TravelPlanner.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PlaceDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "place_id")
    private Place place;

    private String description;

    private int duration;

    @Enumerated(EnumType.STRING)
    private Accessibility accessibilityInfo;

    private String locationDetails;

    private double longitude;

    private double latitude;

    private String[] openingHours;

    private String[] closingHours;

    private String price;

    private String phone;

    private String email;

    private String website;

    private String instagram;

    private double rating;
    
    private int reviewsCount;
}

