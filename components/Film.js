import { useState } from "react";
import Link from 'next/link';

// pass down whether film is favourite or not
const Film = ({ key, film, toggleFavourite }) => {
  return (
    <div>
        <Link href={{pathname: "/films/[id]", query: { id: film.episode_id }}} >
            <h2>{film.title}</h2>
        </Link>
      <p>{film.opening_crawl}</p>
      <button onClick={() => toggleFavourite(film)}>Favourite</button>
    </div>
  );
};

export default Film;
