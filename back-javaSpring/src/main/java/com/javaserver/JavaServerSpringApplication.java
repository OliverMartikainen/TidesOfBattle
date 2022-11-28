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


	
	//TODO - static frontend hosting
}