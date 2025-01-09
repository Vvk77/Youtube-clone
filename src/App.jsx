





import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Video from './pages/Video/Video'


const App = () => {

const [sidebar, setSideBar] = useState(true)

  return (
    <div>

      <Navbar     setSideBar={setSideBar}/>

      <Routes>
        <Route path="/" element={<Home sidebar={sidebar}  /> } /> 
        <Route path="/video/:categoryID/:videoId" element={<Video/>} />
      </Routes>
    </div>
  )
}

export default App