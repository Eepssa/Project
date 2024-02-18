
import './App.css'
import NavBar from './component/NavBar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewsCard from './component/NewsCard'

function App() {
  return (
    <>
 
        <NavBar />
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>}/>
       
          <Route path="/business" element=
            {<NewsCard category="busines" />}/>
          
          <Route path="/sports" element = 
           { <NewsCard category="sports" />}/>

          <Route path="/technology" element=
           {<NewsCard category="technology" />}/>
         
      </Routes>
  
     
   </>
   
  );
}

export default App
