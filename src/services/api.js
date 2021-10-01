import axios from "axios";

// /movie/now_playing/?api_key=27295aba373b292a1ebd34cff20d149b&pt-BR&page=1

export const key = "27295aba373b292a1ebd34cff20d149b";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default api;
