import React, { Fragment } from 'react'

export default ({time}) => {
  const minutes = Math.floor( time / 60 )
  const seconds = time % 60 
  console.log('minutes : '+ minutes)
  const timeOut = (m, s)=>{
    let mm = m.toString().length > 1 ? `${m}`: `${m}`
    let ss = s.toString().length > 1 ? `${s}`: `${s}`
    return `${mm}:${ss}` 
  }


    return (
      <Fragment>      
      time : {time}<br/>      
      <p className="title has-text-centered" id="time-left">{timeOut(minutes, seconds)}</p>
      </Fragment>
    )
}