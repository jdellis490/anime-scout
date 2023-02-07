const searchForm = document.querySelector("#search-bar");
const buttonEl = document.querySelector("#search-btn");
const tokenK = "AIzaSyBOmO9O2FstPY2qYc1OT5fBE7h0GK1yz4Q"; // Restrict when deployed
let vidIdTag;

searchSubmission = (e) => {
  e.preventDefault();
  const inputSearchEl = searchForm.value;
  console.log(inputSearchEl);
  // Alerts user if there is no input
  if (!inputSearchEl) {
    alert("Please enter Anime title!");
    return;
  }
  // Functions that call both API fetches to return data
  // onSearch(inputSearchEl);
  onAnimeSearch(inputSearchEl);
};

// fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=anime%20trailer&key=AIzaSyBOmO9O2FstPY2qYc1OT5fBE7h0GK1yz4Q')
// .then((data) => {
//     console.log(data.json())
// });

// Youtube API fetch for videos
onSearch = (searchValue) => {
  let requestURL =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
    searchValue +
    "%20anime%20trailer&key=" +
    tokenK;
  fetch(requestURL)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      vidIdTag = data.items[0].id.videoId;
      embed(vidIdTag);
      console.log(vidIdTag);
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Embed link for Youtube videos on page
let embed = (vidIdTag) => {
  const embedLink = "https://www.youtube.com/embed/" + vidIdTag;
  document.getElementById("vidIframe").src = embedLink;
};

// Jikan API fetch for anime
// fetch('https://api.jikan.moe/v4/anime')
// .then((response) => {
//     console.log(response.json());
// });

onAnimeSearch = (searchValue) => {
  let requestURL = "https://api.jikan.moe/v4/anime?q=" + searchValue;
  fetch(requestURL)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then(({ data }) => {
      console.log(data);
      displayAnimeCards(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Get api fetch data to display anime info on page and cards
displayAnimeDetails = (anime) => {
  console.log(anime);
  var animeScore = anime.score;
  var animeSynopsis = anime.synopsis;
  if (animeScore && animeSynopsis != null) {
    document.getElementById("anime-info").innerHTML = `<div>
            <h2>${anime.title}</h2>
            <br>
            <br>
            <h6>${anime.synopsis}</h6>
            <br>
            <br>
            <div>
                <h2>Score: ${anime.score} / 10</h2>
            </div>
        </div>`;
  } else {
    document.getElementById("anime-info").innerHTML = `<div>
            <h2>${anime.title}</h2>
            <h6>No Synopsis Data</h6>
            <div>
                <h2>No Score Data</h2>
            </div>
        </div>`;
  }
};

displayAnimeCards = (animes) => {
  let cardsMarkup = "";
  animes.forEach((anime, index) => {
    cardsMarkup += `<a href='#' class='card' data-card-index='${index}'>
                            <div class='card-image'>
                                <img loading='lazy' src='${anime.images.jpg.large_image_url}' alt='${anime.title}'>
                            </div>
                            <div class='card-name'>
                                <span>${anime.title}</span>
                            </div>
                        </a>`;
  });
  document.getElementById("search-results").innerHTML = cardsMarkup;
  document.querySelectorAll(".card").forEach((animeCard) => {
    animeCard.addEventListener("click", (e) => {
      e.preventDefault();
      const cardIndex = parseInt(animeCard.getAttribute("data-card-index"));
      displayAnimeDetails(animes[cardIndex]);
    });
  });
};

// Event listener on button click and runs search function
buttonEl.addEventListener("click", searchSubmission);
