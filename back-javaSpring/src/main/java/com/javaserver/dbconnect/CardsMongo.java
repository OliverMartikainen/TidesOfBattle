package com.javaserver.dbconnect;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.javaserver.models.Card;
import com.javaserver.models.CardSet;

@Repository
public class CardsMongo implements CardsInterface {
	@Autowired
	private MongoRepository<Card, String> cardsRepo;
	
	@Override
	public List<Card> initCards() {
		List<Card> cards = CardSet.mixedPackCreator();
		cardsRepo.saveAll(cards);
		return cards;
	}

	@Override
	public Card selectCard(int index, String owner) throws NullPointerException {
		Card card = getCard(index).orElse(null);
		if(card == null) return null;
		
		if(!card.getCardOwner().equals("")) {
			System.out.println(card.getCardOwner());
			return null;
		}
		
		card.setCardOwner(owner);
	
		return cardsRepo.save(card);
	}
	
	@Override
	public Optional<Card> getCard(int index) {
		Optional<Card> c = cardsRepo.findById(index + "");
		System.out.println(c + " " + index);
		return c;
	}

	@Override
	public List<Card> getCards() {
		List<Card> cards = cardsRepo.findAll();
		
		//TODO - can cause issues in connection edge cases or somewhere else --> also doesnt emit initLoad to frontends.
		if(cards.isEmpty()) {
			cards = initCards();
		}
		
		return cards;
	}
	
	@Override
	public List<Card> getCardsWithOwners() {
		List<Card> cards = getCards();
		return cards.stream().filter(card -> !card.getCardOwner().isBlank()).toList();
	}
	
	@Override
	public List<String> getCardOwnerNames() {
		return getCardsWithOwners().stream().map(Card::getCardOwner).toList();
	}

	@Override
	public Map<String, List<Card>> getSelectedCards(String owner) {
		List<Card> cards = getCardsWithOwners();
		
		List<Card> ownCards = cards.stream().filter(card -> card.getCardOwner().equals(owner)).toList();
		List<Card> othersCards = cards.stream().filter(card -> !card.getCardOwner().equals(owner)).toList();
		
		return Map.of(
				"ownCards", ownCards,
				"othersCards", othersCards
				);
	}

}
