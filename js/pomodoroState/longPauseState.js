
/**
 * Represents when the Pomodoro is in a Long Pause.
 *
 * @requires PomodoroManager
 */
class LongPauseState {
  #manager

  constructor(aManager) {
    /**
     * Gets the Manager that contains this object. Sets up the timers for
     * a long pause period, and send an alert to notify a long pause has
     * started.
     *
     *@param {PomodoroManager} aManager Manager that contains this State.
     */

    //Gets manager reference
    this.#manager = aManager;

    //Main cycle deactivate; Pomodoro deactivate; Long Pause activate
    this.#manager.cycleTimer.deactivate();
    this.#manager.pomoTimer.deactivate();
    this.#manager.longPauseTimer.activate();

    //Característica de último minuto --> solo se hizo copy en todas las clases,
    //no clase abstracta o algo por el estilo.
    alert("Iniciando Pausa Larga");
  }

  update(){
    /**
     * Ticks the longPauseTimer to advance to next minute, and if it has
     * finished, it restarts the manager.
     */
    this.#manager.longPauseTimer.tick();
    if(this.#manager.longPauseTimer.hasFinished()) {
      this.#manager.start();
    }
  }
}
