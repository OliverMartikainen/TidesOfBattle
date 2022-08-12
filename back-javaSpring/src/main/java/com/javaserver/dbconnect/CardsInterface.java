package com.javaserver.dbconnect;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.javaserver.models.Card;

public interface CardsInterface {
	
	public List<Card> initCards();
	
	public Card selectCard(int index, String owner);
	
	public Optional<Card> getCard(int index);
	
	public List<Card> getCards();
	
	public List<Card> getCardsWithOwners();
	
	public List<String> getCardOwnerNames();
	
	public Map<String, List<Card>> getSelectedCards(String owner);
}
