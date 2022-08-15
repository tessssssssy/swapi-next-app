import Film from "./Film";
import { useState, useEffect } from "react";

const FilmList = ({ films }) => {
  // if (typeof window !== 'undefined') {

  // }
//   useEffect(() => {
//     // get favourites from local storage
//     const favourites = localStorage.getItem("favourites"); // array of eposode_ids
//     // set favourites to state
//     // const [favouriteFilms, setFavouriteFilms] = useState(
//     //   favourites ? JSON.parse(favourites) : []
//     // );
//     console.log(favourites);
//   }, []);

//   const toggleFavourite = (film) => {
//     // check if film is in favourites
//     const isFavourite = favouriteFilms.find(
//       (favouriteFilmId) => favouriteFilmId === film.episode_id
//     );

//     // if film is in favourites, remove it
//     if (isFavourite) {
//       const filteredFavourites = favouriteFilms.filter(
//         (favouriteFilmId) => favouriteFilmId !== film.episode_id
//       );
//       setFavouriteFilms(filteredFavourites);
//       localStorage.setItem("favourites", JSON.stringify(filteredFavourites));
//     } else {
//       // if film is not in favourites, add it
//       setFavouriteFilms([...favouriteFilms, film.episode_id]);
//       localStorage.setItem(
//         "favourites",
//         JSON.stringify([...favouriteFilms, film.episode_id])
//       );
//     }
//     console.log(favouriteFilms);
//   };

  return (
    <div>
      {films.map((film) => (
        <Film
          key={film.episode_id}
          film={film}

        />
      ))}
    </div>
  );
};

export default FilmList;
