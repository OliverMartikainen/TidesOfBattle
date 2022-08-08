package com.javaserver.cache;

import java.util.List;

public interface CardsInterface {
	static final CardSet CardSet = new CardSet();
	
	public Boolean initCards();
	
	public Card selectCard(Integer index, String owner);
	
	public List<Card> getCards();
	
	public List<Card> getSelectedCards(String owner);
}
