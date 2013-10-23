package controllers;

import play.*;
import play.mvc.*;
import java.io.File;
import play.cache.Cache;
import play.data.validation.Required;
import play.libs.Codec;
import play.libs.Files;
import play.libs.Images;
import models.*;
import java.util.*;

public class Uploads extends Controller{
	public static void index(String message) {
    	if(session.get("userId") != null) {
            if(message == null) {
                message = "";
            }
    	   render(message);
        }
        else {
            
        }
    }

    public static void showUpload(Long id) {
        if(User.find("byUserid", session.get("userId")).<User>first().authority == 1) {
        	Upload upload = Upload.findById(id);
        	List <Comment> comments = Comment.find("byUpload_id", id).from(0).fetch(10);
        	String randomID = Codec.UUID();
        	render(upload,comments,randomID);
        }
        else {

        }
    }
    
    public static void uploadHelp(File photo, String title, String content) {
	    if(session.get("userId") != null) {
            String userId = session.get("userId");
            User tempUser = User.find("byUserid", userId).first();
            String author = tempUser.name;
            String name = photo.getName();
	        Verify verify = new Verify(author,title,content,name);
            Files.copy(photo, Play.getFile("public/images/"+name));
            verify.save();
            Uploads.showAllUploads(0);
        }
        else {
        }
    }
    
    public static void postComment(Long id, @Required String content) {
    	Upload upload = Upload.findById(id);
        String author;
        if(session.get("userId") == null) {
            author = "匿名";
        }
        else {
            String userId = session.get("userId");
            User tempUser = User.find("byUserid", userId).first();
            author = tempUser.name;
        }
    	if(validation.hasErrors()) {
    		List <Comment> comments = Comment.find("byUpload_id", id).from(0).fetch(10);
    		render("Uploads/showOneUpload.html",id,upload,comments);
    	}
    	upload.addComments(author, content);
    	flash.success("Thanks for posting %s", author);
    	showOneUpload(id);
    }
    
    public static void myUploads(int startPosition) {
        String userName = session.get("userName");
        String hql = "select u from Upload u where u.author=? order by u.postedAt desc";
        List<Upload> myuploads = Upload.find(hql, userName).from(startPosition*5).fetch(5);
        int totalUpload = myuploads.size();
        render(myuploads, startPosition, totalUpload);
    }

    public static void allUploads() {
        String userId = session.get("userId");
        User user = User.find("byUserid",userId).first();
        List<Upload> alluploads = Upload.findAll();
        if(User.find("byUserid", userId).<User>first().authority == 1) {
            render(alluploads);
        }
        else {
        }
    }

    public static void showAllUploads(int startPosition) {
        int totalUpload=Upload.findAll().size();
        String hql = "select u from Upload u order by u.hits desc";
        List<Upload> allUploads = Upload.find(hql).from(startPosition * 5).fetch(5);
        render(allUploads,startPosition,totalUpload);
    }

    public static void previousPage(int startPosition) {
        int totalUpload = Upload.findAll().size();
        if(startPosition == 0) {
            startPosition = startPosition;
        }
        else {
            startPosition = startPosition - 1;
        }
        showAllUploads(startPosition);
    }

    public static void nextPage(int startPosition) {
        int totalUpload = Upload.findAll().size();
        if(startPosition >= (totalUpload/5 + 0.4)-1) {
            startPosition = startPosition;
        }
        else {
            startPosition = startPosition + 1;
        }
        showAllUploads(startPosition);
    }

    public static void showOneUpload(Long id) {
        Upload upload = Upload.find("byId",id).first();
        upload.hits = upload.hits + 1;
        upload.save();
        Upload oneUpload = Upload.find("byId",id).first();
        int flag = 0;
        if(oneUpload.upUserId != null) {
            String upUserId[] = oneUpload.upUserId.split(",");
            for(int i = 0; i < upUserId.length; i++) {
                if(upUserId[i].equals(session.get("userId"))) {
                    flag = 1;
                    break;
                }
            }
        }
        List<Comment> existComments = Comment.find("byUpload_id",id).fetch();
        render(oneUpload,existComments, flag);
    }

    public static void deleteUpload(Long id) {
        if(User.find("byUserid", session.get("userId")).<User>first().authority == 1) {
            Upload existUpload = Upload.find("byId",id).first();
            List<Comment> existComments = Comment.find("byUpload_id",existUpload.id).fetch();
            existUpload.delete();
            existComments.clear();
            showAllUploads(0);
        }
        else {
        }
    }

    public static void editPage(Long id) {
        if(User.find("byUserid", session.get("userId")).<User>first().authority == 1) {
            Upload existUpload = Upload.find("byId",id).first();
            render(existUpload);
        }
        else {

        }
    }

    public static void editUpload(Long id, String title, String content) {
        if(User.find("byUserid", session.get("userId")).<User>first().authority == 1) {
            String message = "";
            Upload existUpload = Upload.find("byId",id).first();
            existUpload.title = title;
            existUpload.content = content;
            existUpload.save();
            index(message);
        }
        else {
            
        }
    }

    public static void myNext(int startPosition) {
        String userName = session.get("userName");
        int totalUpload = Upload.find("byAuthor", userName).fetch().size();
        if(startPosition >= (totalUpload/5 + 0.4)-1) {
            startPosition = startPosition;
        }
        else {
            startPosition = startPosition + 1;
        }
        myUploads(startPosition);
    }

    public static void myPrevious(int startPosition) {
        String userName = session.get("userName");
        int totalUpload = Upload.find("byAuthor", userName).fetch().size();
        if(startPosition == 0) {
            startPosition = startPosition;
        }
        else {
            startPosition = startPosition - 1;
        }
        myUploads(startPosition);
    }

    public static void up(Long userId, Long uploadId) {
        Upload upload = Upload.findById(uploadId);
        upload.upNum = upload.upNum + 1;
        upload.upUserId = upload.upUserId + "," + userId;
        upload.save();
        showOneUpload(uploadId);
    }
}
