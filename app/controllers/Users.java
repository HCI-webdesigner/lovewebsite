package controllers;

import models.*;
import play.mvc.Controller;
import java.security.MessageDigest;
import play.data.validation.Required;
import play.cache.Cache;
import play.libs.Codec;
import play.libs.Images;
import notifiers.*;
import play.libs.Mail;
import play.data.validation.MinSize;
import play.data.validation.Required;
import java.util.List;

public class Users extends Controller {
	private final static String[] hexDigits = {"0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"};
	private final static char[] passTable = {'0', '1','2','3','4','5','6','7','8','9'};
	private final static String[] hash = {"qq.com", "gmail.com", "sina.com", "163.com", "126.com", "yeah.net", "sohu.com", "tom.com"
											, "sogou.com", "139.com", "hotmail.com", "live.cn", "live.com.cn", "189.com", "yahoo.com.cn"
											, "yahoo.cn", "foxmail.coom"};
	private final static String[] host = {"http://mail.qq.com", "http://mail.google.com", "http://mail.sina.com.cn", "http://mail.163.com"
											, "http://mail.126.com", "http://www.yeah.net/", "http://mail.sohu.com/", "http://mail.tom.com/"
											, "http://mail.sogou.com/", "http://mail.10086.cn/", "http://www.hotmail.com", "http://login.live.com/"
											, "http://login.live.cn/", "http://login.live.com.cn", "http://webmail16.189.cn/webmail/", "http://mail.cn.yahoo.com/"
											, "http://mail.cn.yahoo.com/", "http://www.foxmail.com"};
	public static void userMessage() {
		String userId = session.get("userId");
		User existUser = User.find("byUserid",userId).first();
		render(existUser);
	}

	public static void login(String message) {
		if(message == null) {
			message = "";
		}
		render(message);
	}

	public static void editPasswordIndex() {
		render();
	}

	public static void editPassword(String userId, String previous, String newpass, String newpass2) {
		User existUser = User.find("byUserid",userId).first();
		previous = encodeByMD5(previous);
		newpass = encodeByMD5(newpass);
		newpass2 = encodeByMD5(newpass2);
		if(previous.equals(existUser.password)) {
			if(newpass2.equals(newpass)) {
				existUser.password = newpass;
				existUser.save();
				String message = "edit sucess";
				session.clear();
				Application.index();
			}
			else {
				String error = "ERROR";
				render(error);
			}
		}
		else {
			String error = "Not corret.";
			render(error);
		}
	}

	public static void checkLogin(String email, String password) {
		password = encodeByMD5(password);
		if(User.connect(email, password) != null) {
			User tempUser = User.find("byEmail",email).first();
			if(tempUser.validated == 0) {
				Application.index();
			}
			String userId = tempUser.userid;
			session.put("userId",userId);
			session.put("userName", tempUser.name);
			session.put("authority", tempUser.authority);
			if(tempUser.authority == 1) {
				Admin.index();
			}else {
				Application.index();
			}
		}
		else {
			login("帐号或密码错误");
		}
	}

	public static void captcha(String id) {
	    Images.Captcha captcha = Images.captcha();
	    String code = captcha.getText("#74b157");
	    Cache.set(id, code, "10mn");
	    renderBinary(captcha);
	}

	public static void getPassword(String result) {
		if(result == null) {
			result = "";
	    }
	    String randomID = Codec.UUID();
	    render(randomID, result);
	}

	public static void findPassword(String email, String code, String randomID) {
		validation.equals(
	        code, Cache.get(randomID)
	    ).message("Invalid code. Please type it again");
	    if(validation.hasErrors()) {
	    	String result = "验证失败";
	        Users.getPassword(result);
	    }
	    char[] newPass = new char[6];
	    for(int i = 0; i < 6; i++) {
	    	newPass[i] = passTable[(int)(Math.random()*10)];
	    }
	    
	    Cache.delete(randomID);
		String newPassStr = new String(newPass);
		String oldPassStr = newPassStr;
	    newPassStr = encodeByMD5(newPassStr);
	    updatePassword(email, newPassStr, oldPassStr);
	}

	public static void updatePassword(String email, String newPass, String oldPassStr) {
		User requestUser = User.find("byEmail", email).first();
		requestUser.password = newPass;
		requestUser.save();
		String subject = "";
		Email latestMail = new Email(email, subject, newPass);
		String mailContent = oldPassStr;
        Mails.sendOut(email, "new password", oldPassStr);
        latestMail.save();

		Application.index();
	}

	public static void registerPage(String message, String userid, String name, String email, String phone) {
		render(message, userid, name, email, phone);
	}

	public static void register(String userid, String name, String password, String pass,
			String email, String sex, String college, String phone) {
		List<User> uid = User.find("order by userid desc").from(0).fetch();
		for(int i = 0;i<uid.size();i++) {
			String userId = uid.get(i).userid;
			String existEmail = uid.get(i).email;
			if(userId.equals(userid) && existEmail.equals(email)) {
				registerPage("此学号和邮箱已注册", "", name, "", phone);
			}
			else if(userId.equals(userid)) {
				registerPage("此学号已注册", "", name, email, phone);
			}
			else if(existEmail.equals(email)) {
				registerPage("此邮箱已注册", userid, name, "", phone);
			}
		}
		
		password = encodeByMD5(password);
		String validatedCode = encodeByMD5(email);
		User user = new User(userid, name, password, email, sex, 0, college, phone, 0, validatedCode).save();
		String mailContent = "请点击以下链接进行验证" + " http://localhost:9000/users/validated?email=" + encodeByMD5(email);			
		Email latestMail = new Email(email, "用户验证", mailContent);
        Mails.sendOut(email, "用户验证", mailContent);
		latestMail.save();
		String hostName = email.split("@")[1];
		int hostIndex = 0;
		for(int i = 0; i < hash.length; i++) {
			if(hash[i].equals(hostName)) {
				hostIndex = i;
				break;
			}
		}
		String emailUrl = host[hostIndex];
		render(emailUrl);
	}

	public static void validated(String email) {
		List<User> users = User.findAll();
		for(int i = 0; i < users.size(); i++) {
			if(users.get(i).validatedCode.equals(email)) {
				User tempUser = User.find("byUserid", users.get(i).userid).first();
				tempUser.validated = 1;
				tempUser.save();
				render();
				break;
			}
		}
	}

	public static void logout() {
		session.clear();
		Application.index();
	}

	public static String encodeByMD5(String str){ 
        if (str!=null) { 
            try { 
                //创建具有指定算法名称的信息摘要 
                MessageDigest md5 = MessageDigest.getInstance("MD5"); 
                //使用指定的字节数组对摘要进行最后更新，然后完成摘要计算 
                byte[] results = md5.digest(str.getBytes()); 
                //将得到的字节数组变成字符串返回  
                String result = byteArrayToHexString(results); 
                return result; 
            } catch (Exception e) { 
                e.printStackTrace(); 
            } 
        } 
        return null; 
    }
	
	public static String byteArrayToHexString(byte[] b){ 
        StringBuffer resultSb = new StringBuffer(); 
        for(int i=0;i<b.length;i++){ 
            resultSb.append(byteToHexString(b[i])); 
        } 
        return resultSb.toString(); 
    }
	
	public static String byteToHexString(byte b){ 
        int n = b; 
        if(n<0) 
        n=256+n; 
        int d1 = n/16; 
        int d2 = n%16; 
        return hexDigits[d1] + hexDigits[d2]; 
    }//加密

    public static boolean checkEmail (String email) {
		if (!email.matches("[\\w\\.\\-]+@([\\w\\-]+\\.)+[\\w\\-]+")) {
			return false;
		}
		return true;
	}

}
