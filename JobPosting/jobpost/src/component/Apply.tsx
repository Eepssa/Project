import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Apply=()=>{
const [name,setName]=useState('');
const [title,setTitle]=useState('');
const [email,setEmail]=useState('');
const [phone,setPhone]=useState('');
const [experience,setExperience]=useState('');
const [result, setResult]=useState('')
const category=useParams<'title'>();

// useEffect(() => {
//     setTitle(category);
//   }, [category]);

const handleSubmit =async (e)=>{
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/apply', {
            method: 'POST',
            mode:'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                title,
                email,
                phone,
                experience
            })
        });

    //     if (!response.ok) {
    //         throw new Error('Failed to add job');
    //     }
        const data = await response.json();
        console.log(data.result); 
    
        setName('')
        setEmail('');
        setPhone('');
        setExperience('');
        
        setResult(data.message); 

    } catch (error) {
        console.error('Error adding applicant:', error);
        setResult('Error adding applicant');
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

          {/* Name */}
          <div className="form-outline mb-4">
           <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div> 
          </div>

         {/* Title */}
          <div className="form-outline mb-3">
            <div>
          <label htmlFor="title">Job Title:</label>
          <input type="text" id="title" value={title}  onChange={(e) => setTitle(category.title)}/>
           </div>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-3">
             <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

           {/* <!-- Phone input --> */}
          <div className="form-outline mb-3">
           <div>
          <label htmlFor="phone">Phone:</label>
          <input type="number" id="location" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          </div>

           {/* <!-- Experience input --> */}
          <div className="form-outline mb-3">
            <div>
          <label htmlFor="experience">Experience:</label>
          <input type="text" id="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
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
export default Apply;