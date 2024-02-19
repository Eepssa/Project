import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function MovieCard({setMovieDetail}) {
    const {category}=useParams();
    const [movieList, setMovieList] = useState([]);


    const getMovie = () => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res => res.json())
        .then(json => setMovieList(json.results));
    }
    
    useEffect(() => {
        getMovie();
    }, [category]);  
  return (
<>

<div className="container" style={{border: "6px solid black", padding: "20px"}}>
            <div className="row">
                {movieList.map((movie, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <Link to='/mvdetail'>
                      <div onClick={()=>(setMovieDetail(movie.id))}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                {movie.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={`Movie ${index}`}/>) : 
                            ( <div className="card-img-top text-center">No Image</div>)}
                                <p className="card-text">{movie.overview}</p>
                            </div>
                        </div></div></Link>
                    </div>
                ))}
            </div>
        </div>

</>

  )
}

export default MovieCard;
