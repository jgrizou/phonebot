# Smartphone powered robot

https://jgrizou.github.io/phonebot/

From https://github.com/toxtli/lightweight-webcam-javascript-face-detection


## Espruino (MicroJS)

https://twitter.com/espruino?lang=fr
https://www.linkedin.com/in/gordon-williams-09b7a61/

Directly programmable via web

Important:
- with Bluetooth, possibility to upload the program in the robot before starting, so both robot embedded code and web control comes into the same packages

Pros:
- directly code robot via web too
- using blockly
- using web bluetooth
- with app store: https://espruino.github.io/EspruinoApps/

Cons:
- not fully considered by all browser, but work around exists, e.g. https://www.greenparksoftware.co.uk/projects/webble/1.2.3 and https://www.ciderapp.io/


- https://espruino.github.io/EspruinoWebIDE/
- https://www.espruino.com/
- works with WebBLE: https://www.hackster.io/akos-lukacs/blenergygraphs-7e7b9c
- https://shop.espruino.com/mdbt42q-breakout

- https://www.espruino.com/Modules#espruino-modules
- https://shop.espruino.com/banglejs


## Web Bleutooth

- https://itpnyu.github.io/p5ble-website/

- https://github.com/kpatel122/ESP32-Web-Bluetooth-Terminal
- https://github.com/nguyenthuongvo/webluetooth_esp32

- https://webbluetoothcg.github.io/web-bluetooth/


## Plotting

- https://plotly.com/javascript/

## p5js blockly

- https://github.com/bn3t/p5js-livereload

- https://rigglin.appspot.com/static/index.html
- https://github.com/jtnimoy/rigglin
- https://ycatch.github.io/blockp5.js/example.html
- https://ycatch.github.io/blockp5.js/


## Applications

PoseNet:
 - https://www.youtube.com/watch?v=EA3-k9mnLHs 
 - https://editor.p5js.org/codingtrain/sketches/Skd42hIy4 a

 tracking hand position (https://github.com/tensorflow/tfjs-models/tree/master/handpose and https://github.com/victordibia/handtrack.js/), 
 
 detecting signs/objects, 
 
 using sounds command (https://github.com/tensorflow/tfjs-models/tree/master/speech-commands), 
 
 and even interfacing with Bluetooth devices (https://itpnyu.github.io/p5ble-website/).



## Johnny-Five - JS framework for robotics

- https://github.com/rwaldron/johnny-five
- https://dtex.github.io/j5e/index.html


## ESP32-CAM

Idea: use a QR code detection directly from a camera:
- increase number of command
- potentially load program from there?

A bit silly, better go for WebBluetooth and keep a simple sensor to start

- https://github.com/donny681/ESP32_CAMERA_QR/
- https://github.com/Schaggo/QR-ARDUINO/tree/master/src

### MicroPython

- https://www.programmersought.com/article/27476367652/
- https://lemariva.com/blog/2020/02/micropython-timelapse-video-using-esp32-cam



