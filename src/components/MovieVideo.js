import { useEffect, useState } from "react";
import styles from "./MovieVideo.module.css";

function MovieVideo({ video }) {
  const [videoUrl, setVideoUrl] = useState([]);
  const [videoTitle, setVideoTitle] = useState([]);
  const [indexOfVideo, setIndexOfVideo] = useState(0);

  const getVideoUrl = () => {
    const vidUrl =
      video.length === 0
        ? null
        : video.map((vid) =>
            vid.site === "YouTube" ? vid.key.replaceAll('"', "") : null
          );
    if (vidUrl === null) {
      setVideoUrl(null);
      return;
    }
    setVideoUrl(vidUrl[indexOfVideo]);
  };

  const getVideoTitle = () => {
    const vidTitle = video.map((vid) => vid.name);
    setVideoTitle(vidTitle[indexOfVideo]);
  };

  const toggleBtn = () => {
    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");

    prevBtn.classList.toggle(styles.hidden, indexOfVideo === 0);
    nextBtn.classList.toggle(styles.hidden, indexOfVideo === video.length - 1);

    if (video.length === 0) {
      prevBtn.classList.add(styles.hidden);
      nextBtn.classList.add(styles.hidden);
    }

    //개선1
    // prevBtn.classList.remove(styles.hidden);
    // nextBtn.classList.remove(styles.hidden);

    // if (video.length === 0) {
    //   prevBtn.classList.add(styles.hidden);
    //   nextBtn.classList.add(styles.hidden);
    //   return;
    // }

    // if (indexOfVideo === 0) {
    //   prevBtn.classList.add(styles.hidden);
    // } else if (indexOfVideo === video.length - 1) {
    //   nextBtn.classList.add(styles.hidden);
    // }

    //처음
    // if (video.length === 0) {
    //   prevBtn.classList.remove(styles.hidden);
    //   nextBtn.classList.remove(styles.hidden);
    //   return;
    // }

    // if (indexOfVideo === 0 && video.length !== 0) {
    //   prevBtn.classList.add(styles.hidden);
    //   nextBtn.classList.remove(styles.hidden);
    // } else {
    //   prevBtn.classList.remove(styles.hidden);
    // }

    // if (indexOfVideo === video.length - 1) {
    //   nextBtn.classList.add(styles.hidden);
    //   prevBtn.classList.remove(styles.hidden);
    // } else {
    //   nextBtn.classList.remove(styles.hidden);
    // }
  };

  const onClickNext = () => {
    indexOfVideo === video.length - 1
      ? setIndexOfVideo(video.length - 1)
      : setIndexOfVideo(indexOfVideo + 1);
    toggleBtn();
  };

  const onClickPrev = () => {
    indexOfVideo === 0 ? setIndexOfVideo(0) : setIndexOfVideo(indexOfVideo - 1);
    toggleBtn();
  };

  useEffect(() => {
    toggleBtn();
    getVideoUrl();
    getVideoTitle();
  }, [onClickNext, onClickPrev]);

  return (
    <section className={styles.MovieVideo}>
      <button id="prev-btn" className={styles.prev} onClick={onClickPrev}>
        {"<"}
      </button>
      {videoUrl === null || undefined ? (
        <h2 className={styles.noVideo}>예고편 없음</h2>
      ) : (
        <iframe
          width={560}
          height={315}
          src={`https://www.youtube.com/embed/${videoUrl}`}
          title={videoTitle}
        />
      )}
      <button id="next-btn" className={styles.next} onClick={onClickNext}>
        {">"}
      </button>
    </section>
  );
}

export default MovieVideo;
