/**
 * Created by Anthony2511
 * 28/05/2017
 */

class brickBreaker {
  constructor( {canvas, context,width, height} ) {
    this.canvas = canvas;
    this.context = context;
    this.width = width;
    this.height = height;
  }

  setup() {
    this.canvas.addEventListener("mousemove", this.handleAction.bind(this));
    this.canvas.addEventListener("click", this.handleAction.bind(this));
    document.addEventListener( "keydown", this.handleAction.bind( this ) );
    this.reset();
  }

  reset() {
    window.cancelAnimationFrame(this.animationRequestId);

    this.bricks = new Bricks(this);

    this.animate();

}

animate() {
    this.animationRequestId = window.requestAnimationFrame( this.animate.bind( this ) );
    this.context.clearRect(0,0, this.width, this.height);

    this.bricks.draw();
  }
}
