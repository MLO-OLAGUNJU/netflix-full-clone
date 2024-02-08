import React, { useEffect, useState } from "react";
import requests from "../Requests";

const Main = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(requests.requestPopular).then((respons) => {
      setMovies(response.data);
    });
  }, []);

  console.log(movies);

  return <></>;
};

export default Main;
