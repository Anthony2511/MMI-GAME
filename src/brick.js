/**
 * Created by Anthony2511
 * 28/05/2017
 */

 class Brick {
   constructor( { width, height, context } ) {
     this.width = width;
     this.height = height;
     this.context = context;

     this.numberLine = 6;
     this.numberBrickLine = 9;
     this.arrayBrick = new Array( numberLine );


   }

   generate() {
     let { ctx, width, height, space } = this;
     let color = [ "#e74c3c", "#c0392b", "#d35400", "#e67e22", "#1abc9c" ];

     aWin = 1;
     for ( i = 0; i < numberLine; i++ ) {
       arrayBrick[i] = new Array( numberBrickLine );
       ctx.fillStyle = color[i];
       for ( j=0; j < numberBrickLine; j++ ) {
         ctx.fillRect( ( j * ( width + space ) ), ( i * ( height + space ) ), width, height );
         arrayBrick[i] [j] = 1;
       }
     }
   }
 }
