import { useEffect, useState } from "react";

function PersonDetails({personDetail}) {
    const [displayPerson,setDisplayPerson]=useState('')
    const getPersonDetails=()=>{
        fetch(`https://api.themoviedb.org/3/person/${personDetail}?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res=>res.json())
        .then(json=>setDisplayPerson(json))
    }   // id is passed in movieDetail

    useEffect(()=>{
        getPersonDetails();
    },[personDetail])
  return (
    <>
    <div style={{border:"3px solid black", textAlign:"center"}}>
    <h3>{displayPerson.name}</h3>
    <p>Person Id: {displayPerson.id}</p>
      <img src={`https://image.tmdb.org/t/p/w500${displayPerson.profile_path}`} alt="No image available"/>
        <h6>Biography: {displayPerson.biography}</h6>
    </div>

   
    </>
  )
}
export default PersonDetails;