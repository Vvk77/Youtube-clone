import React from 'react'
import "./Video.css"
import Playvideo from '../../Components/Playvideo/Playvideo'
import { Recommended } from '../../Components/Recommended/Recommended'
import {useParams } from "react-router-dom"

const Video = () => {

  const {videoId,categoryID} = useParams()
  return (
    <div className='play-container'>



      <Playvideo videoId={videoId}/>
      <Recommended categoryID={categoryID}/>

    </div>
  )
}

export default Video