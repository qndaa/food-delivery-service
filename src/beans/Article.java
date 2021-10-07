package beans;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.TypeOfArticle;

public class Article {
	
	private UUID id;
	private String name;
	private double price;
	private double quantity;
	private TypeOfArticle tipArticle;
	private String description;
	private String imagePath;
	@JsonIgnore
	private Restaurant restaurant;
	private UUID restaurantID;
	
	public Article() {
	}

	public Article(String name, double price, double quantity, TypeOfArticle tipArticle, String description, String imagePath,
			Restaurant restaurant) {
		super();
		this.name = name;
		this.price = price;
		this.quantity = quantity;
		this.tipArticle = tipArticle;
		this.description = description;
		this.imagePath = imagePath;
		this.restaurant = restaurant;
	}
	
	
	public Article(Article a) {
		this.id = a.getId();
		this.name = a.getName();
		this.price = a.getPrice();
		this.quantity = a.getQuantity();
		this.tipArticle = a.getTipArticle();
		this.description = a.getDescription();
		this.restaurant = a.getRestaurant();
		this.restaurantID = a.getRestaurantID();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public TypeOfArticle getTipArticle() {
		return tipArticle;
	}

	public void setTipArticle(TypeOfArticle tipArticle) {
		this.tipArticle = tipArticle;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

	@Override
	public String toString() {
		return "Article [name=" + name + ", price=" + price + ", quantity=" + quantity + ", tipArticle=" + tipArticle
				+ ", description=" + description + ", imagePath=" + imagePath + ", restaurant=" + restaurant + "]";
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public UUID getRestaurantID() {
		return restaurantID;
	}

	public void setRestaurantID(UUID restaurantID) {
		this.restaurantID = restaurantID;
	}
	
	
	
	
}
