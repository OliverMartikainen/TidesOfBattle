package com.javaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableMongoRepositories
@RestController
public class JavaServerSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaServerSpringApplication.class, args);
	}

	@GetMapping("/")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name, @RequestParam(value = "name2", defaultValue = "World2") String name2) {
		return String.format("Helloff %s! %s2aa", name, name2);
	}
	
	//TODO - static frontend hosting
}