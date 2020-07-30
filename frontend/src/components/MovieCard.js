import React from "react";
import ReactImageFallback from "react-image-fallback";
function MovieCard(props) {
  return (
    <div className="card" style={{ width: "12rem", height: "32rem" }}>
      <ReactImageFallback
        src={props.Poster}
        alt="Card img"
        fallbackImage={"https://i.imgflip.com/2/2wifvo.jpg"}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.Title}</h5>
        <p className="card-text">{props.Genre}</p>
        <button className="btn btn-warning" style={{ marginTop: "auto" }}>
          {"IMDB: " + props["IMDB Score"]}
        </button>
      </div>
    </div>
  );
}
export default MovieCard;
