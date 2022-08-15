import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Tooltip from '../../components/Tooltip';
import styles from "../../styles/FilmPage.module.scss";

const apiEndpoint = "https://swapi.dev/api/";

export async function getStaticPaths() {
    const res = await fetch(`${apiEndpoint}films/`)
    const films = await res.json()
  
    const paths = films.results.map((film) => ({
      params: { id: film.episode_id.toString() },
    }))
    console.log(paths);
    return { paths, fallback: false }
  }

export async function getStaticProps(context) {
    const id = context.params.id
    const res = await fetch(`${apiEndpoint}films/${id}`);
    const data = await res.json();
    console.log("Hello World");
  return {
    props: {
      data,
    },
  };
}

const FilmPage = ({data}) => {
    const [film, setFilm] = useState(data);

    const getNestedData = async (category) => {
        const nestedData = [];
        // loop over nested data and fetch each url
        for (const [key, value] of Object.entries(film)) {
            if (key === category) {

                for (let i = 0; i < value.length; i++) {
                    // if (data.results[i].url === value[i]) {
                    //     nestedData.push(data.results[i]);
                    // }
                    const res = await fetch(value[i]);
                    const data = await res.json();
                    nestedData.push(data);
                }
            }
        }
        return nestedData;
    }

const getNestedCategories = () => {
    const nestedCategories = [];
    for (const [key, value] of Object.entries(film)) {
        if (Array.isArray(value)) {
            nestedCategories.push(key);
        }
    }
    return nestedCategories;
}

useEffect(() => {
    console.log(film);
    const nestedCategories = getNestedCategories();
    nestedCategories.forEach(async (category) => {
        const nestedData = await getNestedData(category);
        setFilm((prevFilm) => {
            return {...prevFilm, [category]: nestedData}
        });
    });
}, []);

console.log(film);

  return (
    <div>
        <h2>{data.title}</h2>
        <p>{data.opening_crawl}</p>
        <p>Director: {data.director}</p>
        <p>Producer: {data.producer}</p>
        <p>Release date: {data.release_date}</p>
        {film.vehicles[0].name && 
        <div>
        <h3>Characters</h3>
        <p>
        {film.characters.map((character) => (
            <Tooltip character={character}/>
        ))}
        </p>
        <h3>Planets</h3>
        <p>
        {film.planets.map((planet) => (
            `${planet.name}, `
        ))}
        </p>
        <h3>Species</h3>
        <p>
        {film.species.map((species) => (
            `${species.name}, `
        ))}
        </p>
        <h3>Starships</h3>
        <p>
        {film.starships.map((starship) => (
            `${starship.name}, `
        ))}
        </p>
        <h3>Vehicles</h3>
        <p>
        {film.vehicles.map((vehicle) => (
            `${vehicle.name}, `
        ))}
        </p>
        </div>
        }
        <Link href="/"><a>Home</a></Link>
    </div>
      )
}

export default FilmPage;