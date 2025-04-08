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

    @Enumerated(EnumType.STRING)
    private Accessibility accessibilityInfo;

    private String locationDetails;
}

