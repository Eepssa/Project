import axios from "axios";
import { useState } from "react";

const Add=()=>{
const [title,setTitle]=useState('');
const [description,setDescription]=useState('');
const [qualification,setQualification]=useState('');
const [location, setLocation]=useState('');
const [result,setResult]=useState('');

const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:5000/jobs', {
              method: 'POST',
              mode:'no-cors',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  title,
                  description,
                  qualification,
                  location
              })
          });
  
      //     if (!response.ok) {
      //         throw new Error('Failed to add job');
      //     }
          const data = await response.json();
          console.log(data.result); 
      
          setTitle('');
          setDescription('');
          setQualification('');
          setLocation('');
          
          setResult(data.message); 
  
      } catch (error) {
          console.error('Error adding job:', error);
          setResult('Error adding job');
      }
  };
  
return(
    <>
    <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="form-outline mb-4">
          <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          </div>

         {/* Description */}
          <div className="form-outline mb-3">
            <div>
          <label htmlFor="title">Description:</label>
          <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
           </div>
          </div>

          {/* <!-- Qualifiication --> */}
          <div className="form-outline mb-3">
            <div>
          <label htmlFor="title">Qualification:</label>
          <input type="text" id="qualification" value={qualification} onChange={(e) => setQualification(e.target.value)} />
    </div>
          </div>

           {/* <!-- Location --> */}
          <div className="form-outline mb-3">
           <div>
          <label htmlFor="title">Location:</label>
          <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
    </div>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
    </>
)
}
export default Add;