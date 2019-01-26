package com.baeldung.websocket;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import org.aechack.model.SensorValue;

import com.google.gson.Gson;

// https://www.baeldung.com/java-websockets

public class MessageDecoder implements Decoder.Text<SensorValue> {
    @Override
    public SensorValue decode(String s) throws DecodeException {
        Gson gson = new Gson();
        SensorValue message = gson.fromJson(s, SensorValue.class);
        return message;
    }

    @Override
    public boolean willDecode(String s) {
        return (s != null);
    }

    @Override
    public void init(EndpointConfig endpointConfig) {
        // Custom initialization logic
    }

    @Override
    public void destroy() {
        // Close resources
    }
}
