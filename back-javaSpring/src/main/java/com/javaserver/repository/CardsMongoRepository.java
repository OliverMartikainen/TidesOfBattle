package com.javaserver.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.javaserver.models.Card;

public interface CardsMongoRepository extends MongoRepository<Card, String> {

	
	
	//get all users
    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<Card> findAll(String category);
    
    //get single user by name //fineOne
    @Query("{name:'?0'}")
    Card findCardByIndex(String name);
    

    //delete all (or replace all...)

    //add all
    
    //find one and update
    
    //
}
