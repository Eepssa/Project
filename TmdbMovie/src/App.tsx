
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MovieCard from './component/MovieCard'
import Navbar from './component/NavBar'  
import MovieDetails from './component/MovieDetails'
import { useState } from 'react'
import Home from './component/Home'
import Search from './component/Search'
import TvCard from './component/TvCard'
import PeopleCard from './component/People'
import TvDetails from './component/TvDetail'
import PersonDetails from './component/PersonDetail'

import PieChart from './component/PieChart'
import GenreGraph from './component/BarGraph'


function App() {
  const [searchValue, setSearchValue]=useState('')
  const [movieDetail, setMovieDetail]=useState('')
  const [tvDetail, setTvDetail]=useState('')
  const [personDetail, setPersonDetail]=useState('')

  return (
    <>
      <Navbar /><br/><br/>
  <div style={{ paddingTop: '0.5rem',margin:'0',padding:'0' }}>    
      <Routes>
      <Route path="/" element={<Home setSearchValue={setSearchValue}/>}></Route>
      <Route path="/movies/:category" element={<MovieCard setMovieDetail={setMovieDetail}/> } />
      <Route path="/tv/:category" element={<TvCard setTvDetail={setTvDetail}/> } />
      <Route path="/person/:category" element={<PeopleCard setPersonDetail={setPersonDetail} /> } />
      <Route path="/search" element={<Search searchValue={searchValue} setMovieDetail={setMovieDetail} />}/>
      <Route path='/tvdetail' element={<TvDetails tvDetail={tvDetail}/>}/>
      <Route path='/mvdetail' element={<MovieDetails movieDetail={movieDetail}/>}/>
      <Route path='/ppldetail' element={<PersonDetails personDetail={personDetail}/>}/>
      <Route path="/genre/:category" element={<PieChart/> } />
      <Route path="/genretv/:category" element={<GenreGraph/> } />
      </Routes>
      </div>
      
    </>
  )
}

export default App
