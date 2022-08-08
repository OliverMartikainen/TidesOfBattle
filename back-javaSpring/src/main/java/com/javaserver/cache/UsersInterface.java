package com.javaserver.cache;

import java.util.List;

public interface UsersInterface {

	public List<String> getUsers();
	
	public Boolean isUserValid(String username);
	
	public Boolean isSwordUser(String username);
	
	public void updateUserStats(String username, List<String> selfCards, List<String> againstCards);
	
	public void updateSwordUser(String username);
	
	public String getSwordUser();
	
	public void addUser(String username);
	
	public void resetStatsForAll();
	
}
