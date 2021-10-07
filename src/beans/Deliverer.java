package beans;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.TypeOfUser;

public class Deliverer extends User {
	
	
	@JsonIgnore
	List<Order> orders = new ArrayList<Order>();
	
	
	public Deliverer() {
		
	}

	public Deliverer(String username, String password, String name, String surname, String gender,
			TypeOfUser typeOfUser) {
		super(username, password, name, surname, gender, typeOfUser);
		// TODO Auto-generated constructor stub
	}
	
	public List<Order> getOrders() {
		return orders;
	}

	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}
	
	
}
