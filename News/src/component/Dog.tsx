import {  useEffect, useState } from "react";

const Dog=()=>{
    const[dogImage,setDogImage]=useState("");
 
useEffect(()=>{

  fetch("https://dog.ceo/api/breeds/image/random")
  .then(response=>response.json())
  .then(data=>setDogImage(data.message))

},[])

return (

  
  <>
  
     <img src={dogImage} />
    
  
 
</>

)


}
export default Dog;