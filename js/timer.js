/**
 * Keeps track of a Timer. It can only discount an unit from the current time or
 * reset to the total time of the Timer.
 *
 * It can be activated or deactivated, or set a new total time of the Timer. That
 * total time can be bigger or lower than a certain quantity.
 *
 * By default it represents minutes, but any unit of time can be set.
 */
class Timer{
  #active;

  #totalTime;
  #currentTime;
  #maxTotalTime;
  #minTotalTime;

  #unit;

  constructor(aTotalTime, aMinTotalTime, aMaxTotalTime, unit="minuto(s)") {
    /**
     * Creates a Timer with the given parameters. By default its active.
     *
     * @param {int} aTotalTime Total time of the Timer.
     * @param {int} aMinTotalTime The minimum quantity the total time can be.
     * @param {int} aMaxTotalTime The maximum quantity the total time can be.
     * @param {string} unit Unit of time of the Timer. It can be any string really.
     */

    //minTime time shouldn't be higher than maxTime
    if(aMinTotalTime > aMaxTotalTime){
      throw new Error("minTime shouldn't be higher than maxTime.");
    }

    //Getting the parameters
    this.#active = true;
    this.#unit = unit;
    this.#minTotalTime = aMinTotalTime;
    this.#maxTotalTime = aMaxTotalTime;

    //Getting total and current time
    //OBSERVATION: totalTime and currentTime should be defined AFTER max and min TotalTime
    this.totalTime = aTotalTime;
    this.#currentTime = this.totalTime;
  }

  get active(){
    /**
     * Returns if the Timer is active.
     *
     * @return bool Is the Timer active.
     */
    return this.#active;
  }

  get totalTime() {
    /**
     * Returns the Total Time.
     *
     * @return int Total Time.
     */
    return this.#totalTime;
  }

  get currentTime(){
    /**
     * Returns the Current Time.
     *
     * @return int Current Time.
     */
    return this.#currentTime;
  }

  get minTotalTime() {
    /**
     * Returns the max quantity the Total Time can get.
     *
     * @return int Max quantity of Total Time.
     */
    return this.#minTotalTime;
  }

  get maxTotalTime() {
    /**
     * Returns the min quantity the Total Time can get.
     *
     * @return int Min quantity of Total Time.
     */
    return this.#maxTotalTime;
  }

  get unit(){
    /**
     * Returns the Timer's unit of time.
     *
     * @return string Unit of time.
     */
    return this.#unit;
  }

  set totalTime(aTime){
    /**
     * Sets the Total Time. It's capped to the min and max quantites the Timer
     * can get. If the Total Time is lower than the Current Time, the later is
     * updated to the Total Time.
     */
    this.#totalTime = Math.max(Math.min(aTime, this.#maxTotalTime), this.#minTotalTime);
    this.#currentTime = Math.min(this.#currentTime, this.totalTime);
  }

  activate(){
    /**
     * Activates the Timer.
     */
    this.#active = true;
  }

  deactivate(){
    /**
     * Deactivates the Timer.
     */
    this.#active = false;
  }

  reset(){
    /**
     * Resets the Timer to Total Time.
     */
    this.#currentTime = this.totalTime;
  }

  tick(){
    /**
     * Passes one unit of time.
     */
    if(!this.hasFinished()) {
      this.#currentTime--;
    }
  }

  hasFinished(){
    /**
     * Returns if the Timer has finished (Current Time = 0).
     *
     * @return bool Timer has finished.
     */
    return this.#currentTime <= 0;
  }
}
