const url = "http://localhost:3001/movies";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((movies) => {
      if (movies.length > 0) {
        let html = `<ul class="list-unstyled row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">`;
        movies.forEach((movie) => {
          let genreColor = "secondary";

          if (movie.genre === "Action") genreColor = "danger";
          else if (movie.genre === "Komedi") genreColor = "warning";
          else if (movie.genre === "Drama") genreColor = "info";
          else if (movie.genre === "Skräck") genreColor = "dark";
          else if (movie.genre === "Crime") genreColor = "primary";
          else if (movie.genre === "Sci-Fi") genreColor = "custom-cyan";
          else if (movie.genre === "Fantasy") genreColor = "custom-purple";

          html += `
            <li class="col data-id="${movie.id}"">
              <div class="card border-${genreColor} h-100">
                <div class="card-header text-white bg-${genreColor}">
                  <h5 class="card-title">${movie.movieName}</h5>
                </div>
                <div class="card-body">
                  <p class="card-text">Genre: ${movie.genre}</p>
                  <p class="card-text">Betyg: ${movie.rating}</p>
      
                </div>
                <div class="card-footer text-center">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm me-2"
                    onclick="setCurrentMovie(${movie.id}, event)"
                  >
                    Ändra
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    onclick="deleteMovie(${movie.id}, event)"
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            </li>
          `;
        });
        html += `</ul>`;

        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    });
}

function setCurrentMovie(id, event) {
  event.preventDefault();
  console.log("current", id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((movie) => {
      console.log(movie);
      movieForm.movieName.value = movie.movieName;
      movieForm.genre.value = movie.genre;
      movieForm.rating.value = movie.rating;

      localStorage.setItem("currentId", movie.id);
      console.log(localStorage.getItem("currentId"));
    });
}

function deleteMovie(id, event) {
  event.preventDefault();
  console.log("delete", id);
  fetch(`${url}/${id}`, { method: "DELETE" }).then((result) => {
    if (result.ok) {
      console.log("Filmen borttagen");
      fetchData();
    } else {
      console.error("Fel vid borttagning av film");
    }
  });
}

movieForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverMovieObject = {
    movieName: "",
    genre: "",
    rating: "",
  };
  serverMovieObject.movieName = movieForm.movieName.value;
  serverMovieObject.genre = movieForm.genre.value;
  serverMovieObject.rating = movieForm.rating.value;

  const id = localStorage.getItem("currentId");
  if (id) {
    serverMovieObject.id = id;
  }

  const request = new Request(url, {
    method: serverMovieObject.id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverMovieObject),
  });

  fetch(request).then((response) => {
    console.log("Response received", response);
    fetchData();

    localStorage.removeItem("currentId");

    movieForm.reset();
  });
}

function handleClear() {
  localStorage.removeItem("currentId");
  console.log("currentId rensad");
}

const clearButton = document.querySelector('button[name="clearMovieForm"]');
clearButton.addEventListener("click", handleClear);
