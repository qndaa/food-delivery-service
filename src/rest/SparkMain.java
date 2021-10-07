package rest;

import static spark.Spark.get;
import static spark.Spark.post;

import static spark.Spark.port;
import static spark.Spark.staticFiles;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.MultipartConfigElement;
import javax.servlet.http.Part;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import beans.Address;
import beans.Article;
import beans.Basket;
import beans.Comment;
import beans.OrderItem;
import beans.Customer;
import beans.Deliverer;
import beans.Location;
import beans.Manager;
import beans.Order;
import beans.Restaurant;
import beans.User;
import dto.CommentDTO;
import dto.OrderDTO;
import dto.RestaurantDTO;
import dto.UserDTO;
import enums.StatusOfComment;
import enums.StatusOfOrder;
import enums.StatusOfRestaurant;
import enums.TypeOfArticle;
import enums.TypeOfCustomer;
import enums.TypeOfRestaurant;
import enums.TypeOfUser;
import jdk.internal.org.objectweb.asm.tree.IntInsnNode;
import spark.Session;
import spark.utils.IOUtils;
import sun.reflect.generics.tree.BaseType;


public class SparkMain {
	
	public static UserDTO userDto = new UserDTO();
	public static RestaurantDTO restaurantDTO = new RestaurantDTO();
	public static OrderDTO orderDTO = new OrderDTO();
	public static CommentDTO commentDTO = new CommentDTO();


	public static void main(String[] args) throws Exception {
		port(9001);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		// Loading data
		userDto.loadFile();
		restaurantDTO.loadFile();
		orderDTO.loadFile();
		commentDTO.loadFile();

		// End-points
		// Test
		get("/test", (request, response) ->{	
			return "Test";	
		});
		
		// Login 
		post("/login", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
		
			String a = req.body();
			User userLogin = g.fromJson(a, User.class);
			User user = userDto.loginUser(userLogin.getUserName(), userLogin.getPassword());
				
			if (user == null || user.getDeleted() == true) {
				res.status(400);
				return res;
			}

			Session ss = req.session(true);
			User userSession = ss.attribute("user");
			
			

			if (userSession == null) {
				userSession = user;
				ss.attribute("user", userSession);
				if (userSession.getTypeOfUser() == TypeOfUser.CUSTOMER) {
					ss.attribute("basket", new Basket());
				}
			}

			return g.toJson(userSession);

		});


		// Logout
		get("/logout", (req, res) -> {
			res.type("application/json");
			Session ss = req.session(true);
			User user = ss.attribute("user");
			if (user != null) {
				ss.invalidate();
			}
			return true;
		});
		

		// Registration
		post("/registration", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();
			String playload = req.body();
			
			Customer customer = g.fromJson(playload, Customer.class);
			return userDto.registrationCustomer(customer);
		});
		
		
		// Validation access
		get("/validationLogin", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			if(user != null) {
				res.status(403);
				return res;
			}
			
			return true;
		});
		
		
		// Session
		get("/session", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			
			
			if(user == null) {
				user = new User();
				user.setTypeOfUser(TypeOfUser.NO_LOGIN);
				return  g.toJson(user);
			} else if (user.getTypeOfUser() == TypeOfUser.MANAGER) {
				Manager manager = userDto.getManagerById(user.getId().toString());
				System.out.println(manager.getRestaurantId());
				
				
				if(manager.getRestaurantId() != null) {
					manager.setRestaurant(restaurantDTO.getRestaurantById((manager.getRestaurantId())));
					
					List<Comment> comments = commentDTO.getCommentsByRestaurantId(manager.getRestaurant().getId());
					manager.getRestaurant().setComments(comments);
				} else {
					manager.setRestaurant(null);
				}
				
				return g.toJson(manager);
			}
			return g.toJson(user);
		});
		
		get("/basket", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			if(user == null) {
				user = new User();
				user.setTypeOfUser(TypeOfUser.NO_LOGIN);
				return  g.toJson(user);
			} else {
				Basket basket = ss.attribute("basket");
				return g.toJson(basket);
			}
			
		});
		
		
		post("/addToBasket", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			Basket basket = ss.attribute("basket");
			String playload = req.body();

			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,Object> map = mapper.readValue(playload, Map.class);
			
			UUID restaurantId = UUID.fromString((String) map.get("restaurantId"));
			UUID articleId = UUID.fromString((String) map.get("articleId"));
			Integer quantity = Integer.parseInt((String) map.get("quantity"));
			
			if(basket.getRestaurantId() == null || basket.getRestaurantId().equals(restaurantId)) {
			
			
				for(OrderItem b : basket.getItems()) {
					if (b.getArticle().getId().equals(articleId)) {
						return "Artikl se vec nalazi u korpi!";
					}
				}
				
				
				Restaurant restaurant = restaurantDTO.getRestaurantById(restaurantId);
				
				if (restaurant != null) {
					Article article = restaurant.getArticleById(articleId);
					
					if(article != null) {
						OrderItem orderItem = new OrderItem();
						orderItem.setQuantity(quantity);
						orderItem.setArticle(article);
						basket.setRestaurantId(restaurantId);
						basket.getItems().add(orderItem);
						double price = 0;
						price = quantity * 1.0 * article.getPrice();
						
						basket.setPrice(basket.getPrice() + price);
						return true;
					}
				}
			} else {
				return "Ne mozete stavljati proizvode iz vise restorana u korpu!";
			}
			
			return false;
		});
		
		
		post("/removeFromBasket", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			Basket basket = ss.attribute("basket");
			String playload = req.body();

			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,Object> map = mapper.readValue(playload, Map.class);
			
			UUID articleId = UUID.fromString((String) map.get("articleId"));
			
			for(OrderItem b : basket.getItems()) {
				if (b.getArticle().getId().equals(articleId)) {
					basket.getItems().remove(b);
					double price = b.getQuantity() * b.getArticle().getPrice();
					basket.setPrice(basket.getPrice() - price);
					if(basket.getItems().size() == 0) {
						basket.setRestaurantId(null);
					}
					return g.toJson(basket);
				}
			}
			
			
			return false;
		});
		
		post("/updateBasket", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			Basket basket = ss.attribute("basket");
			String playload = req.body();

			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,Object> map = mapper.readValue(playload, Map.class);
			
			UUID articleId = UUID.fromString((String) map.get("id"));
			double quantity = Double.parseDouble((String) map.get("quantity"));
			
			for(OrderItem b : basket.getItems()) {
				if (b.getArticle().getId().equals(articleId)) {
					
					double price = b.getQuantity() * b.getArticle().getPrice();
					basket.setPrice(basket.getPrice() - price);
					
					price = b.getArticle().getPrice() * quantity;
					b.setQuantity((int)quantity);
					basket.setPrice(basket.getPrice() + price);

					return g.toJson(basket);
				}
			}
			
			
			return false;
		});
		
		
		post("/createOrder", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			Basket basket = ss.attribute("basket");
			User user = ss.attribute("user");
			String playload = req.body();
			
			if (basket == null || user == null) {
				return false;
			}
			
			Order order = new Order();
			order.setId(UUID.randomUUID());
			order.setCustomerId(user.getId());
			
			SimpleDateFormat formatdate3 = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			order.setDate(formatdate3.format(new Date()));
			order.setRestaurantId(basket.getRestaurantId());
			order.setPrice(basket.getPrice());
			
			List<OrderItem> ret = new ArrayList<OrderItem>();
			for (OrderItem item: basket.getItems()) {
				ret.add(new OrderItem(new Article(item.getArticle()), item.getQuantity()));
			}
			
			order.setItems(ret);
			order.setStatusOfOrder(StatusOfOrder.PROCESSING);
			order.setCommended(false);
		
			
			
			Customer customer = userDto.getCustomerById(user.getId());
			customer.setPoints((int)customer.getPoints() + (int)((order.getPrice()*1.0 / 1000) * 133));
			double dis = 0;
			if(customer.getPoints() <= 1000) {
				customer.setTypeOfCustomer(TypeOfCustomer.NO_CATEGORY);
			}
			else if (customer.getPoints() > 1000 && customer.getPoints() <= 3000) {
				customer.setTypeOfCustomer(TypeOfCustomer.BRONZE);
				dis = 0.1;
			}
			else if (customer.getPoints() > 3000 && customer.getPoints() <= 5000) {
				customer.setTypeOfCustomer(TypeOfCustomer.SILVER);
				dis = 0.2;
			}
			else if (customer.getPoints() > 5000) {
				customer.setTypeOfCustomer(TypeOfCustomer.GOLD);
				dis = 0.3;
			}

			
			order.setDiscout(order.getPrice() * dis);
			
			
			
			orderDTO.getOrders().add(order);
			orderDTO.saveFile();
			userDto.saveFile();
			
			ss.attribute("basket", new Basket());
			
			
			return true;
		});
		
		
		
		get("/validationAccess", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			if(user == null) {
				res.status(403);
				return res;
			}
			
			return true;
		});
		
		
		
		
		// Profile changes
		
		post("/saveChagesUser", (req,res)->{
			res.type("application/json");
			Gson g = new Gson();
			
			String playload = req.body();
			User user = g.fromJson(playload, User.class);
			
			boolean fleg = false;
			for (User u : userDto.getUsers()) {
				if (u.getUserName().equals(user.getUserName())) {
					fleg = true;
					
					u.setGender(user.getGender());
					u.setName(user.getName());
					u.setSurname(user.getSurname());
					if(!user.getPassword().equals("")) {
						u.setPassword(user.getPassword());
					}
				
					break;
				}
			}
			
			if(!fleg) {
				return false;
			}
			
			
			userDto.saveFile();	
			return true;
		});
		
		get("/validationAccesAdmin", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			if(user == null) {
				res.status(403);
				return res;
			}else if (user.getTypeOfUser() != TypeOfUser.ADMINISTRATOR) {
				res.status(403);
				return res;
			}
			
			return true;
		});
		
		get("/getAccessManager", (req, res) -> {
			res.type("application/json");
			
			Gson g = new Gson();
			
			Session ss = req.session(true);
			User user = ss.attribute("user");
			
			if(user == null) {
				res.status(403);
				return res;
			}else if (user.getTypeOfUser() == TypeOfUser.MANAGER) {
				Manager manager = (Manager) user;
				manager.setRestaurant(restaurantDTO.getRestaurantById((manager.getRestaurantId())));
				return manager;
			}
			
			return null;
		});
		
		
		
		post("/createManager", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();
			String playload = req.body();
			
			Manager manager = g.fromJson(playload, Manager.class);
			return userDto.registrationManager(manager);
		});

		post("/createDeliverer", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();
			String playload = req.body();
			
			Deliverer deliverer = g.fromJson(playload, Deliverer.class);
			return userDto.registrationDeliverer(deliverer);
		});
		
		
		get("/allUsers", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();
			
			return g.toJson(userDto.getUsers());
			
		});
		
		get("/allRestaurants", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();
			return g.toJson(restaurantDTO.getRestaurants());
		});
		
		
		get("/getFreeManagers", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();
			return g.toJson(userDto.getFreeManagers());
		});
		
		
		post("/uploadPicture", (request, response) -> {
			request.attribute("org.eclipse.jetty.multipartConfig", new MultipartConfigElement("static/data/profile"));					
			Session ss = request.session(true);			
			Part uploadedFile = request.raw().getPart("image");
			String id = UUID.randomUUID().toString();
			Path out = Paths.get("static/data/img/" + id + ".jpg");

		    try(final java.io.InputStream in = uploadedFile.getInputStream()){

		    	OutputStream outStream = new FileOutputStream(out.toString());		 
		    	IOUtils.copy(in, outStream);
		    	
		    	outStream.close();
		    	uploadedFile.delete();
		    	in.close();
		    	 	
		    } catch (Exception e) {
		    	e.printStackTrace();
		    }
		       
		    return "data/img/" + id + ".jpg";
			
		}); 
		
		
		post("/createRestaurant", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();
			String playload = req.body();
			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,Object> map = mapper.readValue(playload, Map.class);
			

			TypeOfRestaurant type = null;
			switch (map.get("typeOfRestaurant").toString()) {
				case "Italijanski restoran":
					type = TypeOfRestaurant.ITALIAN_FOOD;
					break;
				case "Kineski restoran":
					type = TypeOfRestaurant.CHINESE_FOOD;
					break;
	
				case "Brza hrana":
					type = TypeOfRestaurant.FAST_FOOD;
					break;
	
				case "Slatkisi":
					type = TypeOfRestaurant.SWEET_FOOD;
					break;
				default:
					break;
			}
			
			Address address = new Address((String) map.get("street"),Integer.parseInt((String) map.get("numberHouse")),(String) map.get("city"),Integer.parseInt((String) map.get("postNumber")));	

			Location location = new Location(0.0, 0.0, address);
			
		
			
			Manager manager =  userDto.getManagerById((String) map.get("manager"));
			
			if (manager != null && manager.getRestaurant() == null) {
				Restaurant restaurant = new Restaurant();
				restaurant.setLocation(location);
				restaurant.setId(UUID.randomUUID());
				restaurant.setStatusOfRestaurant(StatusOfRestaurant.WORK);
				restaurant.setTipRestaurant(type);
				restaurant.setName((String) map.get("name"));
				restaurant.setLogoPath((String) map.get("logoPath"));
				restaurant.setManagerId(manager.getId());
				manager.setRestaurant(restaurant);
				manager.setRestaurantId(restaurant.getId());
				restaurantDTO.addRestaurant(restaurant);
				restaurantDTO.saveFile();
				userDto.saveFile();
				return true;
			} else {
				System.out.println("Menadzer ne postoji ili je zauzet!");
				return false;
			}
		});
		
		
		post("/getRestaurant", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Restaurant restaurant =  restaurantDTO.getRestaurantById(id);
			Session ss = request.session(true);			
			User user = ss.attribute("user");
			
			if (user == null || user.getTypeOfUser() == TypeOfUser.CUSTOMER || user.getTypeOfUser() == TypeOfUser.DELIVERER) {
				List<Comment> comments = commentDTO.getCommentsByRestaurantIdApproved(id);
				restaurant.setComments(comments);
				
			} else if (user.getTypeOfUser() == TypeOfUser.ADMINISTRATOR || (user.getTypeOfUser() == TypeOfUser.MANAGER && user.getId().equals(restaurant.getManagerId()))) {
				List<Comment> comments = commentDTO.getCommentsByRestaurantId(id);
				restaurant.setComments(comments);
			} else if (user.getTypeOfUser() == TypeOfUser.MANAGER && !(user.getId().equals(restaurant.getManagerId()))) {
				List<Comment> comments = commentDTO.getCommentsByRestaurantIdApproved(id);
				restaurant.setComments(comments);
			}
			
			
			
			return g.toJson(restaurant);
		});
		
		get("/customerOrders", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(req.queryParams("id"));
			List<Order> orders = orderDTO.getOrdersByCustomerId(id);
			for (Order o: orders) {
				o.setRestaurant(restaurantDTO.getRestaurantById(o.getRestaurantId()));
			}
			
			return g.toJson(orders);
			
		});
		
		get("/managerOrders", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(req.queryParams("id"));
			List<Order> orders = orderDTO.getOrdersByRestaurantId(id);
			for(Order o : orders) {
				o.setCustomer(userDto.getCustomerById(o.getCustomerId()));
				if(o.getDelivererId() != null) {
					o.setDeliverer(userDto.getDelivererById(o.getDelivererId()));
				}
			}
			
			return g.toJson(orders);
		});
		
		get("/delivererOrders", (req, res) -> {
			res.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(req.queryParams("id"));
			
			System.out.print(id);
			List<Order> orders = orderDTO.forDeliverer(id);
			for (Order o: orders) {
				o.setRestaurant(restaurantDTO.getRestaurantById(o.getRestaurantId()));
			}
			
			
			return g.toJson(orders);
		});
		
		
		post("/addArticle", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Restaurant restaurant =  restaurantDTO.getRestaurantById(id);
			String playload = request.body();
			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,Object> map = mapper.readValue(playload, Map.class);
			
			Article article = new Article();
			
			article.setId(UUID.randomUUID());
			article.setRestaurantID(restaurant.getId());
			article.setImagePath((String)map.get("imagePath"));
			article.setName((String)map.get("name"));
			article.setQuantity(Double.parseDouble((String)map.get("quantity")));
			article.setPrice(Double.parseDouble((String)map.get("price")));
			article.setDescription((String)map.get("description"));
			TypeOfArticle tip = map.get("tipArticle") == "FOOD" ? TypeOfArticle.FOOD : TypeOfArticle.FOOD;
			article.setTipArticle(tip);
			
			for(Article a : restaurant.getArticles()) {
				if (a.getName().equals(article.getName())) {
					return g.toJson(null);
				}
			}

			restaurant.getArticles().add(article);
			restaurantDTO.saveFile();
			
			
			return g.toJson(restaurant);
		});
		
		
		post("/updateArticle", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Restaurant restaurant =  restaurantDTO.getRestaurantById(id);
			String playload = request.body();
			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,Object> map = mapper.readValue(playload, Map.class);
			
			Article article = null;
			
			UUID articleId = UUID.fromString((String)map.get("id"));
			
			for(Article a : restaurant.getArticles()) {
				if (a.getId().equals(articleId)) {
					article = a;
					break;
				}
			}
			
			String name = (String) map.get("name");
			System.out.println(name);
			for(Article a : restaurant.getArticles()) {
				if (a.getName().equals(name) && (!a.getId().equals(articleId))) {
					return g.toJson(null);
				}
			}
		
			article.setImagePath((String)map.get("imagePath"));
			article.setName((String)map.get("name"));
			article.setQuantity(Double.parseDouble((String)map.get("quantity")));
			article.setPrice(Double.parseDouble((String)map.get("price")));
			article.setDescription((String)map.get("description"));
			TypeOfArticle tip = map.get("tipArticle") == "FOOD" ? TypeOfArticle.FOOD : TypeOfArticle.FOOD;
			article.setTipArticle(tip);
			
			
			restaurantDTO.saveFile();
		
			return g.toJson(restaurant);
		});
		

		post("/setCancel", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();	
			Session ss = request.session(true);

			UUID id =  UUID.fromString(request.queryParams("id"));
			Order order = orderDTO.getOrderById(id);
			if (order == null) {
				return false;
			}
			
			User user = ss.attribute("user");
			
			orderDTO.saveFile();
			
			Customer customer = userDto.getCustomerById(user.getId());
			int newPoints = (int)customer.getPoints() - (int)((order.getPrice()*1.0 / 1000) * 133 * 4);
			
			if(newPoints < 0) {
				customer.setPoints(0);
			} else {
				customer.setPoints(newPoints);
			}
			
			if(customer.getPoints() <= 1000) {
				customer.setTypeOfCustomer(TypeOfCustomer.NO_CATEGORY);
			}
			else if (customer.getPoints() > 1000 && customer.getPoints() <= 3000) {
				customer.setTypeOfCustomer(TypeOfCustomer.BRONZE);
			}
			else if (customer.getPoints() > 3000 && customer.getPoints() <= 5000) {
				customer.setTypeOfCustomer(TypeOfCustomer.SILVER);
			}
			else if (customer.getPoints() > 5000) {
				customer.setTypeOfCustomer(TypeOfCustomer.GOLD);
			}
			
			userDto.saveFile();
			
			
			order.setStatusOfOrder(StatusOfOrder.CANCELED);
			orderDTO.saveFile();
		
			
			return true;
		});
	
		
		post("/setPreparation", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Order order = orderDTO.getOrderById(id);
			if (order == null) {
				return false;
			}
			order.setStatusOfOrder(StatusOfOrder.PREPARATION);
			orderDTO.saveFile();
		
			return true;
		});
		
		post("/setWaitDeliverer", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Order order = orderDTO.getOrderById(id);
			if (order == null) {
				return false;
			}
			order.setStatusOfOrder(StatusOfOrder.WAIT_DELIVERER);
			orderDTO.saveFile();
		
			return true;
		});
		
		post("/setDelivered", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Order order = orderDTO.getOrderById(id);
			if (order == null) {
				return false;
			}
			order.setStatusOfOrder(StatusOfOrder.DELIVERED);
			orderDTO.saveFile();
		
			return true;
		});
		
		post("/setRequest", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Order order = orderDTO.getOrderById(id);
			if (order == null) {
				return false;
			}
			
			Session ss = request.session(true);
			User user = ss.attribute("user");

			order.setDelivererId(user.getId());
			order.setStatusOfOrder(StatusOfOrder.REQUEST);
			orderDTO.saveFile();
		
			return true;
		});
		
		post("/cancelRequest", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Order order = orderDTO.getOrderById(id);
			if (order == null) {
				return false;
			}
			order.setDelivererId(null);
			order.setStatusOfOrder(StatusOfOrder.WAIT_DELIVERER);
			orderDTO.saveFile();
		
			return true;
		});
		
		
		post("/setTransport", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Order order = orderDTO.getOrderById(id);
			if (order == null) {
				return false;
			}
			order.setStatusOfOrder(StatusOfOrder.TRANSPORT);
			orderDTO.saveFile();
		
			return true;
		});
		
		
		post("/comment", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			
			String playload = request.body();
			
			ObjectMapper mapper = new ObjectMapper();
			Map<String,Object> map = mapper.readValue(playload, Map.class);
			
			Comment comment = new Comment();
			comment.setId(UUID.randomUUID());
			comment.setCustomerId(UUID.fromString((String) map.get("customerId")));
			comment.setRestaurantId(UUID.fromString((String) map.get("restaurantId")));
			comment.setContent((String) map.get("content"));
			comment.setMark(Integer.parseInt((String) map.get("mark")));
			comment.setStatus(StatusOfComment.WAIT);
			commentDTO.getComments().add(comment);
			
			Order order = orderDTO.getOrderById(UUID.fromString((String) map.get("orderId")));
			order.setCommended(true);
			
			double avgMark = commentDTO.getAvgByRestaurant(UUID.fromString((String) map.get("restaurantId")));
			
			Restaurant restaurant = restaurantDTO.getRestaurantById(UUID.fromString((String) map.get("restaurantId")));
			restaurant.setAvgMark(avgMark);
			
			commentDTO.saveFile();
			orderDTO.saveFile();
			restaurantDTO.saveFile();
			
			
			return true;
		});
		
		post("/approveComment", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Comment comment = commentDTO.getCommentById(id);
			comment.setStatus(StatusOfComment.APPROVED);
			commentDTO.saveFile();
		
			return true;
		});
		
		post("/declineComment", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Comment comment = commentDTO.getCommentById(id);
			comment.setStatus(StatusOfComment.DECLINED);
			commentDTO.saveFile();
		
			return true;
		});
		
		post("/deleteUser", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			User user = userDto.getUserById(id);
			user.setDeleted(true);
			
			if (user.getTypeOfUser() == TypeOfUser.MANAGER) {
				Manager manager = userDto.getManagerById(id.toString());
				if (manager.getRestaurantId() != null) {
					Restaurant restaurant = restaurantDTO.getRestaurantById(manager.getRestaurantId());
					restaurant.setDeleted(true);
				}
				
				
				
			}
			restaurantDTO.saveFile();

			userDto.saveFile();
			
			return true;
		});
		
		post("/deleteRestaurant", (request, response) -> {
			response.type("application/json");
			Gson g = new Gson();			
			UUID id =  UUID.fromString(request.queryParams("id"));
			Restaurant restaurant = restaurantDTO.getRestaurantById(id);
			restaurant.setDeleted(true);
			Manager manager = userDto.getManagerById(restaurant.getManagerId().toString());
			manager.setRestaurant(null);
			manager.setRestaurantId(null);
			userDto.saveFile();
			restaurantDTO.saveFile();
			
			return true;
		});
		
		
		
	}
}
