// VARIABLES
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// EVENTOS
eventListeners();
function eventListeners() {
  //Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweets);
  //Cuando el documento esta listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    createHTML();
  });
}

// FUNCIONES
function agregarTweets(e) {
  e.preventDefault();

  //Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  //Validacion
  if (tweet == "") {
    mostrarError("El mensaje no puede ir vacio");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];

  //Crear HTML
  createHTML();
  //Reiniciar el formulario
  formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  // Insetar el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  // Elimina la alerta despues de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra un listado de los tweets
function createHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Boton eliminat Tweet
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";
      //Funcion Borrar Tweet
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };
      // Crear HTML
      const li = document.createElement("li");
      //Añadir el texto
      li.innerText = tweet.tweet;
      //Asignar el Boton
      li.appendChild(btnEliminar);
      //Insertar en el HTML
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}

//Agrega los tweest actuales al localStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Limpiar HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

//Borrar Tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  createHTML();
}
