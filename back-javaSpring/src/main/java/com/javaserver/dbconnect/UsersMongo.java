package com.javaserver.dbconnect;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.javaserver.models.User;
import com.javaserver.repository.UsersMongoRepository;

@Repository
public class UsersMongo implements UsersInterface {

	@Autowired
	private static UsersMongoRepository usersRepo;

	@Override
	public List<User> getUsers() {
		return usersRepo.findAll();
	}

	@Override
	public List<String> getUserNames() {
		List<User> users = usersRepo.findAll();
		return users.stream().map(User::getUsername).toList();
	}

	public User getUser(String username) throws NullPointerException {
		return usersRepo.findUserByName(username);
	}

	@Override
	public Boolean isUserValid(String username) {
		return this.getUser(username) != null; // null --> user doesnt exist in db so is invalid
	}

	@Override
	public Boolean isSwordUser(String username) {
		User user = this.getUser(username);
		if (user == null)
			return false;

		return user.getHasSword();
	}

	@Override
	public void updateUserStats(String username, List<String> selfCards, List<String> againstCards) {
		User user = getUser(username);
		if(user == null) {
			return;
		}
		
		user.increaseStats(selfCards, againstCards);
	}

	@Override
	public void updateSwordUser(String username) {
		User newSwordUser = this.getUser(username);
		User oldSwordUser = this.getSwordUser();

		if (newSwordUser == null) {
			return;			
		}
		
		if (oldSwordUser == null || oldSwordUser.isUserEquals(newSwordUser)) {
			//dont touch oldSwordUser, just update new in this case 
			newSwordUser.setHasSword(true);
			usersRepo.save(newSwordUser);
		} else {
			oldSwordUser.setHasSword(false);
			newSwordUser.setHasSword(true);
			usersRepo.saveAll(List.of(oldSwordUser, newSwordUser));
		}
	}

	@Override
	public User getSwordUser() throws NullPointerException {
		return usersRepo.findSwordUser();
	}
	
	@Override
	public String getSwordUserName() {
		User user = getSwordUser();
		if(user == null) {
			return "";
		} else {
			return user.getUsername();
		}
	}

	@Override
	public void addUser(String username) {
		User newUser = new User(username);
		usersRepo.save(newUser);
	}

	@Override
	public void resetStatsForAll() {
		List<User> usersReset = getUsers().stream().map(user -> {
			user.resetStats();
			return user;
		}).toList();

		usersRepo.saveAll(usersReset);
	}

}
