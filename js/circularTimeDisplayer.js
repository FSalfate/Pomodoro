
/**
 * Displays a Timer as a Circular Progress Bar.
 *
 * @requires TimeDisplayer
 * @requires Timer.
 */
class CircularTimeDisplayer extends TimeDisplayer {
  static #textClass = "circDispDivText";

  static #selectHeight = 30;
  static #selectWidth = 30;
  static #selectMargin = 5;

  static #width = 200;
  static #height = 200 + this.#selectHeight + this.#selectMargin*2;

  static #radius = this.#width*0.4;
  static #lineWidth = 20;

  static #x = this.#width/2;
  static #y = this.#height/2 + (this.#selectHeight/2 + this.#selectMargin);

  static #bgBarColor = "#CED0CE";

  #canvas;
  #context;
  #color;
  #textDiv;
  #text;

  constructor(aText, idElement, aTimer, color){
    /**
     * Stores the parameters and draws the circular progress bar in the given id.
     *
     * @param {string} aText Text to be displayed bellow the time counter.
     * @param {string} idElement Id of the element where the displayer will be drawn.
     * @param {Timer} aTimer Timer that will be displayed.
     * @param {string} color Color of the displayer.
     */

    //Call super --> TimeDisplayer
    super(idElement, aTimer);

    //Get variables of this particular Class
    this.#color = color;
    this.#text = aText;

    //Modifies TimeDisplayer displayer.
    this.#modifyDisplay();
  }

  update(){
    /**
     * Updates the times and the circular progress bar.
     */
    super.update();
    this.#updateCircularProgressBar();
  }

  #modifyDisplay(){
    /**
     * Modifies the displayer drawn by this TimeDisplayer instance to a
     * circular progress bar.
     */

    //Moves current content to a new div.
    this.#textDiv = document.createElement("div");
    while (this._mainElem.childNodes.length) {
      this.#textDiv.appendChild(this._mainElem.firstChild);
    }

    //Adds Mesage bellow old content
    this.#textDiv.className = CircularTimeDisplayer.#textClass;
    this.#textDiv.appendChild(document.createElement("br"));
    this.#textDiv.appendChild(document.createTextNode("["));
    this.#textDiv.appendChild(document.createTextNode(this.#text));
    this.#textDiv.appendChild(document.createTextNode("]"));
    this._mainElem.appendChild(this.#textDiv);

    //Creates a canvas instances and sets it up.
    this.#canvas = document.createElement("canvas");
    this.#canvas.width = CircularTimeDisplayer.#width;
    this.#canvas.height = CircularTimeDisplayer.#height;
    this.#context = this.#canvas.getContext("2d");
    this._mainElem.appendChild(this.#canvas);

    //Update.
    this.update();
  }

  #updateCircularProgressBar(){
    /**
     * Updates (Draws) the circular progress bar with the respective
     * timer progress.
     */

    //Reset and get percentage
    const percent = this._timer.currentTime/this._timer.totalTime;
    this.#context.clearRect(0, 0, CircularTimeDisplayer.#width, CircularTimeDisplayer.#height);

    //Draws Background Circle
    this.#context.beginPath();
    this.#context.arc(
      CircularTimeDisplayer.#x,
      CircularTimeDisplayer.#y,
      CircularTimeDisplayer.#radius,
      -0.5 * Math.PI,
      1.5 * Math.PI
    );
    this.#context.strokeStyle = CircularTimeDisplayer.#bgBarColor;
    this.#context.lineWidth = CircularTimeDisplayer.#lineWidth;
    this.#context.stroke();

    //Draws Circular Progress Bar
    this.#context.beginPath();
    this.#context.arc(
      CircularTimeDisplayer.#x,
      CircularTimeDisplayer.#y,
      CircularTimeDisplayer.#radius,
      -0.5 * Math.PI,
      2 * Math.PI * (percent - 0.25)
    );
    this.#context.strokeStyle = this.#color;
    this.#context.lineWidth = CircularTimeDisplayer.#lineWidth;
    this.#context.stroke();

    //Draws selected elements (triangle over bar)
    if(this._timer.active){
      this.#drawSelector();
    }
  }

  #drawSelector(){
    /**
     * Draws a triangle over the the progress bar.
     */
    this.#context.beginPath();
    this.#context.moveTo(
      CircularTimeDisplayer.#x - CircularTimeDisplayer.#selectWidth/2,
      CircularTimeDisplayer.#selectMargin
    );
    this.#context.lineTo(
      CircularTimeDisplayer.#x,
      CircularTimeDisplayer.#selectHeight + CircularTimeDisplayer.#selectMargin
    );
    this.#context.lineTo(
      CircularTimeDisplayer.#x + CircularTimeDisplayer.#selectWidth/2,
      CircularTimeDisplayer.#selectMargin
    );
    this.#context.fillStyle = this.#color;
    this.#context.fill();
  }
}
