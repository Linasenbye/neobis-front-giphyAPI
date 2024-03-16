let searchBtn = document.getElementById('search-btn');
let searchInput = document.getElementById('searchInput');

let generateGif = () => {
  let q = document.getElementById('searchInput').value;

  let gifCount = 100;

  let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}`;
  document.querySelector(".wrapper").innerHTML = "";

  //Make a call to API
  fetch(finalURL)
    .then((resp) => resp.json())
    .then((info) => {
      console.log(info.data)

      //All Gifs
      let gifsData = info.data;
      gifsData.forEach((gif) => {
          //Generate Cards for every gif

          let container = document.createElement("div");
          container.classList.add("container");
          let iframe = document.createElement("img");
          console.log(gif);
          iframe.setAttribute("src", gif.images.downsized_medium.url);
          iframe.onload = () => {
            gifCount--;
            if(gifCount == 0) {
              document.querySelector(".wrapper").style.
              display = "grid";
            }
          };
          container.append(iframe);
          document.querySelector(".wrapper").append(container);
      });
    });
    
}
//Generate Gifs on screen load or when user cliks on search

window.addEventListener("load", generateGif);
searchBtn.addEventListener("click", generateGif);

searchInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    generateGif();
  }
});