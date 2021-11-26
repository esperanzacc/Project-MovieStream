//page onload. Part 1 : when user onload the page....
window.onload = () => {
  let moviesCountDOM = document.getElementById("movies-count");
  let moviePerPage = +moviesCountDOM.value;
  // console.log(moviePerPage);
  let moviesListDOM = document.getElementById("movies-list");

  // When html is loaded, get the movies from the API and start from movieID = 1, until the items are 20
  getMovies(moviePerPage, moviesListDOM);
  // console.log(getMovies(moviePerPage, moviesListDOM));

  // Part 2 : when user change something, page will......

  //when user change the number of lists, movie list will update to what you want
  moviesCountDOM.addEventListener("change", (e) => {
    moviePerPage = +moviesCountDOM.value;
    // console.log(moviePerPage);
    getMovies(moviePerPage, moviesListDOM);
    // console.log(getMovies(moviePerPage, moviesListDOM));
  });

  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  // Object.onkeydown = function(){ }:execute a JavaScript when a user is pressing a key
  // Here, want to avoid the search input type in negative number. Limit user only can type numbers and use arrow left, right and backspace to revise their input.
  // keycode 47-58 are from number 0-9; 8 = backspace; 37 = arrow left; 39 = arrow right
  searchInput.onkeydown = (e) => {
    if (
      (e.keyCode > 47 && e.keyCode < 58) ||
      e.keyCode === 8 ||
      e.keyCode === 37 ||
      e.keyCode == 39
    ) {
      return;
    } else {
      return false;
    }
  };

  // check search input is empty or not and alert user. If not will go another detailed page
  searchButton.addEventListener("click", (e) => {
    if (searchInput.value === "") {
      alert("Please enter a number");
    } else {
      window.location.href = "./movie-detail.html?movieId=" + searchInput.value;
    }
  });

  // make sure user need to type number, or when user doesn't type anything, page will alert
  // keycode 13=enter
  searchInput.addEventListener("keyup", function (e) {
    if (e.keyCode === 13 && searchInput.value === "") {
      alert("Please enter a number");
    } else if (e.keyCode === 13) {
      return (window.location.href =
        "./movie-detail.html?movieId=" + searchInput.value);
    } else {
      return false;
    }
  });
};

// Part 3 : get movie data from movie API. when javascript want to get the getMovies result, it needs to wait for getMovieApi Promise done and continues to do next step.
// Use async await function

async function getMovies(moviesCount, moviesListDOM) {
  const apiKey = "4b2bf35c6fc0d742e41e83d3d56ee9b5";
  movies = [];
  movieId = 1;
  let movieListInnerHTML = "";
  let getMovieAPI = (movieId) =>
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
  async function getApiObject() {
    while (movies.length < moviesCount) {
      //when to stop
      console.log(moviesCount); //per page list
      console.log(movies.length); //from index 0 to index movies.length-1

      response = await getMovieAPI(movieId); // promise
      console.log(response);
      if (response.status === 200) {
        const movie = await response.json(); //promise
        // Filter out movies with no poster and adult content
        if (movie.poster_path && movie.adult !== true) {
          movies.push(movie);

          movieListInnerHTML += applyMovieTemplate(
            //""+function template
            movieId,
            movie.poster_path,
            movie.title
          );
          moviesListDOM.innerHTML = movieListInnerHTML;
        }
      }
      // Random any integer
      movieId = Math.abs(Math.floor(Math.random() * 903260) + 1);
    }
    return movies;
  }

  await getApiObject();
  console.log(getApiObject());
}

//each time, when you press one movie poster, the item will create these below information.
const applyMovieTemplate = (id, image, title) =>
  `<a class="litteSquare" href="./movie-detail.html?movieId=${id}">
    <img class="image" src="https://image.tmdb.org/t/p/original/${image}"/>
    <div class="movie-title-mask">
      <span class="movie-title">${title}</span>
    </div>
  </a>`;

// Part 4: add another function in your page >>>ontop button
window.onscroll = scrollFunction;

function scrollFunction() {
  if (
    document.body.scrollTop > 200 || //for safari
    document.documentElement.scrollTop > 200 // For Chrome, Firefox, IE and Opera
  ) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}
// When the user clicks on the button, jump to the top of the page
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
