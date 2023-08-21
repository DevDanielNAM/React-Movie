import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SearchBox.module.css";

function SearchBox() {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="영화 제목을 입력하세요"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyUp={(e) =>
          e.key === "Enter"
            ? (window.location.href = `/React-Movie-Build/search/${query}`)
            : null
        }
        required
      />
      {query === "" ? (
        <button>검색</button>
      ) : (
        <Link to={`/search/${query}`}>
          <button>검색</button>
        </Link>
      )}
    </div>
  );
}

export default SearchBox;
