package com.javaserver.controllers;

import java.util.ArrayList;
import java.util.HashSet;
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
import org.springframework.web.bind.annotation.RestController;

import com.javaserver.dbconnect.CardsMongo;
import com.javaserver.dbconnect.UsersMongo;
import com.javaserver.models.Card;
import com.javaserver.models.CardSet;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/cards")
public class Cards {
	@Autowired
	private Sse sseEmitter;
	
	@Autowired
	private UsersMongo usersRepo;
	
	@Autowired
	private CardsMongo cardsRepo;
	

	private void endCardSet() {
		
		List<Card> oldCards = cardsRepo.getCards();
		List<Card> cardsWithOwners = cardsRepo.getCardsWithOwners();
		
		//mix stored cards info
		cardsRepo.initCards();
		
		//send all old info to frontends
		sseEmitter.emitSseData(Map.of(
			    "msg", "end",
			    "cards", oldCards
			));
		

		//users who had cards
		List<String> usersnames = cardsWithOwners.stream().map(Card::getCardOwner).toList();
		List<String> uniqueNames = new ArrayList<>(new HashSet<>(usersnames));
		
		uniqueNames.forEach(name -> {
			//users own cards
			usersRepo.updateUserStats(
					name, 
					CardSet.getCardsAsNamesOnly(CardSet.getUsersCards(cardsWithOwners, name)), 
					CardSet.getCardsAsNamesOnly(CardSet.getNotUsersCards(cardsWithOwners, name))
				);
		});
	}

	private Boolean checkForEnd() {
		
		List<Card> ownedCards = cardsRepo.getCardsWithOwners();
		String swordUser = usersRepo.getSwordUserName();
		
		Boolean endGame = false;
		
		//if less than 2 cards selected, keep playing.
		
		if(ownedCards.size() == 2) {
			Boolean swordUserPlaying = cardsRepo.getCardOwnerNames().contains(swordUser);
			
			if(Boolean.TRUE.equals(swordUserPlaying)) {
				//we need sword user to decide if they play 3rd card or not (so select card or press "nosword"
				sseEmitter.emitSseData(Map.of(
					    "msg", "waiting-sword",
					    "username", swordUser
					));
				
			} else {
				endGame = true;
				endCardSet();
			}
			
		
		}
		
		else if(ownedCards.size() == 3) {
			List<String> cardOwnersNames = cardsRepo.getCardOwnerNames();
			List<String> uniqueNames = new ArrayList<>(new HashSet<>(cardOwnersNames));
			
			if(uniqueNames.size() != 2) {
				System.err.println("INVALID NUMBER OF PLAYERS SELECTED CARDS: " + uniqueNames.size());
				//doesnt trigger anything, mainly for error detection.
				sseEmitter.emitSseData(Map.of(
					    "msg", "too-many-users",
					    "usernames", uniqueNames.toString()
					));
			}
			
			endGame = true;
			endCardSet();
		
		}
		
		else if(ownedCards.size() > 3) {
			//too many, end set and idk
			System.err.println("TOO MANY CARDS WERE SELECTED");
			endGame = true;
			endCardSet();
			
		}
		return endGame;
	}

	
	//TODO - select card doesnt look at how many cards have been selected (this is done in UI side)
	@PostMapping("/select")
	public ResponseEntity<Map<String, Object>> selectCard(Authentication auth, @RequestBody Map<String, Integer> body) {
		String username = auth.getName();
		int cardIndex = body.get("cardIndex");

		if (Boolean.FALSE.equals(usersRepo.isUserValid(username))) {
			return ResponseEntity.status(400).body(Map.of("error", "INVALID USER"));
		}
		
		Card selectedCard = cardsRepo.selectCard(cardIndex, username);
		if(selectedCard == null) {
			return ResponseEntity.status(400).body(Map.of("error", "INVALID CARD"));
		}	
		
		sseEmitter.emitSseData(Map.of(
			    "msg", "select",
			    "cardOwner", username,
			    "cardIndex", cardIndex
			));
		
		//workaround --> makes checkForEnd happen after the "select" response is sent. Better ways to implement, TODO improve?
		new Thread(() -> {
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				e.printStackTrace();
				Thread.currentThread().interrupt();
			}
			checkForEnd();
		}).start();
		

		return ResponseEntity.status(200).body(Map.of("card", selectedCard));			
	}

	@GetMapping("/forceEnd")
	public ResponseEntity<String> forceEnd(Authentication auth) {
		// end current card set (reset & store stats)
		sseEmitter.emitSseData(Map.of(
			    "msg", "forceEnd",
			    "username", auth.getName()
			));
		
		endCardSet();
		return ResponseEntity.status(204).body("OK");
	}

	@GetMapping("/nosword")
	public ResponseEntity<String> chooseNosword(Authentication auth) {
		String username = auth.getName();
		
		if(Boolean.FALSE.equals(usersRepo.isSwordUser(username))) {
			return ResponseEntity.status(401).body("You are not the sword user");
		}
		
		sseEmitter.emitSseData(Map.of(
			    "msg", "nosword",
			    "username", username
			));
		
		endCardSet();
		return ResponseEntity.status(204).body("OK");
	}

	@GetMapping("/initialLoad")
	public Map<String, Object> getInitialLoad(Authentication authentication) {
		String username = authentication.getName();	
		
		Map<String, List<Card>> selectedCards = cardsRepo.getSelectedCards(username);
		
		List<Map<String, Object>> othersCardsCensored = selectedCards.get("othersCards").stream().map(Card::getCensoredCardData).toList();
		
		return Map.of(
			    "swordOwner", usersRepo.getSwordUserName(),
			    "selectedCards", Map.of(
					    "ownCards", selectedCards.get("ownCards"),
					    "othersCards", othersCardsCensored
					)
			);
		}
	}
