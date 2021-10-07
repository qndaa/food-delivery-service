package beans;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Basket {
	
	
	private List<OrderItem> items = new ArrayList<OrderItem>();
	private double price;
	private UUID restaurantId = null;
	
	public Basket() {
		
	}

	public Basket(List<OrderItem> items, double price) {
		super();
		this.items = items;
		this.price = price;
	}

	public List<OrderItem> getItems() {
		return items;
	}

	public void setItems(List<OrderItem> items) {
		this.items = items;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public UUID getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(UUID restaurantId) {
		this.restaurantId = restaurantId;
	}
	
	

}
