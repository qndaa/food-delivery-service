package beans;

public class OrderItem {

	private Article article;
	private int quantity;
	
	public OrderItem() {
		
	}
	
	public OrderItem(Article article, int quantity) {
		super();
		this.article = article;
		this.quantity = quantity;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
