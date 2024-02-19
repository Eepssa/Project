import { useEffect, useState } from "react";

function MovieDetails({movieDetail}) {
    const [displayMovie,setDisplayMovie]=useState('')
    const [cast,setCast]=useState([])
    const getMovieDetails=()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieDetail}?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res=>res.json())
        .then(json=>setDisplayMovie(json))
    }   // id is passed in movieDetail
   
    const getCast=()=>{
        fetch(`https://api.themoviedb.org/3/movie/${movieDetail}/credits?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res=>res.json())
        .then(json=>setCast(json.cast))
    }
    useEffect(()=>{
        getMovieDetails();
        getCast();
    },[movieDetail])
  return (
    <>
    <div style={{border:"3px solid black", textAlign:"center"}}>
    <h3>{displayMovie.title}</h3>
    <p>Movie Id: {displayMovie.id}</p>
      <img src={`https://image.tmdb.org/t/p/w500${displayMovie.poster_path}`} alt="No image available"/>
        <h6>Summary: {displayMovie.overview}</h6>
        <h6>Tagline: {displayMovie.tagline}</h6>
        <h6>Language: {displayMovie.original_language}</h6>
        <h6>Release Date: {displayMovie.release_date}</h6>
    </div>

<br/>
<div style={{border:"3px solid black", textAlign:"center"}}>
<h4>CAST</h4>
<div className="container">
    <div className="row">
        {cast && cast.map((item,index)=>(
             <div className="col md-4 mb-3" key={index}>
             <div className="card">
                 <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} className="card-img-top" alt="Image not found"/>
                 <div className="card-body">
                <h5 className="card-title"><b>{item.original_name}</b></h5>
                <p className="card-text">{item.character}</p>
                </div>
            </div>
            </div>
        ))}
    </div>
   </div>
   </div>
    </>
  )
}

export default MovieDetails;