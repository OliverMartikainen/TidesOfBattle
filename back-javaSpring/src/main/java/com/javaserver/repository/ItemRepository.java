package com.javaserver.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.javaserver.models.User;

public interface ItemRepository extends MongoRepository<User, String> {
    
    @Query("{name:'?0'}")
    User findItemByName(String name);
    
    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<User> findAll(String category);
    
    public long count();

}