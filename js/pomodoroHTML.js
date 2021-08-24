/**
 * General class of the App.
 * Contains the Timers, Manager & Displayer.
 * Also contains the state of the App (loaded/running).
 *
 * @requires PomodoroManager
 * @requires Timer
 * @requires TimeDisplayer
 * @requires CircularTimeDisplayer
 * @requires DisplayerRenderer
 */

class PomodoroHTML {
  #mainDivId;

  #pomodoroManager;

  #pomoTimer;
  #shortPauseTimer;
  #longPauseTimer;
  #cycleTimer;

  #pomoDisp;
  #shortPauseDisp;
  #longPauseDisp;
  #cycleDisp;

  #totalTimeRunning;

  #loaded;
  #running;

  constructor(mainDivId) {
    /**
     * Gets the division where the Pomodoro will be displayed, and creates the
     * Timers and Manager.
     */

    //Getting basic parameters
    this.#loaded = false;
    this.#running = false;
    this.#totalTimeRunning = 0;
    this.#mainDivId = mainDivId;

    //Creating Timers
    this.#pomoTimer = new Timer(45, 25, 60);
    this.#shortPauseTimer = new Timer(10, 5, 15);
    this.#longPauseTimer = new Timer(20, 15, 30);
    this.#cycleTimer = new Timer(4, 3, 5, "ciclo(s)");

    //Creating Pomodoro Manager
    this.#pomodoroManager = new PomodoroManager(
      this.#pomoTimer,
      this.#shortPauseTimer,
      this.#longPauseTimer,
      this.#cycleTimer
    );
  }

  get timeRunning(){
    /**
     * Returns if the App is running or not.
     *
     * @return bool App is running or not.
     */
    return this.#totalTimeRunning;
  }

  load() {
    /**
     * Renders the elements in the App. It has to be called after all the
     * elements in the page has been created. In particular the division that
     * NeuralClock will use to render the elements.
     */

    //If the App hasn't been loaded yet...
    if(!this.#loaded) {

      //Renders Config Inputs
      DisplayerRenderer.renderInputForm(
        this.#mainDivId,
        ["Pomodoro", "Pausa Corta", "Pausa Larga", "N° Ciclos"],
        [this.#pomoTimer, this.#shortPauseTimer, this.#longPauseTimer, this.#cycleTimer]
      );

      //Renders Displayers' Containers
      DisplayerRenderer.renderDisplayers(
        this.#mainDivId
      );

      //Creates each TimeDisplayer
      this.#pomoDisp = new CircularTimeDisplayer(
        "Trabajando",
        "pomodoroT",
        this.#pomoTimer,
        "#F15025"
      );
      this.#shortPauseDisp = new CircularTimeDisplayer(
        "Pausa Corta",
        "shortPauseT",
        this.#shortPauseTimer,
        "#525252"
      );

      this.#longPauseDisp = new CircularTimeDisplayer(
        "Pausa Larga",
        "longPauseT",
        this.#longPauseTimer,
        "#333333"
      );

      this.#cycleDisp = new TimeDisplayer("cycleT", this.#cycleTimer);

      //Loaded true
      this.#loaded = true;
    }
  }

  start(){
    /**
     * Recieves the values from the inputs and starts the app.
     */

    //Getting inputs' values
    this.#pomoTimer.totalTime = document.getElementById("timerInput0").value;
    this.#shortPauseTimer.totalTime = document.getElementById("timerInput1").value;
    this.#longPauseTimer.totalTime = document.getElementById("timerInput2").value;
    this.#cycleTimer.totalTime = document.getElementById("timerInput3").value;

    //Hides the inputs' div and shows the TimeDisplayers
    DisplayerRenderer.swapMainElements();

    //Starts Manager
    this.#pomodoroManager.start();

    //Running true
    this.#running = true;

    this.#updateDisplayers();
  }

  stop(){
    /**
     * Stops counting minutes.
     */
    this.#running = false;
    this.#updateDisplayers();
  }

  continue(){
    /**
     * Continues counting minutes.
     */
    this.#running = true;
    this.#updateDisplayers();
  }

  reset() {
    /**
     * Resets the minutes counting.
     */
    this.#totalTimeRunning = 0;
    this.#pomodoroManager.reset();
    this.stop();
  }

  update() {
    /**
     * Counts a minute in the App. Only works if the App is loaded and running.
     */
    if(this.#loaded && this.#running) {
      ++this.#totalTimeRunning;
      this.#pomodoroManager.update();
      this.#updateDisplayers();
    }
  }

  #updateDisplayers(){
    /**
     * Updates the Displayers and other elements in the App.
     */
    if(this.#loaded){
      //updating Displayers
      this.#pomoDisp.update();
      this.#shortPauseDisp.update();
      this.#longPauseDisp.update();
      this.#cycleDisp.update();

      //Updating minutes passed and running state.
      document.getElementById("minutes").innerText = this.timeRunning;
      document.getElementById("running").innerText = (this.#running)? "[ANDANDO]" : "[DETENIDO]";
    }
  }
}
