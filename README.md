# Pomodoro

Implementación de un <a href="https://es.wikipedia.org/wiki/T%C3%A9cnica_Pomodoro" target="_blank">Pomodoro</a> configurable en HTML y Javascript. En resumen esta es una técnica para realizar tareas por un periodo prolongado de tiempo. Este consiste en poner un temporizador o Pomodoro durante unos ~25 minutos, dentro del cual se realiza la labor requerida. Al sonar el temporizador, se vuelve a poner por unos ~5 minutos, en donde parte un periodo de descanzo corto. Se repite este procedimiento unas 3 o 4 veces, para luego iniciar una pausa larga de ~20 minutos. Este proceso se repite indefinidamente mientras se esté trabajando. 

El objetivo era crear un Pomodoro el cual no requiriese un servidor, necesitando únicamente un navegador que puediera ejecutar el código.

## Configuración

Considerando que los tiempos dados son relativos y que cada uno tiene su propio ritmo de trabajo, cada temporizador junto con el número de ciclos Pomodoro/Pausa Corta son programables antes de comenzar el Pomodoro. Los valores entre los que se puede configurar son:
* **Pomodoro/Tiempo de Trabajo:** 25 a 60 minutos.
* **Pausa Corta:** 5 a 15 minutos.
* **Pausa Larga:** 15 a 30 minutos.
* **N° Ciclos Pomodoro/Pausa Corta:** 3 a 5 ciclos.

## Acciones
Luego de configurar el Pomodoro y presionar "Iniciar!" este mostrará displayers circulares con cada uno de los temporizadores, junto con un indicador de en que ciclo se está actualmente. Al mismo tiempo aparecerá un mensaje indicando que ha comenzado el ciclo de trabajo. Estos mensajes aparecerán cada vez que se progrese a un nuevo ciclo. Además de la interfaz con los temporizadores del Pomodoro, hay una botonera, en donde se pueden realizar distintas acciones:
* **Iniciar/Continuar:** Se reestablece el curso de los temporizadores.
* **Parar:** Se detiene el tiempo en los temporizadores.
* **Reiniciar:** Se reinician todos los temporizadores. Al reiniciar el Pomodoro este se para, por lo que se tiene que presionar "Iniciar/Continuar" para hacerlo andar nuevamente.
* **Volver a Configuración:** Volver a la vista inicial, en donde se puede volver a configurar el Pomodoro. El Pomodoro actual se reinicia despues de esto.

## Planes a futuro
Se podría considerar este proyecto como finalizado, aunque hay un par de caracteristicas que se desearían agregar. Cuando ocurrirá esto o si se llegaran a implementar en algún día no se sabe.
* Versión en inglés (mayor difusión!).
* Opción para avanzar al siguiente ciclo antes de que termine el tiempo.
* Opción para guardar un perfil, o cambiar los rangos de configuración (si es posible solo con HTML y Javascript).
* Hacer que el navegador cambie automáticamente a la pestaña del Pomodoro una vez terminado un ciclo (si es posible).
* Opción de tener una lista de tareas: Quizas poder agregar una lista de tareas asociadas a un determinado tiempo de trabajo, el cual avanzaría automáticamente y quizas podría progresar al siguiente ciclo de descanzo inmediatamente después de esto. Otra opción podría ser que al momento de terminar una tarea se pueda agregar a una lista junto con el tiempo empleado en ella, generando un listado de tareas realizadas.
* Añadir Boostrap al proyecto o, cualquier otra libreria o interfaz que funcione del lado del cliente.

## Link

Visita y utiliza el Pomodoro para realizar tus tareas en <a href="https://fsalfate.github.io/Pomodoro/" target="_blank">https://fsalfate.github.io/Pomodoro/</a>.
