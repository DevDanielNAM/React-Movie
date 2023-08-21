import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import Movie from "../components/Movie";
import url from "../config/url";
import PageNations from "../components/PageNations";
import SearchBox from "../components/SearchBox";
import SortingButton from "../components/SortingButton";

function Home() {
  const URL = url.URL;
  const TOP_RATED_URL = url.TOP_RATED_URL;
  const IMAGE_URL = url.IMAGE_URL;
  const GENRE_URL = url.GENRE_URL;

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const getMovies = async (number) => {
    const json = await (await fetch(`${URL}&page=${number}`, options)).json();
    setMovies(json.results);
    setIsLoading(false);
    getGenres();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const getTopRatedMovies = async (number) => {
    const json = await (
      await fetch(`${TOP_RATED_URL}&page=${number}`, options)
    ).json();
    setMovies(json.results);
    setIsLoading(false);
    getGenres();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const toggleSort = (currentPage) => {
    if (isSorted) {
      getTopRatedMovies(currentPage);
    } else {
      getMovies(currentPage);
    }
  };

  const getGenres = async () => {
    const json = await (await fetch(GENRE_URL, options)).json();
    setGenres(json.genres);
  };

  useEffect(() => toggleSort(currentPage), [currentPage, isSorted]);

  return (
    <>
      <section className={styles.Home}>
        <h1
          className={styles.header}
          onClick={(e) => {
            setCurrentPage(1);
            setIsSorted(false);
          }}
        >
          Movie
        </h1>
        {isLoading ? (
          <h1 className={styles.loading}>Loading...</h1>
        ) : (
          <div>
            <SearchBox />
            <SortingButton
              isSorted={isSorted}
              setCurrentPage={setCurrentPage}
              setIsSorted={setIsSorted}
              currentPage={currentPage}
              toggleSort={toggleSort}
            />
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                IMAGE_URL={IMAGE_URL}
                genres={[...genres]}
              />
            ))}
          </div>
        )}
      </section>
      <span>
        <button
          onClick={(e) =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          TOP
        </button>
      </span>
      <PageNations currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default Home;
