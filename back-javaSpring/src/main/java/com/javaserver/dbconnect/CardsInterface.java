package com.javaserver.dbconnect;

import java.util.List;

import com.javaserver.models.Card;
import com.javaserver.models.CardSet;

public interface CardsInterface {
	public static final CardSet CardSet = new CardSet();
	
	public Boolean initCards();
	
	public Card selectCard(Integer index, String owner);
	
	public List<Card> getCards();
	
	public List<Card> getSelectedCards(String owner);
}
