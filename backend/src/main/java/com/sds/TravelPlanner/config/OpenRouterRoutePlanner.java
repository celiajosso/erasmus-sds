package com.sds.TravelPlanner.config;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sds.TravelPlanner.model.PlaceDetails;
import com.sds.TravelPlanner.model.ScheduleItem;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class OpenRouterRoutePlanner {

    @Value("${openrouter.api.key}")
    private String apiKey;

    public List<ScheduleItem> sendQuery(List<PlaceDetails> places) throws Exception {
        var userPrompt = getUserPrompt(places);

        var mapper = new ObjectMapper();
        var messageNode = mapper.createObjectNode();
        messageNode.put("role", "user");
        messageNode.put("content", userPrompt);

        var rootNode = mapper.createObjectNode();
        rootNode.put("model", "google/gemma-3n-e4b-it:free");
        rootNode.set("messages", mapper.createArrayNode().add(messageNode));

        String jsonBody = mapper.writeValueAsString(rootNode);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://openrouter.ai/api/v1/chat/completions"))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .POST(BodyPublishers.ofString(jsonBody))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println("Response:");
        System.out.println(response.body());

        var list = parseScheduleItems(response.body(), places);
        return list;
    }

    private static String getUserPrompt(List<PlaceDetails> places) {
        StringBuilder placeListText = new StringBuilder();
        for (PlaceDetails placeDetails : places) {
            placeListText.append(String.format("Place: %s, Address: %s, Working Hours: %s - %s\\n",
                    placeDetails.getPlace().getName(), placeDetails.getLocationDetails(),
                    Arrays.toString(placeDetails.getOpeningHours()), Arrays.toString(placeDetails.getClosingHours())));
        }

        var userPrompt = String.format(
                "I need a route that visits these places in an efficient order considering their locations, " +
                        "working hours and my available time from 10:00 AM to 6:00 PM. Add the duration for every visit based on that. " +
                        "Please return the result in JSON format as an array of objects, each with 'placeName' and 'localTime' fields. " +
                        "Example: [{\"placeName\": \"Museum\", \"localTime\": \"10:00\"}, ...]. " +
                        "Places:\\n\\n%s", placeListText.toString()
        );
        return userPrompt;
    }

    public List<ScheduleItem> parseScheduleItems(String jsonResponse, List<PlaceDetails> allPlaces) throws Exception {
        var mapper = new ObjectMapper();
        var root = mapper.readTree(jsonResponse);

        var content = root.path("choices").get(0).path("message").path("content").asText();

        var pattern = Pattern.compile("```json\\s*(.*?)\\s*```", Pattern.DOTALL);
        var matcher = pattern.matcher(content);
        String jsonArrayString;
        if (matcher.find()) {
            jsonArrayString = matcher.group(1);
        } else {
            jsonArrayString = content;
        }

        var arrayNode = mapper.readTree(jsonArrayString);

        List<ScheduleItem> items = new ArrayList<>();
        for (JsonNode node : arrayNode) {
            String placeName = node.get("placeName").asText();
            LocalTime time = LocalTime.parse(node.get("localTime").asText());
            PlaceDetails place = allPlaces.stream()
                    .filter(p -> p.getPlace().getName().equalsIgnoreCase(placeName))
                    .findFirst()
                    .orElse(null);
            if (place != null) {
                items.add(new ScheduleItem(time, place.getPlace()));
            }
        }
        return items;
    }
}
