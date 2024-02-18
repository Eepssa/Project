import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import NewsCard from './component/NewsCard.tsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dog from './component/Dog.tsx'
import { BrowserRouter } from 'react-router-dom'
import News from './component/News.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  //   <News></News>
  //   {/* <Dog/> */}
  // </React.StrictMode>
  <BrowserRouter>
  <App />
  </BrowserRouter>
)
