package com.javaserver.cache;

public class Card {
	private String cardName;
	private Integer cardIndex;
	private String cardOwner;
	
	public Card(String cardName, Integer cardIndex) {
		this.cardName = cardName;
		this.cardIndex = cardIndex;
		this.cardOwner = "";
	}
	
	public String getCardName() {
		return cardName;
	}
	public void setCardName(String cardName) {
		this.cardName = cardName;
	}
	public Integer getCardIndex() {
		return cardIndex;
	}
	public void setCardIndex(Integer cardIndex) {
		this.cardIndex = cardIndex;
	}
	public String getCardOwner() {
		return cardOwner;
	}
	public void setCardOwner(String cardOwner) {
		this.cardOwner = cardOwner;
	}
	
	
}
