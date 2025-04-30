package com.sds.TravelPlanner.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sds.TravelPlanner.model.Accessibility;
import com.sds.TravelPlanner.model.Place;
import com.sds.TravelPlanner.model.PlaceDetails;
import com.sds.TravelPlanner.repository.PlaceDetailsRepository;
import com.sds.TravelPlanner.repository.PlaceRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataLoaderService {

    private final PlaceRepository placeRepository;
    private final PlaceDetailsRepository placeDetailsRepository;

    @PostConstruct
    public void loadData() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        var resource = new ClassPathResource("places.json");
        List<PlaceJson> placesFromJson = mapper.readValue(resource.getInputStream(), new TypeReference<>() {});

        for (PlaceJson jsonPlace : placesFromJson) {
            Place place = new Place();
            place.setName(jsonPlace.getName());
            place.setCategory(jsonPlace.getCategory());
            place.setImageUrl(jsonPlace.getImage_url());
            Place savedPlace = placeRepository.save(place);

            PlaceDetails details = new PlaceDetails();
            details.setPlace(savedPlace);
            details.setDescription(jsonPlace.getDetails().getDescription());
            details.setDuration(jsonPlace.getDetails().getDuration());
            details.setAccessibilityInfo(Accessibility.valueOf(jsonPlace.getDetails().getAccessibility_info()));
            details.setLocationDetails(jsonPlace.getDetails().getLocation_details());
            details.setLatitude(jsonPlace.getDetails().getLatitude());
            details.setLongitude(jsonPlace.getDetails().getLongitude());
            details.setOpeningHours(parseHours(jsonPlace.getDetails().getOpening_hours()));
            details.setClosingHours(parseHours(jsonPlace.getDetails().getClosing_hours()));
            details.setPrice(jsonPlace.getDetails().getPrice());
            details.setPhone(jsonPlace.getDetails().getPhone());
            details.setEmail(jsonPlace.getDetails().getEmail());
            details.setWebsite(jsonPlace.getDetails().getWebsite());
            details.setRating(jsonPlace.getDetails().getRating());
            details.setReviewsCount(jsonPlace.getDetails().getReviews_count());
            placeDetailsRepository.save(details);
        }

        log.info("Loaded places from JSON successfully.");
    }

    private String[] parseHours(List<Object> rawHours) {
        String[] result = new String[rawHours.size()];
        for (int i = 0; i < rawHours.size(); i++) {
            Object hour = rawHours.get(i);
            if (hour instanceof String) {
                result[i] = (String) hour;
            } else if (hour instanceof List) {
                List<?> hourList = (List<?>) hour;
                result[i] = String.join(" - ", hourList.stream().map(Object::toString).toArray(String[]::new));
            } else {
                throw new UnsupportedOperationException("Unknown type in opening_hours JSON: " + hour);
            }
        }
        return result;
    }
}
