import React from "react";

import { Ionicons, Feather } from "@expo/vector-icons";

import {
  Container,
  Title,
  RateContainer,
  Rate,
  ActionContainer,
  DetailsButton,
  DeleteButton,
} from "./styles";

function FavoriteItem({ data, deleteMovie, navigatePage }) {
  return (
    <Container>
      <Title size={22}>{data.title}</Title>

      <RateContainer>
        <Ionicons name="md-star" size={12} color="#e7a74e" />

        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>

      <ActionContainer>
        <DetailsButton activeOpacity={0.8} onPress={() => navigatePage(data)}>
          <Title size={14}>Ver detalhes</Title>
        </DetailsButton>

        <DeleteButton activeOpacity={0.8} onPress={() => deleteMovie(data.id)}>
          <Feather name="trash" size={24} color="#fff" />
        </DeleteButton>
      </ActionContainer>
    </Container>
  );
}

export default FavoriteItem;
