/**
 * Represents when the Pomodoro is in working time.
 *
 * @requires PomodoroManager
 */
class PomodoroState {
  #manager;

  constructor(aManager) {
    /**
     * Gets the Manager that contains this object. Sets up the timers for
     * a working period, and send an alert to notify a working period has
     * started.
     *
     * If it's in the last cycle doesn't reset the shortPauseTimer.
     *
     *@param {PomodoroManager} aManager Manager that contains this State.
     */

    //Gets manager reference
    this.#manager = aManager;

    //Pomodoro reseted & activated; Short Pause deactivate
    this.#manager.pomoTimer.reset();
    this.#manager.pomoTimer.activate();
    this.#manager.shortPauseTimer.deactivate();

    //If not in last Cycle --> reset Short Pause
    if(!this.#inLastCycle()){
      this.#manager.shortPauseTimer.reset();
    }

    //Característica de último minuto --> solo se hizo copy en todas las clases,
    //no clase abstracta o algo por el estilo.
    alert("Iniciando Sesión de Trabajo");
  }

  update(){
    /**
     * Ticks the pomoTimer to advance to the next minute. If it's in the last
     * cycle, it ticks the cycleTimer (ShortPauseState job) and transitions to
     * LongPauseState. If it's not it just transitions to LongPauseState.
     */
    this.#manager.pomoTimer.tick();
    if(this.#manager.pomoTimer.hasFinished()) {
      if(this.#inLastCycle()){
        this.#manager.cycleTimer.tick();
        this.#manager.state = new LongPauseState(this.#manager);
      } else {
        this.#manager.state = new ShortPauseState(this.#manager);
      }
    }
  }

  #inLastCycle(){
    /**
     * Checks if it's in the last cycle.
     */
    return this.#manager.cycleTimer.currentTime == 1;
  }
}
