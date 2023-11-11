#include <Arduino.h>
#include "esp_camera.h"
#include "base64.h"
#include <PubSubClient.h>
#include <WiFi.h>

// Define the camera module
#define CAMERA_MODEL_AI_THINKER

const char* ssid = "your-ssid";
const char* password = "your-password";

const char* rabbitMQServer = "your-rabbitmq-server";
const int rabbitMQPort = 5672;
const char* rabbitMQUser = "your-rabbitmq-user";
const char* rabbitMQPassword = "your-rabbitmq-password";
const char* rabbitMQQueue = "car_image";

WiFiClient wifiClient;
PubSubClient client(wifiClient);

// Pin configuration for the ESP32-CAM
#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

void startCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  // Initialize with higher JPEG quality (lower compression)
  if (psramFound()) {
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10; // 0-63 lower value means higher quality
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12; // 0-63 lower value means higher quality
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    return;
  }
}

void connectToWiFi() {
  Serial.println("Connecting to WiFi");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
}

void callback(char* topic, byte* payload, unsigned int length) {
  // Handle incoming messages if needed
}

void connectToRabbitMQ() {
  Serial.println("Connecting to RabbitMQ");
  client.setServer(rabbitMQServer, rabbitMQPort);
  client.setCallback(callback);

  while (!client.connected()) {
    if (client.connect("ESP32-CAM", rabbitMQUser, rabbitMQPassword)) {
      Serial.println("Connected to RabbitMQ");
    } else {
      Serial.println("Connection to RabbitMQ failed, retrying in 5 seconds...");
      delay(5000);
    }
  }
}

void captureAndSendToRabbitMQ() {
  camera_fb_t *fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    return;
  }

  // Convert the image to Base64
  String base64Image = base64::encode(fb->buf, fb->len);

  // Send the Base64-encoded image to RabbitMQ
  if (client.publish(rabbitMQQueue, base64Image.c_str())) {
    Serial.println("Image sent to RabbitMQ");
  } else {
    Serial.println("Failed to send image to RabbitMQ");
  }

  // Return the frame buffer to the pool
  esp_camera_fb_return(fb);
}

void setup() {
  Serial.begin(115200);
  startCamera();
  connectToWiFi();
  connectToRabbitMQ();
}

void loop() {
  client.loop();
  if (!client.connected()) {
    connectToRabbitMQ();
  }

  captureAndSendToRabbitMQ();
  delay(2000); // Capture and send every 5 seconds
}
