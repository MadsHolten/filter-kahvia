package com.pfl.samples.jee7.websocket;


import java.io.StringReader;
import java.net.URI;
 
import javax.json.Json;
import javax.json.JsonObject;
 


public class TestClient {
 
    /**
     * main
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        final TestCLientClientEndpoint clientEndPoint = new TestCLientClientEndpoint(new URI("ws://10.2.61.134:8080/sensordata-0.0.1/co2/333"));
        clientEndPoint.addMessageHandler(new TestCLientClientEndpoint.MessageHandler() {
                    public void handleMessage(String message) {
                    	System.out.println(message);
                    }
                });
 
        while (true) {
            Thread.sleep(30000);
        }
    }
 
    
}