package com.javaserver.dbconnect;

import java.util.List;

import com.javaserver.models.User;

public class UsersPostgres implements UsersInterface {

	@Override
	public List<User> getUsers() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<String> getUserNames() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public User getUser(String username) throws NullPointerException {
		// TODO Auto-generated method stub
		return null;
	}


	@Override
	public Boolean isUserValid(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean isSwordUser(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateUserStats(String username, List<String> selfCards, List<String> againstCards) {
		// TODO Auto-generated method stub

	}

	@Override
	public void updateSwordUser(String username) {
		// TODO Auto-generated method stub

	}

	@Override
	public User getSwordUser() throws NullPointerException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addUser(String username) {
		// TODO Auto-generated method stub

	}

	@Override
	public void resetStatsForAll() {
		// TODO Auto-generated method stub

	}

	@Override
	public String getSwordUserName() {
		// TODO Auto-generated method stub
		return null;
	}

}
