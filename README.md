# Mini_Smart_fram
There is a system to control the watering of plants according to humidity.
Sensor used DHT11,soil moisture,soli ph senser,mini pump 12v, rs485Module
# ระบบรดน้ำต้นไม้ Smart_fram ขนาดเล็ก ใช้สำหรับติดตาม และแสดงผลค่าปัจจัยต่างๆที่จำเป็นต่อพืช เช่น ความชื้นในอากาศ อุณหภูมิ ความชื้นในดินและค่า phในดิน แสดงผลทาง เว็บแอฟฟิเคชัน 
# system architecture
![295791937_586762933242338_4322270110212800056_n](https://user-images.githubusercontent.com/73652040/188834663-38e20fe1-8d62-414e-b88d-a34ffee5094d.png)
# Prototype
![302451456_822798955545112_133378904841286350_n](https://user-images.githubusercontent.com/73652040/188797472-450262be-dfed-45b9-a460-75ab8387f00e.jpg)
# feature
มีการส่งข้อมูลและประมวลผลแบบเรลไทม์
สามารถใช้ในการรถน้ำต้นไม้ตามค่าความชื้นในดินได้
มี Web Application ที่เเสดงผลแบบเรียลไทม์
ฐานข้อมูลรองรับหลายแพทฟรอม
# Component
Node Micro-Controller Esp8266 หรือ nodeMCU 2 ตัว ในการส่งข้อมูลและประมวลผล
DHT11 ใช้สำหรับตรวจวัดค่าความชื้นและอุณหภูมิในอากาศ
soil moisture senser ใช้ตรวจวัดค่าความชื้นในดิน คิดเป็น เปอร์เซนต์
soli ph senser ใช้ควาจวัดค่าความเป็น กรด-ด่าง ในดิน
RS485 module โมดูลเสริมการเชื่อมต่อ rs485 กับ ตัว nodeMCU
mini pump 12v ปั้มน้ำขนาดเล็กใช้ในการส่งน้ำไปยังต้นไม้
# library on Arduino IDE
ESP8266WiFi ใช้ในการเชื่อมต่อ wifi เพื่อเชื่อมต่อกับอุปกรณ์หรือ ซอฟแวร์อื่นๆ
ESP8266WebServer ใช้ในการรัน ตัว wep server เป็นการสร้างตัว web api ขื้นมาใช้สื่อสารกับตัว forntend.
SoftwareSerial ใช้ในการเขียนและอ่านค่า บน serail moniter
ThingSpeak เป็นฐานข้อมูลบนคลาวด์ใช้ในการเก็บข้อมูลของเซนเซอรืก่อนนำมาใช้
ArduinoJson เป็นตัวจัดการการใช้ json ในการแปลง text เป็นjson เพื่อส่งข้อมูลไปยัง แอฟฟิคเคชันต่างๆ
DHT เป็นไลเบอร์รี่ที่ใช้ในการ ใช้งานความคู่กับเซเซอร์ DHT11 ในการอ่าน ความชื้นและอุณหภูมิ
time  เป็นตัวจัดการเรื่องเวลา และ การฟอแมทเวลา
# result
ส่ง data ขึ้นไปเก็บบลคลาวด์
![ddd](https://user-images.githubusercontent.com/73652040/188905915-f0f5fdc1-5063-4760-90eb-15120189440c.PNG)
# Web Application
![gggg](https://user-images.githubusercontent.com/73652040/188906168-769bf1de-94f8-4f56-a03c-0783b764c81a.PNG)
# Project consultant
ผศ.ดร.สุภาภรณ์ ใจรังษี
# Member
1. 63102156 นายชัยณรงค์ แก้วประเสริฐ
2. 63104269 นายธนาคาร สุวรรณทา
3. 63113203 นายธัญพิสิษฐ์ ส้มเกตุ
4. 63104111 นายธนพล รัตนมะโน
5. 63122980 นายสหรัฐ สุวรรณภาพร
# Walailak University
# Information Technology and Digital Innovation

