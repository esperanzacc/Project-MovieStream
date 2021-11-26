// Part 1: Page onload
window.onload = () => {
  //http://127.0.0.1:5500/Movie-API/movie-detail.html?movieId=44
  const queryString = window.location.search;
  //window.location is a reference to a Location object; it represents the current URL of the document being displayed in that window
  console.log(queryString); //?movieId=44
  const queryParams = new URLSearchParams(queryString); //return a URLSearchObject
  //URLSearchParams()constructor creates and returns a new URLSearchParams
  console.log(queryParams); //URLSearchParams{}
  const movieId = queryParams.get("movieId");
  const movieDetailDOM = document.getElementById("movie-detail");

  if (movieId !== null) {
    getMovie(movieDetailDOM, movieId);
  }
};

//Part2:Show on Page

async function getMovie(movieDetailDOM, movieId) {
  let movieDetailInnerHTML = "";
  const apiKey = "4b2bf35c6fc0d742e41e83d3d56ee9b5";
  const getMovieAPI = (movieId) =>
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);

  await (async function () {
    const response = await getMovieAPI(movieId);
    console.log(response);
    if (response.status === 200) {
      const movie1 = await response.json(); //correct information return a object in json
      console.log(movie1);

      movieDetailInnerHTML += applyMovieDetailTemplate(movie1);
      movieDetailDOM.innerHTML = movieDetailInnerHTML;
    }
  })();
}

//The ALT attribute specifies alt text for images if they can’t or don’t load.
const applyMovieDetailTemplate = (movie) => `
        <div class="movie-detail-image">
            <img src="https://image.tmdb.org/t/p/w500${
              movie.poster_path
            }" alt="${movie.title}"> 
        </div>
        <h2>${movie.title}</h2><div>
        <label style=font-weight:bold>Adult : </label><span>${
          movie.adult
        }</span>
        </div>
        <p >${movie.overview}</p>
        <div>
        <label style=font-weight:bold>Runtime : </label><span>${
          movie.runtime
        }</span>
        </div>
        <div>
        <label style=font-weight:bold>Status : </label><span>${
          movie.status
        }</span>
        </div>
        <div>
        <label style=font-weight:bold>Release Date : </label><span>${
          movie.release_date
        }</span>
        </div>
        <br>
        <div>
        <label style=font-weight:bold>Vote Average : </label><span>${
          movie.vote_average
        }</span>
        </div>
        <div>
        <label style=font-weight:bold>Vote Count : </label><span>${
          movie.vote_count
        }</span>
        </div>
        <div>
        <label style=font-weight:bold>Popularity : </label><span>${
          movie.popularity
        }</span>
        </div>
        <br>
        <div>
        <label style=font-weight:bold>Tagline : </label><span>${
          movie.tagline
        }</span>
        </div>
        <div>
        <label style=font-weight:bold>Genres : </label>
        <span>
        ${movie.genres.map((genre) => ` ${genre.name}`).join(", ")}
        </span>
        </div>
      
        <br>
        <div>
        <label style=font-weight:bold>Original Language : </label><span>${
          movie.original_language
        }</span>
        </div>
        <div>
        <label style=font-weight:bold>Spoken Languages : </label>
        <span>
        ${movie.spoken_languages
          .map((language) => `${language.name}`)
          .join(",")}
        </span>
        </div>
        <div>
        <label style=font-weight:bold>Production Countries : </label>
        <span>
        ${movie.production_countries
          .map((country) => `${country.name}`)
          .join(", ")}
        </span>
        </div>
        <div>
        <label style=font-weight:bold>Production Companies : </label>
        ${movie.production_companies
          .map((company) => `${company.name}`)
          .join(", ")}
    
        </div>
        <div>
        
        
`;
