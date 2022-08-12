package com.javaserver.dbconnect;

import java.util.List;

import com.javaserver.models.User;

public interface UsersInterface {

	public List<User> getUsers();
	
	public List<String> getUserNames();
	
	public User getUser(String username) throws NullPointerException;
	
	public Boolean isUserValid(String username);
	
	public Boolean isSwordUser(String username);
	
	public void updateUserStats(String username, List<String> selfCards, List<String> againstCards);
	
	public void updateSwordUser(String username);
	
	public User getSwordUser() throws NullPointerException;
	
	public String getSwordUserName();
	
	public void addUser(String username);
	
	public void resetStatsForAll();
	
}
