package beans;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.TypeOfUser;

public class Manager extends User {
	
	@JsonIgnore
	private Restaurant restaurant = null;
	private UUID restaurantId = null;
	
	public Manager() {
		// TODO Auto-generated constructor stub
	}

	public Manager(Restaurant restaurant) {
		super();
		this.setRestaurant(restaurant);
	}

	public Manager(String username, String password, String name, String surname, String gender,
			TypeOfUser typeOfUser, Restaurant restaurant) {
		super(username, password, name, surname, gender, typeOfUser);
		this.setRestaurant(restaurant);
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
	
	@Override
	public String toString() {
		return "Manager [restaurant=" + restaurant + "]";
	}

	public UUID getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(UUID restaurantId) {
		this.restaurantId = restaurantId;
	}
}
