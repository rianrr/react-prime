import React from "react";

import { Ionicons } from "@expo/vector-icons";

import { Container, Banner, Title, RateContainer, Rate } from "./styles";

function SearchItem({ data, navigatePage }) {
  function movieDetails() {
    if (data.release_date === "") {
      alert("Este filme ainda não foi lançado!");

      return;
    }

    navigatePage(data);
  }

  return (
    <Container activeOpacity={0.8} onPress={movieDetails}>
      {data.poster_path ? (
        <Banner
          resizeMethod="resize"
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${data?.poster_path}`,
          }}
        />
      ) : (
        <Banner
          resizeMethod="resize"
          source={require("../../assets/images/no_photo_movie.png")}
        />
      )}

      <Title>{data?.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={14} color="#e7a74e" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}

export default SearchItem;
