// Setează cheia API pe care ai obținut-o de pe site-ul TMDb
const apiKey = '7b5a2bbd68bcf270ce64e08991e44e34';

// Funcție pentru a obține detalii despre un film specific
function getTopHorrorMovies() {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=1000&include_adult=false`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
        return data.results.slice(0, 10);
  
        // Similar cu codul anterior, creează carduri pentru fiecare film și afișează-le
        // ...
      })
    .catch(error => {
      console.error('Eroare la obținerea datelor pentru filme horror:', error);
    });
}

// Funcție pentru a obține URL-ul imaginii posterului
function getMoviePosterUrl(posterPath) {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

// Funcție pentru a afișa detalii pentru mai multe filme
function displayTopHorrorMovies() {
  const movieDetailsElement = document.getElementById('movie-details');

  // Divizează lista de filme în două grupuri de câte 5 filme
//   for (let i = 0; i < 2; i++) {
//     const movieSubset = movieIds.slice(i * 5, (i + 1) * 5);

getTopHorrorMovies()
    .then(topHorrorMovies => {

    // Creați un container pentru fiecare set de filme
    const firstRow = document.createElement('div');
    firstRow.className = 'movie-row';

    // Creați un container pentru fiecare set de filme
    const secondRow = document.createElement('div');
    secondRow.className = 'movie-row';

    // Afișați fiecare film în containerul corespunzător
    topHorrorMovies.forEach((data, index) => {
        const moviePosterUrl = getMoviePosterUrl(data.poster_path);

        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
          <img src="${moviePosterUrl}" alt="${data.title} Poster" width="150">
          <h1>${data.title}</h1>
          <p>${data.overview}</p>
          <p>Rating: ${data.vote_average}</p>
        `;

       // Adăugați cardul la primul sau al doilea rând în funcție de index
      if (index < 5) {
        firstRow.appendChild(movieCard);
      } else {
        secondRow.appendChild(movieCard);
      }

      // Adăugați rândurile în containerul principal
      if (index === topHorrorMovies.length - 1) {
      movieDetailsElement.appendChild(firstRow);
      movieDetailsElement.appendChild(secondRow);
      }
    });
  });
}

// const genreIdForHorror = 27; // ID-ul pentru genul "horror" în TMDb

// displayMoviesInTwoRows(genreIdForHorror, []);

// Lista cu ID-urile celor 10 filme pe care dorești să le afișezi
// const movieIds = [19995, 240, 13, 155, 680, 156, 234, 1271, 35, 114]; 

// Apelul funcției pentru a afișa cele 10 filme pe două rânduri
displayTopHorrorMovies();