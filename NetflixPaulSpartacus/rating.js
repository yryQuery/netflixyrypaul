// Setează cheia API pe care ai obținut-o de pe site-ul TMDb
const apiKey = '7b5a2bbd68bcf270ce64e08991e44e34';

// Funcție pentru a obține detalii despre un film specific
function getMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => {
      console.error('Eroare la obținerea datelor pentru filmul cu ID:', movieId, error);
    });
}

// Funcție pentru a obține URL-ul imaginii posterului
function getMoviePosterUrl(posterPath) {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

// Funcție pentru a afișa detalii pentru mai multe filme
function displayMoviesInTwoRows(movieIds) {
  const movieDetailsElement = document.getElementById('movie-details');

  // Divizează lista de filme în două grupuri de câte 5 filme
//   for (let i = 0; i < 2; i++) {
//     const movieSubset = movieIds.slice(i * 5, (i + 1) * 5);

    // Creați un container pentru fiecare set de filme
    const firstRow = document.createElement('div');
    firstRow.className = 'movie-row';

    // Creați un container pentru fiecare set de filme
    const secondRow = document.createElement('div');
    secondRow.className = 'movie-row';

    // Afișați fiecare film în containerul corespunzător
    movieIds.forEach( (movieId, index ) => {
      getMovieDetails(movieId).then(data => {
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
      if (index === movieIds.length - 1) {
      movieDetailsElement.appendChild(firstRow);
      movieDetailsElement.appendChild(secondRow);
      }
    });
  });
}

// Lista cu ID-urile celor 10 filme pe care dorești să le afișezi
const movieIds = [19995, 240, 13, 155, 680, 156, 234, 1271, 35, 114]; 

// Apelul funcției pentru a afișa cele 10 filme pe două rânduri
displayMoviesInTwoRows(movieIds);