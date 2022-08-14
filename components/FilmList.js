

const FilmList = ({ films }) => {
    return (
        <div>
        {films.map((film) => (
            <div key={film.episode_id}>
            <h2>{film.title}</h2>
            <p>{film.opening_crawl}</p>
            </div>
        ))}
        </div>
    );
}

export default FilmList;

