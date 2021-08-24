/**
 * Represents when the Pomodoro is in a Short Pause.
 *
 * @requires PomodoroManager
 */
class ShortPauseState {
  #manager

  constructor(aManager) {
    /**
     * Gets the Manager that contains this object. Sets up the timers for
     * a short pause period, and send an alert to notify a short pause has
     * started.
     *
     *@param {PomodoroManager} aManager Manager that contains this State.
     */

    //Gets manager reference
    this.#manager = aManager;

    //Deactivate Pomodoro; Activate Short Pause.
    this.#manager.pomoTimer.deactivate();
    this.#manager.shortPauseTimer.activate();

    //Característica de último minuto --> solo se hizo copy en todas las clases,
    //no clase abstracta o algo por el estilo.
    alert("Iniciando Pausa Corta");
  }

  update(){
    /**
     * Ticks the shortPauseTimer to advance to next minute. If it's hasFinished
     * it transitions to PomodoroState.
     */
    this.#manager.shortPauseTimer.tick();
    if(this.#manager.shortPauseTimer.hasFinished()) {
      this.#manager.cycleTimer.tick();
      this.#manager.state = new PomodoroState(this.#manager);
    }
  }
}
