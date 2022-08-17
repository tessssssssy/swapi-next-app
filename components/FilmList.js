import Film from "./Film";
import { useState, useEffect } from "react";
import styles from "../styles/FilmList.module.scss";

const FilmList = ({ films }) => {
  const [favouriteFilms, setFavouriteFilms] = useState([]);
  const [filmList, setFilmList] = useState(films);
 
  useEffect(() => {
    // get favourites from local storage
    const favourites = localStorage.getItem("favourites"); // array of eposode_ids
    // set favourites to state
    setFavouriteFilms(favourites ? JSON.parse(favourites) : []);
  }, []);

  useEffect(() => sortFilmList(filmList), [favouriteFilms]);
  useEffect(() => sortFilmList(films), [films]);

  const toggleFavourite = (film) => {
    // check if film is in favourites
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
  };

  const isFavourite = (film) => {
    return favouriteFilms.includes(film.episode_id);
  }

  const sortFilmList = (films) => {
    // check if film is in favourites and sort accordingly
    const sortedFilms = [...films].sort((a, b) => {
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
    });
    setFilmList(sortedFilms);
  };

  return (
    <div className={styles.filmcontainer}>
      {filmList.map((film) => (
        <Film
          key={film.episode_id}
          film={film}
          toggleFavourite={toggleFavourite}
          favourite={isFavourite(film)}
        />
      ))}
    </div>
  );
};

export default FilmList;
