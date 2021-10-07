package beans;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import enums.StatusOfRestaurant;
import enums.TypeOfRestaurant;

public class Restaurant {
	
	private UUID id;
	private String name;
	private TypeOfRestaurant tipRestaurant;
	private StatusOfRestaurant statusOfRestaurant;
	private Location location = new Location();
	private String logoPath;
	private List<Article> articles = new ArrayList<Article>();
	private double avgMark = 0;
	private Boolean deleted = false;
	
	@JsonIgnore
	private List<Comment> comments = new ArrayList<Comment>();
	
	
	@JsonIgnore
	private Manager manager;
	private UUID managerId;
	
	public Restaurant() {
		// TODO Auto-generated constructor stub
	}

	public Restaurant(String name, TypeOfRestaurant tipRestaurant, StatusOfRestaurant statusOfRestaurant,
			Location location, String logoPath, List<Article> articles) {
		super();
		this.name = name;
		this.tipRestaurant = tipRestaurant;
		this.statusOfRestaurant = statusOfRestaurant;
		this.location = location;
		this.logoPath = logoPath;
		this.articles = articles;
	}
	

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public TypeOfRestaurant getTipRestaurant() {
		return tipRestaurant;
	}

	public void setTipRestaurant(TypeOfRestaurant tipRestaurant) {
		this.tipRestaurant = tipRestaurant;
	}

	public StatusOfRestaurant getStatusOfRestaurant() {
		return statusOfRestaurant;
	}

	public void setStatusOfRestaurant(StatusOfRestaurant statusOfRestaurant) {
		this.statusOfRestaurant = statusOfRestaurant;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogoPath() {
		return logoPath;
	}

	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}

	public List<Article> getArticles() {
		return articles;
	}

	public void setArticles(List<Article> articles) {
		this.articles = articles;
	}

	@Override
	public String toString() {
		return "Restaurant [name=" + name + ", tipRestaurant=" + tipRestaurant + ", statusOfRestaurant="
				+ statusOfRestaurant + ", location=" + location + ", logoPath=" + logoPath + ", articles=" + articles
				+ "]";
	}

	public Manager getManager() {
		return manager;
	}

	public void setManager(Manager manager) {
		this.manager = manager;
	}

	public UUID getManagerId() {
		return managerId;
	}

	public void setManagerId(UUID managerId) {
		this.managerId = managerId;
	}

	public Article getArticleById(UUID articleId) {
		for (Article a : articles) {
			if (a.getId().equals(articleId)) {
				return a;
			}
		}
		
		return null;
	}

	public double getAvgMark() {
		return avgMark;
	}

	public void setAvgMark(double avgMark) {
		this.avgMark = avgMark;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	
	
	
	
	
	
}
