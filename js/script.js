const API_URL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";

const SEARCH_URL =
    "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

// getMovies(API_URL);
const mainEl = document.querySelector("#main");
const formEl = document.getElementById("form");
const serchEl = document.getElementById("search");

fetchMovies(API_URL);

async function fetchMovies(url) {
    const res = await fetch(url);
    const { results: movies } = await res.json();
    mainEl.innerHTML = "";
    movies.forEach(renderMovie);
}

function renderMovie({ title, overview, vote_average, poster_path }) {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    if (vote_average > 8) {
        ratingColor = "green";
    } else if (vote_average > 7) {
        ratingColor = "orange";
    } else ratingColor = "red";

    movieEl.innerHTML = `   <img src="${
        IMG_PATH + poster_path
    }" alt="${title}" >
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${ratingColor}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3> Overview</h3>
                ${overview}
            </div>`;
    mainEl.appendChild(movieEl);
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = serchEl.value;
    if (searchTerm) {
        serchEl.value = "";
        fetchMovies(SEARCH_URL + searchTerm);
    }else window.location.reload()
});
