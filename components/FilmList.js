import Film from "./Film";
import { useState, useEffect } from "react";

const FilmList = ({ films }) => {
const [favouriteFilms, setFavouriteFilms] = useState([]);
const [filmList, setFilmList] = useState(films);
  useEffect(() => {
    // get favourites from local storage
    localStorage.clear();
    const favourites = localStorage.getItem("favourites"); // array of eposode_ids
    // set favourites to state
    setFavouriteFilms(favourites ? JSON.parse(favourites) : []);
    console.log("localstorage", favourites);
  }, []);

  useEffect(() => sortFilmList(filmList), [favouriteFilms]);

  const toggleFavourite = (film) => {
    // check if film is in favourites
    console.log("toggle favourite", favouriteFilms);
    const isFavourite = favouriteFilms.find(
      (favouriteFilmId) => favouriteFilmId === film.episode_id
    );

    // if film is in favourites, remove it
    if (isFavourite) {
      const filteredFavourites = favouriteFilms.filter(
        (favouriteFilmId) => favouriteFilmId !== film.episode_id
      );
      setFavouriteFilms(filteredFavourites);
      localStorage.setItem("favourites", JSON.stringify(filteredFavourites));
    } else {
      // if film is not in favourites, add it
      setFavouriteFilms([...favouriteFilms, film.episode_id]);
      localStorage.setItem(
        "favourites",
        JSON.stringify([...favouriteFilms, film.episode_id])
      );
    }
    console.log(favouriteFilms);
  };

  const sortFilmList = (films) => {
    // check if film is in favourites and sort accordingly
    const filmsCopy = [...films];
    const sortedFilms = filmsCopy.sort((a, b) => {
      const isAFavourite = favouriteFilms.find(
        (favouriteFilmId) => favouriteFilmId === a.episode_id
      );
      const isBFavourite = favouriteFilms.find(
        (favouriteFilmId) => favouriteFilmId === b.episode_id
      );
      if (isAFavourite && !isBFavourite) {
        return -1;
      } else if (!isAFavourite && isBFavourite) {
        return 1;
      } else {
        return 0;
      }
    }
    );
    console.log(sortedFilms)
    setFilmList(sortedFilms);
  }
  
  return (
    <div>
      {filmList.map((film) => (
        <Film
          key={film.episode_id}
          film={film}
          toggleFavourite={toggleFavourite}
        />
      ))}
    </div>
  );
};

export default FilmList;
