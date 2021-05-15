import axios from 'axios';
import { React, useState, createContext, useEffect } from 'react'

export const MovieContext = createContext();
export const MovieContextProvider = props => {
    const [TopMovies, setTopMovies] = useState([]);
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState("");
    const [userid, setUserid] = useState("");
    const [watchedMovies,setWatchedMovies]=useState([]);
    const [searchedMovies,setSearchedMovies]=useState([]);
    const [recommendedMovies,setRecommendedMovies]=useState([]);
    const [search,setSearch]=useState("");
    const [suggestions,setSuggestions]=useState([]);

    const ChangeToWatched = async (event, imdbId)=> {
        event.preventDefault();
        if (login) {
          if (watchedMovies.includes(imdbId)) {
            const res = watchedMovies.filter((item) => item !== imdbId);
            setWatchedMovies(res);
          } else {
            const res =watchedMovies;
            res.push(imdbId);
            setWatchedMovies(res);
          }
        }
      }
    
      useEffect(() => {
        const loadMovies = async () => {
            axios.get("http://localhost:4000/api/v1/movies/TopMovies").then((res) => {
                setTopMovies(res.data)
            }).catch((err) => { console.log(err.message) })
        }
        loadMovies()
    }, [])
    return (
        <MovieContext.Provider value={{ TopMovies, login, token, userid, watchedMovies,searchedMovies,recommendedMovies, setLogin, setToken, setUserid, setTopMovies, setSearchedMovies,setRecommendedMovies, setWatchedMovies, ChangeToWatched,search,setSearch,suggestions,setSuggestions }}>
            {props.children}
        </MovieContext.Provider>)
}