package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.StatusOfOrder;

public class Order {
	
	private UUID id;
	
	private double price;
	private StatusOfOrder statusOfOrder;
	private String date;
	private boolean commended;
	private double discout;
	private List<OrderItem> items = new ArrayList<OrderItem>();

	
	@JsonIgnore
	private Customer customer = null;
	private UUID customerId;
	
	
	@JsonIgnore
	private Deliverer deliverer = null;
	private UUID delivererId;
	
	
	@JsonIgnore
	private Restaurant restaurant = null;
	private UUID restaurantId;
	
	
	public Order() {
		
	}
	
	public Order(UUID id, double price, StatusOfOrder statusOfOrder, String date, UUID customerId, UUID restaurantId) {
		super();
		this.id = id;
		this.price = price;
		this.statusOfOrder = statusOfOrder;
		this.date = date;
		this.customerId = customerId;
		this.restaurantId = restaurantId;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public StatusOfOrder getStatusOfOrder() {
		return statusOfOrder;
	}

	public void setStatusOfOrder(StatusOfOrder statusOfOrder) {
		this.statusOfOrder = statusOfOrder;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
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

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public UUID getDelivererId() {
		return delivererId;
	}

	public void setDelivererId(UUID delivererId) {
		this.delivererId = delivererId;
	}

	public Deliverer getDeliverer() {
		return deliverer;
	}

	public void setDeliverer(Deliverer deliverer) {
		this.deliverer = deliverer;
	}

	public boolean isCommended() {
		return commended;
	}

	public void setCommended(boolean commended) {
		this.commended = commended;
	}

	public double getDiscout() {
		return discout;
	}

	public void setDiscout(double discout) {
		this.discout = discout;
	}
	
	

	
	
	
	
}
