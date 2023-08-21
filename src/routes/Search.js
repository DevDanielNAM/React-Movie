import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import url from "../config/url";
import styles from "./Search.module.css";
import HomeButton from "../components/HomeButton";

function Search() {
  const SEARCH_URL = url.SEARCH_URL;
  const GENRE_URL = url.GENRE_URL;
  const IMAGE_URL = url.IMAGE_URL;

  const [searchQuery, setSearchQuery] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { query } = useParams();

  const getGenres = async () => {
    const json = await (await fetch(GENRE_URL)).json();
    setGenres(json.genres);
  };

  const getSearch = async () => {
    const json = await (await fetch(`${SEARCH_URL}&query=${query}`)).json();
    setSearchQuery(json.results);
    getGenres();
    setIsLoading(false);
  };
  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <>
      {isLoading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <>
          <HomeButton />
          <h1 className={styles.header}>
            "{query}" 검색결과 총 {searchQuery.length}개
          </h1>
          <div className={styles.Search}>
            {searchQuery.map((item) => (
              <Movie
                key={item.id}
                movie={item}
                IMAGE_URL={IMAGE_URL}
                genres={[...genres]}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default Search;
