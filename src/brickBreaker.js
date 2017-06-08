const oApp = {
    "canvas": null,
    "width": null,
    "height": null,
    "context": null,
};

const isCanvasSupported = function( $elt ) {
    return !!$elt.getContext;
};

oApp.setup = function() {
    this.canvas = document.getElementById( "game" );
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    if ( !isCanvasSupported( this.canvas ) ) {
        return console.error( "Your browser doesn't support canvas. Please update." );
    }
    this.context = this.canvas.getContext( "2d" );
};

const colors = [ "#c0392b", "#e74c3c", "#d35400", "#e67e22", "#f39c12", "#f1c40f" ];

let canvas = document.getElementById( "game" ),
    context = canvas.getContext("2d" ),
    numberLine = 6,
    numberBrickLine = 9,
    bricksWidth = 45,
    bricksHeight = 30,
    spaceBricks = 5,
    barWidth = 80,
    barHeight = 10,
    barX,
    barY,
    movement = 30,
    airZoneWidth = canvas.width,
    airZoneHeight = canvas.height,
    ballWidth = 6,
    speedBall = 2,
    ballX = 100,
    ballY = 250,
    directionBallX = 1,
    directionBallY = -1,
    aWin = 0,
    bricks = (spaceBricks + bricksHeight) * numberLine,
    arrayBricks = new Array(numberLine),
    point = 0,
    currentGame = true,
    start,
    recreation,
    Game,
    draw,
    gagne,
    mainLogic,
    perdu,
    balle,
    colision,
    checkDepla,
    creation,
    LigneY,
    LigneX,
    i,
    j,
    MyTimer;

creation = function( context, width, height, space ) {

  aWin = 1;
  for (i = 0; i < numberLine; i++) {
      arrayBricks[i] = new Array(numberBrickLine);
      context.fillStyle = colors[i];
      for (j = 0; j < numberBrickLine; j++) {
          context.fillRect(j * (width + space), i * (height + space), width, height);
          arrayBricks[i][j] = 1;
      }
    }
 };


 draw = function () {
     context.fillStyle = "#34495e";
     context.fillRect(0, 0, airZoneWidth, airZoneHeight);
     context.fill();
     context.fillStyle = "#ffffff";
     context.font = "bold 30px Lato";
     context.textAlign = "center";
     context.fillText("Appuyez sur ESPACE ", airZoneWidth / 2, airZoneHeight / 3);
     context.fillText("pour commencer ", airZoneWidth / 2, airZoneHeight / 2.5);
 };


 recreation = function() {
     aWin = 1;
     for ( i = 0 ; i < arrayBricks.length ; i++ ) {
         context.fillStyle = colors [ i ];
         for ( j = 0; j < arrayBricks [ i ].length ; j++ ) {
             if ( arrayBricks [ i ][ j ] === 1 ) {
                 context.fillRect( ( j * ( bricksWidth + spaceBricks ) ), ( i * ( bricksHeight + spaceBricks ) ), bricksWidth, bricksHeight );
                 aWin = 0;
             }
         }
     }
     if ( aWin ) {
         gagne();
     }
 };

 gagne = function () {
     currentGame = true;
     window.clearInterval(MyTimer);
     context.textAlign = "center";
     context.font = "bold 30px Lato";
     context.fillStyle = "#2ecc71";
     context.fillText("Bravo ! Vous avez GAGNER !", airZoneWidth / 2, airZoneHeight / 2);
     directionBallX = 0;
     directionBallY = 0;
     speedBall = 0;
 };

 perdu = function () {
     currentGame = true;
     window.clearInterval(MyTimer);
     context.textAlign = "center";
     context.font = "bold 30px Lato";
     context.fillText("Espace pour recommencer", airZoneWidth / 2, airZoneHeight / 1.5);
     context.font = "bold 40px Lato";
     context.fillStyle = "#e74c3c";
     context.fillText("GAME OVER", airZoneWidth / 2, airZoneHeight / 1.75);
     directionBallX = 0;
     directionBallY = 0;
     speedBall = 0;
 };


 mainLogic = function() {

     if ( ( ballX + directionBallX * speedBall ) > airZoneWidth ) {
         directionBallX = -1.2;
     } else if ( ( ballX + directionBallX * speedBall ) < 0 ) {
         directionBallX = 1.2;
     } else if ( ( ballY + directionBallY * speedBall ) > airZoneHeight ) {
         perdu();
     } else if ( ( ballY + directionBallY * speedBall ) < 0 ) {
         directionBallY = 1.2;
     } else if ( ( ( ballY + directionBallY * speedBall ) > ( airZoneHeight - barHeight ) ) && ( ( ballX + directionBallX * speedBall ) >= barX ) && ( ( ballX + directionBallX * speedBall ) <= ( barX + barWidth ) ) ) {
         directionBallY = -1.2;
         directionBallX = 2 * ( ballX - ( barX + barWidth / 2 ) ) / barWidth;
     }
     ballX += directionBallX * speedBall;
     ballY += directionBallY * speedBall;
 };

 balle = function() {
     context.fillStyle = "white";
     context.beginPath();
     context.arc( ballX, ballY, ballWidth, 0, Math.PI * 2, true );
     context.closePath();
     context.fill();
 };


 colision = function() {
     if ( ballY <= bricks ) {
         LigneY = Math.floor( ballY / ( bricksHeight + spaceBricks ) );
         LigneX = Math.floor( ballX / ( bricksWidth + spaceBricks ) );
         if ( ( arrayBricks [ LigneY ] [ LigneX ] ) === 1 ) {
             arrayBricks[ LigneY ][ LigneX ] = 0;
             directionBallY = 1.5;
             point = point + 1;
         }
     }
 };

 Game = function() {
     currentGame = false;
     draw();
     context.clearRect( 0, 0, airZoneWidth, airZoneHeight );
     context.fillStyle = "#34495e";
     context.fillRect( 0, 0, airZoneWidth, airZoneHeight );
     context.fill();
     context.fillStyle = "white";
     context.font = "bold 30px Lato";
     context.fillText(point, 40, 480);
     recreation();
     context.fillStyle = "white";
     context.fillRect( barX, barY, barWidth, barHeight );
     mainLogic();
     colision();
     balle();
 };

 start = function() {
     currentGame = false;

     barX = ( airZoneWidth / 2 ) - ( barWidth / 2 );
     barY = ( airZoneHeight - barHeight );
     context.fillStyle = "white";
     context.fillRect( barX, barY, barWidth, barHeight );

     creation( context, numberLine, numberBrickLine, bricksWidth, bricksHeight, spaceBricks );

     MyTimer = setInterval( Game, 10 );

     return MyTimer;

 };

 draw();

 checkDepla = function( e ) {
     if ( e.keyCode === 39 ) {
         if ( ( barX + movement + barWidth ) <= airZoneWidth ) {
             barX += movement + 10;
         }
     } else if ( e.keyCode === 37 ) {
         if ( ( ( barX - movement ) ) >= 0 ) {
             barX -= movement + 10;
         }
     }
 };


 window.document.onkeydown = checkDepla;
 if ( currentGame === true ) {
     window.addEventListener( "keyup", function( e ) {
         if ( e.which === 32 ) {
             window.clearInterval( MyTimer );
             start();
             ballX = 100;
             ballY = 250;
             directionBallX = 1.2;
             directionBallY = -1.2;
             speedBall = 2;
             point = 0;
         }
     }, false );
 }
