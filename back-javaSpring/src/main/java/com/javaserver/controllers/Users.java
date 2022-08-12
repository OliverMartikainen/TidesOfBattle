package com.javaserver.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.javaserver.dbconnect.UsersMongo;
import com.javaserver.models.User;
import com.javaserver.security.JwtTokenUtil;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController // instead of @Controller --> this sets @ResponseBody to each automatically (and
				// some other assumptions done)
@RequestMapping("/api/users")
public class Users {
	
	@Autowired
	private Sse sseEmitter;
	
	@Autowired
	private UsersMongo usersRepo;
	
	@Autowired
	private JwtTokenUtil jwtUtil;
	
	private static final String USERNAME = "username";
	private static final String ERROR = "error";
	
	@GetMapping("/usernames")
	public List<String> getUsernames() {
		return usersRepo.getUserNames();
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> body) {
		String username = body.get(USERNAME);

		if (Boolean.FALSE.equals(usersRepo.isUserValid(username))) {
			return ResponseEntity.status(401).body(Map.of(ERROR, "INVALID USERNAME"));
		}
		
		// Generating JWT
		String token = jwtUtil.generateToken(username);
		
		return ResponseEntity.status(200).body(Map.of(
			    "token", token,
			    USERNAME, username
			));
	}

	@PostMapping("/add")
	public ResponseEntity<Map<String, String>> addUser(@RequestBody Map<String, String> body) {
		String username = body.get(USERNAME);

		if(Boolean.TRUE.equals(usersRepo.isUserValid(username))) {
			return ResponseEntity.status(400).body(Map.of(ERROR, "USERNAME ALREADY EXISTS"));
		}
		
		usersRepo.addUser(username);

		return ResponseEntity.status(204).body(null);
	}

	@PostMapping("/changeSwordUser")
	public ResponseEntity<Object> setSwordUser(Authentication authentication, @RequestBody Map<String, String> body) {
		String newSwordUsername = body.get(USERNAME);
		
		if(Boolean.FALSE.equals(usersRepo.isUserValid(newSwordUsername))) {
			return ResponseEntity.status(400).body(Map.of(ERROR, "INVALID USERNAME"));
		}

		usersRepo.updateSwordUser(newSwordUsername);
				
		sseEmitter.emitSseData(Map.of(
			    "msg", "sword-change",
			    USERNAME, newSwordUsername,
			    "doneBy", authentication.getName()
			));
		
		return ResponseEntity.status(204).body(null);
	}

	@ResponseBody // --> Spring Boot expects response body to be json/converts return object into
	@GetMapping("/stats")
	public List<User> getStats() {	
		return usersRepo.getUsers();
	}

	@GetMapping("/resetStats")
	public ResponseEntity<Object> resetStats() {

		usersRepo.resetStatsForAll();
		return ResponseEntity.status(204).body(null);
	}
}