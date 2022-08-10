package com.javaserver.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

//This class should be used to create new cardstacks called in "controllers/Cards.java" endSet phase


public final class CardSet {
	private static final Map<String, Integer> CardSetInfo = Map.of(
			"zero", 8,
			"zero_skull", 2,
			"one_sword", 4,
			"one_tower", 4,
			"two", 4,
			"three", 2
		);
	
	public CardSet() {
	}

	public static List<Card> organizedPackCreator() {
		List<Card> newPack = new ArrayList<>();

		CardSetInfo.forEach((cardName, count) -> {
			for (Integer i = 0; i < count; i++) {
				newPack.add(new Card(cardName, i));
			}
		});

		return newPack;
	}

	public static List<Card> mixedPackCreator() {
		List<Card> organizedPack = organizedPackCreator();
		List<Card> mixedPack = new ArrayList<>();

		Integer maxPackSize = organizedPack.size();
		for (Integer i = 0; i < maxPackSize; i++) {
			// choose randomly 1 card that is still left in pack
			Long randNumb = Math.round(Math.random() * organizedPack.size());
			Integer randNumbInteger = randNumb.intValue();

			Card pickedCard = organizedPack.get(randNumbInteger);
			organizedPack.remove(randNumbInteger);
			
			mixedPack.add(new Card(pickedCard.getCardName(), i));
		}

		return mixedPack;
	}
}
