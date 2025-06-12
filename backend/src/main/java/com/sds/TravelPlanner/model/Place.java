package com.sds.TravelPlanner.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String category;
    private String imageUrl;
    private String description;
}
