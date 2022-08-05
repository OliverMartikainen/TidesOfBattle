package com.javaserver.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController //instead of @Controller --> this sets @ResponseBody to each automatically (and some other assumptions done)
@RequestMapping("/users")
public class Users {

	@GetMapping("/usernames")
	public String getUsernames() {
		//return all usernames json (string array)
		
		return "todo";
	}

	@PostMapping("/login")
	public String login() {
	    //atm this just gives a token used to limit random crawlers from accessing the other endpoints
		//for that reason its POST instead of GET
		
		//gets String username in body, checks if its valid, creates JWT token & returns { username, token }
		return "todo";
	}

	@PostMapping("/add")
	public String addUser() {
		//String username in body, add it to users db
		//return 400 if user exists already, 204 if added
		
		return "todo";
	}

	@PostMapping("/changeSwordUser")
	public String setSwordUser(/*@RequestBody Book book*/) {
		//String newSwordUser (username) in body,
		//update user lists sword holder
		
		//emit SSE msg { msg: 'sword-change', username: newSwordUser, doneBy: username } --> doneby username who did request
		//return status 204
		return "todo";
	}

	@GetMapping("/stats")
	@ResponseBody //--> Spring Boot expects response body to be json/converts return object into json
	public String getStats() {
		//return all user info (frontend will display only the statistics part)
		return "todo";
	}

	@GetMapping("/resetStats")
	public String resetStats() {
		//reset all user stats, return 204
		return "todo";
	}
}