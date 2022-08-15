import { useState } from "react";
import Link from 'next/link';

const Film = ({ film }) => {
  return (
    <div>
        <Link href={{pathname: "/films/[id]", query: { id: film.episode_id }}} >
            <h2>{film.title}</h2>
        </Link>
      <p>{film.opening_crawl}</p>
      <button >Favourite</button>
    </div>
  );
};

export default Film;
