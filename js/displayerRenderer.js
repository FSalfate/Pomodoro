/**
 * Static class with methods for rendering the Input Form and the
 * Pomodoro Displayer.
 *
 * @requires NeuralClock
 * @requires Timer
 */
class DisplayerRenderer {
  static renderInputForm(divId, labelArr, timerArr){
    /**
     * Renders the Inputs from which the Pomodoro will take its parameters (
     * Timers' total time).
     *
     * @param {string} divId Division where the input is going to be rendered.
     * @param {Array} labelArr Text that will be displayed next to the input.
     * @param {Array} timerArr Array of timers for which the inputs will set the total time.
     */

    //Getting main div and creating input div, form, fieldset, legend and submit
    const mainDiv = document.getElementById(divId);
    const inputDiv = document.createElement("div");
    const form = document.createElement("form");
    const fieldSet = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const submit = document.createElement("input");

    //Configuring the elements created/retrieved
    mainDiv.innerHTML = "";
    inputDiv.id = "formDiv";
    form.action = "javascript:pomodoroHTML.start();";
    legend.innerText = "Configura tu Temporizador Pomodoro";
    submit.type = "submit";
    submit.value = "Iniciar!";

    //Building the structure {main}<-{input div}<-{form}<-{fieldset}<-{legend}
    mainDiv.appendChild(inputDiv);
    inputDiv.appendChild(form);
    form.appendChild(fieldSet);
    fieldSet.appendChild(legend);

    //For each timer...
    timerArr.forEach((item, i) => {

      //Create Label, Input and Output
      const label = document.createElement("label");
      const input = document.createElement("input");
      const output = document.createElement("output");

      //Configuring the elements.
      //Min and Max of input are the Min and Max of Timer.
      input.type = "range";
      input.value = item.totalTime;
      input.min = item.minTotalTime;
      input.max = item.maxTotalTime;
      input.name = "timerInput"+i;
      input.id = "timerInput"+i;

      label.innerText = "Escoja la duración de " + labelArr[i];
      label.for = input.id;

      //Configuring output --> When input is updated its value is displayed in output
      output.value = input.value + " " + item.unit;
      const fun = function(x){x.nextElementSibling.value = x.value + " " + item.unit;};
      input.oninput = function() {fun(this);};

      //Building row <- {label} - {input} - {output} - {br}
      fieldSet.appendChild(label);
      fieldSet.appendChild(input);
      fieldSet.appendChild(output);
      fieldSet.appendChild(document.createElement("br"));
    });

    //Adding extra br and submit button to fieldset
    fieldSet.appendChild(document.createElement("br"));
    fieldSet.appendChild(submit);
  }

  static renderDisplayers(divId){
    /**
     * Render the general container of the TimeDisplayers.
     */

    /*Creates the divisions. The general overlay is top (cycles), displayer
    (pomodoro and pauses) and bottom (buttons and messages)*/
    const mainDiv = document.getElementById(divId);
    const mainDispDiv = document.createElement("div");
    const topDiv = document.createElement("div");
    const dispDiv = document.createElement("div");
    const bottomDiv = document.createElement("div");

    //Configuring divisions
    mainDispDiv.style.display = "none";
    mainDispDiv.id = "displayer";
    topDiv.className = "cycleDiv";
    dispDiv.className = "circDispContainer";

    //Building overlay
    mainDiv.appendChild(mainDispDiv);
    mainDispDiv.appendChild(topDiv);
    mainDispDiv.appendChild(dispDiv);
    mainDispDiv.appendChild(bottomDiv);

    //Creating timer's divisions
    const cycleDiv = document.createElement("div");
    const pomoDiv = document.createElement("div");
    const shortPauseDiv = document.createElement("div");
    const longPauseDiv = document.createElement("div");
    const bracket = document.createElement("div");

    //Configuring timer's divisions
    pomoDiv.id = "pomodoroT";
    shortPauseDiv.id = "shortPauseT";
    longPauseDiv.id = "longPauseT";

    pomoDiv.className = "circDispDiv";
    shortPauseDiv.className = "circDispDiv";
    longPauseDiv.className = "circDispDiv";

    cycleDiv.id = "cycleT";
    bracket.className = "bracketSign";

    //Adding cycleDiv to top and the Pomodoro and Pauses divs to dispDiv.
    topDiv.appendChild(cycleDiv);
    topDiv.appendChild(bracket);
    dispDiv.appendChild(pomoDiv);
    dispDiv.appendChild(shortPauseDiv);
    dispDiv.appendChild(longPauseDiv);

    //Creating the buttom parts.
    this.#addBottomElems(bottomDiv);
  }

  static swapMainElements(){
    /**
     * Swaps the visibility of the inputs' division and TimeDisplayer's division.
     * In all times one is visible and the other isn't.
     */
    const mainDisp = document.getElementById("displayer");
    const mainForm = document.getElementById("formDiv");

    mainDisp.style.display = (mainDisp.style.display == "none") ? "block" : "none";
    mainForm.style.display = (mainForm.style.display == "none") ? "block" : "none";
  }

  static #addBottomElems(bottomDiv){
    /**
     * Creates the bottom elements in the TimeDisplayer's division.
     */

    /*Creating elements -> total minutes' paragraph and span, running state
    paragraph, and control buttons start/continue-stop-reset-return
    */
    const msg = document.createElement("p");
    const minSpan = document.createElement("span");
    const running = document.createElement("p");
    const startButton = document.createElement("input");
    const stopButton = document.createElement("input");
    const resetButton = document.createElement("input");
    const returnButton = document.createElement("input");

    //Configuring elements
    minSpan.id = "minutes";
    running.id = "running";
    minSpan.innerText = "0";
    running.innerText = "[ANDANDO]";
    running.style.fontWeight = "bold";

    //Inputs' types
    startButton.type = "button";
    stopButton.type = "button";
    resetButton.type = "button";
    returnButton.type = "button";

    //Inputs' text
    startButton.value = "Iniciar/Continuar";
    stopButton.value = "Parar";
    resetButton.value = "Reiniciar";
    returnButton.value = "Volver a Configurar";

    //Adding functionality. It's asummed neuralClock var exists.
    startButton.onclick = function(){pomodoroHTML.continue();};
    stopButton.onclick = function(){pomodoroHTML.stop();};
    resetButton.onclick = function(){pomodoroHTML.reset();};
    returnButton.onclick = function(){pomodoroHTML.reset(); DisplayerRenderer.swapMainElements();};

    //Appending elements
    bottomDiv.appendChild(msg);
    bottomDiv.appendChild(running);
    bottomDiv.appendChild(startButton);
    bottomDiv.appendChild(stopButton);
    bottomDiv.appendChild(resetButton);
    bottomDiv.appendChild(returnButton);
    msg.appendChild(document.createTextNode("Has trabajado "));
    msg.appendChild(minSpan);
    msg.appendChild(document.createTextNode(" minuto(s)."));
  }
}
