package beans;

import java.util.UUID;

import enums.TypeOfUser;

public class User {
	private UUID id;
	private String username;
	private String password;
	private String name;
	private String surname;
	private String gender;
	private TypeOfUser typeOfUser;
	private Boolean isBlocked;
	private Boolean deleted = false;
	
	
	
	public User() {
		super();
	}
	
	
	public User(String username, String password, String name, String surname, String gender, TypeOfUser typeOfUser) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.typeOfUser = typeOfUser;
		this.isBlocked = false;
	}
	

	public UUID getId() {
		return id;
	}


	public void setId(UUID id) {
		this.id = id;
	}


	public String getUserName() {
		return username;
	}

	public void setUserName(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public TypeOfUser getTypeOfUser() {
		return typeOfUser;
	}

	public void setTypeOfUser(TypeOfUser typeOfUser) {
		this.typeOfUser = typeOfUser;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocekd) {
		this.isBlocked = isBlocekd;
	}

	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", name=" + name + ", surname=" + surname
				+ ", gender=" + gender + ", typeOfUser=" + typeOfUser + ", isBlocekd="
				+ isBlocked + "]";
	}


	public Boolean getDeleted() {
		return deleted;
	}


	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
}
