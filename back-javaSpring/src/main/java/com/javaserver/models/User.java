package com.javaserver.models;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
	@Id
	private String username;
	private Boolean hasSword;
	private Map<String, Statistic> stats;
	
	private static final String AGAINST = "against";
	private static final String SELF = "self";
	
	public User() {
	}

	public User(String username, Boolean hasSword, Map<String, Statistic> stats) {
		this.username = username;
		this.hasSword = hasSword;
		this.stats = stats;
	}

	public User(String username, Boolean hasSword) {
		this(username, hasSword, Map.of(
				SELF, new Statistic(),
			    AGAINST, new Statistic()
			));
	}

	public User(String username) {
		this(username, false);
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Boolean getHasSword() {
		return hasSword;
	}

	public void setHasSword(Boolean hasSword) {
		this.hasSword = hasSword;
	}
	
	public void toggleHasSword() {
		this.hasSword = !this.hasSword;
	}

	public Map<String, Statistic> getStats() {
		return stats;
	}

	public void setStats(Map<String, Statistic> stats) {
		this.stats = stats;
	}
	
	public void increaseStats(List<String> self, List<String> against) {
		this.stats.get(SELF).updateStats(self);
		this.stats.get(AGAINST).updateStats(against);
	}
	
	public void resetStats() {
		this.stats = Map.of(
				SELF, new Statistic(),
			    AGAINST, new Statistic()
			);
	}
	
	@Override
	public String toString() {
		return String.format("username: %s | hasSword: %s", this.username, this.hasSword);
	}
	
	//didnt want to spend time overriding basic equals & hash methods, quick workaround.
	public Boolean isUserEquals(User user) {
		return this.getUsername().equals(user.getUsername());
	}
}
