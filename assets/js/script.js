const searchForm = document.querySelector('#searchBar');
const buttonEl = document.querySelector('#searchBtn');

searchSubmission = (e) => {
    e.preventDefault();
    const inputSearchEl = searchForm.value;
    console.log(inputSearchEl);
    // Alerts user if there is no input
    if (!inputSearchEl) {
        alert('Please enter Anime title!');
        return;
    }
}

// Event listener on button click and runs search function
buttonEl.addEventListener('click', searchSubmission);