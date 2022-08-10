package com.javaserver.controllers;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/cards")
public class Cards {
	@Autowired
	private Sse sseEmitter = new Sse();
	

	private void endCardSet() {
		//app.emit(SSE_EMMITTER, { msg: 'end', cards: allCards }) //send all card info to frontend
/*
 *     console.log('end cards')
    const allCards = await cards.getCards()
    cards.initCards() //refresh db cards
    app.emit(SSE_EMMITTER, { msg: 'end', cards: allCards }) //send all card info to frontend

    try {


        //update statistics for each player
        const allPlayerCards = allCards.filter(card => card.cardOwner !== '')

        const cardsByPlayer = allPlayerCards.reduce((obj, card) => {
            let ownerCards = obj[card.cardOwner]
            if (!ownerCards) {
                ownerCards = []
            }
            ownerCards.push(card.cardName)
            obj[card.cardOwner] = ownerCards
            return obj
        }, {})

        const players = Object.keys(cardsByPlayer)
        players.forEach(name => {
            const ownCards = cardsByPlayer[name]
            const otherPlayers = players.filter(n => n !== name)
            const othersCardsArrs = otherPlayers.map(n => cardsByPlayer[n])
            const otherCards = [].concat(...othersCardsArrs)

            users.updateUserStats(name, ownCards, otherCards)
        })
    } catch (error) {
        console.error(error)
    }
 */
	}

	private void checkForEnd() {
/*
 *   console.log('end check')
    console.time('check')
    const [allCards, allUsers] = await Promise.all([cards.getCards(), users.getUsers()])
    const userCards = allCards.filter(card => card.cardOwner !== '')

    if (userCards.length === 2) {
        //check if user who played has swords
        let swordUserPresent = false
        let swordUserName = ''
        userCards.forEach(card => {
            const username = card.cardOwner
            const user = allUsers.find(user => user.username === username)
            if (user.hasSword) {
                swordUserPresent = true
                swordUserName = username
            }
        })

        if (swordUserPresent) {
            app.emit(SSE_EMMITTER, { msg: 'waiting-sword', username: swordUserName })
        } else {
            endCardSet(app)
        }
        console.timeEnd('check')

        return
    }

    if (userCards.length >= 3) {
        const uniqueNames = userCards.reduce((obj, card) => {
            obj[card.cardOwner] = card.cardOwner
            return obj
        }, {})
        const uniqueCount = Object.keys(uniqueNames).length
        if (uniqueCount >= 3) {
            app.emit(SSE_EMMITTER, { msg: 'too-many-users', usernames: Object.keys(uniqueNames) })
        }

        endCardSet(app)
        console.timeEnd('check')

        return
    }
    console.timeEnd('check')
 * 
 */
	}

	@PostMapping("/select")
	public String selectCard(@RequestBody Map<String, Number> body) {
		
		Number cardIndex = body.get("cardIndex");
		// could be put
		// integer? string? cardIndex from body
		// selectCard( cardIndex, username)
		// return 400 "Invalid card" if invalid id/already selected

		// emit { msg: "select", cardOwner: username, cardIndex }
		// return 200 & card info

		
		String username = "abc"; //get requester username from jwt token/added to user info & request i think
		
		//this style limited to 10 entries --> this style no limit Map.ofEntries(entry("a", "b"), entry("c", "d"));
		
		//get card object in index --> return it
		
		
		sseEmitter.emitSseData(Map.of(
			    "msg", "select",
			    "cardOwner", username,
			    "cardIndex", cardIndex
			));
		
		checkForEnd();
		return "todo";
	}

	@GetMapping("/forceEnd")
	public String forceEnd() {
		// emit { msg: "forceEnd", username }

		String username = "abc";
		// end current card set (reset & store stats)
		sseEmitter.emitSseData(Map.of(
			    "msg", "forceEnd",
			    "username", username
			));
		
		endCardSet();
		// return 204
		return "todo";
	}

	@GetMapping("/nosword")
	public String chooseNosword() {
		// check requester is swordUser, if not, return 401 "You are not the sword user"

		// reset card set, emit { msg: "nosword", username }
		String username = "abc";
		sseEmitter.emitSseData(Map.of(
			    "msg", "select",
			    "username", username
			));
		
		endCardSet();
		// return 204
		return "todo";
	}

	@GetMapping("/initialLoad")
	public Map<String, Object> getInitialLoad() {
		// reset all user stats, return 204

		//get sword owner from users thing
		String swordOwner = "Hello";
		
		
		return Map.of(
			    "swordOwner", swordOwner,
			    "selectedCards", Map.of(
					    "ownCards", new ArrayList<>(),
					    "othersCards", new ArrayList<>()
					)
			);
		}
	}
