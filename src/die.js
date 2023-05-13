import React from "react"
import "./die.css"

export default function Die(props) {

    return(
        <div className="die-face" style={{backgroundColor : props.isHeld && "green"}} onClick={props.holddice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )

} 