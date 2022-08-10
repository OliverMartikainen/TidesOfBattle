package com.javaserver.models;

import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {

	private String username;
	private Boolean hasSword;
	private Map<String, Statistic> stats;
	
	public User() {
	}

	public User(String username, Boolean hasSword, Map<String, Statistic> stats) {
		this.username = username;
		this.hasSword = hasSword;
		this.stats = stats;
	}

	public User(String username, Boolean hasSword) {
		this(username, hasSword, Map.of(
			    "self", new Statistic(),
			    "against", new Statistic()
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

	public Map<String, Statistic> getStats() {
		return stats;
	}

	public void setStats(Map<String, Statistic> stats) {
		this.stats = stats;
	}
}
