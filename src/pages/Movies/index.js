import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import { Container, MoviesList } from "./styles";

import Header from "../../components/Header";
import FavoriteItem from "../../components/FavoriteItem";

import { getSavedMovies, deleteMovie } from "../../utils/storage";

function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getSavedMovies("@reactprime");

      if (isActive) {
        setMovies(result);
      }
    }

    if (isActive) {
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    };
  }, [isFocused]);

  async function handleDelete(id) {
    const result = await deleteMovie(id);
    setMovies(result);
  }

  function navigateDetailsPage() {
    navigation.navigate("Details", { id: item.id });
  }

  return (
    <Container>
      <Header title="Minha Lista" />

      <MoviesList
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={() => navigateDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Movies;
