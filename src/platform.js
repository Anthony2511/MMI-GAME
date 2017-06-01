/**
 * Created by Anthony2511
 * 28/05/2017
 */

 class Platform {
   constructor( width, height ) {
     this.frame = {
       "sx": 0,
       "sy": 0,
       "sw": 279,
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
