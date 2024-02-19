import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <>
   <nav>
  <ul>
    <li className="dropdown">
      <a href="#" className="dropbtn">
        Movies
      </a>
      <div className="dropdown-content">
        <ul>
      <li><Link to="/movies/popular">Popular</Link></li>
      <li><Link to="/movies/now_playing">Now Playing</Link></li>
      <li><Link to="/movies/upcoming">Upcoming</Link></li>
      <li><Link to="/movies/top_rated">Top Rated</Link></li>
      </ul>
      </div>
    </li>

    <li className="dropdown">
      <a href="#" className="dropbtn">
        TV Shows
      </a>
      <div className="dropdown-content">
        <ul>
      <li><Link to="/tv/popular">Popular</Link></li>
      <li><Link to="/tv/airing_today">Airing Today</Link></li>
      <li><Link to="/tv/on_the_air">On The Air</Link></li>
      <li><Link to="/tv/top_rated">Top Rated</Link></li>
      </ul>
      </div>
    </li>

    <li className="dropdown">
      <a href="#" className="dropbtn">
        People
      </a>
      <div className="dropdown-content">
        <ul>
      <li><Link to="/person/popular">Popular</Link></li>
      </ul>
      </div>
    </li>

    <li className="dropdown">
      <a href="#" className="dropbtn">
        Movie Genre Pie Chart
      </a>
      <div className="dropdown-content">
        <ul>
      <li><Link to="/genre/popular">Popular</Link></li>
      <li><Link to="/genre/now_playing">Now Playing</Link></li>
      <li><Link to="/genre/upcoming">Upcoming</Link></li>
      <li><Link to="/genre/top_rated">Top Rated</Link></li>
      </ul>
      </div>
    </li>

    <li className="dropdown">
      <a href="#" className="dropbtn">
        TV Shows Genre Bar Graph
      </a>
      <div className="dropdown-content">
        <ul>
      <li><Link to="/genretv/popular">Popular</Link></li>
      <li><Link to="/genretv/airing_today">Airing Today</Link></li>
      <li><Link to="/genretv/on_the_air">On The Air</Link></li>
      <li><Link to="/genretv/top_rated">Top Rated</Link></li>
      </ul>
      </div>
    </li>

  </ul>
</nav>
</>



  );
}





export default Navbar;