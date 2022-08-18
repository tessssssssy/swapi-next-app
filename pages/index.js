import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import FilmList from '../components/FilmList';
import { useState } from "react";

const apiEndpoint = "https://swapi.dev/api/";

export async function getStaticProps() {
  const res = await fetch(`${apiEndpoint}films/`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [films, setFilms] = useState(data.results);

  const searchFilms = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    if (searchTerm) {
      const filteredFilms = [...films].filter((film) => {
        const searchTermLower = searchTerm.toLowerCase();
        const filmTitleLower = film.title.toLowerCase();
        return filmTitleLower.includes(searchTermLower);
      });
      setFilms(filteredFilms);
    } else {
      setFilms(data.results);
    } 
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Star Wars</title>
        <meta name="description" content="A site about Star Wars" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" integrity="sha512-1sCRPdkRXhBV2PBLUdRb4tMg1w2YPf37qatUFeS7zlBy7jJI8Lf4VHwWfZZfpXtYSLy85pkm9GaYVYMfw5BC1A==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Star Wars</h1>
        <input className={styles.searchbar} type="text" placeholder="search title" onChange={searchFilms}/>
        <FilmList films={films} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
