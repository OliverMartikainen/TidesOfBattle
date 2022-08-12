package com.javaserver.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.javaserver.models.User;

public interface UsersMongoRepository extends MongoRepository<User, String> {

	//get all users
    //@Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    //List<User> findAll(String category);
    
    //get single user by name //fineOne
    @Query("{ username:'?0' }")
    User findUserByName(String name) throws NullPointerException;
    
    @Query("{ hasSword: true }")
    User findSwordUser() throws NullPointerException;
    
    //room to improve --> could do more elimination in Query and only return necessary data (atm returing all user info instead of only 1 required field)
}

/*@Component
public class CustomItemRepositoryImpl implements CustomItemRepository {

@Autowired
MongoTemplate mongoTemplate;

public void updateItemQuantity(String name, float newQuantity) {
    Query query = new Query(Criteria.where("name").is(name));
    Update update = new Update();
    update.set("quantity", newQuantity);
    
    UpdateResult result = mongoTemplate.updateFirst(query, update, GroceryItem.class);
    
    if(result == null)
        System.out.println("No documents updated");
    else
        System.out.println(result.getModifiedCount() + " document(s) updated..");

}

}*/