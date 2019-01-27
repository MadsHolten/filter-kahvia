package sparkget;

import static spark.Spark.get;

import java.util.Random;

public class SparkSensor {
	private static Random rand = new Random(System.currentTimeMillis());
	private static float current_temperature = 20;
	
	public static String getValue(int id) {
		current_temperature+=rand.nextFloat()-0.5f;
		return ""+current_temperature;
	}

	public static void main(String[] args) {
		get("/sensor1", (req, res) -> getValue(1));
	}
}
