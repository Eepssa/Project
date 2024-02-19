import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home({ setSearchValue }) {
  const [search, setSearch] = useState("");

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    setSearchValue(search);
  };

  const [trend, setTrend] = useState([]);
  const [trendValue, setTrendValue] = useState("day");
  const handleSlider = (event) => {
    console.log(event.target.checked);
    setTrendValue(event.target.checked ? "week" : "day");
    console.log({ trendValue });
  };
  const getTrendDetails = () => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/${trendValue}?api_key=04b66a2db2a7bac50ac1d74568e3579d`
    )
      .then((res) => res.json())
      .then((json) => setTrend(json.results));
  };
  useEffect(() => {
    getTrendDetails();
  }, [trendValue]);
  return (
    <>
      <br />

      <div
        className="container-fluid  background-home"
        style={{
          backgroundImage:
            'url("https://getwallpapers.com/wallpaper/full/1/b/d/829640-gorgerous-movie-backgrounds-1920x1080-ipad-pro.jpg")',
          backgroundSize: "cover",
          height: "300px",
          width: "100%",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Welcome</h1>
        <h2 style={{ textAlign: "center" }}>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <div className="d-flex justify-content-center">
          <div className="col-md-4">
            <div className="search">
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={handleInputChange}
              />
              <Link to="/search">
                <button className="btn btn-secondary" onClick={handleSearch}>
                  Search
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <br></br>
        <div className="header">
          <h3>
            <b>Trending</b>
          </h3>
          <h4>Today</h4>
          <label className="switch-container">
            <input type="checkbox" onChange={handleSlider} />
            <span className="slider round"></span>
          </label>
          <h4>This Week</h4>
        </div>
        <br />
        <div className="container" style={{border: "6px solid black", padding: "20px"}}>
          <div className="row">
            {trend &&
              trend.map((movie, index) => (
                <div className="col-md-4 mb-3" key={index}>
                  <div className="card">
                    
                    <div className="card-body">
                      <h5 className="card-title">{movie.title}</h5>
                      <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      className="card-img-top"
                      alt="No image available"
                    />
                      <p className="card-text">{movie.overview}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      
    </>
  );
}

export default Home;
