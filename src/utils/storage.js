import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar os filmes salvos
export async function getSavedMovies(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let savedMovies = JSON.parse(myMovies) || [];

  return savedMovies;
}

// Salvar um novo filme
export async function saveMovie(key, newMovie) {
  let storedMovies = await getSavedMovies(key);

  // Se tiver algum filme salvo com esse mesmo id ou duplicado precisamos ignorar
  const hasMovie = storedMovies.some(item => item.id === newMovie.id);

  if (hasMovie) {
    alert("Este filme já existe na sua lista!");
    return;
  }

  storedMovies.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(storedMovies));
}

// Deletar um filme expecífico
export async function deleteMovie(id) {
  const storedMovies = await getSavedMovies("@reactprime");

  let myMovies = storedMovies.filter(item => {
    return (item.id) !== id;
  });

  await AsyncStorage.setItem("@reactprime", JSON.stringify(myMovies));

  return myMovies;
}

// Filtrar filmes que já estão salvos na lista
export async function hasMovie(movie) {
  let storedMovies = await getSavedMovies("@reactprime");

  const hasMovie = storedMovies.find(item => item.id === movie.id);

  if (hasMovie) {
    return true;
  }

  return false;
}
