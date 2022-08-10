package com.javaserver.controllers;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController

public class Sse {

	private final CopyOnWriteArrayList<SseEmitter> emitters = new CopyOnWriteArrayList<>();

	@GetMapping(path = "/api/cards/sse", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public SseEmitter connectToSSE(HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-store");
		
		SseEmitter emitter = new SseEmitter(0L);

		this.emitters.add(emitter);
		
		emitter.onCompletion(() -> this.emitters.remove(emitter));
		emitter.onTimeout(() -> this.emitters.remove(emitter));
		
		return emitter;
	}

	public void emitSseData(Object emittedObject) {
		try {
			emitters.forEach(emitter -> {
				try {
					emitter.send(emittedObject);
				} catch (IOException e) {
					//emitter connection doesnt work --> remove it from active emit list.
					this.emitters.remove(emitter);
				}
			});			
		} catch (IllegalStateException e) {
			//caused by client disconnecting and trying to emit to recently disconnected client at the same moment.
			//can be caught and ignored
		}

	}
}
