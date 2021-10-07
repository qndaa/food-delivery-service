package beans;

public class Location {
	private double geographicalWidth;
    private double geographicalLength;
    private Address address = new Address();
    
    public Location() {
    	
    	
    }
    
	public Location(double geographicalWidth, double geographicalLength, Address address) {
		super();
		this.geographicalWidth = geographicalWidth;
		this.geographicalLength = geographicalLength;
		this.address = address;
	}


	public double getGeographicalWidth() {
		return geographicalWidth;
	}


	public void setGeographicalWidth(double geographicalWidth) {
		this.geographicalWidth = geographicalWidth;
	}


	public double getGeographicalLength() {
		return geographicalLength;
	}


	public void setGeographicalLength(double geographicalLength) {
		this.geographicalLength = geographicalLength;
	}


	public Address getAddress() {
		return address;
	}


	public void setAddress(Address address) {
		this.address = address;
	}


	@Override
	public String toString() {
		return "Location [geographicalWidth=" + geographicalWidth + ", geographicalLength=" + geographicalLength
				+ ", address=" + address + "]";
	}
    
	
	
}
