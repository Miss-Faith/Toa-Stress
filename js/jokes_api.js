let jokeText = document.getElementById("joke-text");
let jokeButton = document.getElementById("get-joke");

getJoke();

jokeButton.addEventListener("click", getJoke);
function getJoke() {
  fetch("http://icanhazdadjoke.com", {
  headers: {
    Accept: "application/json",
  }})
 .then(response => response.json())
 .then(data => {
   jokeText.innerHTML = data.joke;
 });
}
 
