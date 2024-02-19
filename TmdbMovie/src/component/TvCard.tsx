import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function TvCard({setTvDetail}) {
  const {category}=useParams();
    const [tvList, setTvList] = useState([]);

    const getTv = () => {
        fetch(`https://api.themoviedb.org/3/tv/${category}?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res => res.json())
        .then(json => setTvList(json.results));
    }
    
    useEffect(() => {
        getTv();
    }, [category]);  
  return (
<>

<div className="container" style={{border: "6px solid black", padding: "20px"}}>
            <div className="row">
                {tvList.map((tv, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <Link to='/tvdetail'>
                      <div onClick={()=>(setTvDetail(tv.id))}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{tv.original_name}</h5>
                                {tv.poster_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} className="card-img-top" alt={`TV ${index}`}/>) : 
                            ( <div className="card-img-top text-center">No Image</div>)}
                                <p className="card-text">{tv.overview}</p>
                                </div>
                        </div></div></Link>
                    </div>
                ))}
            </div>
        </div>

</>

  )
}

export default TvCard;
