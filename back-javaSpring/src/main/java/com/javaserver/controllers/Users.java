package com.javaserver.controllers;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.javaserver.cache.UsersInterface;
import com.javaserver.cache.UsersMongo;
import com.javaserver.security.JwtTokenUtil;

@RestController // instead of @Controller --> this sets @ResponseBody to each automatically (and
				// some other assumptions done)
@RequestMapping("/api/users")
public class Users {

	@Autowired
	private JwtTokenUtil jwtUtil;
	private UsersInterface userCache = new UsersMongo();

	@GetMapping("/usernames")
	public String getUsernames() {
		// return all usernames json (string array)

		return "todo";
	}

	@GetMapping("/login")
	public String loginG() {
		return "LOGGED IN";
	}

	@PostMapping("/login")
	public Map<String, String> login(@RequestBody Map<String, String> body) {
		
		String username = body.get("username");
		// atm this just gives a token used to limit random crawlers from accessing the
		// other endpoints
		// for that reason its POST instead of GET

		// gets String username in body, checks if its valid, creates JWT token &

		if (Boolean.FALSE.equals(userCache.isUserValid(username))) {
			return Collections.singletonMap("error", "INVALID USERNAME");
		}

		
		// Generating JWT
		String token = jwtUtil.generateToken(username);

		Map<String, String> ab = new HashMap<>();
		ab.put("token", token);
		ab.put("username", username);
		
		
		return ab;
	}

	@PostMapping("/add")
	public String addUser() {
		// String username in body, add it to users db
		// return 400 if user exists already, 204 if added

		return "todo";
	}

	@PostMapping("/changeSwordUser")
	public String setSwordUser(/* @RequestBody Book book */) {
		// String newSwordUser (username) in body,
		// update user lists sword holder

		// emit SSE msg { msg: 'sword-change', username: newSwordUser, doneBy: username
		// } --> doneby username who did request
		// return status 204
		return "todo";
	}

	@GetMapping("/stats")
	@ResponseBody // --> Spring Boot expects response body to be json/converts return object into
					// json
	public String getStats() {
		// return all user info (frontend will display only the statistics part)
		return "todo";
	}

	@GetMapping("/resetStats")
	public String resetStats() {
		// reset all user stats, return 204
		return "todo";
	}
}