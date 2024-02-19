import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Search({searchValue,setMovieDetail}) {


const [searchList, setSearchList]=useState([])

const getSearch=()=>{
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=04b66a2db2a7bac50ac1d74568e3579d&query=${searchValue}`)
    .then(res=>res.json())
    .then(json=>setSearchList(json.results))
}
useEffect(()=>{
    if(!searchValue)return;
    getSearch();
},[searchValue])


  return (
   <>   
   <div style={{backgroundImage:'url("https://d1xuqjt1wg0fxw.cloudfront.net/afca50a0-7b4e-11ec-b1a7-2d0d45aa87b0.jpg")'}}>
        {searchList.map((item,index)=>(
             <div className="col md-4 mb-3" key={index} style={{border:"7px solid black", backgroundColor:"cornsilk", width:"30%"}}>
             <Link to="/mvdetail">
                <div onClick={()=>(setMovieDetail(item.id))}>
                <h5>{index+1}</h5>
                <h3>{item.title}</h3>
                 <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="Image not found" style={{height:"250px", width:"100%"}}/>
                </div></Link>
            </div>
        ))}
    </div>
    </>

  )
}

export default Search