import {React,useContext} from "react";
import ReactImageFallback from "react-image-fallback";
import { MovieContext } from "../context/moviecontext";
function MovieCard(props) {
  const {ChangeToWatched} = useContext(MovieContext)
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
        <div style={{ marginTop: "auto" }}>
          <button
            className={props.watched ? "btn btn-primary" : "btn btn-secondary"}
            onClick={(event)=>{ChangeToWatched(event,props.imdbId)}}
          >
            {props.watched ? "watched" : "Yet to see"}
          </button>
          <button className="btn btn-warning">
            {"IMDB: " + props["IMDB Score"]}
          </button>
        </div>
      </div>
    </div>
  );
}
export default MovieCard;
