import React from "react";
import MovieCard from "./MovieCard";
function TopMovies(props) {
  let MList;
  if (props.searchMovies.length > 0) {
    MList = props.searchMovies.map((item) => {
      return (
        <MovieCard
          {...item}
          key={item.imdbId}
          watched={props.watchedMovies.includes(item.imdbId) ? true : false}
          ChangeToWatched={props.ChangeToWatched}
        />
      );
    });
  } else {
    MList = props.topmovies.map((item) => {
      return (
        <MovieCard
          {...item}
          key={item.imdbId}
          watched={props.watchedMovies.includes(item.imdbId) ? true : false}
          ChangeToWatched={props.ChangeToWatched}
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
