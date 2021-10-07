package dto;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectMapper.DefaultTyping;

import beans.Restaurant;

public class RestaurantDTO {
	
	
	private List<Restaurant> restaurants = new ArrayList<Restaurant>();
	
	public RestaurantDTO() {
		
	}
	
	public List<Restaurant> getRestaurants() {
		return restaurants;
	}

	public void setRestaurants(List<Restaurant> restaurants) {
		this.restaurants = restaurants;
	}

	public void saveFile() {
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(DefaultTyping.NON_FINAL);

		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(new File("restaurants.json"), restaurants);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	public void loadFile() {

		try {
			ObjectMapper maper = new ObjectMapper();
			maper.enableDefaultTyping(DefaultTyping.NON_FINAL);
			InputStream is = new FileInputStream(new File("restaurants.json"));
			TypeReference<ArrayList<Restaurant>> typeReference = new TypeReference<ArrayList<Restaurant>>() {
			};
			
			restaurants = maper.readValue(is, typeReference);
			
			is.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}


	public void addRestaurant(Restaurant restaurant) {
		restaurants.add(restaurant);
		
	}


	public Restaurant getRestaurantById(UUID id) {
		for (Restaurant rest : restaurants) {
			if (rest.getId().equals(id)) {
				return rest;
			}
		}
		return null;
	}
	

}
