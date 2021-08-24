/**
 * Manages the Pomodoro. Depending on which State the App is, the respective
 * Timer is ticked. At the same time when a Timer reaches 0, it transitions to
 * the respective state, activating, deactivating and reseting the respetive
 * Timers.
 *
 * All of this is done through states, which are in charge of ticking and
 * transitioning.
 *
 * @requires Timer
 * @requires NullState
 * @requires StartState
 * @requires PomodoroState
 * @requires ShortPauseTimer
 * @requires LongPauseTimer
 */
class PomodoroManager {
  pomoTimer;
  shortPauseTimer;
  longPauseTimer;
  cycleTimer;

  state;

  constructor(aPomoTimer, aShortPauseTimer, aLongPauseTimer, aCycleTimer) {
    /**
     * Gets all the Timers and starts at NullState.
     *
     * @param {Timer} aPomoTimer Timer keeping track of the Pomodoro or working cycle.
     * @param {Timer} aShortPauseTimer Timer keeping track of the short pause cycle.
     * @param {Timer} aLongPauseTimer Timer keeping track of the long puase cycle.
     * @param {Timer} aCycleTimer Timer keeping track of the Pomodoro/short pause cycle.
     */

    //Getting timers
    this.pomoTimer = aPomoTimer;
    this.shortPauseTimer = aShortPauseTimer;
    this.longPauseTimer = aLongPauseTimer;
    this.cycleTimer = aCycleTimer;

    //Setting state NullState.
    this.state = new NullState();
  }

  start(){
    /**
     * Starts the counting. Sends the starting alert right away.
     */
    this.reset();
    this.update();
  }

  update(){
    /**
    * Counts a minute.
    */
    this.state.update();
  }

  reset(){
    /**
     * Resets the counting. Waits until an update to send the starting alert.
     */
    this.state = new StartingState(this);
  }

  // Implementación sin estados:
  // Así es más engorroso, pero al mismo tiempo no existen depedencias
  // circulares.

  // update(){
  //   // In main Cycle
  //   if(this.cycleTimer.active) {
  //     // In Pomodoro Cycle
  //     if(this.pomoTimer.active) {
  //       this.pomoTimer.tick();
  //
  //       //Pass to Short Pause Cycle
  //       if(this.pomoTimer.hasFinished()) {
  //         this.pomoTimer.deactivate();
  //         this.shortPauseTimer.activate();
  //       }
  //
  //     // In Short Pause Cycle
  //     } else {
  //       this.shortPauseTimer.tick();
  //       if(this.shortPauseTimer.hasFinished()) {
  //         this.shortPauseTimer.deactivate();
  //         this.cycleTimer.tick();
  //
  //         //Pass to Long Pause Cycle
  //         if(this.cycleTimer.hasFinished()) {
  //           this.cycleTimer.deactivate();
  //           this.longPauseTimer.activate();
  //
  //           //Return to Pomodoro Cycle
  //         } else {
  //           this.pomoTimer.activate();
  //           this.pomoTimer.reset();
  //           this.shortPauseTimer.reset();
  //         }
  //       }
  //     }
  //   //In Long Pause Cycle
  //   } else {
  //     this.longPauseTimer.tick();
  //
  //     //Pass to Pomodoro Cycle
  //     if(this.longPauseTimer.hasFinished()) {
  //       this.reset();
  //     }
  //   }
  // }
  //
  // reset(){
  //   this.cycleTimer.reset();
  //   this.pomoTimer.reset();
  //   this.shortPauseTimer.reset();
  //   this.longPauseTimer.reset();
  //
  //   this.cycleTimer.activate();
  //   this.pomoTimer.activate();
  //   this.shortPauseTimer.deactivate();
  //   this.longPauseTimer.deactivate();
  // }
}
