package org.aechack;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.aechack.model.SensorValue;

import com.baeldung.websocket.MessageDecoder;
import com.baeldung.websocket.MessageEncoder;

@ServerEndpoint(value = "/temperature/{uid}", decoders = MessageDecoder.class, encoders = MessageEncoder.class)
public class TemperatureSensorDataEndPoint2 {
	private Session session;
	Random rand = new Random(System.currentTimeMillis());
	private static final Set<TemperatureSensorDataEndPoint2> clientEndpoints = new CopyOnWriteArraySet<>();

	private Map<String, Float> current_values = new HashMap<>();
	private Map<String, String> session_sensor = new HashMap<>();

	private void updateSensorValue(String sensor_uid) {
		Float val = current_values.getOrDefault(sensor_uid, 20f);
		val += rand.nextFloat() - 0.5f;		
		current_values.put(sensor_uid, val);
	}

	@OnOpen
	public void onOpen(Session session, @PathParam("uid") String sensor_uid) throws IOException, EncodeException {

		this.session = session;
		clientEndpoints.add(this);
		session_sensor.put(session.getId(), sensor_uid);

		while (true) {
			SensorValue sensorreading = new SensorValue();
			sensorreading.setFrom(sensor_uid);
			Float val = current_values.getOrDefault(sensor_uid, 20f);
			current_values.put(sensor_uid, val);
			updateSensorValue(sensor_uid);
			
			int r=rand.nextInt(100);
			if(Math.abs(r)>=95)
				val+=12;
			if(Math.abs(r)<=5)
				val-=12;
			
			sensorreading.setValue(val);
			//broadcast(sensorreading);
			try {
				session.getBasicRemote().sendObject(sensorreading);
			} catch (IOException | EncodeException e) {
				e.printStackTrace();
			}
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

	@OnMessage
	public void onMessage(Session session, SensorValue sensor_reading) throws IOException, EncodeException {
		String sensor_uid = session_sensor.get(session.getId());
		if (sensor_uid == null)
			return;
		Float fval = sensor_reading.getValue();
		current_values.put(sensor_uid, fval);
	}

	@OnClose
	public void onClose(Session session) throws IOException, EncodeException {
		clientEndpoints.remove(this);
	}

	@OnError
	public void onError(Session session, Throwable throwable) {
		// Do error handling here
	}

	private static void broadcast(SensorValue message) throws IOException, EncodeException {
		clientEndpoints.forEach(endpoint -> {
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
