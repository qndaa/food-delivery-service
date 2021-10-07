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

import beans.Comment;
import enums.StatusOfComment;


public class CommentDTO {
	
	private List<Comment> comments = new ArrayList<Comment>();
	
	public CommentDTO() {
		
	}
	
	public void saveFile() {
		
		ObjectMapper mapper = new ObjectMapper();
		mapper.enableDefaultTyping(DefaultTyping.NON_FINAL);

		try {
			mapper.writerWithDefaultPrettyPrinter().writeValue(new File("comments.json"), comments);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	

	public void loadFile() {

		try {
			ObjectMapper maper = new ObjectMapper();
			maper.enableDefaultTyping(DefaultTyping.NON_FINAL);
			InputStream is = new FileInputStream(new File("comments.json"));
			TypeReference<ArrayList<Comment>> typeReference = new TypeReference<ArrayList<Comment>>() {
			};
			
			comments = maper.readValue(is, typeReference);
			
			is.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public double getAvgByRestaurant(UUID fromString) {
		
		int sum = 0;
		int len = 0;
		
		for(Comment c : comments) {
			if(c.getRestaurantId().equals(fromString)) {
				sum += c.getMark();
				len += 1;
			}
		}
		
		if (len == 0) {
			return 0;
		} 
		
		
		return (sum*1.0) / len ;
	}

	public List<Comment> getCommentsByRestaurantId(UUID id) {
		List<Comment> ret = new ArrayList<Comment>();
		for (Comment c: comments) {
			if(c.getRestaurantId().equals(id)) {
				ret.add(c);
			}
		}
		return ret;
	}

	public List<Comment> getCommentsByRestaurantIdApproved(UUID id) {
		List<Comment> ret = new ArrayList<Comment>();
		for (Comment c: comments) {
			if(c.getRestaurantId().equals(id) && c.getStatus() == StatusOfComment.APPROVED) {
				ret.add(c);
			}
		}
		return ret;
	}

	public List<Comment> getCommentsByManagerRestaurant(UUID id) {
		// TODO Auto-generated method stub
		return null;
	}

	public Comment getCommentById(UUID id) {
		for (Comment c: comments) {
			if(c.getId().equals(id)) {
				return c;
			}
		}
		return null;
	}
	
	
	
	
}
