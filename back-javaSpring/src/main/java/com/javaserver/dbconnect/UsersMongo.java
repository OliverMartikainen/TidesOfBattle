package com.javaserver.dbconnect;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.javaserver.models.User;
import com.javaserver.repository.ItemRepository;

@Repository
public class UsersMongo implements UsersInterface  {
	@Autowired
	private ItemRepository usersRepo;
	
	@Override
	public List<String> getUserNames() {
		List<User> users = usersRepo.findAll();
		return users.stream().map(User::getUsername).toList();
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
