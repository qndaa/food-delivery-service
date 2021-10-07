package beans;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.StatusOfComment;

public class Comment {
	
	private UUID id;
	
	@JsonIgnore
	private Customer customer;
	private UUID customerId;
	
	@JsonIgnore
	private Restaurant restaurant;
	private UUID restaurantId;
	
	private String content;
	private int mark;
	
	private StatusOfComment status;
	
	public Comment() {
		
	}

	public Comment(UUID id, Customer customer, UUID customerId, Restaurant restaurant, UUID restaurantId,
			String content, int mark) {
		super();
		this.id = id;
		this.customer = customer;
		this.customerId = customerId;
		this.restaurant = restaurant;
		this.restaurantId = restaurantId;
		this.content = content;
		this.mark = mark;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public UUID getCustomerId() {
		return customerId;
	}

	public void setCustomerId(UUID customerId) {
		this.customerId = customerId;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	public UUID getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(UUID restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int getMark() {
		return mark;
	}

	public void setMark(int mark) {
		this.mark = mark;
	}

	public StatusOfComment getStatus() {
		return status;
	}

	public void setStatus(StatusOfComment status) {
		this.status = status;
	}
	
	
	
	
	
}
