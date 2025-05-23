import React from 'react'
import { useState } from 'react'
import "./Toggle.css"
const Toggleapp = () => {
const[toggled,setToggled]=useState(false);


    return (
    <div className="Toogleapp">
        <button className={`Tooglebutton ${toggled ? "toggled" :""}`}
        onClick={()=> setToggled(!toggled)}>
            <div className="thumb"></div>
        </button>
    </div>
  )
}

export default Toggleapp