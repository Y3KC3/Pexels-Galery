import axios from "axios";

//563492ad6f9170000100000186d52d78c1014f14b0eefa81764909ee

export const getImages = async (searchTerm = "programming") =>
  await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
    headers: {
      Authorization: "563492ad6f9170000100000186d52d78c1014f14b0eefa81764909ee",
    },
  });
