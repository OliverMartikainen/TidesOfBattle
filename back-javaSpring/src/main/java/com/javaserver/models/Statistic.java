package com.javaserver.models;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Statistic {
	private Map<String, Integer> stats = new HashMap<>();
	
	Statistic() {
		stats.put("zero", 0);
		stats.put("zero_skill", 0);
		stats.put("one_sword", 0);
		stats.put("one_tower", 0);
		stats.put("two", 0);
		stats.put("three", 0);
		stats.put("zero_skull", 0);
	}
	

	public int getCardCount(String cardName) throws NullPointerException {
		return stats.get(cardName);
	}
	
	public Map<String, Integer> getAllStats() {
		return stats;
	}
	
	
	public void updateStats(List<String> cards) {
		cards.forEach(this::updateSingleStat);
	}
	
	public void updateSingleStat(String cardName) {
		try {
			int oldCount = stats.get(cardName);			
			stats.replace(cardName, oldCount + 1);
		} catch (Exception e) {
			e.printStackTrace();
		}
				
	}
}
