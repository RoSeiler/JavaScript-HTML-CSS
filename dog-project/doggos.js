const BREEDS_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");

fetch(BREEDS_URL)
  .then((response) => {
    return response.json();
  })
  .then(function (data) {
    //console.log(data);
    const breedsObject = data.message;
    const breedsArray = Object.keys(breedsObject);

    for (let i = 0; i < breedsArray.length; i++) {
      const option = document.createElement("option"); //creamos una etiqueta option
      option.value = breedsArray[i];
      option.innerText = breedsArray[i];
      select.appendChild(option); //agregamos el option al div padre
    }
  })

  .catch(function (error) {
    console.log("Error!");
  });

select.addEventListener("change", function (event) {
    const breed = event.target.value;
    console.log(breed,event);

  let url = `https://dog.ceo/api/breed/${breed}/images/random`;
  getDoggo(url);
});

const img = document.querySelector(".dog-img");
const spinner = document.querySelector(".spinner");

function getDoggo(url) {
  spinner.classList.add("show"); 
  img.classList.remove("show"); 

  fetch(url)
    .then(function (res) {
      return res.json(); //variable data q reciba res.json()
    })
    .then(function (data) { //es el json q estamos parseando arriba
      img.src = data.message; 

      spinner.classList.remove("show"); 
      img.classList.add("show"); 
      return "rocio"
      
    })
    .then(function(nombre){
        console.log(nombre);
    })
}
