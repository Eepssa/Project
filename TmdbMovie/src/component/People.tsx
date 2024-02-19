import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function PeopleCard({setPersonDetail}) {
  const {category}=useParams();
    const [pplList, setPplList] = useState([]);

    const getPpl = () => {
        fetch(`https://api.themoviedb.org/3/person/${category}?api_key=04b66a2db2a7bac50ac1d74568e3579d`)
        .then(res => res.json())
        .then(json => setPplList(json.results));
    }
    
    useEffect(() => {
        getPpl();
    }, [category]);  
  return (
<>

<div className="container" style={{border: "6px solid black", padding: "20px"}}>
            <div className="row">
                {pplList.map((ppl, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                         <Link to='/ppldetail'>
                      <div onClick={()=>(setPersonDetail(ppl.id))}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{ppl.original_name}</h5>
                                {ppl.profile_path ? (
                            <img src={`https://image.tmdb.org/t/p/w500${ppl.profile_path}`} className="card-img-top" alt={`People ${index}`}/>) : 
                            ( <div className="card-img-top text-center">No Image</div>)}
                                <p className="card-text">Popularity: {ppl.popularity}</p>
                                </div>
                        </div></div></Link>
                    </div>
                ))}
            </div>
        </div>

</>

  )
}

export default PeopleCard;
