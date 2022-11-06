basic.showIcon(IconNames.Heart)
OLED.init(128, 64)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("SK_WiFiGIGA7C8E_2.4G", "AGQC8@9112")
basic.forever(function () {
    OLED.clear()
    OLED.writeString("Du:  ")
    OLED.writeNum(Environment.ReadDust(DigitalPin.P13, AnalogPin.P1))
    OLED.newLine()
    OLED.writeString("Temp: ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeString("Humi")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    ESP8266_IoT.connectThingSpeak()
    ESP8266_IoT.setData(
    "PCHHU1LULK7D0SA8",
    Environment.ReadDust(DigitalPin.P13, AnalogPin.P1),
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.octopus_BME280(Environment.BME280_state.BME280_humidity)
    )
    ESP8266_IoT.uploadData()
    basic.pause(60000)
})
