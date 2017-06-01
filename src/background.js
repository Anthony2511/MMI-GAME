/* MMI-GAME
*
* /src/js/background.js - Background class
*
* coded by Anthony2511
* started at 27/05/2017
*/

class TEBackground {
   constructor( width, height ) {
       this.frame = {
           "sx": 0,
           "sy": 0,
           "sw": 280,
           "sh": 554,
           "dx": 0,
           "dy": 0,
           "dw": width,
           "dh": height,
       };
   }

   draw( game ) {
       game.drawSpriteFromFrames( this.frame );
   }
}
