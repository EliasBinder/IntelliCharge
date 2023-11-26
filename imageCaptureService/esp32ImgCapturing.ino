#include <WiFi.h>
#include "esp_camera.h"

#define PWDN_PIN    32
#define RESET_PIN   -1
#define XCLK_PIN    0
#define SIOD_PIN    26
#define SIOC_PIN    27
#define Y9_PIN      35
#define Y8_PIN      34
#define Y7_PIN      39
#define Y6_PIN      36
#define Y5_PIN      21
#define Y4_PIN      19
#define Y3_PIN      18
#define Y2_PIN      5
#define VSYNC_PIN   25
#define HREF_PIN    23
#define PCLK_PIN    22


// Pin definition for the ESP32 Cam
#define CAMERA_MODEL_AI_THINKER

// WiFi credentials
const char* ssid = "Wind3 HUB-EBE391";
const char* password = "Binder310702";

// MQTT Broker information
const char* endpoint = "/image";
const char* server_ip = "192.168.1.127";
const int server_port = 4000;

// Initialize the camera
void initCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_PIN;
  config.pin_d1 = Y3_PIN;
  config.pin_d2 = Y4_PIN;
  config.pin_d3 = Y5_PIN;
  config.pin_d4 = Y6_PIN;
  config.pin_d5 = Y7_PIN;
  config.pin_d6 = Y8_PIN;
  config.pin_d7 = Y9_PIN;
  config.pin_xclk = XCLK_PIN;
  config.pin_pclk = PCLK_PIN;
  config.pin_vsync = VSYNC_PIN;
  config.pin_href = HREF_PIN;
  config.pin_sscb_sda = SIOD_PIN;
  config.pin_sscb_scl = SIOC_PIN;
  config.pin_pwdn = PWDN_PIN;
  config.pin_reset = RESET_PIN;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if(psramFound()){
    config.frame_size = FRAMESIZE_VGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    ESP.restart();
  }
}

WiFiClient wifiClient;

// Capture and publish image
void captureAndPublish() {
  camera_fb_t * fb = NULL;
  fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Camera capture failed");
    return;
  }
  const char* pic_buf = (const char*)(fb->buf);
  size_t length = fb->len;
  Serial.printf("Image size: %u bytes\n", length);

  if (wifiClient.connect(server_ip, server_port)) {
    String postData = "--BOUNDARY\r\nContent-Disposition: form-data; name=\"file\"; filename=\"image.jpeg\"\r\n\r\n";
    String postDataEnd = "\r\n--BOUNDARY--";
    wifiClient.println("POST " + String(endpoint) + " HTTP/1.1");
    wifiClient.println("Host: " + String(server_ip) + ":4000");
    wifiClient.println("Content-Type: multipart/form-data; boundary=BOUNDARY");
    wifiClient.print("Content-Length: ");
    wifiClient.println(String(length + postData.length() + postDataEnd.length()));
    wifiClient.println();

    wifiClient.print(postData);
    wifiClient.write(pic_buf, length);

    wifiClient.println(postDataEnd);
    wifiClient.println();
    delay(100); // Allow some time to send data
    Serial.println("Image sent!");

    while (wifiClient.available()) {
      String response = wifiClient.readStringUntil('\r');
      Serial.print(response);
    }
    wifiClient.stop(); // Close the connection
  } else {
    Serial.println("Could not connect to server");
  }

  esp_camera_fb_return(fb);
}

unsigned long previousMillis = 0;

void setup() {
  esp_log_level_set("wifi", ESP_LOG_NONE);
  Serial.begin(115200);

  // Initialize the camera
  initCamera();

  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

}

void loop() {
  captureAndPublish();
  delay(5000);
}