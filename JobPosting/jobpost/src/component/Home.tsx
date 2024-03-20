import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [jobs, setJobs] = useState([]);

    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/jobs');
        setJobs(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    const handleDelete=async (id)=>{
      try {
      const response= await fetch(`http://localhost:5000/jobs/${id}`,{
        method:'DELETE',
      
      })
      if(response.ok){
        console.log('Job deleted')
      }
      else {
        console.error('Failed to delete job');
      }
      fetchJobs();
    }catch(error){
      console.error('Error deleting job:', error);
    }
  }

    useEffect(()=>{
        fetchJobs();
    },[])

  return (
    <>
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <h2 style={{ color: '#fff' }}>Job Listings</h2>
    </a>
    
    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarText">
      <Link to="/add">
        <button style={{ padding: '8px 16px', fontSize: '16px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom:'10px' }}><b>Add a JOB</b></button>
      </Link>
    </div>
  </div>
</nav>

       <div className="container" style={{marginTop:'25px'}}>
            <div className="row">
    {jobs.map(job=>(
      <div className="col-md-4 mb-3">
    <div className="card" style={{width:"18rem"}}>
    <div className="card-body">
    <h5 className="card-title"><b>Title: </b>{job.title}</h5>
    <h5 className="card-text"><b>Description: </b>{job.description}</h5>
    <h5 className="card-text"><b>Qualifications: </b>{job.qualification}</h5>
    <h5 className="card-text"><b>Location: </b>{job.location}</h5><br></br>
    <div style={{ display: 'flex' }}>
  {/* <button style={{ padding: '8px 16px', fontSize: '16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer',marginRight:'20px' }}>Edit</button> */}
  <button style={{ padding: '8px 16px', fontSize: '16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer',marginRight:'20px' }} onClick={() => handleDelete(job._id)}>Delete</button>
  <Link to={`/apply/${job.title}`}><button style={{ padding: '8px 16px', fontSize: '16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Apply</button></Link>
</div>
  </div>
</div>


</div>
   ))}
</div>
</div>
</div>
   </>
  );
};

export default Home;

