import {React,useContext} from "react";
import { MovieContext } from "../context/moviecontext";
import MovieCard from "./MovieCard";
function TopMovies() {
  const {searchedMovies,watchedMovies,TopMovies} = useContext(MovieContext)
  let MList;
  if (searchedMovies.length > 0) {
    MList = searchedMovies.map((item) => {
      return (
        <MovieCard
          {...item}
          key={item.imdbId}
          watched={watchedMovies.includes(item.imdbId) ? true : false}
        />
      );
    });
  } else {
    MList = TopMovies.map((item) => {
      return (
        <MovieCard
          {...item}
          key={item.imdbId}
          watched={watchedMovies.includes(item.imdbId) ? true : false}
        />
      );
    });
  }
  return (
    <div style={{ marginLeft: "3%", marginTop: "2%", marginBottom: "2%" }}>
      <div className="row" style={{ columnGap: "1%" }}>
        {MList.slice(0, 6)}
      </div>
      <br />
      <div className="row" style={{ columnGap: "1%" }}>
        {MList.slice(6, 12)}
      </div>
      <br />
      <div className="row" style={{ columnGap: "1%" }}>
        {MList.slice(12, 18)}
      </div>
    </div>
  );
}
export default TopMovies;
