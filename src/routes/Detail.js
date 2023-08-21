import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../config/apikey";
import url from "../config/url";
import styles from "./Detail.module.css";
import MovieVideo from "../components/MovieVideo";
import HomeButton from "../components/HomeButton";

function Detail() {
  const API_KEY = config.apiKey;
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [video, setVideo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [casts, setCasts] = useState([]);
  const [crews, setCrews] = useState([]);

  const IMAGE_URL = url.IMAGE_URL;

  const getDetailMovie = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
      )
    ).json();
    setDetails(json);
    setIsLoading(false);
  };

  const getDetailMovieVideo = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
      )
    ).json();
    setVideo(json.results);
  };

  const getDetailMovieCredits = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
      )
    ).json();
    setCasts(json.cast);
    setCrews(json.crew);
  };

  useEffect(() => {
    getDetailMovie();
    getDetailMovieVideo();
    getDetailMovieCredits();
  }, []);

  return (
    <div className={styles.Detail}>
      {isLoading ? (
        <h1 className={styles.loading}>Loading...</h1>
      ) : (
        <div>
          <div>
            <HomeButton />
          </div>
          <h1>
            {details.title}({details.original_title})
          </h1>
          <div className={styles.wrapper}>
            {details.poster_path === null ? (
              "<No Poster Image>"
            ) : (
              <img src={IMAGE_URL + details.poster_path} alt={details.title} />
            )}
            <div>
              <h3>{details.tagline}</h3>
              <MovieVideo video={video} />
              <h5>
                {details.release_date === ""
                  ? "개봉일: 미정"
                  : "개봉일:" + details.release_date}{" "}
                | 상영시간: {details.runtime}분
              </h5>
              <p className={styles.overview}>{details.overview}</p>
              <p>
                평점: {Math.round(details.vote_average)} / 10 | 평점 참여:{" "}
                {details.vote_count}명
              </p>

              <h5>
                총 예산: ₩ {details.budget.toLocaleString("ko-KR")} | 총 수입: ₩{" "}
                {details.revenue.toLocaleString("ko-KR")}
              </h5>
              <div>
                <h4>출연진</h4>
                <ul className={styles.credits}>
                  {casts.map((cast, index) =>
                    index < 7 ? (
                      <li key={cast.name}>
                        {cast.profile_path === null ? (
                          "<No Profile Image>"
                        ) : (
                          <img
                            src={IMAGE_URL + cast.profile_path}
                            alt={cast.name}
                          />
                        )}
                        <div>
                          {cast.character}
                          <br />
                          {cast.name}
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
              <div>
                <h4>제작진</h4>
                <ul className={styles.credits}>
                  {crews.map((crew, index) =>
                    index < 7 ? (
                      <li key={crew.name + "_" + crew.department + index}>
                        {crew.profile_path === null ? (
                          "<No Profile Image>"
                        ) : (
                          <img
                            src={IMAGE_URL + crew.profile_path}
                            alt={crew.name}
                          />
                        )}
                        <div>
                          {crew.department}
                          <br />
                          {crew.name}
                        </div>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
              <h4>제작사</h4>
              <div className={styles.company}>
                {details.production_companies.map((company) => (
                  <div key={company.name}>
                    {company.logo_path === null ? (
                      "<No Logo Image>"
                    ) : (
                      <img
                        src={IMAGE_URL + company.logo_path}
                        alt={company.name}
                      />
                    )}
                    <h4>{company.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
