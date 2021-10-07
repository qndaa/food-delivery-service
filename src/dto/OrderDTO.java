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

import beans.Order;
import enums.StatusOfOrder;

public class OrderDTO {

	private List<Order> orders = new ArrayList<>();
	
	
	public OrderDTO() {
		
	}
	
	
	public void saveFile() {
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(DefaultTyping.NON_FINAL);

		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(new File("orders.json"), orders);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	public void loadFile() {

		try {
			ObjectMapper maper = new ObjectMapper();
			maper.enableDefaultTyping(DefaultTyping.NON_FINAL);
			InputStream is = new FileInputStream(new File("orders.json"));
			TypeReference<ArrayList<Order>> typeReference = new TypeReference<ArrayList<Order>>() {
			};
			
			orders = maper.readValue(is, typeReference);
			
			is.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}


	public List<Order> getOrders() {
		return orders;
	}


	public void setOrders(List<Order> orders) {
		this.orders = orders;
	}


	public List<Order> getOrdersByCustomerId(UUID id) {
		List<Order> ret = new ArrayList<Order>();
		for (Order o: orders) {
			if (o.getCustomerId().equals(id)) {
				ret.add(o);
			}
		}
		
		return ret;
	}
	
	public List<Order> getOrdersByRestaurantId(UUID id) {
		List<Order> ret = new ArrayList<Order>();
		for (Order o: orders) {
			if (o.getRestaurantId().equals(id)) {
				ret.add(o);
			}
		}
		
		return ret;
	}


	public Order getOrderById(UUID id) {
		for (Order o: orders) {
			if (o.getId().equals(id)) {
				return o;
			}
		}

		return null;
	}


	public List<Order> forDeliverer(UUID id) {
		List<Order> ret = new ArrayList<Order>();
		for (Order o: orders) {
			System.out.println(o.getDelivererId());
			System.out.println(o.getStatusOfOrder());
			if(o.getStatusOfOrder().equals(StatusOfOrder.WAIT_DELIVERER)) {
				ret.add(o);
				continue;
			}
			if(o.getDelivererId() != null && o.getDelivererId().equals(id)) {
				ret.add(o);
				continue;
			}
			
		}
		
		return ret;
	}
	
	
	
	
	
}
