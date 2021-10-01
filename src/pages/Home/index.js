import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";

import {
  Container,
  SearchContainer,
  Input,
  SearchButton,
  Title,
  BannerButton,
  Banner,
  MovieSlider,
} from "./styles";
import { Feather } from "@expo/vector-icons";

import Header from "../../components/Header";
import SliderItem from "../../components/SliderItem";

import api, { key } from "../../services/api";
import { getMoviesList } from "../../utils/movies";

function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getMovies() {
      const [nowData, popularData, topData] = await Promise.all([
        api.get("/movie/now_playing", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/popular", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
        api.get("/movie/top_rated", {
          params: {
            api_key: key,
            language: "pt-BR",
            page: 1,
          },
        }),
      ]);

      const nowList = getMoviesList(10, nowData.data.results);
      const popularList = getMoviesList(6, popularData.data.results);
      const topList = getMoviesList(6, topData.data.results);

      setNowMovies(nowList);
      setPopularMovies(popularList);
      setTopMovies(topList);
    }

    getMovies();
  }, []);

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Procurando algo?" placeholderTextColor="#DDD" />

        <SearchButton>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>

        <BannerButton activeOpacity={0.8} onPress={() => alert("teste")}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1459&q=80",
            }}
          />
        </BannerButton>

        <MovieSlider
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={({ item }) => <SliderItem data={ item } />}
          keyExtractor={ (item) => String(item.id) }
        />

        <Title>Populares</Title>

        <MovieSlider
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={({ item }) => <SliderItem data={ item } />}
          keyExtractor={ (item) => String(item.id) }
        />

        <Title>Mais votados</Title>

        <MovieSlider
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={({ item }) => <SliderItem data={ item } />}
          keyExtractor={ (item) => String(item.id) }
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
