import {React,useContext} from "react";
import { NavLink } from "react-router-dom";
import Autocomplete from "react-autocomplete";
import { MovieContext } from "../context/moviecontext";

const Header = () => {
  const {userid,login,search,suggestions,setSearch,setSuggestions,setSearchedMovies,watchedMovies,setLogin,setWatchedMovies,setRecommendedMovies,setToken,setUserid} = useContext(MovieContext)
  const handleLogout = () =>{
    const data = {
      _id: userid,
      watchedMovies: watchedMovies,
    };
    fetch("/api/v1/UsersUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((err) => console.log("error is " + err.message));
    setLogin(false)
    setRecommendedMovies([])
    setSearchedMovies([])
    setWatchedMovies([])
    setToken("")
    setUserid("")
  }
  const handleSearch = () =>{
    if (search === "") {
      setSearchedMovies([])
    } else {
      fetch("/api/v1/search?Title=" + search, {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          const result = res.map((item) => {
            return item;
          });
          setSearchedMovies(result)
        });
    }
  }
  
  const handleClick=()=> {
    setSearch("");
  }
  const handleSelect= (val)=> {
    setSearch(val)
  }
  const handleChange = ()=> {
    if (search.length > 3) {
      fetch("/api/v1/autocomplete?search=" + search)
        .then((res) => res.json())
        .then((res) => {
          const result = res.map((item) => {
            return item["Title"];
          })
          setSuggestions(result)
        })
        .catch((err) => {
          console.log("error is :" + err.message);
        });
    }
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    handleSearch();
    setSearch("");
  }
  return (
    <header style={{ backgroundColor: "#000000", height: "3rem" }}>
    <nav>
      <NavLink to="/">
        <button className="btn btn-danger" onClick={handleClick}>
          TopMovies
        </button>
      </NavLink>
      {" | "}
      <NavLink to="/recommendations">
        <button className="btn btn-danger" onClick={handleClick}>
          Recommendations
        </button>
      </NavLink>
      {" | "}
      {login ? (
        <NavLink to="/">
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </NavLink>
      ) : (
        <NavLink to="/login">
          <button className="btn btn-danger">Login</button>
        </NavLink>
      )}
      <form
        style={{ float: "right" }}
        className="form-inline"
        onSubmit={handleSubmit}
      >
        <div style={{ position: "relative", zIndex: "2" }}>
          <Autocomplete
            getItemValue={(item) => {
              console.log(item);
              return item;
            }}
            items={suggestions}
            value={search}
            name="search"
            onChange={(event) =>{setSearch(event.target.value) 
            handleChange()}}
            renderItem={(item, isHighlighted) => (
              <div
                style={{
                  background: isHighlighted ? "lightgray" : "white",
                }}
              >
                {item}
              </div>
            )}
            onSelect={(val) => {
              handleSelect(val);
            }}
            className="form-control mr-sm-2"
          ></Autocomplete>
        </div>{" "}
        <button className="btn btn-danger">Search</button>
      </form>
    </nav>
    <br />
  </header>
  )
}

export default Header

