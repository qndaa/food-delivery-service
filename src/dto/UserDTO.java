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

import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.User;
import enums.TypeOfCustomer;
import enums.TypeOfUser;

public class UserDTO {
	
	private List<User> users = new ArrayList<User>();

	
	public UserDTO() {
		
	}
	
	
	public void saveFile() {
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(DefaultTyping.NON_FINAL);
//		Administrator admin = new Administrator("marko.kljajic","marko.kljajic","Marko","Klajic","Muski", TypeOfUser.ADMINISTRATOR);
//		admin.setId(UUID.randomUUID());
//		users.add(admin);
		
		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(new File("users.json"), users);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	public void loadFile() {

		try {
			ObjectMapper maper = new ObjectMapper();
			maper.enableDefaultTyping(DefaultTyping.NON_FINAL);
			InputStream is = new FileInputStream(new File("users.json"));
			TypeReference<ArrayList<User>> typeReference = new TypeReference<ArrayList<User>>() {};
			users = maper.readValue(is, typeReference);
			is.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
	
	public User loginUser(String username, String password) {
		for (User user : users) {
			if(user.getUserName().equals(username) && user.getPassword().equals(password)) {
				return user;
			}
		}
		return null;	
	}
	

	public boolean registrationCustomer(Customer customer) {
		customer.setTypeOfUser(TypeOfUser.CUSTOMER);
		customer.setIsBlocked(false);
		customer.setPoints(0);
		customer.setTypeOfCustomer(TypeOfCustomer.NO_CATEGORY);
		customer.setId(UUID.randomUUID());

		
		for (User u : users) {
			if (u.getUserName().equals(customer.getUserName())) {
				return false;
			}
		}
		users.add(customer);
		saveFile();
		return true;
	}
	
	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public boolean registrationManager(Manager manager) {
		manager.setTypeOfUser(TypeOfUser.MANAGER);
		manager.setIsBlocked(false);
		manager.setId(UUID.randomUUID());
		manager.setRestaurantId(null);
		
		for (User u : users) {
			if (u.getUserName().equals(manager.getUserName())) {
				return false;
			}
		}
		users.add(manager);
		saveFile();
		return true;
	}


	public boolean registrationDeliverer(Deliverer deliverer) {
		// TODO Auto-generated method stub
		deliverer.setTypeOfUser(TypeOfUser.DELIVERER);
		deliverer.setIsBlocked(false);
		deliverer.setId(UUID.randomUUID());
		
		for (User u : users) {
			if (u.getUserName().equals(deliverer.getUserName())) {
				return false;
			}
		}
		users.add(deliverer);
		saveFile();
		return true;
	}


	public List<Manager> getFreeManagers() {
		// TODO Auto-generated method stub
		List<Manager> managers = new ArrayList<Manager>();
		for (User u : users) {
			if (u instanceof Manager) {
				Manager m = (Manager) u;
				if (m.getRestaurantId() == null) {
					managers.add(m);
				}
			}
		}
		return managers;
	}


	public Manager getManagerById(String string) {
		for (User u : users) {
			if (u instanceof Manager && u.getId().toString().equals(string)) {
				return (Manager) u;
			}
		}
		return null;
	}


	public Customer getCustomerById(UUID customerId) {
		for (User u : users) {
			if (u instanceof Customer && u.getId().equals(customerId)) {
				return (Customer) u;
			}
		}
		return null;
	}


	public Deliverer getDelivererById(UUID delivererId) {
		for (User u : users) {
			if (u instanceof Deliverer && u.getId().equals(delivererId)) {
				return (Deliverer) u;
			}
		}
		return null;
	}


	public User getUserById(UUID id) {
		for (User u : users) {
			if (u.getId().equals(id)) {
				return  u;
			}
		}
		return null;
	}
}
