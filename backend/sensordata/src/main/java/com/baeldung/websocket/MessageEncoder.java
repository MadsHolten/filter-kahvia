package com.baeldung.websocket;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;

import org.aechack.model.SensorValue;

import com.google.gson.Gson;

// https://www.baeldung.com/java-websockets

public class MessageEncoder implements Encoder.Text<SensorValue> {
    @Override
    public String encode(SensorValue message) throws EncodeException {
        Gson gson = new Gson();
        String json = gson.toJson(message);
        return json;
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
    }

    @Override
    public void destroy() {
    }
}
