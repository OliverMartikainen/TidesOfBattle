package com.javaserver.models;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("cards")
public class Card {
	@Id
	private String cardIndexString;
	private int cardIndex;
	private String cardName;
	private String cardOwner;
	
	public Card(String cardName, int cardIndex) {
		this.cardName = cardName;
		this.cardIndex = cardIndex;
		this.cardIndexString = cardIndex+"";
		this.cardOwner = "";
	}
	
	public String getCardName() {
		return cardName;
	}
	public void setCardName(String cardName) {
		this.cardName = cardName;
	}
	public int getCardIndex() {
		return cardIndex;
	}
	public void setCardIndex(int cardIndex) {
		this.cardIndex = cardIndex;
		this.cardIndexString = cardIndex+"";
	}
	public String getCardOwner() {
		return cardOwner;
	}
	public void setCardOwner(String cardOwner) {
		this.cardOwner = cardOwner;
	}
	
	//if this wasnt a static function the return value would be added to JSON object
	//JSON converter takes everything get..() functions results? IDK. private cardIndexString is not taken
	public static Map<String, Object> getCensoredCardData(Card card) {
		return Map.of(
				"cardIndex", card.getCardIndex(),
				"cardOwner", card.getCardOwner()
				);
	}

	
}
