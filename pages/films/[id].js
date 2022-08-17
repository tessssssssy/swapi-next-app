import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Tooltip from "../../components/Tooltip";
import styles from "../../styles/FilmPage.module.scss";

const apiEndpoint = "https://swapi.dev/api/";

export async function getStaticPaths() {
  const res = await fetch(`${apiEndpoint}films/`);
  const films = await res.json();

  const paths = films.results.map((film) => ({
    params: { id: film.episode_id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`${apiEndpoint}films/${id}`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

const FilmPage = ({ data }) => {
  const [film, setFilm] = useState(data);

  const getNestedData = async (category) => {
    const nestedData = [];
    // loop over nested data and fetch each url
    // change characters to people
    if (category === "characters") {
      category = "people";
    }
    // loop over api and increment page param while next page exists
    let page = 1;
    let next = true;
    while (next) {
      const res = await fetch(
        `${apiEndpoint}${category}/?page=${page}&format=json`
      );
      const data = await res.json();
      next = data.next;
      page++;
      nestedData.push(...data.results);
    }

    return nestedData;
  };

  const filterNestedData = (nestedData, film, category) => {
    const filteredData = [];
    // loop over each object in the nested data and check if url is in the current film
    nestedData.forEach((result) => {
      // check if result.url is in the current film
      if (film[category].includes(result.url)) {
        filteredData.push(result);
      }
    });
    return filteredData;
  };

  const getNestedCategories = () => {
    const nestedCategories = [];
    for (const [key, value] of Object.entries(film)) {
      if (Array.isArray(value)) {
        nestedCategories.push(key);
      }
    }
    return nestedCategories;
  };

  useEffect(() => {
    const nestedCategories = getNestedCategories();
    nestedCategories.forEach(async (category) => {
      const nestedData = await getNestedData(category);
      const filteredNestedData = filterNestedData(nestedData, film, category);
      setFilm((prevFilm) => {
        return { ...prevFilm, [category]: filteredNestedData };
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2>{data.title}</h2>
      <div className={styles.content}>
      <p>{data.opening_crawl}</p>
      <p>Director: {data.director}</p>
      <p>Producer: {data.producer}</p>
      <p>Release date: {data.release_date}</p>
      {typeof film.vehicles === "object" && (
        <div>
          <h3>Characters</h3>
          <div>
            {film.characters.map((character) => (
              <Tooltip character={character} />
            ))}
          </div>
          <h3>Planets</h3>
          <p>{film.planets.map((planet) => `${planet.name}, `)}</p>
          <h3>Species</h3>
          <p>{film.species.map((species) => `${species.name}, `)} </p>
          <h3>Starships</h3>
          <p>{film.starships.map((starship) => `${starship.name}, `)}</p>
          <h3>Vehicles</h3>
          <p>{film.vehicles.map((vehicle) => `${vehicle.name}, `)}</p>
        </div>
      )}
      <Link href="/">
        <a className={styles.home}>Home</a>
      </Link>
      </div>
    </div>
  );
};

export default FilmPage;
