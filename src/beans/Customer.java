package beans;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.TypeOfCustomer;
import enums.TypeOfUser;

public class Customer extends User {

	private TypeOfCustomer typeOfCustomer;
	private int points;
	
	@JsonIgnore
	private Basket basket;
	
	
	
	
	public Customer() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Customer(String username, String password, String name, String surname, String gender,
			TypeOfUser typeOfUser) {
		super(username, password, name, surname, gender, typeOfUser);
		// TODO Auto-generated constructor stub
	}
	
	public Customer(TypeOfCustomer typeOfCustomer, int points) {
		super();
		this.typeOfCustomer = typeOfCustomer;
		this.points = points;
	}
	
	
	public TypeOfCustomer getTypeOfCustomer() {
		return typeOfCustomer;
	}
	public void setTypeOfCustomer(TypeOfCustomer typeOfCustomer) {
		this.typeOfCustomer = typeOfCustomer;
	}
	public int getPoints() {
		return points;
	}
	public void setPoints(int points) {
		this.points = points;
	}

	public Basket getBasket() {
		return basket;
	}

	public void setBasket(Basket basket) {
		this.basket = basket;
	}
	
}
