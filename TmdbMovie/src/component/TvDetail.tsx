import { useEffect, useState } from "react";

function TvDetails({tvDetail}) {
    const [displayTv,setDisplayTv]=useState('')
    const [cast,setCast]=useState([])
    const getTvDetails=()=>{
        fetch(`https://api.themoviedb.org/3/tv/${tvDetail}?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res=>res.json())
        .then(json=>setDisplayTv(json))
    }   // id is passed in movieDetail
   
    const getCast=()=>{
        fetch(`https://api.themoviedb.org/3/tv/${tvDetail}/credits?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res=>res.json())
        .then(json=>setCast(json.cast))
    }
    useEffect(()=>{
        getTvDetails();
        getCast();
    },[tvDetail])
  return (
    <>
    <div style={{border:"3px solid black", textAlign:"center"}}>
    <h3>{displayTv.name}</h3>
    <p>Tv Id: {displayTv.id}</p>
      <img src={`https://image.tmdb.org/t/p/w500${displayTv.poster_path}`} alt="No image available"/>
        <h6>Summary: {displayTv.overview}</h6>
        <h6>Status: {displayTv.status}</h6>
        <h6>Release Date: {displayTv.first_air_datee}</h6>
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
export default TvDetails;