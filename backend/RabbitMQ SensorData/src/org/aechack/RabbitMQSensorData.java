package org.aechack;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class RabbitMQSensorData {
	private static final ConnectionFactory factory = new ConnectionFactory();
	private static final Random rand = new Random(System.currentTimeMillis());
	private static Connection connection;

	private Channel channel;
	private float current_value = 0;
	private final String channel_name;
	private final boolean isTemperature;
	static {
		factory.setHost("localhost");
		factory.setPort(5672);
		try {
			connection = factory.newConnection();
		} catch (IOException | TimeoutException e) {
			e.printStackTrace();
		}
	}

	public RabbitMQSensorData(boolean isTemperature, String channel_name, float initial_value) {
		this.current_value = initial_value;
		this.channel_name = channel_name;
		this.isTemperature = isTemperature;

		try {
			channel = connection.createChannel();
			channel.queueDeclare(channel_name, false, false, false, null);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	long counter=0;

	public void update() {
		counter++;
		int r = rand.nextInt(100);
		if (this.isTemperature)
			if(r%2==0)
			  current_value += Math.abs(rand.nextFloat());
			else
			  current_value -= Math.abs(rand.nextFloat());
		else
		{
			if(counter%3==0)
				return;
			
			if(r%2==0)
			  current_value += Math.abs(rand.nextFloat()*50);		
			else
			  current_value -= Math.abs(rand.nextFloat()*50);
		}
		if(current_value<0)
			current_value=0;

		float t = current_value;
		int r2 = rand.nextInt(100);
		if (this.isTemperature) {

			if (Math.abs(r2) >= 95)
				t += 12;
			if (Math.abs(r2) <= 5)
				t -= 12;
		} else {
			if(Math.abs(r2)>=95)
				t+=200;
			if(Math.abs(r2)<=5)
				t-=200;
		}
		String message = "" + t;
		try {
			channel.basicPublish("", channel_name, null, message.getBytes());
			System.out.println(channel_name+": "+message);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		List<RabbitMQSensorData> sensors = new ArrayList<>();
		sensors.add(new RabbitMQSensorData(true,"temperature1", 20f));
		sensors.add(new RabbitMQSensorData(true,"temperature2", 20f));
		sensors.add(new RabbitMQSensorData(true,"temperature3", 20f));
		sensors.add(new RabbitMQSensorData(false,"co2_1", 500f));
		sensors.add(new RabbitMQSensorData(false,"co2_2", 500f));
		sensors.add(new RabbitMQSensorData(false,"co2_3", 500f));

		while (true) {
			sensors.forEach(x -> x.update());
			try {
				Thread.sleep(5000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

}
