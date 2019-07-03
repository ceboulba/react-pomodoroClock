import React, { Fragment } from 'react'

export default ({time}) => {
  const minutes = Math.floor( time / 60 )
  const seconds = time % 60 
        {console.log('minute : '+ minutes.toString())}

    return (
      <Fragment>      
      time : {time}<br/>
      <p className="title has-text-centered" id="time-left">{minutes.toString().length > 1 ? minutes:'0'+minutes.toString()}:{seconds.toString().length > 1 ? seconds:'0'+seconds.toString()}</p>
      </Fragment>
    )
}