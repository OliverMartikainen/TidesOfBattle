package com.javaserver.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cards")
public class Cards {
	
	private void endCardSet() {
		
	}
	
	private void checkForEnd() {

	}
	
	@PostMapping("/select")
	public String selectCard() {
		//could be put
		//integer? string? cardIndex from body
		//selectCard( cardIndex, username)
		//return 400 "Invalid card" if invalid id/already selected
		
		//emit { msg: "select", cardOwner: username, cardIndex }
		//return 200 & card info
		
		
		checkForEnd();
		return "todo";
	}
	
	@GetMapping("/forceEnd")
	public String forceEnd() {
		//emit { msg: "forceEnd", username }
		
		//end current card set (reset & store stats)
		endCardSet();
		//return 204
		return "todo";
	}
	
	@GetMapping("/nosword")
	public String chooseNosword() {
		//check requester is swordUser, if not, return 401 "You are not the sword user"
		
		//reset card set, emit { msg: "nosword", username }
		endCardSet();
		//return 204
		return "todo";
	}
	
	@GetMapping("/initialLoad")
	public String getInitialLoad() {
		//reset all user stats, return 204
		
		//return { String swordOwner (username), selectedCards (index list?) }
		return "todo";
	}
	
	@GetMapping("/sse")
	public String connectToSSE() {
		//reset all user stats, return 204
		return "todo";
	}

}
