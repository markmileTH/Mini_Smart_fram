#include <b64.h>
#include <HttpClient.h>
#include <Firebase_ESP_Client.h>
#include <Wire.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>
#include <ThingSpeak.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266Firebase.h>
#include <ArduinoJson.h>
#include "DHT.h"
#include <time.h>
#define reray1 D8
#define HOST "https://test1-fe442-default-rtdb.asia-southeast1.firebasedatabase.app"
#define API_KEY "AIzaSyBBIM6-twsz3BKTl9AZRYSFr_lv_wn0Db0"
// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://test1-fe442-default-rtdb.asia-southeast1.firebasedatabase.app/"
#define LINE_TOKEN_TMP "dcrP7CUuDPCiZuQinME47AUTciO7twdnuC6ql7Owmc5" // LINE Notify token 2
#define LINE_TOKEN_SOI "IMLtuf0aNjanv6sBgTYPxw58ldiPmLWlskPtKYRZ54b"
//#define RE 6
//#define DE 3
//#define RO 5
//#define DI 7
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;
// byte values[11];
// SoftwareSerial mod(14, 12);

const char *ssid = "IoTAD01";
const char *pass = "ccsadmin";
int ph;
int ph2;
int analogpin = A0;
//
// const byte phaddress[] = {0x01, 0x03, 0x00, 0x00, 0x00, 0x01, 0x84, 0x0A};
// const byte phos[] = {0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc};
// const byte pota[] = {0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0};

DHT dht;
ESP8266WebServer server(80);
DynamicJsonDocument doc(1024);
DynamicJsonDocument doc2(1024);
WiFiClient client;

String response;
float value;
String _str, _res, _t, _h;
float t, h;

String message1 = "Temperature";
String message2 = "himifity";
String message3 = "sand_himidity";
bool beep_state = false;
bool send_state = false;

uint32_t ts, ts1, ts2;

unsigned long myChannelNumber = 1826094;
const char *myWriteAPIKey = "LHHWYJ5TXJUVN1PL";
const char *serverName = "http://localhost:3001/iot_data/create";
int statusCode = 0;

int Humidity;
int Temperature;
int Soil_moisture;

void setup()
{
  dht.setup(D4);
  pinMode(reray1, HIGH);
  ThingSpeak.begin(client);
  Serial.begin(9600);
  WiFi.begin(ssid, pass);
  HTTPClient http;
  server.begin();
  server.on("/", root);
  wifi_init();
  //  Client_Send();
  get_T_H();
  server.on("/pumpon", getpumpON);
}

void root()
{
  static String responseHTML = F("<!doctype html>"
                                 "<html>"
                                 "<head>"
                                 "<title>Hello IoT</title>"
                                 "</head>"
                                 "<body>"
                                 "<h1>HELLO IOT WORLD</h1>"
                                 "</body>"
                                 "</html>");
  server.send(200, "text/html", responseHTML.c_str());
}

void getpumpON()
{
  digitalWrite(reray1, HIGH);
  fixCore();
  server.send(200, "application/json", "");
  delay(2000);
  Serial.print("เปิดน้ำ");
  digitalWrite(reray1, LOW);
}

void fixCore()
{
  server.sendHeader(F("Access-Control-Allow-Origin"), F("*"));
  server.sendHeader(F("Access-Control-Max-Age"), F("600"));
  server.sendHeader(F("Access-Control-Allow-Methods"), F("PUT,POST,GET,OPTIONS"));
  server.sendHeader(F("Access-Control-Allow-Headers"), F("*"));
}

void get_T_H()
{
  float humidity = dht.getHumidity();       // ดึงค่าความชื้น
  float temperature = dht.getTemperature(); // ดึงค่าอุณหภูมิ
  float sand_h = analogRead(analogpin);
  int output_Sand = 0;
  output_Sand = map(sand_h, 0, 1023, 100, 0);

  Serial.print("อุณหภูมิ: ");
  Serial.println(temperature);
  Serial.print("ความชื้นอากาศ: ");
  Serial.println(humidity);
  Serial.print("ความชื้นในดิน: ");
  Serial.println(output_Sand);
  Serial.println(" %");
  ThingSpeak.setField(1, humidity);
  ThingSpeak.setField(2, temperature);
  ThingSpeak.setField(3, output_Sand);
  int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  if (x == 200)
  {
    Serial.println("Channel update successful.");
  }
  else
  {
    Serial.println("Problem updating channel. HTTP error code " + String(x));
  }

  delay(1000);
}

void wifi_init()
{
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("Connecting... ");
    Serial.printf("Connection Status: %d\n", WiFi.status());
    delay(1000);
  }
  Serial.print("Wi-Fi connected.");
  Serial.print("IP Address : ");
  Serial.println(WiFi.localIP());
}


void getDataThingSpeak()
{
  statusCode = ThingSpeak.readMultipleFields(myChannelNumber);
  if (statusCode == 200)
  {
    int Humidity = ThingSpeak.getFieldAsInt(1);    // Field 1
    int Temperature = ThingSpeak.getFieldAsInt(2); // Field 2
    int sand_himidity = ThingSpeak.getFieldAsInt(3);
    Serial.println("Humidity: " + String(Humidity));
    Serial.println("Temperature " + String(Temperature));
    Serial.println("sand_himidity " + String(sand_himidity));
  }
  else
  {
    Serial.println("HTTP error code " + String(statusCode));
  }
}


void loop()
{

  server.handleClient();
  fixCore();
  HTTPClient http;
  get_T_H();
  getDataThingSpeak();

  float humidity = dht.getHumidity();       // ดึงค่าความชื้น
  float temperature = dht.getTemperature(); // ดึงค่าอุณหภูมิ
  float sand_h = analogRead(analogpin);
  int output_Sand = 0;
  output_Sand = map(sand_h, 0, 1023, 100, 0);
  if (output_Sand <= 40)
  { //ตั้งค่า % ที่ต้องการจะรดน้ำต้นไม้
    pumpON();
  }
  else
  {
    pumpOFF();
  }
  delay(5000); // no need to fetch too often
}

void pumpON()
{
  digitalWrite(reray1, HIGH);
  delay(2000);
  Serial.print("เปิดน้ำ");
  digitalWrite(reray1, LOW);
}

void pumpOFF()
{
  digitalWrite(reray1, LOW);
  Serial.print("ปิดน้ำ");
}
