let currentlySelected = 0; //cuando visualisamos una img se muestra y la otra se esconde. Empezamos en 0 que selecciona el primer elemento
const nodes = document.querySelectorAll(".gallery-img"); // capturamos todas las img
const prevBtn = document.querySelector(".prev");//capturo los botones
const nextBtn = document.querySelector(".next");//capturo los botones

function previous() {
  nextBtn.disabled = false;
  nodes[currentlySelected].classList.remove("active");//.classList es una propiedad que se puede utilizar para obtener una lista de las clases de un elemento de una página web.
  currentlySelected--;
  nodes[currentlySelected].classList.add("active");

  if (currentlySelected === 0) {
    prevBtn.disabled = true;
  }
}

function next() {
  prevBtn.disabled = false;
  nodes[currentlySelected].classList.remove("active"); //cuando hacemos click, vamos a esconder la currentimage
  currentlySelected++; //q pase a la q sigue
  nodes[currentlySelected].classList.add("active");

  if (currentlySelected + 1 === nodes.length) { // +1 porque va a tomar la cantidad de fotos q tengo en el arrayby al sumarle +1 ya no hay mas, entonces ahí le decimos q se corte el next
    nextBtn.disabled = true;
  }
}

function init() {
  prevBtn.addEventListener("click", function() {
    previous();
  });

  nextBtn.addEventListener("click", function(e) {
    next();
  });
}

init();