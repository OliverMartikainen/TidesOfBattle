package com.javaserver.cache;

import java.util.List;

public class UsersMongo implements UsersInterface {

	@Override
	public List<String> getUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Boolean isUserValid(String username) {
		// TODO Auto-generated method stub
		return true;
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
	public String getSwordUser() {
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

}
