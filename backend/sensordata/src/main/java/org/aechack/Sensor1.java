package org.aechack;

import java.io.IOException;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.aechack.model.SensorValue;

import com.baeldung.websocket.MessageDecoder;
import com.baeldung.websocket.MessageEncoder;

@ServerEndpoint(value = "/sensor1", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
public class Sensor1 {
	private Session session;
	Random rand = new Random(System.currentTimeMillis());
	private static final Set<Sensor1> chatEndpoints = new CopyOnWriteArraySet<>();

	private float current_temperature = 20;

	@OnOpen
	public void onOpen(Session session) throws IOException, EncodeException {

		this.session = session;
		chatEndpoints.add(this);

		while (true) {
			SensorValue message = new SensorValue();
			message.setFrom("sensor1");
			current_temperature+=rand.nextFloat()-0.5f;
			message.setValue(current_temperature);
			broadcast(message);
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	@OnMessage
	public void onMessage(Session session, SensorValue message) throws IOException, EncodeException {
		message.setFrom("");
		broadcast(message);
	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {
		chatEndpoints.remove(this);
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		// Do error handling here
	}

	private static void broadcast(SensorValue message) throws IOException, EncodeException {
		chatEndpoints.forEach(endpoint -> {
			synchronized (endpoint) {
				try {
					endpoint.session.getBasicRemote().sendObject(message);
				} catch (IOException | EncodeException e) {
					e.printStackTrace();
				}
			}
		});
	}

}
