package com.javaserver.cache;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.javaserver.cache.Card;

public final class CardSet {
	private static final HashMap<String, Integer> CardSetInfo = new HashMap<>();

	protected CardSet() {
		CardSetInfo.put("zero", 8);
		CardSetInfo.put("zero_skull", 2);
		CardSetInfo.put("one_sword", 4);
		CardSetInfo.put("one_tower", 4);
		CardSetInfo.put("two", 4);
		CardSetInfo.put("three", 2);
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
