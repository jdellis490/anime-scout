const searchForm = document.querySelector('#search-bar');
const buttonEl = document.querySelector('#search-btn');
const tokenK = 'AIzaSyBOmO9O2FstPY2qYc1OT5fBE7h0GK1yz4Q'; // Restrict when deployed
let vidIdTag;

searchSubmission = (e) => {
    e.preventDefault();
    const inputSearchEl = searchForm.value;
    console.log(inputSearchEl);
    // Alerts user if there is no input
    if (!inputSearchEl) {
        alert('Please enter Anime title!');
        return;
    }
    // onSearch(inputSearchEl);
}

// fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=anime%20trailer&key=AIzaSyBOmO9O2FstPY2qYc1OT5fBE7h0GK1yz4Q')
// .then((data) => {
//     console.log(data.json())
// });

// Embed link for Youtube videos on page
let embed = (vidIdTag) => {
    const embedLink = 'https://www.youtube.com/embed/' + vidIdTag;
    document.getElementById('vidIframe').src = embedLink;
}

// Youtube API fetch for videos
onSearch = (searchValue) => {
    const requestURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=' + searchValue + '%20anime%20trailer&key=' + tokenK;
    fetch(requestURL)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            vidIdTag = data.items[0].id.videoId;
            embed(vidIdTag)
            console.log(vidIdTag);
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
}

// Jikan API fetch for anime
fetch('https://api.jikan.moe/v4/anime')
.then((response) => {
    console.log(response.json());
});

// Event listener on button click and runs search function
buttonEl.addEventListener('click', searchSubmission);