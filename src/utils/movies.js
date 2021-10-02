// Gerar uma lista de filmes com o tamanho que desejar
export function getMoviesList(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    popularMovies.push(movies[i]);
  }

  return popularMovies;
}

// Gerar um número aleatório com base no tamanho da lista de filmes que passarmos
export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}
