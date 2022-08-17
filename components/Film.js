import { useState } from "react";
import Link from 'next/link';
import styles from "../styles/Film.module.scss";

// pass down whether film is favourite or not
const Film = ({ key, film, toggleFavourite, favourite }) => {
  return (
    <div className={styles.container}>
        <Link href={{pathname: "/films/[id]", query: { id: film.episode_id }}} >
            <h2>{film.title}</h2>
        </Link>
      <p>{film.opening_crawl}</p>
      <div className={styles.favourite} onClick={() => toggleFavourite(film)}>{favourite ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}</div>
    </div>
  );
};

export default Film;
