import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({ movie, IMAGE_URL, genres }) {
  return (
    <div key={movie.id} className={styles.Movie}>
      <Link to={`/movie/${movie.id}`}>
        <div>
          <h2>{movie.title}</h2>
          {movie.poster_path === null ? (
            "<No Poster Image>"
          ) : (
            <img src={IMAGE_URL + movie.poster_path} alt={movie.title} />
          )}
        </div>
      </Link>
      {movie.release_date === "" ? (
        <h5>개봉일: 미정</h5>
      ) : (
        <h5>개봉일: {movie.release_date}</h5>
      )}
      <ul>
        {movie.genre_ids.map((g) => (
          <li key={"genre_" + g}>
            {genres.map((genre) => (genre.id === g ? genre.name : null))}
          </li>
        ))}
      </ul>
      <h3>평점: {Math.round(movie.vote_average * 10) / 10} / 10.0</h3>
      <p>
        {movie.overview === ""
          ? "줄거리 없음"
          : movie.overview.slice(0, 100) + "..."}
      </p>
    </div>
  );
}

export default Movie;
