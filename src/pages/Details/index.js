import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  GenresList,
  Description,
} from "./styles";
import { ScrollView, Modal } from "react-native";

import { Feather, Ionicons } from "@expo/vector-icons";
import Stars from "react-native-stars";

import Genres from "../../components/Genres";
import ModalLink from "../../components/ModalLink";

import api, { key } from "../../services/api";

function Details() {
  const navigation = useNavigation();
  const route = useRoute();

  const [movie, setMovie] = useState({});
  const [openLink, setOpenLink] = useState(false);

  useEffect(() => {
    let isActive = true;

    async function getMovie() {
      const res = await api
        .get(`/movie/${route.params?.id}`, {
          params: {
            api_key: key,
            language: "pt-BR",
          },
        })
        .catch((err) => {
          alert(err);
        });

      if (isActive) {
        setMovie(res.data);
      }
    }

    if (isActive) {
      getMovie();
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Container>
        <Header>
          <HeaderButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="#fff" />
          </HeaderButton>

          <HeaderButton activeOpacity={0.8}>
            <Ionicons name="bookmark" size={28} color="#fff" />
          </HeaderButton>
        </Header>

        <Banner
          resizeMethod="resize"
          source={{
            uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
          }}
        />

        <ButtonLink activeOpacity={0.8} onPress={() => setOpenLink(true)}>
          <Feather name="link" size={24} color="#fff" />
        </ButtonLink>

        <Title numberOfLines={2}>{movie.title}</Title>

        <ContentArea>
          <Stars
            default={movie.vote_average}
            count={10}
            half={true}
            starSize={20}
            fullStar={<Ionicons name="md-star" size={24} color="#e7a74e" />}
            emptyStar={
              <Ionicons name="md-star-outline" size={24} color="#e7a74e" />
            }
            halfStar={
              <Ionicons name="md-star-half" size={24} color="#e7a74e" />
            }
            disable={true}
            spacing={3}
          />

          <Rate>{movie.vote_average}/10</Rate>
        </ContentArea>

        <GenresList
          data={movie?.genres}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Genres data={item} />}
        />

        <Title>Descrição</Title>

        <Description>{movie.overview}</Description>

        <Modal animationType="slide" transparent={true} visible={openLink}>
          <ModalLink
            link={movie?.homepage}
            title={movie?.title}
            closeModal={() => setOpenLink(false)}
          />
        </Modal>
      </Container>
    </ScrollView>
  );
}

export default Details;
