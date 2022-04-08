# Smartphone powered self-driving robot

Prototype of a self-driving robot controlled by a smartphone.

Check out [Kirstin Ritchie](https://github.com/Kirstin813) work on self-driving car based on this robot at https://github.com/Kirstin813/L4-Individual-Project. Lots of great examples, like this line following demo:

<p align="center" width="100%">
    <img width="33%" src="https://github.com/Kirstin813/L4-Individual-Project/blob/main/media/linetracking.gif">
</p>


## How it is built

### BOM

- https://proto-pic.co.uk/product/sparkfun-prt-14411-lipo-charger-booster-5v-1a/	
- https://proto-pic.co.uk/product/2001-plastic-gearmotor-90-output/
- https://proto-pic.co.uk/product/sparkfun-rob-14451-motor-driver-dual-tb6612fng-1a/
- https://proto-pic.co.uk/product/polymer-lithium-ion-battery-37v-1ah/
- https://shop.espruino.com/mdbt42q-breakout

3D models:
- robot base: https://cad.onshape.com/documents/858420b45d74a6c130741a27/w/ccd74c6c91d1447417ffa0b3/e/e34cca09c53379cb87889070?renderMode=0&uiState=62501d0795faa529ca2ae411
- phone holder: https://cad.onshape.com/documents/7d8586f8a6d17dcb3bcccbce/w/9b9c587dccb38628041160f6/e/8ecb82fc88e8a341ed6ea32a?renderMode=0&uiState=62501d3d633408504e725da1


### Embedded Code 

We use https://shop.espruino.com/mdbt42q-breakout as the microcontroller. It runs Javascript and can be controlled via webbleutooth from a browser. See http://forum.espruino.com/conversations/362281 for an in-depth discussion on our use of Espruino for this robot.

Code uploaded on the robot is at https://github.com/jgrizou/phonebot/blob/main/espruino/dev.js

## Robot control and demos

See https://kirstin813.github.io/L4-Individual-Project/src/simple/ for a controller for this robot.

Check out [Kirstin Ritchie](https://github.com/Kirstin813) work on self-driving car based on this robot at https://github.com/Kirstin813/L4-Individual-Project. 

Lots of amazing demos at https://github.com/Kirstin813/L4-Individual-Project/tree/main/src#instructions-for-use

## Related projects

- https://thecraftyrobot.net/pages/smartibot-programming
- https://www.openbot.org/
- https://aws.amazon.com/deepracer/

## Useful tools

- https://github.com/cmurray95/espruino-remote-uploader with doc at https://cmurray95.github.io/espruino-remote-uploader/


## License

TODO: cite work to be published

