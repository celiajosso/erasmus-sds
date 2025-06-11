package com.sds.TravelPlanner.repository;

import com.sds.TravelPlanner.model.Place;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public class PlaceSpecification {

    public static Specification<Place> searchBy(String name, List<String> categories) {
        return (root, query, cb) -> {
            var predicate = cb.conjunction();

            if (name != null && !name.isBlank()) {
                namePredicate = cb.and(predicate,
                        cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%")
                );
                descriptionPredicate = cb.and(predicate,
                        cb.like(cb.lower(root.get("description")), "%" + name.toLowerCase() + "%")
                );
                predicate = cb.and(predicate, criteriaBuilder.or(namePredicate, descPredicate));
            }

            if (categories != null && !categories.isEmpty()) {
                var inClause = cb.in(root.get("category"));
                for (var category : categories) {
                    inClause.value(category);
                }
                predicate = cb.and(predicate, inClause);
            }

            return predicate;
        };
    }
}

