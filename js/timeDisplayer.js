/**
 * Displays a Timer in the most basic way (Current Time/Total Time).
 *
 * @requires Timer
 */
class TimeDisplayer {
  _timer;

  _mainElem;
  _currentTElem;
  _totalTElem;

  constructor(idElement, aTimer) {
    /**
     * Stores the parameters and creates the basic displayer of the Timer.
     *
     * @param {string} idElement Id of the element where the displayer will be created.
     * @param {Timer} aTimer Timer which time will be displayed.
     */
    this._mainElem = document.getElementById(idElement);

    // If element doesn't exist --> throw Error
    if(this._mainElem == null){
      throw new Error("id given doesn't exist.");
    }

    //Store the Timer
    this._timer = aTimer;

    //Create the Displayer
    this.#formatDisplayer();
  }

  update(){
    /**
     * Updates the values in the displayer.
     */
    this.#updateValues();
  }

  #updateValues(){
    /**
     * Updates the values in the Displayer.
     */
    this._mainElem.style.fontWeight = (this._timer.active) ? "bold" : "normal";
    this._currentTElem.textContent = this._timer.currentTime;
    this._totalTElem.textContent = this._timer.totalTime;
  }

  #formatDisplayer(){
    /**
     * Creates the Displayer.
     */

    //Creating the time's elements inside the main element
    this._currentTElem = document.createElement("span");
    this._totalTElem = document.createElement("span");

    //Update values
    this.#updateValues();

    //Creates the structure {main div} <- {div} <- {current time} {/} {total time}
    this._mainElem.appendChild(this._currentTElem);
    this._mainElem.appendChild(document.createTextNode("/"));
    this._mainElem.appendChild(this._totalTElem);
    this._mainElem.appendChild(document.createTextNode(" " + this._timer.unit));
  }
}
