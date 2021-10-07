package beans;

import enums.TypeOfUser;

public class Administrator extends User {
	

	public Administrator() {
		super();
	}

	public Administrator(String userName, String password, String name, String surname, String gender, TypeOfUser typeOfUser) {
		super(userName, password, name, surname, gender, typeOfUser);
	}

	@Override
	public String toString() {
		return "Administrator [getUserName()=" + getUserName() + ", getPassword()=" + getPassword() + ", getName()="
				+ getName() + ", getSurname()=" + getSurname() + ", getGender()=" + getGender() + ", getTypeOfUser()="
				+ getTypeOfUser() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}

}
