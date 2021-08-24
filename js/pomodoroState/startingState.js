/**
 * Represents the start of the Pomodoro. Resets and activate/deactive all the
 * timers.
 *
 * @requires PomodoroManager
 */

class StartingState {
  #manager;

  constructor(aManager) {
    /**
     * Gets the Manager that contains this object. Sets up the timers a new
     * Full Pomodoro Cycle.
     *
     *@param {PomodoroManager} aManager Manager that contains this State.
     */

    //Gets manager reference
    this.#manager = aManager;

    //Reset all timers.
    this.#manager.cycleTimer.reset();
    this.#manager.pomoTimer.reset();
    this.#manager.shortPauseTimer.reset();
    this.#manager.longPauseTimer.reset();

    //Activates Main Cycle & Pomodoro; Deactivates Short & Long Pause.
    this.#manager.cycleTimer.activate();
    this.#manager.pomoTimer.activate();
    this.#manager.shortPauseTimer.deactivate();
    this.#manager.longPauseTimer.deactivate();
  }

  update(){
    /**
    * Directly transitions to PomodoroState.
    */
    this.#manager.state = new PomodoroState(this.#manager);
  }
}
